const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const async = require('async');
const appRouters = require('./routes/router.js');
const middlewares = require('./dal/db.js');
const port = process.argv[2];

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

app.use(express.static('public'));

app.use('/', appRouters);

async.waterfall([
    cb=>mongoose.connect('mongodb://yaniv:yaniv1@ds125365.mlab.com:25365/yaniv', err => cb(err)),
    cb=>app.listen(port, err => cb(err, 'server run on port: ' + port))
    ],
    (err, result)=>{
        if(!err){
            return console.log(result);
        }
        return console.log(err);
});

