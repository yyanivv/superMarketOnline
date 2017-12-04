const express = require('express');
const app = express();
const appRouter = express.Router();
const db = require('../dal/db.js');


/*----------------------------------------------------------------
----------------------->  OLD ROUTERS  <--------------------------
appRouter.get('/getMembers', db.getMembers, (req,res)=> {
    res.json({success:true, data: req.data});
})

appRouter.put('/newTask', db.newTask, (req,res)=> {
    res.sendStatus(204);
})

appRouter.get('/getTasks', db.getTasks, (req,res)=> {
    res.json({success:true, data: req.data});
})
appRouter.delete('/deleteTask/:id', db.deleteTask, (req,res)=> {
    res.sendStatus(204);
})

----------------------------------------------------------------*/

module.exports = appRouter;