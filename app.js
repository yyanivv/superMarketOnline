const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const async = require('async');
const appRouters = require('./routes/router.js');
const authRouter = require('./routes/authRouter.js');
const middlewares = require('./dal/db.js');
const conf = require('./configuration/dev-conf.js');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportConfig = require('./auth/passport-conf');
const ejs = require('ejs');
const flash = require('connect-flash');

app.set('view engine', 'ejs');

passport.use('local', new LocalStrategy(passportConfig.login));
passport.use('local-sign', new LocalStrategy({
  passReqToCallback: true
}, passportConfig.signup));
passport.serializeUser(passportConfig.serializeUser);
passport.deserializeUser(passportConfig.deserializeUser);

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

//app.use(express.static('public'));
app.get('/login', (req, res) => {
    res.render('login.ejs',{
            error: req.flash('error')
    })
});

//app.use('/super', passportConfig.validatedUser, appRouters);
//app.use('/auth', passportConfig.validatedUser, authRouter);

app.post('/login',
    passport.authenticate('local', {
      successRedirect: '/login?success=true',
      failureRedirect: '/login?success=false',
      failureFlash : true
    })
);

app.post('/signup', passportConfig.userExist, 
    passport.authenticate('local-sign', {
      successRedirect: '/login?success=true',
      failureRedirect: '/login?success=false'
    })
);

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login.html');
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
