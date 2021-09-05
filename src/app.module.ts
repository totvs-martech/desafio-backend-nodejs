import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';
import { CartsModule } from './carts/carts.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`${process.env.URI_MONGO}`, {
      useNewUrlParser: true,
    }),
    ProductsModule,
    CartsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
