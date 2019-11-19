'use strict'

/**
 * The main router object
 */
const { Router } = require('express');
const { urlencoded, json } = require('body-parser');
const router = new Router({ mergeParams: true });
const Response = require('../infra/interceptor/response')
const Hash = require('../controller/hash')
router.use(urlencoded({ extended: true }));
router.use(json());

/**
 * POST {domain}/hash
 */
router.post('/', (req, res, next) => {
  const hash = new Hash()
  hash
    .generate()
    .then((hashGenerated) => res.json(hashGenerated))
    .catch((err) => {
      next(Response.internalError(res, err.message))
    })
})

module.exports = (appObj) => {
  return {
    path: '/hash',
    api_version: 1,
    router
  }
}
