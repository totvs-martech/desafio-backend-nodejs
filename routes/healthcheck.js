
const { Router } = require('express');
const { urlencoded, json } = require('body-parser');
const router = new Router({ mergeParams: true });

router.use(urlencoded({ extended: true }));
router.use(json());

/**
 * POST {domain}/
 */
router.get('/', (req, res, next) => {
  res.json('All is ok');
});

module.exports = () => {
  return {
    path: '/healthcheck',
    api_version: 1,
    router
  };
};