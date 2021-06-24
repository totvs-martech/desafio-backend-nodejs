import {Product} from '../models/Product';

const create = async (payload: any) => {

    const product = new Product(payload);

    const result =  await product.save()
    return result;

}

const findAll = async () => {

    return await Product.find({}).lean()
}

const findById = async (id: string) => {

    return await Product.findById(id)
}


export {create, findAll, findById}