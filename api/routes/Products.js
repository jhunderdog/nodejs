const express= require('express');
const router= express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product');

router.get( '/', (req,res,next)=>{
    res.status(200).json({
        message:"welcome to product!"
    });
});

router.post( '/', (req,res,next)=> {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    product
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message:"Created product successfully",
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            });
        });

    // res.status(201).json({
    //     message:"handling post requests to /products",
    //     createdProduct: product
    // });
});

router.post( '/:productId', (req,res,next)=>{
    res.status(201).json({
        message:"product was created"
    });
});

router.delete( '/:productId', (req,res,next)=>{
    res.status(200).json({
        message:"deleted the product"
    });
});

module.exports= router;