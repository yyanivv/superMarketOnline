const express = require('express');
const app = express();
const authRouter = express.Router();
const db = require('../dal/db.js');
const cartMiddleware = require('../dal/cart.middlewares.js');

authRouter.get('/fetchUser', cartMiddleware.getLastCart, (req,res) => {
    res.status(200);
    res.json({user: req.session.passport.user, openCart: req.session.cart, lastOrder: req.data})
})

//authRouter.get('/userExist/:username', db.userExist, (req, res) => res.status(200).json({userExist: req.data})


module.exports = authRouter;