import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductsService } from 'src/products/products.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart, CartDocument } from './schemas/cart.schema';
import { IndividualProductOrder } from './schemas/individualProductOrder.entity';

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
    const productCart = new IndividualProductOrder(productCount, product);
    if (!cartId) {
      const newCart = {
        total: product.value * productCount,
        count: productCount,
        products: [productCart],
      };
      return this.create(newCart);
    } else {
      const cart = await this.findOne(cartId);
      cart.total += product.value * productCount;
      cart.count += productCount;
      if (
        cart.products.find(
          (x) => x.product._id.toString() === product._id.toString(),
        )
      )
        cart.products.find(
          (x) => x.product._id.toString() === product._id.toString(),
        ).count += productCount;
      else cart.products.push(productCart);
      return cart.save();
    }
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
