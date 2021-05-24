const redisClient = require('./redis-client');

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
    console.log(rawData)
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
      const repositoryCart = await redisClient.getAsync(key)
      const cart = await buildCart(repositoryCart)
      console.log(cart)
      //const totalCart = cart.total.toString().replace(/[!@#$%^´~áíóúéãõêîôâ&*()_+\-=\\[\]{}':"\\|,.<>\\/?]+/g, '')
      //return connectPagarme(repositoryCart, Number(totalCart))
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

            console.log(allProducts);
            allProducts = JSON.parse(allProducts);
            console.log(allProducts.products.find(element => element.id === item.id));
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
        const subTotal = await cartSubtotal(cart);
        console.log(subtotal);
        return null;
        /*
        const totalCart = await cartTotal(cart)
        const productsType = ['A', 'B', 'C'];
        const factorProgress = [1, 5, 10];
        const maxDiscount = [5, 15, 30];
        const productsDiscount = [0, 0, 0];

        for (var index = 0; index < productsType.length; index++) {

            productsFactor = await justProductsFactor(cart, productsType[index])
            productsDiscount[index] = checkDiscount(productsFactor, maxDiscount[index], factorProgress[index], 0)

        }

        const discount = await fixDiscount(productsDiscount[0], productsDiscount[1], productsDiscount[2])
        const ret = {
            products: cart,
            totalCart,
            subTotal,
            discount,
            total: subTotal - (subTotal * discount)
        }
        return ret*/
    } catch (error) {
        return error
    }
}

const cartSubtotal = async (cart, subTotal = 0) => {
    cart.forEach(product => {
        subTotal = subTotal + (product.valor*product.quantity)
    })
    return subTotal
}

const cartTotal = async (cart, sumValueCart = 0) => {
    cart.forEach(p => {
        sumValueCart = sumValueCart + p.value
    })
    return sumValueCart
}

const fixDiscount = (valA, valB, valC) => {
    const totalDiscount = valA + valB + valC
    if (totalDiscount > 30) {
        return 30 / 100
    }
    return totalDiscount / 100
}

const justProductsFactor = async (cart, factor) => {
    return cart.filter(product => {
        if (product.factor === factor) {
            return product
        }
    })
}

const checkDiscount = async (products, maxDiscount, discount, cumulativeDiscount) => {

    return new Promise((resolve, reject) => {

        var totalDiscont = 0;
        products.forEach(product => {
            totalDiscont =  totalDiscont + (discount * product.quantity);

            if(totalDiscont >= maxDiscount){
                totalDiscont = maxDiscount;
                return false;
            }

        })    
        
        resolve(cumulativeDiscount)

    })

}

const connectPagarme =  (cart, total) => {
    try {
      //cart = await this.newBodyCart(cart)
      const reuest = {
        "api_key": process.env.API_KEY_PAGARME,
        "amount": total,
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
          "expedited": 'true',
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
        "items": cart
      }
      return Response.create('https://api.pagar.me/1', 'transactions', request, '')   
    } catch (error) {
      return error
    }
  }


module.exports = {
    save,
    getContent,
    payment
};

