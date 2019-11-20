'use strict'

const ProductRepository = require('../repository/product')
const redis = require("redis")
const client = redis.createClient()

module.exports = class Product {
  listAll (query) {
    try {
      return ProductRepository.get(query)
    } catch (error) {
      throw new Error(error)
    }
  }

  async create (body) {
    try {
      return ProductRepository.create(body)
    } catch (error) {
      throw new Error(error)
    }
  }

  async addCart (productId, key) {
    try {
      const product = await ProductRepository.getById(productId)
      const amount = 1
      const total = await this.countTotal(amount, product.value)
      const newBodyProduct = {
        id: product.id,
        name: product.name,
        value: product.value,
        factor: product.factor,
        amount,
        total
      }
      const data = await this.verifyKey(key, newBodyProduct)
      return this.alterBodyKey(key, 'plus', data, newBodyProduct)
    } catch (error) {
      return error
    }
  }

  async removeCart (productId, key) {
    try {
      const product = await ProductRepository.getById(productId)
      const data = await this.verifyKey(key, product)
      return this.alterBodyKey(key, 'less', data, product)
    } catch (error) {
      return error
    }
  }

  countTotal(amount, value) {
    return amount * value;
  }

  async verifyKey (key, product) {
    return new Promise((resolve, reject) => {
      client.get(key, (err, reply) => {
        if (err || reply === null) {
          client.set(key, JSON.stringify([product]))
          resolve([product])
        } else {
          resolve(JSON.parse(reply))
        }
      });
    })
  }

  async alterBodyKey (key, type, products, product) {
    try {
      const index = await products.findIndex(p => p.id === product.id)
      if (index < 0) {
        return products
      }
      if (index >= 0) {
        products = await this.sumOrSubtract(products, product, type, index)
      } else {
        products.push(product)
      }
      await client.set(key, JSON.stringify(products))
      return products
    } catch (error) {
      return error
    }
  }

  async sumOrSubtract (products, product, type, index) {
    if (type === 'plus') {
      products[index].amount++
      products[index].total = await this.countTotal(products[index].amount, product.value)
    } else {
      if (products[index].amount === 1) {
        products = products.filter(p => p.id !== product.id)
      } else {
        products[index].amount--
        products[index].total = await this.countTotal(products[index].amount, product.value)
      }
    }
    return products
  }

  getById (id) {
    return new Promise((resolve, reject) => {
      ProductRepository.getById(id)
        .then(resolve)
        .catch(reject)
    })
  }

  update (id, body) {
    return new Promise((resolve, reject) => {
      ProductRepository.update(id, body)
        .then(resolve)
        .catch(reject)
    })
  }

  delete (id) {
    return new Promise((resolve, reject) => {
      ProductRepository.delete(id)
        .then(() => {
          resolve({ message: 'Product deleted successfully' })
        })
        .catch(reject)
    })
  }
}
