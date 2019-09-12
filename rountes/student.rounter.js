const express = require('express');
const rounter = express.Router();
const con = require('../models/db');




rounter.get('/', function(req,res){

    var sql = "select * from student";
    con.query(sql,function(err,result){
        if(err) throw err;
        res.render('student/index',{
            students:result
        });
    });
});

module.exports = rounter;