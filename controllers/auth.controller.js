const con = require('../models/db');

module.exports.getLogin = function(req,res){
    res.render('auth/index');
}
module.exports.postLogin = function(req,res){
    let email = req.body.email;
    let password = req.body.password;
    let sql = `select * from user`;
    con.query(sql,function(err,data){
        if(err) throw err;
        let arr = data.find(function(dt){
            return dt.email === email;
        })
        if(!arr){
            res.render('auth/index',{
                err: 'User does not exist',
                value: email
            })
            return;
        }
        if(arr.password !== password){
            res.render('auth/index',{
                err: 'Wrong password',
                value: email
            })
            return;
        }else{
            res.cookie('uId',arr.id);
            res.redirect('/');
        }
    });
}