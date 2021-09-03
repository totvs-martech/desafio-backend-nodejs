import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductsService } from 'src/products/products.service';
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

  async addProduct(cartId: string, productId: string, productCount: number) {
    const product = await this.productsService.findOne(productId);
    const cartItem = new CartItem(productCount, product);
    if (!cartId) {
      const total = calculateProductPriceWithDiscount(cartItem);
      const newCart = {
        total,
        count: productCount,
        items: [cartItem],
      };
      return this.create(newCart);
    } else {
      const cart = await this.findOne(cartId);
      const targetItem = cart.items.find(
        (item) => item.product._id.toString() === product._id.toString(),
      );
      if (targetItem) {
        (targetItem.count += productCount),
          (cart.items = cart.items.map((item) =>
            item.product._id === targetItem.product._id ? targetItem : item,
          ));
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

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
