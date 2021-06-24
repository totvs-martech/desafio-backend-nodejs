import axios from 'axios';
import { payment } from '../../repository/shoppingcard';

const api = axios.create({
    baseURL: "https://api.pagar.me/1/transactions",
    timeout: 1000
})

const Payment = async (payload: any) =>{

    try 
    {
        const build = buildPayload(payload);
        const res = await api.post("/?api_key=ak_test_Fdo1KyqBTdnTFeLgBhkgRcgm9hwdzd", build);
        return res.data
    } catch (error) 
    {
        console.log(error)
    }

}

const buildPayload = (payload: any) => {

    const itens = payload.products.map((product: { _id: any; name: any; price: any; }) => {
        const item = {

            "id": product._id,
            "title": product.name,
            "unit_price": product.price,
            "quantity": 1,
            "tangible": true

        }
        return item
    })

    const _payload = {
        "amount": payload.amounttopay,
        "card_number": payload.customer.card[0].card_number,
        "card_cvv": payload.customer.card[0].card_cvv.toString(),
        "card_expiration_date": payload.customer.card[0].card_expiration_date,
        "card_holder_name": payload.customer.card[0].card_holder_name,
        "customer": {
          "external_id": payload.customer.external_id,
          "name": payload.customer.name,
          "type": "individual",
          "country": "br",
          "email": "joaodasneves@got.com",
          "documents": [{
              "type":  payload.customer.documents[0].type,
                 "number": payload.customer.documents[0].number
          }],
          "phone_numbers": [payload.customer.phone_numbers[0]],
          "birthday": "1965-01-01"
        },
        "billing": {
          "name": payload.customer.name,
          "address": {
            "country": payload.customer.address[0].country,
            "state": payload.customer.address[0].state,
            "city": payload.customer.address[0].city,
            "neighborhood": payload.customer.address[0].neighborhood,
            "street": payload.customer.address[0].street,
            "street_number": payload.customer.address[0].street_number,
            "zipcode": payload.customer.address[0].zipcode
          }
        },
        "shipping": {
          "name": "Neo Reeves",
          "fee": 1000,
          "delivery_date": "2000-12-21",
          "expedited": true,
          "address": {
            "country": "br",
            "state": "sp",
            "city": "Cotia",
            "neighborhood": "Rio Cotia",
            "street": "Rua Matrix",
            "street_number": "9999",
            "zipcode": "06714360"
          }
        },
        "items": itens
    }

    return _payload
}

export {Payment}
