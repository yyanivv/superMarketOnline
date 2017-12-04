const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const async = require('async');
const appRouters = require('./routes/router.js');
const middlewares = require('./dal/db.js');
const conf = require('./configuration/dev-conf.js');


app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.use(express.static('public'));

app.use('/', appRouters);

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
