const express= require('express');
const router= express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');


const storage = multer.diskStorage({
    destionation: function(req, file, cb) {
        cb(null, '/uploads');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);    
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

const Product = require('../models/product');
const ProductController = require('../controller/Products');

//데이터불러오기
router.get('/', checkAuth, ProductController.products_get_all);

router.get('/:productId', checkAuth, (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .select("name price _id")
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json({
                    product: doc,
                    request: {
                        type: "GET",
                        url:"http://localhost:3000/products/" + doc._id
                    }
                });
            } else {
                res.status(404).json({
                    message:"No valid entry found for the product"
                });
            }
        })
        .catch(err => {
            console.log(err)
            err.status(500).json({
                err:err
            });
        });
});

router.post('/', checkAuth, upload.single('productImage'), ProductController.products_create);

    // res.status(201).json({
    //     message:"handling post requests to /products",
    //     createdProduct: product
    // });

router.post('/:productId', checkAuth, (req,res,next)=>{
    res.status(201).json({
        message:"product was created"
    });
});

router.delete('/:productId', checkAuth, ProductController.products_delete);

router.patch('/:productId', checkAuth, (req, res, next)=> {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product.update({ _id:id}, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Product updated",
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/products/' + id
                }
            });
        })
        .catch(err => {
            console.log(err)
            err.status(500).json({
                err:err
            });
        });
});

module.exports= router;