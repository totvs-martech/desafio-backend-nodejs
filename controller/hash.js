'use strict'

const crypto = require('crypto')

module.exports = class Hash {
  async generate () {
    try {
      return crypto.randomBytes(20).toString('hex');
    } catch (error) {
      throw new Error(error)
    }
  }
}
