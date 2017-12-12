const express = require('express');
const app = express();
const appRouter = express.Router();
const db = require('../dal/db.js');
const cartMiddleware = require('../dal/cart.middlewares.js');
const handlers = require('../dal/handlers.js');

appRouter.put('/createOrder', db.createOrder, handlers.putAndPatchResponseMiddleware)

appRouter.put('/createCategory', db.createCategory, handlers.putAndPatchResponseMiddleware)

appRouter.put('/createProduct', db.createProduct, handlers.putAndPatchResponseMiddleware)

appRouter.patch('/editProduct', db.editProduct, handlers.putAndPatchResponseMiddleware)

appRouter.get('/getAllProducts', db.getAllProducts, handlers.getResponseMiddleware)

appRouter.get('/getProductByName/:pname', db.getProductByName, handlers.getResponseMiddleware)

appRouter.get('/getProductsByCategory/:cid', db.getProductsByCategory, handlers.getResponseMiddleware)

appRouter.get('/getAllCategories', db.getAllCategories, handlers.getResponseMiddleware)

appRouter.get('/getDeliveryDates', db.getDeliveryDates, handlers.getResponseMiddleware)

appRouter.get('/getOrdersByUser/:uid', db.getOrdersByUser, handlers.getResponseMiddleware)

appRouter.patch('/updateCart', cartMiddleware.updateCart, cartMiddleware.totalPrice, handlers.putAndPatchResponseMiddleware)

appRouter.delete('/deleteProduct/:pid', cartMiddleware.deleteProduct,cartMiddleware.totalPrice, handlers.putAndPatchResponseMiddleware)

appRouter.delete('/clearCart', cartMiddleware.clearCart, handlers.deleteResponseMiddleware)


module.exports = appRouter;