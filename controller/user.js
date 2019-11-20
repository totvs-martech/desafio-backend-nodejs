'use strict'

const UserRepository = require('../repository/user')

module.exports = class User {
  async create (body) {
    try {
      return UserRepository.create(body)
    } catch (error) {
      throw new Error(error)
    }
  }

  async getByParams (body) {
    try {
      return UserRepository.getLogin(body)
    } catch (error) {
      throw new Error(error)
    }
  }
}
