var express = require('express');
var router = express.Router();

const cartController = require('../controllers/cart');

router.get('/api/cart/:key', cartController.getContent);
router.post('/api/cart/:key', cartController.save);
router.post('/api/payment/:key', cartController.payment);

module.exports = router;