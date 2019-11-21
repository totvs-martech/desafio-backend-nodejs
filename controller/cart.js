'use strict'

const { client } = require('../infra/interceptor/redis')
const Response = require('../infra/requester')

module.exports = class Product {
  async getCartByKey (key) {
    try {
      const cart = await this.getDataCart(key)
      return this.createBodyCart(cart)
    } catch (error) {
      return error
    }
  }

  async checkout (key) {
    try {
      const cart = await this.getDataCart(key)
      const bodyCart = await this.createBodyCart(cart)
      const totalCart = bodyCart.total.toString()
      const total = totalCart.replace(/[!@#$%^´~áíóúéãõêîôâ&*()_+\-=\\[\]{}':"\\|,.<>\\/?]+/g, '')
      return this.sendCartPagarme(cart, Number(total))
    } catch (error) {
      return error
    }
  }

  async sendCartPagarme (cart, total) {
    try {
      cart = await this.newBodyCart(cart)
      const body = {
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
      return Response.create('https://api.pagar.me/1', 'transactions', body, '')   
    } catch (error) {
      return error
    }
  }

  async newBodyCart(cart) {
    cart = await cart.map(p => {
      const product = {
        id: p.id.toString(),
        title: p.name,
        unit_price: Number(p.value),
        quantity: p.amount,
        tangible: false
      }
      return product
    })
    return cart
  }

  getDataCart (key) {
    return new Promise((resolve, reject) => {
      client.get(key, (err, reply) => {
        resolve(JSON.parse(reply))
      })
    })
  }

  async createBodyCart (cart) {
    try {
      const subTotal = await this.countSubTotalCart(cart)
      const amount = await this.countAmount(cart)
      
      const productsFactorA = await this.getProductsByFactor(cart, 'A')
      const discountA = await this.countDiscount(productsFactorA, 0, 5, 1)
      const productsFactorB = await this.getProductsByFactor(cart, 'B')
      const discountB = await this.countDiscount(productsFactorB, 0, 15, 5)
      const productsFactorC = await this.getProductsByFactor(cart, 'C')
      const discountC = await this.countDiscount(productsFactorC, 0, 30, 10)

      const discount = await this.sumDiscount(discountA, discountB, discountC)
      const body = {
        products: cart,
        amount,
        subTotal,
        discount,
        total: subTotal - (subTotal * discount)
      }
      return body
    } catch (error) {
      return error
    }
  }

  async countSubTotalCart (cart, subTotal = 0) {
    cart.forEach(p => {
      subTotal = subTotal + p.total
    })
    return subTotal
  }

  async countAmount (cart, amount = 0) {
    cart.forEach(p => {
      amount = amount + p.amount
    })
    return amount
  }

  sumDiscount (discountA, discountB, discountC) {
    const totalDiscount = discountA + discountB + discountC
    if (totalDiscount > 30) {
      return 30/100
    }
    return totalDiscount/100
  }

  async getProductsByFactor (cart, factor) {
    return cart.filter(p => {
      if (p.factor === factor) {
        return p
      }
    })
  }

  async countDiscount (products, sumDiscount, maxDiscount, discount) {
    return new Promise((resolve, reject) => {
      if (products.length > 0) {
        const product = products.pop()
        this.verifyDiscount(sumDiscount, resolve, maxDiscount)
        for (let index = 0; index < product.amount; index++) {
          this.verifyDiscount(sumDiscount, resolve, maxDiscount)
          sumDiscount = sumDiscount + discount
        }
        this.countDiscount(products, sumDiscount, maxDiscount, discount)
          .then(resolve)
          .catch(reject)
      } else {
        resolve(sumDiscount)
      }
    })
  }

  verifyDiscount(totalDiscount, resolve, value) {
    if (totalDiscount >= value) {
      resolve(totalDiscount);
    }
  }
}
