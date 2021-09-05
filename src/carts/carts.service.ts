import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductsService } from '../products/products.service';
import {
  calculateCartPriceWithDiscount,
  calculateProductPriceWithDiscount,
} from './carts.helper';
import { CreateCartDto } from './dto/create-cart.dto';
import { Cart, CartDocument } from './schemas/cart.schema';
import { CartItem } from './schemas/cartItem';

@Injectable()
export class CartsService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,

    private productsService: ProductsService,
    private httpService: HttpService,
  ) {}

  async create(createCartDto: CreateCartDto): Promise<Cart> {
    const createdCart = new this.cartModel(createCartDto);
    return createdCart.save();
  }

  async findAll(): Promise<Cart[]> {
    return this.cartModel.find().exec();
  }

  async findOne(id: string): Promise<CartDocument> {
    return await this.cartModel.findById(id).exec();
  }

  async addProduct(
    cartId: string,
    productId: string,
    productCount: number,
  ): Promise<Cart> {
    const product = await this.productsService.findOne(productId);
    const cartItem = new CartItem(productCount, product);
    if (!cartId) {
      const total = calculateProductPriceWithDiscount(cartItem);
      const newCart = {
        total,
        count: productCount,
        items: [cartItem],
      } as CreateCartDto;
      return this.create(newCart);
    } else {
      const cart = await this.findOne(cartId);
      const targetItem = cart.items.find(
        (item) => item.product._id.toString() === product._id.toString(),
      );
      if (targetItem) {
        targetItem.count += productCount;
        cart.items = cart.items.map((item) =>
          item.product._id === targetItem.product._id ? targetItem : item,
        );
        cart.count += productCount;
        cart.total = calculateCartPriceWithDiscount(cart);
        return cart.save();
      } else {
        cart.items.push(cartItem);
        cart.count += productCount;
        cart.total = calculateCartPriceWithDiscount(cart);
        return cart.save();
      }
    }
  }

  async removeProduct(
    cartId: string,
    productId: string,
    productCount: number,
  ): Promise<Cart> {
    const product = await this.productsService.findOne(productId);
    const cart = await this.findOne(cartId);
    const targetItem = cart.items.find(
      (item) => item.product._id.toString() === product._id.toString(),
    );
    if (targetItem) {
      targetItem.count -= productCount;
      cart.items = cart.items.map((item) =>
        item.product._id === targetItem.product._id ? targetItem : item,
      );
      cart.count -= productCount;
      cart.total = calculateCartPriceWithDiscount(cart);
      return cart.save();
    } else {
      throw new Error('Could not remove this item.');
    }
  }

  async checkout(cartId: string) {
    const cart = await this.findOne(cartId);
    const body = this.buildBody(cart);
    const config = {
      method: 'POST',
      headers: {
        Authorization: `Basic ${process.env.API_KEY}`,
        'Content-Type': 'application/json',
      },
      data: body,
    };
    try {
      return this.httpService.post(
        'https://api.pagar.me/1/transactions',
        config,
      );
    } catch (error) {
      console.log(error);
    }
  }

  buildBody(cart: Cart) {
    return {
      amount: cart.total,
      card_number: '4111111111111111',
      card_cvv: '123',
      card_expiration_date: '0922',
      card_holder_name: 'João das Neves',
      customer: {
        external_id: '#3311',
        name: 'João das Neves Braulio',
        type: 'individual',
        country: 'br',
        email: 'joaodasneves@got.com',
        documents: [
          {
            type: 'cpf',
            number: '00000000000',
          },
        ],
        phone_numbers: ['+5511999998888', '+5511888889999'],
        birthday: '1965-01-01',
      },
      billing: {
        name: 'João das Neves',
        address: {
          country: 'br',
          state: 'sp',
          city: 'Cotia',
          neighborhood: 'Rio Cotia',
          street: 'Rua Matrix',
          street_number: '9999',
          zipcode: '06714360',
        },
      },
      shipping: {
        name: 'Neo Reeves',
        fee: 1000,
        delivery_date: '2000-12-21',
        expedited: true,
        address: {
          country: 'br',
          state: 'sp',
          city: 'Cotia',
          neighborhood: 'Rio Cotia',
          street: 'Rua Matrix',
          street_number: '9999',
          zipcode: '06714360',
        },
      },
      items: cart.items,
    };
  }
}
