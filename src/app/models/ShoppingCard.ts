import { model, Schema, Model, Document, ObjectId } from 'mongoose';


interface IShoppingCard extends Document {

    product: [ObjectId];
    status: boolean;
    customer: ObjectId;
    expiration: Date;
    total: Number;

}

const ShoppingCardSchema: Schema = new Schema({
  
  product : { type: [Schema.Types.ObjectId], ref: 'products', required: false },
    status: { type: String, required: false },
    customer: { type: Schema.Types.ObjectId, ref: 'customers', required: true },
    expiration: {type: Date, default: () => {
       const date = new Date(); 
       date.setMinutes(date.getMinutes() + 10)
      }, required: true},
    total: {type: Number}
    })
    

const ShoppingCard: Model<IShoppingCard> = model('shoppingcards', ShoppingCardSchema);

export {ShoppingCard}