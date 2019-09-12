const con = require('../models/db');

module.exports.getStudent = function(req,res){

    var sql = "select * from student";
    con.query(sql,function(err,result){
        if(err) throw err;
        res.render('student/index',{
            students:result
        });
    });
}

