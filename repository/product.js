'use strict'

const { Products } = require('../models')

const optionsToUpdate = {
  new: true,
  upsert: true
}

/**
 * @class ProductRepository
 */
module.exports = class ProductRepository {
  static get (query) {
    return Products.findAll(query)
  }

  static getById (productId) {
    return Products.findOne({ where: { id: productId }})
  }

  static create (product) {
    return Products.create(product)
  }

  static async update (productId, productBody) {
    return new Promise(async (resolve, reject) => {
      const product = await this.getById(productId)
      const newData = Object.assign(product, productBody)

      const productModel = await Products.update(
        { where: { id: productId }},
        newData
      )
      resolve(productModel)
    })
  }

  static delete (productId) {
    return ProductModel.findByIdAndRemove(productId)
  }

  static getByParams (params) {
    return ProductModel.find(params)
  }

  static count (query) {
    return ProductModel.countDocuments()
      .where(query)
  }
}
