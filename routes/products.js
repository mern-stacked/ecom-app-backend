const express = require('express');
const productsController = require('../controllers/products');

const router = express.Router();

// Create a Product
router.post('/', productsController.createProducts);

// List all products
router.get('/list', productsController.listProducts);


module.exports = router;