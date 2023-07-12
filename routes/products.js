const express = require('express');
const { check } =  require('express-validator');

const productsController = require('../controllers/products');
const requireAuth = require('../middlewares/requireAuth');
const router = express.Router();

// Create a Product
router.post('/', requireAuth,
            [
                check('name')
                .not()
                .isEmpty(),
                check('description')
                .not()
                .isEmpty(),
                check('countInStock')
                .not()
                .isEmpty()
            ],
            productsController.createProducts);

// List all products
router.get('/list', productsController.listProducts);

// List a product by pid
router.get('/list/:pid', productsController.listProductById);

// Update a product by pid 
router.put('/update/:pid', requireAuth, productsController.updateProduct);

// Delete a product by pid 
router.delete('/delete/:pid', requireAuth, productsController.deleteProduct);

// Product Count
router.get('/count', requireAuth, productsController.productCount);

// Featured Products
router.get('/featured/:count', requireAuth, productsController.featuredProducts);

module.exports = router;