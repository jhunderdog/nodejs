const express= require('express');
const router= express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order');
const Product = require('../models/product');
const checkAuth = require('../middleware/check-auth');

const OrderController = require('../controller/Orders');

router.get('/', checkAuth, OrderController.orders_get_all);

router.post('/', checkAuth,OrderController.orders_create_order);

router.post('/:orderId', checkAuth, (req,res,next)=>{
    res.status(201).json({
        message:"order was created"
    });
});

router.delete('/:orderId', checkAuth, OrderController.orders_delete_order);


module.exports= router;