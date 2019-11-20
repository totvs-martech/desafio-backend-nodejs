'use strict'

const ProductRepository = require('../repository/product')
const { client } = require('../infra/interceptor/redis')

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

  async addProductCart (productId, key) {
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
      const data = await this.verifyKey(key)
      return this.alterBodyKey(key, 'plus', data, newBodyProduct)
    } catch (error) {
      return error
    }
  }

  async removeProductCart (productId, key) {
    try {
      const product = await ProductRepository.getById(productId)
      const data = await this.verifyKey(key)
      return this.alterBodyKey(key, 'less', data, product)
    } catch (error) {
      return error
    }
  }

  countTotal(amount, value) {
    return amount * value;
  }

  async verifyKey (key) {
    return new Promise((resolve, reject) => {
      client.get(key, (err, reply) => {
        if (err || reply === null) {
          client.set(key, JSON.stringify([]))
          resolve([])
        } else {
          resolve(JSON.parse(reply))
        }
      });
    })
  }

  async alterBodyKey (key, type, products, product) {
    try {
      const index = await products.findIndex(p => p.id === product.id)
      if (index >= 0) {
        products = type === 'plus'
          ? await this.sum(products, product, index)
          : await this.subtract(products, product, index)
      } else {
        if (type === 'plus') {
          products.push(product)
        }
      }
      await client.set(key, JSON.stringify(products))
      return products
    } catch (error) {
      return error
    }
  }

  async sum (products, product, index) {
    products[index].amount++
    products[index].total = await this.countTotal(products[index].amount, product.value)
    return products
  }

  async subtract (products, product, index) {
    if (products[index].amount === 1) {
      products = products.filter(p => p.id !== product.id)
    } else {
      products[index].amount--
      products[index].total = await this.countTotal(products[index].amount, product.value)
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
