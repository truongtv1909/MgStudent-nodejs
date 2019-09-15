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
    let data = req.body;
    let logo;
    if(req.file){
        logo = req.file.path.split('\\').slice(1).join('\\\\');
    }
    let sql = `INSERT INTO user(name, age, email, password, logo) 
    VALUES ('${data.name}','${data.age}','${data.email}','${data.password}','${logo}') `;
    con.query(sql,function(err,datas){
        if(err) throw err;
        res.redirect('/user');
    })
}

module.exports.postUpdateUser = function(req, res){
    let value = req.body;
    let validateLogo;
    let sql;
    if(req.file){
        validateLogo = req.file.path.split('\\').slice(1).join('\\\\');
        sql = `UPDATE user SET name = '${value.name}',age = ${value.age},email = '${value.email}',
    password = '${value.password}',logo = '${validateLogo}'  WHERE id = ${value.id}`;
    }else{
        // validateLogo = value.logo.split('\\').join('\\\\');
        sql = `UPDATE user SET name = '${value.name}',age = ${value.age},email = '${value.email}',
    password = '${value.password}'  WHERE id = ${value.id}`;
    }
    con.query(sql,function(err,data){
        if(err) throw err;
        res.redirect('/user');
    });
}