import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CartItem } from './cartItem';

export type CartDocument = Cart & Document;

@Schema()
export class Cart {
  @Prop()
  total: number;

  @Prop()
  count: number;

  @Prop()
  items: CartItem[];
}

export const CartSchema = SchemaFactory.createForClass(Cart);
