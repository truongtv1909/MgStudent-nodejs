const con = require('../models/db');

module.exports.validateCreatStudent = function(req,res,next){
    let err =[];
    var phoneno = /^\d{10}$/;
    var phone = (req.body.phone);
    if(!req.body.fristname){
        err.push('Empty frist name');
    }
    if(!req.body.lastname){
        err.push('Empty last name');
    }
    if(!req.body.phone){
        err.push('Empty phone');
    }
    if(!req.body.address){
        err.push('Empty address');
    }
    if(!req.body.email){
        err.push('Empty email');
    }
    if(!req.body.description){
        err.push('Empty description');
    }
    if(!phone.match(phoneno)){
    err.push('Phone is not Invalid')
    }
    if(err.length){
        res.render('student/createStudent',{
            errData: err,
            data: req.body
        })
        return;
    }

    let str = ` '${req.body.fristname}','${req.body.lastname}','${req.body.phone}',
    '${req.body.address}','${req.body.email}','${req.body.description}'`;
    var sql = 'INSERT INTO student(fristname, lastname, phone, address, email, description) VALUES ('+str+')';
    res.locals.studentHasValidate = sql;
    next();
}

module.exports.validateUpdateStudent = function(req,res,next){
    let err =[];
    var phoneno = /^\d{10}$/;
    var phone = (req.body.phone);
    if(!req.body.fristname){
        err.push('Empty frist name');
    }
    if(!req.body.lastname){
        err.push('Empty last name');
    }
    if(!req.body.phone){
        err.push('Empty phone');
    }
    if(!req.body.address){
        err.push('Empty address');
    }
    if(!req.body.email){
        err.push('Empty email');
    }
    if(!req.body.description){
        err.push('Empty description');
    }
    if(!phone.match(phoneno)){
    err.push('Phone is not Invalid')
    }
    if(err.length){
        ///
        let id = req.body.id;
        var sql = `SELECT * FROM student WHERE id= ${id}`;
        con.query(sql,function(errs,data){
            if(errs) throw errs;
            let student = data[0];
            res.render('student/detail',{
                students:student,
                errData: err
            })
        })


        // res.render('student/detail',{
        //     errData: err,
        //     data: req.body
        // })
        return;
    }

    var sql = `UPDATE student SET fristname= '${req.body.fristname}',lastname= '${req.body.lastname}',
    phone= '${req.body.phone}',address= '${req.body.address}',email= '${req.body.email}',
    description= '${req.body.description}' WHERE id = ${req.body.id} `;
    res.locals.studentHasValidate = sql;
    next();
}