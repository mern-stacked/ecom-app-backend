const express = require('express');

const { check } =  require('express-validator');

const productsController = require('../controllers/products');
// const requireAuth = require('../middlewares/requireAuth');
const uploadOptions = require('../middlewares/fileUpload');
const router = express.Router();

// Create a Product
router.post('/',
            uploadOptions.single('image'),
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
router.put('/update/:pid', productsController.updateProduct);

// Delete a product by pid 
router.delete('/delete/:pid', productsController.deleteProduct);

// Product Count
router.get('/count', productsController.productCount);

// Featured Products
router.get('/featured/:count', productsController.featuredProducts);

module.exports = router;