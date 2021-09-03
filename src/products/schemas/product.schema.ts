import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  img: string;

  @Prop()
  value: number;

  @Prop()
  factor: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
