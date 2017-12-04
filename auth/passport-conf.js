const mongoose = require('mongoose');
const userSchema = require('../model/user.model.js');
const User = mongoose.model('User', userSchema);
const crypto = require('crypto');

const passportHandlers = {
    userExist: (req, res, next) => {
        User.findOne({username: req.body.username}, (err, user) => {
          if (err) {
            console.log(err);
          }
          if (user) {
            console.log(user);
            return res.redirect('login?userExist')
          }
          return next();
        })
      },
    
    generateHash: (username, password) => crypto.createHmac('sha256', password).update(username).digest('hex'),
    
    signup: (req, username, password, done) => {
    const {firstName, lastName, city, address} = req.body;
    const hash = passportHandlers.generateHash(username, password);
    const user = new User({firstName, lastName, username, password: hash, city, address})
    user.save((err, user) => {
      if (err) {
        return done(err);
      }
      return done(null, user);
    })
    },
    login: (username, password, done) => {
        const hash = passportHandlers.generateHash(username, password);
        User.findOne({username}, (err, user) => {
          if (err) {
            return done(err);
          }
          if (!user) {
              console.log('1')
            return done(null, false, {message: 'User not found'});
          }
          if (user.password !== hash) {
            return done(null, false, {message: 'Incorrect password'});
          }
          return done(null, user);
        });
    },
    serializeUser: (user, done) => done(null, user),
    deserializeUser: (user, done) => done(null, user),
    validatedUser: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.sendStatus(401);
}
}

module.exports = passportHandlers;