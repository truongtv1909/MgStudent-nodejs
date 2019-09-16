const con = require('../models/db');

module.exports.validateCreateUser = function(req,res,next){
    let data = req.body;
    let logo;
    let err =[];
    if(req.file){
        logo = req.file.path.split('\\').slice(1).join('\\\\');
    }else{
        logo ="upload\\\\default.jpg";
    }
    if(!data.name){
        err.push('Empty user name');
    }
    if(!data.age){
        err.push('Empty user age');
    }
    if(!data.email){
        err.push('Empty user email');
    }
    if(!data.password){
        err.push('Empty user password');
    }
    if(err.length){
        res.render('user/create',{
            errData:err,
            data:data
        });
        return;
    }
    let slqEmail = `SELECT email FROM user where email = '${data.email}'`;
    console.log(slqEmail);
    con.query(slqEmail,function(errs,arreEmail){
        if(errs) throw errs;
        if(arreEmail.length){ 
            err.push('Email already exist! Please input other email...');
            res.render('user/create',{
                errData:err,
                data: data
            });
            return;
        }
        let sql = `INSERT INTO user(name, age, email, password, logo) 
        VALUES ('${data.name}','${data.age}','${data.email}','${data.password}','${logo}') `;
        res.locals.userHasValidate = sql;
        next();
    });
}

module.exports.validateUpdateUser = function(req,res,next){
    let value = req.body;
    let validateLogo;
    var err = [];
    let sql;
    if(!value.name){
        err.push('Empty user name')
    }
    if(!value.age){
        err.push('Empty user age');
    }
    if(!value.email){
        err.push('Empty user email');
    }
    if(!value.password){
        err.push('Empty user password');
    }
    if(err.length){
        let id = value.id;
        let sqls = `SELECT * FROM user WHERE id = ${id}`;
        con.query(sqls,function(errs,data){ 
            res.render('user/detail',{
                errData:err,
                user:data[0]
            });
        });
        return;
    }

    if(req.file){
        validateLogo = req.file.path.split('\\').slice(1).join('\\\\');
        sql = `UPDATE user SET name = '${value.name}',age = ${value.age},email = '${value.email}',
    password = '${value.password}',logo = '${validateLogo}'  WHERE id = ${value.id}`;
    }else{
        sql = `UPDATE user SET name = '${value.name}',age = ${value.age},email = '${value.email}',
    password = '${value.password}'  WHERE id = ${value.id}`;
    }
    res.locals.validateUpdate = sql;
    res.locals.value = value;
    next();
}