const express= require('express');
const router= express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product');

//데이터불러오기
router.get('/', (req,res,next)=>{
    
    Product.find()
        .select("name price _id")
        .exec()
        .then(docs => {
            const response = {
                count : docs.length,
                products: docs.map(doc=> {
                    return {
                        name: doc.name,
                        price: doc.price,
                        _id:doc._id,
                        request: {
                            type:"GET",
                            url: "http://localhost:3000/products/" + doc._id
                        }
                    };
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                err:err
            });
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
                createdProduct: {
                    name: result.name,
                    price: result.price,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: "http://localhost:3000/products/" + result._id
                    }
                }
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

    const id = req.params.productId;
    Product.remove({ _id:id })
        .exec()
        .then(result => {
            res.status(200).json({
                message:"Product deleted",
                request: {
                    type: 'GET',
                    url:'http://localhost:3000/products',
                    body: { name: 'String', price: 'Number'}
                }
            });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                err:err
            });
        });
});

module.exports= router;