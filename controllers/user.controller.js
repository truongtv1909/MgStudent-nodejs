const con = require('../models/db');

module.exports.getIndex = function(req,res){
    let sql = "select * from user";
    con.query(sql,function(err,data){
        if(err) throw err;
        res.render('user/index',{
            users:data
        });
    });   
};

module.exports.getSearch = function(req,res){
    let key = req.query.q;
    let sql = "select * from user";
    con.query(sql,function(err,data){
        if(err) throw err;
        let find = data.filter(function(item){
            return item.name.toLowerCase().includes(key.toLowerCase())
                || item.email.toLowerCase().includes(key.toLowerCase());
        })
        res.render('user/index',{
            users:find
        });
    });
}

module.exports.getDetail = function(req,res){
    let id = req.params.userId;
    let sql = `select * from user where id = ${id}`;
    con.query(sql,function(err,data){
        if(err) throw err;
        res.render('user/detail',{
            user:data[0]
        });
    });
}

module.exports.getRemove = function(req,res){
    let id = req.params.userId;
    let sql = `DELETE FROM user WHERE id = ${id}`;
    con.query(sql,function(err,data){
        if(err) throw err;
        res.redirect('/user');
    });
}

module.exports.getCreate = function(req,res){
    res.render('user/create');
}

module.exports.postCreateUser = function(req,res){
    let sql = res.locals.userHasValidate;
    con.query(sql,function(err,datas){
        if(err) throw err;
        res.redirect('/user');
    })
}

module.exports.postUpdateUser = function(req, res){
    let sql = res.locals.validateUpdate;
    let dataUpdate = res.locals.value;
    let err = [];
    con.query(sql,function(errUpdate,data){
        if(errUpdate){
            err.push('Email already exist! Please input orther email...');
            let id = dataUpdate.id;
            let errEmail = `SELECT * FROM user WHERE id = ${id}`;
            con.query(errEmail,function(emErr,emData){
                res.render('user/detail',{
                    errData:err,
                    user:emData[0]
                })
            })
            return;
        }
        res.redirect('/user');
    });
}