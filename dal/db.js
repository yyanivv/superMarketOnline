const mongoose = require('mongoose');
const memberModel = require('../model/member.model.js');
const Member = mongoose.model('Member', memberModel);
const taskModel = require('../model/task.model.js');
const Task = mongoose.model('Task', taskModel);

const errorHandler = (err, res, cb) => {
    if (err) {
        return res.json(err).status(400);
    }
    return cb();
}

const successHandler = (req, data, next) => {
    req.data = data;
    return next();
}

const queries = {
    
}