const mongoose = require('mongoose');
const userModel = require('../model/user.model.js');
const User = mongoose.model('User', userModel);
const categoryModel = require('../model/category.model.js');
const Category = mongoose.model('Category', categoryModel);
const productModel = require('../model/product.model.js');
const Product = mongoose.model('Product', productModel);
const orderModel = require('../model/order.model.js');
const Order = mongoose.model('Order', orderModel);
const handlers = require('./handlers.js');

const queries = {
    
    createOrder: (req,res,next) => {
        const order = new Order(req.body);
        order.save((err, data)=> handlers.errorHandler(err, res, () => queries.appendOrderToUser(req,res,data,next)))
    },
    
    appendOrderToUser: (req,res, data, next) => {
        //const _id = req.session.passport.user._id
        User.update({_id:"5a25ae308528893da07c8b80"}, {$push: {"orders": data}}, {safe: true, upsert: true}, (err, data) => handlers.errorHandler(err, res, () => handlers.successHandler(req, data, next)));
    },

    createCategory: (req, res, next) => {
        const category = new Category(req.body);
        category.save((err, data)=> handlers.errorHandler(err, res, () => handlers.successHandler(req, data, next)));
    },
    
    createProduct: (req, res, next) => {
        const product = new Product(req.body);
        product.save((err, data)=> handlers.errorHandler(err, res, () => queries.appendProductToCategory(req,res,data,next)))
    },
    
    appendProductToCategory: (req,res, data, next) => {
        const cid = req.body.cid
        Category.update({_id:cid}, {$push: {"products": data}}, {safe: true, upsert: true}, (err, data) => handlers.errorHandler(err, res, () => handlers.successHandler(req, data, next)));
    },
    
    editProduct:  (req, res, next) => {
        const {_id,name,price,image} = req.body;
        Product.update({_id}, {name, price, image}, (err, data) => handlers.errorHandler(err, res, () => handlers.successHandler(req, data, next)));
    },
    
    getAllProducts: (req, res, next) => {
        Product.find({}).exec((err, data)=> handlers.errorHandler(err, res, () => handlers.successHandler(req, data, next)));
    },
    
    getProductByName: (req, res, next) => {
        const pname = req.params.pname;
        Product.find({name: {$regex: pname}}).exec((err, data)=> handlers.errorHandler(err, res, () => handlers.successHandler(req, data, next)));
    },
    
    getProductsByCategory: (req, res, next) => {
        const cid = req.params.cid;
        Category.find({_id: cid}).populate('products').exec((err, data)=> handlers.errorHandler(err, res, () => handlers.successHandler(req, data[0].products, next)));
    },
    
    getAllCategories: (req, res, next) => {
        Category.find({}).exec((err, data)=> handlers.errorHandler(err, res, () => handlers.successHandler(req, data, next)));
    },
    
    getDeliveryDates: (req, res, next) => {
      Order.aggregate({$group: {_id: '$shipping_date', count: {$sum: 1}}}).exec((err, data)=> handlers.errorHandler(err, res, () => handlers.successHandler(req, data, next)));
    },
    
    getOrdersByUser: (req, res, next) => {
        const uid = req.params.uid
        User.find({_id: uid}).populate('orders').exec((err, data)=> handlers.errorHandler(err, res, () => handlers.successHandler(req, data[0].orders, next)));
    },
    
    
    
    
}

module.exports = queries;


/*const queries = {
    createOrder: (req, res, next) => {
        const order = new Order(req.body);
        order.save((err, data)=> handlers.errorHandler(err, res, () =>{
            User.update({_id:'5a25ae308528893da07c8b80'}, {$push: {"orders": data}}, {safe: true, upsert: true}, (err, data) => handlers.errorHandler(err, res, () => handlers.successHandler(req, data, next)));
        }))
    }
    createOrder: (req,res,next) => {
        const order = new Order(req.body);
        order.save((err, data)=> errorHandler(err, res, () =>queries.addOrderToUser(req,res,data,next)))
    },
    
    appendOrderToUser: (req,res, data, next) => {
        const _id = req.session.passport.user._id
        User.update({_id}, {$push: {"orders": data}}, {safe: true, upsert: true}, (err, data) => errorHandler(err, res, () => successHandler(req, data, next)));
    }
    
}*/



