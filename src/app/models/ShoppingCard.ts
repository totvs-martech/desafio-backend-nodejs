import { model, Schema, Model, Document, ObjectId } from 'mongoose';


interface IShoppingCard extends Document {

    products: [ObjectId];
    status: boolean;
    customer: ObjectId;
    expiration: Date;
    total: Number;

}

const ShoppingCardSchema: Schema = new Schema({
  
    products : { type: [Schema.Types.ObjectId], ref: 'products', required: false },
    status: { type: String, default: true, required: false },
    customer: { type: Schema.Types.ObjectId, ref: 'customers', required: true },
    expiration: {type: Date, default: () => {
       const date = new Date(); 
       date.setMinutes(date.getMinutes() + 10)
       return date
      }},
    total: {type: Number}
    })
    

const ShoppingCard: Model<IShoppingCard> = model('shoppingcards', ShoppingCardSchema);

export {ShoppingCard}