const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const async = require('async');
const appRouters = require('./routes/router.js');
const authRouter = require('./routes/authRouter.js');
const conf = require('./configuration/dev-conf.js');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportConfig = require('./auth/passport-conf');
const db = require('./dal/db.js');
const ejs = require('ejs');
const engine  = require ('ejs-locals');
const flash = require('connect-flash');
const userSchema = require('./model/user.model.js');
const User = mongoose.model('User', userSchema);
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new GoogleStrategy({
      clientID: conf.googleClientID,
      clientSecret: conf.googleClientSecret,
      callbackURL: "/auth/google/callback"
    }, (accessToken, refreshToken, profile, done) => passportConfig.socialUserExist(accessToken, refreshToken, profile, done)));

passport.use(new FacebookStrategy({
    clientID: conf.facebookClientID,
    clientSecret: conf.facebookClientSecret,
    callbackURL: "http://localhost:3004/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos']
    }, (accessToken, refreshToken, profile, done) => passportConfig.socialUserExist(accessToken, refreshToken, profile, done)));

passport.use('local', new LocalStrategy(passportConfig.login));

passport.use('local-sign', new LocalStrategy({
  passReqToCallback: true
}, passportConfig.signup));

passport.serializeUser(passportConfig.serializeUser);

passport.deserializeUser(passportConfig.deserializeUser);

app.engine('ejs', engine);

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json());

app.use(cookieParser());
app.use(session({
  secret: conf.secretKey,
  resave: false,
  saveUninitialized: false,
  name: 'super_cook',
  cookie: {
    httpOnly: false,
    maxAge: 1000 * 60 * 60 * 24 
  },
  store: new MongoStore({
    url: conf.dataBase
  })
}));

app.use(flash());

app.use(passport.initialize());

app.use(passport.session());

app.use(express.static('public'));

app.get('/login', (req, res) => {
    res.render('login',{
        error: req.flash('error')
    })
});

app.get('/userExist/:username', db.userExist, (req, res)=> res.status(200).json({userExist: req.data}));

app.use('/super', passportConfig.validatedUser, appRouters);

app.use('/oauth', passportConfig.validatedUser, authRouter);

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/google',
    passport.authenticate('google', {scope: ['email','profile']}))

app.get('/auth/google/callback',
    passport.authenticate('google',{
        failureRedirect: '/login?login=false'
        }), (req, res) => res.redirect('/login?login=true'));

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: '/login?login=true',
      failureRedirect: '/login?login=false'
}));

app.post('/login',
    passport.authenticate('local', {
      successRedirect: '/login?login=true',
      failureRedirect: '/login?login=false',
      failureFlash : true
    })
);

app.post('/signup', 
    passport.authenticate('local-sign', {
      successRedirect: '/login?signup=true',
      failureRedirect: '/login?signup=false'
    })
);

app.get('/logout', (req, res) => {
  req.logout();
  res.render('login',{
        error: req.flash('error')
    })
});

async.waterfall([
    cb => mongoose.connect(conf.dataBase, err => cb(err)),
    cb => app.listen(conf.port, err => cb(err, 'server run on port: ' + conf.port))
    ],
    (err, result) => {
        if (!err) {
            return console.log(result);
        }
        return console.log(err);
    })
