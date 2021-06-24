import {ShoppingCard} from '../models/ShoppingCard';
import {Product, IProduct} from '../models/Product';
import {Customer} from '../models/Customer';
import { ArrayTypeNode, setSourceMapRange } from 'typescript';
import {Payment} from '../services/pagame'

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

const applyDiscount = async (products: [IProduct]) => {

    let limiteFatorA = 5; 
    let limiteFatorB = 3; 
    let limiteFatorC = 3; 
    let all_discont = 0;
    const alldiscount = await Promise.all(
        products.map(async (product)=> {
            if(product.fator === 1 && limiteFatorA > 0 && all_discont <=30){
                product.discount = product.price * 1 / 100
                limiteFatorA = limiteFatorA - 1 ;
                all_discont = all_discont + 1;
            }
            else if(product.fator === 5 && limiteFatorB > 0 && all_discont <=30){
                product.discount = product.price * 5 / 100
                limiteFatorB = limiteFatorB - 1 ;
                all_discont = all_discont + 5;
            }
            else if(product.fator === 10 && limiteFatorC > 0 && all_discont <=30){
                product.discount = product.price * 10 / 100
                limiteFatorC = limiteFatorC - 1 ;
                all_discont = all_discont + 10;
            }
            else {
                product.discount = 0;
            }
            const item = {
                _id: product._id,
                name: product.name,
                description: product.description,
                urlImage: product.urlImage,
                price: product.price,
                fator: product.fator,
                discount: product.discount,
            }
            return item
        })
    )
    return alldiscount as any
      

   
}

const addUpTotal = async (products: Array<IProduct>) => {

    const total = products.reduce((sum, product) => {
        return sum + product.price;
      }, 0);

    return total;
}

const addUpTotalDiscount = async (products: Array<IProduct>) => {

    const total = products.reduce((sum, product) => {
        return sum + product.discount;
      }, 0);

    return total;
}


const create = async (payload: any) => {

    const shoppingCard = new ShoppingCard(payload);
    const shopping = await shoppingCard.save()
    const findshopping = await ShoppingCard.findById(shopping._id).populate(populate).lean();
    findshopping.total = await addUpTotal(findshopping.products as any)
    findshopping.products = await applyDiscount(findshopping.products as any);
    findshopping.discount = await addUpTotalDiscount(findshopping.products as any)
    findshopping.amounttopay = findshopping.total - findshopping.discount;

    return findshopping;


}
const payment = async (id: string) => {

    const findshopping = await ShoppingCard.findById(id).populate([
        {
            model: Product,
            path: 'products'
        },
        {
            model: Customer,
            path: 'customer'
        }
    ]).lean();
    
    if(!findshopping)
        throw new Error("Esse carinho de compras não existe");
    
    if(findshopping.products.length == 0)
        throw new Error("Seu carinho está sem produtos");
        
    findshopping.total = await addUpTotal(findshopping.products as any)
    findshopping.products = await applyDiscount(findshopping.products as any);
    findshopping.discount = await addUpTotalDiscount(findshopping.products as any)
    findshopping.amounttopay = findshopping.total - findshopping.discount;

    const result = await Payment(findshopping);


    return result;

}

const addProduct = async (payload: any, id: string) => {

    const shoppingCard = await ShoppingCard.findById(id);
    shoppingCard.products.push(payload.products);
    const result = await shoppingCard.save()
    const findshopping = await ShoppingCard.findById(id).populate(populate).lean();
    findshopping.total = await addUpTotal(findshopping.products as any)
    findshopping.products = await applyDiscount(findshopping.products as any);
    findshopping.discount = await addUpTotalDiscount(findshopping.products as any)
    findshopping.amounttopay = findshopping.total - findshopping.discount;
    return findshopping;

    

}

const removeProduct = async (payload: any, id: string) => {

    const shoppingCard = await ShoppingCard.findById(id);
    shoppingCard.products.splice(payload.product, 1);
    await shoppingCard.save()
    const findshopping = await ShoppingCard.findById(id).populate(populate).lean();
    findshopping.total = await addUpTotal(findshopping.products as any)
    findshopping.products = await applyDiscount(findshopping.products as any);
    findshopping.discount = await addUpTotalDiscount(findshopping.products as any)
    findshopping.amounttopay = findshopping.total - findshopping.discount;
    return findshopping;

}

export {create, removeProduct, addProduct, payment}