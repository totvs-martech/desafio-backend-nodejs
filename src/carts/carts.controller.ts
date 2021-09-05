import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { Cart } from './schemas/cart.schema';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post()
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartsService.create(createCartDto);
  }

  @Get()
  findAll(): Promise<Cart[]> {
    return this.cartsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartsService.findOne(id);
  }

  @Post('/add')
  addProduct(
    @Body('cart') cart: string,
    @Body('product') product: string,
    @Body('count') count: number,
  ) {
    return this.cartsService.addProduct(cart, product, count);
  }

  @Post('/remove')
  remove(
    @Body('cart') cart: string,
    @Body('product') product: string,
    @Body('count') count: number,
  ) {
    return this.cartsService.removeProduct(cart, product, count);
  }

  @Post('/checkout')
  checkout(@Body('cart') cart: string) {
    return this.cartsService.checkout(cart);
  }
}
