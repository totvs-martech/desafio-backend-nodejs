'use strict'

/**
 * The main router object
 */
const { Router } = require('express');
const { urlencoded, json } = require('body-parser');
const router = new Router({ mergeParams: true });
const Response = require('../infra/interceptor/response')
const User = require('../controller/user')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

router.use(urlencoded({ extended: true }));
router.use(json());


/**
 * POST {domain}/user
 */
router.post('/', (req, res, next) => {
  const user = new User()
  user
    .create(req.body)
    .then(userCreated => res.json(userCreated))
    .catch((err) => {
      next(Response.internalError(res, err.message))
    })
})

/**
 * POST {domain}/user/login
 */
router.post('/login', (req, res, next) => {
  const { email, password } = req.body
  const user = new User()

  user
    .getByParams({ email, password })
    .then(getUser => {
      const token = jwt.sign(
        { email, user: getUser },
        config.secret,
        { expiresIn: '24h' }
      )
      res.json({
        success: true,
        user: getUser,
        message: 'Authentication successful!',
        token: token
      })
    })
    .catch(err => {
      const message = {
        success: false,
        message: 'Incorrect email or password',
        err
      }
      res.status(403).json(message)
    })
})

module.exports = (appObj) => {
  return {
    path: '/user',
    api_version: 1,
    router
  }
}
