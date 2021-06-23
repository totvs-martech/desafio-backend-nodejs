import { model, Schema, Model, Document, ObjectId } from 'mongoose'


interface ICards extends Document {

    amount: string
    card_number: string
    card_cvv: number
    card_expiration_date: string
    card_holder_name: string
}

const CardsSchema: Schema = new Schema({
    amount: { type: String, required: false },
    card_number: { type: String, required: true },
    card_cvv: { type: Number, required: false },
    card_expiration_date: { type: String, required: false },
    card_holder_name: { type: String, required: false },
});


interface IAddress extends Document {

    country: string;
    state: string;
    city: string;
    neighborhood: string;
    street: string;
    street_number: string;
    zipcode: string;

}
const AddressSchema: Schema = new Schema({

    country: { type: String, required: false },
    state: { type: String, required: true },
    city: { type: String, required: true },
    neighborhood: { type: String, required: true },
    street: { type: String, required: true },
    street_number: { type: String, required: true },
    zipcode: { type: String, required: true }
});


interface IDocuments extends Document {

    type: string,
    number: string
}

const DocumentsSchema: Schema = new Schema({

    type: { type: String, required: false },
    number: { type: String, required: true }
});



interface ICustomer extends Document {

    external_id: string;
    name: string;
    type: string;
    country: string;
    phone_numbers: Array<string>;
    birthday: Date;
    address: Array<IAddress>;
    documents: Array<IDocuments>;
    cards: Array<ICards>;

}

const CustomerSchema: Schema = new Schema({
    external_id: { type: String, required: false },
    name: { type: String, required: true },
    type: { type: String, required: false },
    country: { type: String, required: false },
    phone_numbers: { type: Array, required: false },
    birthday: { type: Date, required: false },
    address: { type: [AddressSchema], required: false },
    documents: { type: [DocumentsSchema], required: false },
    card: { type: [CardsSchema], required: false },
    
  });

const Customer: Model<ICustomer> = model('customers', CustomerSchema);

export {Customer}
