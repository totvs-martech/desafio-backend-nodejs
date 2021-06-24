import { model, Schema, Model, Document, ObjectId } from 'mongoose';

interface IProduct extends Document {
    index: Number;
    _id: ObjectId;
    name: string;
    description: string;
    urlImage: String;
    price: number;
    fator: number;
    discount: number;
}

const ProductSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    fator: { type: Number, enum: [0,1,5,10], required: true },
    urlImage: { type: String, required: true }
  });

const Product: Model<IProduct> = model('products', ProductSchema);

export {Product, IProduct}