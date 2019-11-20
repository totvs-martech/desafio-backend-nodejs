'use strict'

const { Users } = require('../models')

const optionsToUpdate = {
  new: true,
  upsert: true
}

/**
 * @class UserRepository
 */
module.exports = class UserRepository {
  static create (user) {
    return Users.create(user)
  }

  static getLogin (query) {
    query = { where: { email: query.email, password: query.password } }
    return Users.findAll(query)
  }
}
