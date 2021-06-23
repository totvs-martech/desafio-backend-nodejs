import {ShoppingCard} from '../models/ShoppingCard';
import {Product, IProduct} from '../models/Product';
import {Customer} from '../models/Customer';
import { ArrayTypeNode, setSourceMapRange } from 'typescript';

const populate = [
    {
        model: Product,
        path: 'products'
    },
    {
        model: Customer,
        path: 'customer',
        select: "name"
    }
]

const addUpTotal = (products: Array<IProduct>) => {

    const total = products.reduce((sum, product) => {
        return sum + product.price;
      }, 0);

    return total;
}

const create = async (payload: any) => {

    let shoppingCard = new ShoppingCard(payload);
    let shopping = await shoppingCard.save()

    shopping = await ShoppingCard.findById(shopping._id).populate(populate).lean();
    shopping.total = addUpTotal(shopping.products as any)

    return shopping;


}

const addProduct = async (payload: any, id: string) => {

    const shoppingCard = await ShoppingCard.findById(id);
    shoppingCard.products.push(payload.products);
    await shoppingCard.save()
   
    const result = await ShoppingCard.findById(id).populate(populate).lean();
    result.total = addUpTotal(result.products as any)
    return result;

}

const removeProduct = async (payload: any, id: string) => {

    const shoppingCard = await ShoppingCard.findById(id);
    shoppingCard.products.splice(payload.products, 1);
    await shoppingCard.save()
   
    const result = await ShoppingCard.findById(id).populate(populate).lean();
    result.total = addUpTotal(result.products as any)
    return result;

}

export {create, removeProduct, addProduct}