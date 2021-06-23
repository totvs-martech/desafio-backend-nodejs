import {Customer} from '../models/Customer';

const create = async (payload: any) => {

    const customer = new Customer(payload);

    const result = await customer.save()
    return result;


}

export {create}