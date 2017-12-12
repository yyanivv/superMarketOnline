const mongoose = require('mongoose');
const orderModel = require('../model/order.model.js');
const Order = mongoose.model('Order', orderModel);
const handlers = require('./handlers.js');

const getLastCart = (req, res, next) => {
    if(req.session.cart){
        return next();
    }
    const orders = req.session.passport.user.orders;
    if(orders) {
        const lastOrderId = orders[orders.length-1];
        Order.findOne({_id: lastOrderId}).exec((err, data) => handlers.errorHandler(err, res, () => handlers.successHandler(req, data, next)));
    }
    return next()
}

const updateCart = (req, res, next) => {
    const product = req.body;
    if(!req.session.cart){
        return createCart(req, next);
    }
    const productsAraay = req.session.cart.products;
    req.body.total = req.body.quantity * req.body.products.price;
    for(let i=0; i<productsAraay.length; i++){
        if(product.products._id === productsAraay[i].products._id){
            productsAraay[i].quantity += product.quantity
            productsAraay[i].total += product.total
            return next();
        }   
    }
    productsAraay.push(product);
    return next();
}

const createCart = (req, next) => {
        req.body.total = req.body.quantity * req.body.products.price
        req.session.cart = {
            products: [req.body],
            createdOn: new Date()
        }
        return next();
}

const totalPrice = (req,res,next) =>{
    const products = req.session.cart.products;
    let price = 0;
    products.forEach(product => price += product.total)
    req.data = req.session.cart;
    req.data.price = price;
    return next();
}

const deleteProduct = (req, res, next) => {
    const products = req.session.cart.products;
    products.forEach((product,i)=>{
      if(product.products._id === req.params.pid){
        products.splice(i,1);
        if(products.length === 0){
            delete req.session.cart;
            return next();
        }
        req.data = req.session.cart;
        return next();
      }
    })
}

const clearCart = (req, res, next) => {
    delete req.session.cart;
    return next();
}

module.exports = {getLastCart,updateCart,totalPrice,deleteProduct,clearCart};



















