'use strict'

/**
 * The main router object
 */
const { Router } = require('express');
const { urlencoded, json } = require('body-parser');
const router = new Router({ mergeParams: true });
const Response = require('../infra/interceptor/response')
const Cart = require('../controller/cart')
const oauth = require('../infra/middleware/auth')

router.use(urlencoded({ extended: true }));
router.use(json());

/**
 * GET {domain}/cart
 */
router.get('/', oauth.auth, (req, res, next) => {
  const cart = new Cart()
  cart
    .getCartByKey(req.headers['authorization'])
    .then((hashGenerated) => res.json(hashGenerated))
    .catch((err) => {
      next(Response.internalError(res, err.message))
    })
})

/**
 * POST {domain}/cart/checkout
 */
router.post('/checkout', oauth.auth, (req, res, next) => {
  const cart = new Cart()
  cart
    .checkout(req.headers['authorization'])
    .then((hashGenerated) => res.json(hashGenerated))
    .catch((err) => {
      next(Response.internalError(res, err.message))
    })
})

module.exports = (appObj) => {
  return {
    path: '/cart',
    api_version: 1,
    router
  }
}
