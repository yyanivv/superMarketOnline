const express = require('express');
const app = express();
const authRouter = express.Router();

authRouter.get('/auth', (req,res) => {
    res.json({user: req.session.passport.user, cart: req.session.cart})
})

