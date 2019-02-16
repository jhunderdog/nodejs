const express= require('express');
const router= express.Router();

router.get( '/', (req,res,next)=>{
    res.status(200).json({
        message:"welcome to product!"
    });
});

router.post( '/', (req,res,next)=>{
    res.status(201).json({
        message:"handling post requests to /products"
    });
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