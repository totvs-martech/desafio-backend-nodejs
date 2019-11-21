'use strict'

/**
 * The main router object
 */
const { Router } = require('express');
const { urlencoded, json } = require('body-parser');
const router = new Router({ mergeParams: true });
const Response = require('../infra/interceptor/response')
const Product = require('../controller/product')
const oauth = require('../infra/middleware/auth')

router.use(urlencoded({ extended: true }));
router.use(json());

/**
 * POST {domain}/product
 */
router.post('/', oauth.auth, async (req, res, next) => {
  if (req.files) {
    await req.files.image.mv('./uploads/' + req.files.image.name)
    req.body.image = req.files.image.name
  }
  const product = new Product()
  product
    .create(req.body)
    .then((productCreated) => res.json(productCreated))
    .catch((err) => {
      next(Response.internalError(res, err.message))
    })
})

/**
 * GETALL {domain}/product
 */
router.get('/', oauth.auth, (req, res, next) => {
  const product = new Product()
  product
    .listAll(req.query)
    .then((productById) => res.json(productById))
    .catch((err) => {
      next(Response.internalError(res, err.message))
    })
})

/**
 * GET {domain}/product/:id
 */
router.get('/:id', oauth.auth, (req, res, next) => {
  const product = new Product()
  product
    .getById(req.params.id)
    .then((productById) => res.json(productById))
    .catch((err) => {
      next(Response.internalError(res, err.message))
    })
})

/**
 * PUT {domain}/product/:id
 */
router.put('/:id', oauth.auth, (req, res, next) => {
  const product = new Product()
  product
    .update(req.params.id, req.body)
    .then((productById) => res.json(productById))
    .catch((err) => {
      next(Response.internalError(res, err.message))
    })
})

/**
 * DEL {domain}/product/:id
 */
router.delete('/:id', oauth.auth, (req, res, next) => {
  const product = new Product()
  product
    .delete(req.params.id)
    .then((productById) => res.json(productById))
    .catch((err) => {
      next(Response.internalError(res, err.message))
    })
})

/**
 * POST {domain}/product/:id/add-cart
 */
router.post('/:id/add-cart', oauth.auth, (req, res, next) => {
  const product = new Product()
  product
    .addProductCart(req.params.id, req.headers.cookie)
    .then((cart) => res.json(cart))
    .catch((err) => {
      next(Response.internalError(res, err.message))
    })
})

/**
 * POST {domain}/product/:id/add-cart
 */
router.post('/:id/remove-cart', oauth.auth, (req, res, next) => {
  const product = new Product()
  product
    .removeProductCart(req.params.id, req.headers.cookie)
    .then((cart) => res.json(cart))
    .catch((err) => {
      next(Response.internalError(res, err.message))
    })
})


module.exports = (appObj) => {
  return {
    path: '/product',
    api_version: 1,
    router
  }
}
