const mongoose = require('mongoose');
const userModel = require('../model/user.model.js');
const User = mongoose.model('User', userModel);
const handlers = require('./handlers.js');

const getLastCart = (req, res, next) => {
    if(req.session.cart){
      return next();
    }
    const _id = req.session.passport.user.user ? req.session.passport.user.user._id : req.session.passport.user._id;
    User.findOne({_id}).populate('orders').exec((err, data) => handlers.errorHandler(err, res, () => handlers.successHandler(req, data.orders[data.orders.length-1], next)));
}


const updateCart = (req, res, next) => {
    const product = req.body;
    if(!req.session.cart){
        return createCart(req, next);
    }
    const productsArray = req.session.cart.products;
    product.total = Number(product.quantity) * Number(product.products.price);
    for(let i=0; i<productsArray.length; i++){
        if(product.products._id === productsArray[i].products._id){
            if(productsArray[i].quantity === 1 &&  product.quantity === -1){
                productsArray.splice(i,1)
                return next();
            }
            productsArray[i].quantity += Number(product.quantity)
            productsArray[i].total += Number(product.total)
            return next();
        }   
    }
    productsArray.push(product);
    return next();
}

const createCart = (req, next) => {
    req.body.total = Number(req.body.quantity) * Number(req.body.products.price)
    req.session.cart = {
        products: [req.body],
        createdOn: new Date().toLocaleDateString()
    }
    return next();
}

const totalPrice = (req,res,next) =>{
    if(!req.session.cart){
        return next();
    }
    const products = req.session.cart.products;
    let price = 0;
    products.forEach(product => price += product.total)
    req.session.cart.price = price;
    req.data = req.session.cart;
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



















