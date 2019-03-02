const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');
const User = require('../models/user.js');

exports.user_signup = (req, res, next) => {

    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Mail exists"
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });
                        user
                            .save()
                            .then(result => {
                                console.log(result);
                                res.status(200).json({
                                    message: "User created",
                                    createdUser: {
                                        email: result.email,
                                        password: result.password
                                    }
                                });
                            })
                            .catch(err => {
                                console.log(err)
                                res.status(500).json({
                                    err: err
                                })
                            });
                    }
                })
            }
        })
};


exports.user_login = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) { // 존재하지 않는 회원이라면
                return res.status(401).json({
                    message: "Auth failed"
                });
            } else {
                // 입력값, DB에 저장된 값, 일치하면 result를 반환 / 다르면 err 반환
                bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                    if (err) {
                        return res.status(401).json({
                            message: "Auth failed"
                        });
                    }

                    if (result) {
                        const token = jwt.sign({
                            email: user[0].email, // user의 email
                            userId: user[0]._id // DB에 있는 id값
                        },
                            "secret", { expiresIn: "1h" } // 토큰 유효 시간은 1시간
                        );
                        return res.status(200).json({
                            message: "Auth successful",
                            token: token
                        });
                    }
                    res.status(401).json({
                        message: "Auth failed"
                    });
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                err: err
            });
        });

};