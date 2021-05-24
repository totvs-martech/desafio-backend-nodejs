var express = require('express');
var router = express.Router();

const productController = require('../controllers/product');

router.get('/api/products', productController.getAll);
router.get('/api/products/:id', productController.getById);
router.post('/api/products', productController.create);
router.put('/api/products/:id', productController.update);
router.delete('/api/products/:id', productController.destroy);

module.exports = router;
