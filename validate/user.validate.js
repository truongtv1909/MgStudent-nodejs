const con = require('../models/db');

module.exports.validateCreateUser = function(req,res,next){
    let data = req.body;
    let logo;
    let err =[];
    if(req.file){
        logo = req.file.path.split('\\').slice(1).join('\\\\');
        console.log(logo);
    }else{
        logo ='upload\\a96d915b29b46fc4e4db1e80ccf0d477';
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
    let sql = `INSERT INTO user(name, age, email, password, logo) 
    VALUES ('${data.name}','${data.age}','${data.email}','${data.password}','${logo}') `;
    res.locals.userHasValidate = sql;
    next();
}