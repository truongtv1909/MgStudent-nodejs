const con = require('../models/db');

module.exports.getStudent = function(req,res){

    var sql = "select * from student";
    con.query(sql,function(err,data){
        if(err) throw err;
        res.render('student/index',{
            students:data
        });
    });
}

module.exports.getSearch = function(req,res){
    var name = req.query.q;
    var sql = "select * from student";
    con.query(sql,function(err,data){
        let findStudent = data.filter(function(item){
            let newarr = item.fristname.toLowerCase().includes(name.toLowerCase()) 
            || item.lastname.toLowerCase().includes(name.toLowerCase())
            || item.phone.includes(name);
            return newarr;
        });
        res.render('student/index',{
            students:findStudent
        });

    });
}

module.exports.getCreateStudent = function(req,res){
    res.render('student/createStudent');
}

module.exports.postCreateStudent = function(req,res){
    let str = ` '${req.body.fristname}','${req.body.lastname}','${req.body.phone}',
    '${req.body.address}','${req.body.email}','${req.body.description}'`;
    var sql = 'INSERT INTO student(fristname, lastname, phone, address, email, description) VALUES ('+str+')'
    con.query(sql,function(err,data){
        if(err) throw err;
        res.redirect('/student'); 
    })

}
module.exports.getDetail = function(req,res){
    let id = req.params.id;
    var sql = `SELECT * FROM student WHERE id= ${id}`;
    con.query(sql,function(err,data){
        if(err) throw err;
        let student = data[0];
        res.render('student/detail',{
            students:student
        })
    })
}

module.exports.postUpdate = function(req,res){
    var sql = `UPDATE student SET fristname= '${req.body.fristname}',lastname= '${req.body.lastname}',
    phone= '${req.body.phone}',address= '${req.body.address}',email= '${req.body.email}',
    description= '${req.body.description}' WHERE id = ${req.body.id} `;
    con.query(sql,function(err,data){
        if(err) throw err;
        res.redirect('/student');
    })
}

module.exports.getRemove = function(req,res){
    var sql = `DELETE FROM student WHERE id= ${req.params.id}`;
    con.query(sql,function(err, data){
        if(err) throw err;
        res.redirect('/student');
    })
}