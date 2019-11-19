'use strict'

class Response {
  static internalError (res, message) {
    res.status(500)
    res.json({ message })
  }
}

module.exports = Response
