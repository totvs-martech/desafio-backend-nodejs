import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IndividualProductOrder } from './individualProductOrder.entity';

export type CartDocument = Cart & Document;

@Schema()
export class Cart {
  @Prop()
  total: number;

  @Prop()
  count: number;

  @Prop()
  products: IndividualProductOrder[];
}

export const CartSchema = SchemaFactory.createForClass(Cart);
