const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

const db = require('./config/key').mongoURI;

mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('mongoDB Connect'))
    .catch(err => console.log(err));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// app.use((req,res,next) => {
//     res.status(200).json({
//         message: 'It works!'
//     });
// });

app.use((req,res,next) => {
    const error = new Error("Not found!");
    error.status = 404;
    next(error);
});

app.use((error,req,res,next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
