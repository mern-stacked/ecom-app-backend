const express = require('express');
const productsController = require('../controllers/products');

const router = express.Router();

// Create a Product
router.post('/', productsController.createProducts);

// List all products
router.get('/list', productsController.listProducts);

// List a product by pid
router.get('/list/:pid', productsController.listProductById);

// Update a product by pid 
router.put('/update/:pid', productsController.updateProduct);

module.exports = router;