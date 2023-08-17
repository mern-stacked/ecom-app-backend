const express = require('express');

const { check } =  require('express-validator');

const router = express.Router();

const orderController = require('../controllers/orders');

// Fetch all the orders
router.get('/', orderController.fetchOrder);

// Create a Order
router.post('/',
 [
    check('shippingAddress1').not().isEmpty(),
    check('city').not().isEmpty(),
    check('zip').not().isEmpty(),
    check('country').not().isEmpty(),
    check('phone').not().isEmpty(),
    check('status').not().isEmpty(),
    check('totalPrice').not().isEmpty(),
    check('user').not().isEmpty(),
    check('dateOrdered').not().isEmpty(),
 ], 
orderController.createOrder);


module.exports = router;