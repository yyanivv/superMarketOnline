const mongoose = require('mongoose');
const userModel = require('../model/user.model.js');
const User = mongoose.model('User', userModel);
const categoryModel = require('../model/category.model.js');
const Category = mongoose.model('Category', categoryModel);
const productModel = require('../model/product.model.js');
const Product = mongoose.model('Product', productModel);
const orderModel = require('../model/order.model.js');
const Order = mongoose.model('Order', orderModel);

const errorHandler = (err, res, cb) => {
    if (err) {
        return res.json(err).status(400);
    }
    return cb();
}

const successHandler = (req, data, next) => {
    req.data = data;
    return next();
}

const queries = {
    
}