let jwt = require('jsonwebtoken')
const config = require('../../config/config')

let auth = (req, res, next) => {
  // Get company Id for continues proccess to create data.
  let token = req.headers['x-access-token'] || req.headers['authorization']
  if (!token) {
    return res.status(403).json({
      success: false,
      message: 'Not has token'
    })
  }

  // Remove Bearer from token
  token = token.slice(7, token.length)

  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        })
      } else {
        req.decoded = decoded
        next()
      }
    })
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    })
  }
}

module.exports = {
  auth: auth
}
