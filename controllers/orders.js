const { validationResult } =  require('express-validator');
const mongoose = require('mongoose');

// Import Custom Error model
const HttpError = require('../models/http-error'); 

// Import Models
const Order = require('../models/order');
const OrderItem = require('../models/order-item');

// Fetch Orders
const fetchOrder = async (req, res, next) => {

    try{
        const orderList = await Order.find();

        if(!orderList){
            const error = new HttpError('No orders found', 500, false);
            return next(error);
        }

        res.status(200).send(orderList);

    } catch(err) {
        const error = new HttpError('Something went wrong', 500, false);
        return next(error);
    }

}

// Create a Order
const createOrder = async (req, res, next) => {

    const { orderItems, shippingAddress1, shippingAddress2, city, zip, country, phone, status, totalPrice, user, dateOrdered } = req.body;

    const orderItemsIds = Promise.all(orderItems.map( async orderitem => {
       
        let newOrderItem = new OrderItem({
            quantity: orderitem.quantity,
            product: orderitem.product
        })

        newOrderItem = await newOrderItem.save();

        return newOrderItem._id;
    }))

    const orderItemsIdsResolved =  await orderItemsIds;

    let order; 
    try{
         order = new Order({
            orderItems: orderItemsIdsResolved,
            shippingAddress1,
            shippingAddress2,
            city,
            zip,
            country,
            phone,
            status,
            totalPrice,
            user,
            dateOrdered
        })

    order = await order.save();

    if(!order) {
        const error = new HttpError('Order cannot be created', 500, false);
        return next(error);
    }   

    res.status(200).send(order);

    } catch(err) {
        const error = new HttpError('Something went wrong!', 500, false);
        return next(error);
    }

}

exports.createOrder = createOrder;
exports.fetchOrder = fetchOrder;


