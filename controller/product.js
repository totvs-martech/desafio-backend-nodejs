'use strict'

const ProductRepository = require('../repository/product')

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
