const redisClient = require('./redis-client');
const pagarme = require('pagarme')

const save = async (req, res) => {

    const { key } = req.params;
    const value = req.body;
    var item = buildItem(value);
    products = await addOrUpdateItem(key, item);
    await redisClient.setAsync(key, JSON.stringify(products));
    return res.send('Success');

};

const getContent = async (req, res) => {

    const { key } = req.params;
    const rawData = await redisClient.getAsync(key);
    return res.json(JSON.parse(rawData));

};

const payment = async (req, res) => {
    const { key } = req.params;
    await doPayment(key)
          .then((ok) => res.json(ok))
          .catch((err) => {
            next(Response.internalError(res, err.message))
          })

};
  
const doPayment = async (key)=> {
    try {
      const rawData = await redisClient.getAsync(key)
      const cart = await buildCart(JSON.parse(rawData))
      return await connectPagarme(cart)
    } catch (error) {
      return error
    }
}

const buildItem = (reqParam) => {
    const product = {
        id: reqParam.id,
        name: reqParam.name,
        value: Number(reqParam.value),
        quantity: reqParam.quantity,
        factor: reqParam.factor
    }
    return product
}

const addOrUpdateItem = async (key, item) => {
    let allProducts = await redisClient.getAsync(key);
    return new Promise((resolve, reject) => {
        if (!allProducts) {

            allProducts =JSON.parse(`{"products": []}`) ;
            allProducts.products.push(JSON.parse(`{"id" :  ${item.id}, "name" : "${item.name}", "value" : ${Number(item.value)} , "quantity" : ${Number(item.quantity)}, "factor" : "${item.factor}"}`))

        } else {

            
            allProducts = JSON.parse(allProducts);
            
            findAndUpdatenCart(item, allProducts.products);

        }

        resolve(allProducts);

    }).catch(err => console.log(err))
}

const findAndUpdatenCart = (item, products) => {

    let found = products.find(element => element.id === item.id);
    if (found) {

        found.name = item.name
        found.value = Number(item.value)
        found.quantity = item.quantity
        found.factor = item.factor

    }else{

        products.push(JSON.parse(`{"id" :  ${item.id}, "name" : "${item.name}", "value" : ${Number(item.value)} , "quantity" : ${Number(item.quantity)}, "factor" : "${item.factor}"}`))

    }

}

const buildCart = async (cart) => {
    try {
        const subTotal = await cartSubtotal(cart.products)
        const totalCart = 0
        
        
        const productsType = ['A', 'B', 'C'];
        const factorProgress = [1, 5, 10];
        const maxDiscount = [5, 15, 30];
        const productsDiscount = [0, 0, 0];

        for (var index = 0; index < productsType.length; index++) {

            productsFactor = await justProductsFactor(cart.products, productsType[index])
            
            productsDiscount[index] = await checkDiscount(productsFactor, maxDiscount[index], factorProgress[index], 0)
            
        }

        const discount =  fixDiscount(productsDiscount[0], productsDiscount[1], productsDiscount[2])
       /* {
            "id": "r123",
            "title": "Red pill",
            "unit_price": 10000,
            "quantity": 1,
            "tangible": true
          }*/
        const items = []
        cart.products.map((product) =>{
            items.push(JSON.parse(`{"id" :  "${product.id}", "title" : "${product.name}", "unit_price" : ${Number(product.value)} , "quantity" : ${Number(product.quantity)}, "tangible" : true}`))
        })

        const ret = {
            subTotal,
            discount,
            total: subTotal - (subTotal * discount),
            products: items,
        }
        return ret
    } catch (error) {
        return error
    }
}

const cartSubtotal = async (products) => {
    let subTotal = 0;
    products.forEach(product => {
        subTotal = subTotal + (product.value * product.quantity)
    })
    return subTotal
}

const justProductsFactor = async (products, factor) => {
    return products.filter(product => {
        if (product.factor === factor) {
            return product
        }
    })
}

const checkDiscount = async (products, maxDiscount, discount, cumulativeDiscount = 0) => {

    return new Promise((resolve, reject) => {

        
        products.forEach(product => {
            cumulativeDiscount =  cumulativeDiscount + (discount * product.quantity);
            
            if(cumulativeDiscount >= maxDiscount){
                cumulativeDiscount = maxDiscount;
                return false;
            }

        })    
        
        resolve(cumulativeDiscount)

    })

}

const fixDiscount = (valA, valB, valC) => {
    const totalDiscount = valA + valB + valC
    if (totalDiscount > 30) {
        return 30 / 100
    }
    return totalDiscount / 100
}

const connectPagarme = async (cart) => {
    const payload = {
        "amount": cart.total,
        "card_number": "4111111111111111",
        "card_cvv": "123",
        "card_expiration_date": "0922",
        "card_holder_name": "João das Neves",
        "customer": {
          "external_id": "#3311",
          "name": "João das Neves Braulio",
          "type": "individual",
          "country": "br",
          "email": "joaodasneves@got.com",
          "documents": [
            {
              "type": "cpf",
              "number": "00000000000"
            }
          ],
          "phone_numbers": ["+5511999998888", "+5511888889999"],
          "birthday": "1965-01-01"
        },
        "billing": {
          "name": "João das Neves",
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
        "items": cart.products
      };

    pagarme.client.connect({ api_key: `'${process.ENV.PAGARME_API_KEY}'` })
      .then(client => client.transactions.create(payload))
        .then((transaction => { 
            console.log(`retorno:${transaction}`)
            return transaction;
            })
       /* .catch((err => {
            console.log(err)
        }))    */
      ) 
      .catch((err => {
          console.log(err)
      }))
}


module.exports = {
    save,
    getContent,
    payment
};

