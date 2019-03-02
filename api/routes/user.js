const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const UserController = require('../controller/user');

router.post('/signup', UserController.user_signup);

router.post("/login", UserController.user_login);


module.exports = router;