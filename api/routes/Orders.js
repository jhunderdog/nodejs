const express= require('express');
const router= express.Router();

router.get( '/', (req,res,next)=>{
    res.status(200).json({
        message:"welcome to orders!"
    });
});

router.post( '/', (req,res,next)=>{
    res.status(201).json({
        message:"handling post requests to /orders"
    });
});

router.post( '/:orderId', (req,res,next)=>{
    res.status(201).json({
        message:"order was created"
    });
});

router.delete( '/:orderId', (req,res,next)=>{
    res.status(200).json({
        message:"deleted the order"
    });
});


module.exports= router;