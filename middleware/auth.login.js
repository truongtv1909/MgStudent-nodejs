const con = require('../models/db');
module.exports.requireAuth = function(req, res, next){
    let ui = req.cookies.uId;
    if(!ui){
        res.redirect('/auth');
        return;
    }
    let sql = `select * from user where id = '${ui}' `;
    con.query(sql,function(err,data){
        if(err) throw err;
        if(!data){
            res.redirect('/auth');
            return;
        }
        next();   
    });
}