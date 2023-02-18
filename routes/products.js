const express = require('express');
const router = express.Router();
const productController = require('../controllers/products');

router.get('/products', productController.findAll);
router.get('/products/:id', productController.findById);
router.post('/products', productController.create);
router.put('/products/:id', productController.update);
router.delete('/products/:id', productController.delete);

module.exports = router;