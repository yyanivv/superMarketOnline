const mongoose = require('mongoose');
const userSchema = require('../model/user.model.js');
const User = mongoose.model('User', userSchema);
const crypto = require('crypto');


const passportHandlers = {
 
    socialUserExist: (accessToken, refreshToken, profile, done) => {
        User.findOne({"profile.id": profile.id}, (err, user) => {
            if (err) {
                return done(false, err)
            }
            if (user) {
                user.profile = profile
                return done(false, user)
            }
            passportHandlers.saveSocialUser(accessToken, refreshToken, profile, done);
        })
    },
    
    saveSocialUser: (accessToken, refreshToken, profile, done) => {
        const user = new User({accessToken, refreshToken, profile});
        user.save(err => done(false, {profile}))
    },
 
    generateHash: (username, password) => crypto.createHmac('sha256', password).update(username).digest('hex'),
    
    signup: (req, username, password, done) => {
        username = username.toLowerCase();
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
        username = username.toLowerCase();
        const hash = passportHandlers.generateHash(username, password);
        User.findOne({username}, (err, user) => {
          if (err) {
            return done(err);
          }
          if (!user) {
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
