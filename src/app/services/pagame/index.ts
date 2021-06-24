import axios from 'axios';
import { payment } from '../../repository/shoppingcard';

const api = axios.create({
    baseURL: "https://api.pagar.me/1/transactions",
    timeout: 1000
})

const Payment = async (payload: any) =>{

    try 
    {
        
    } catch (error) 
    {
        console.log(error)
    }

}

const buildPayload = (payload: any) => {
    
    const _payload = "";

    return _payload
}

export {Payment}
