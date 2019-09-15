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
        // console.log(data);
        let find = data.filter(function(item){
            return item.name.includes(key);
        })
        res.render('user/index',{
            users:find
        })
    })
}