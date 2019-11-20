'use strict'

/**
 * The main router object
 */
const { Router } = require('express');
const { urlencoded, json } = require('body-parser');
const router = new Router({ mergeParams: true });
const Response = require('../infra/interceptor/response')
const Cart = require('../controller/cart')
router.use(urlencoded({ extended: true }));
router.use(json());

/**
 * GET {domain}/cart
 */
router.get('/', (req, res, next) => {
  const cart = new Cart()
  cart
    .getCart(req.headers['cookie'])
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
