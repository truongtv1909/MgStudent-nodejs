const con = require('../models/db')

module.exports.getStudent = function(req,res){
    let page = parseInt(req.query.page) || 1;
    let perPage = 8;
    let curenPage = page;

    let start = (page -1)*perPage;
    let end = page * perPage;
    var sql = "select * from student";
    con.query(sql,function(err,data){
        if(err) throw err;
        let countPage = Math.ceil(data.length/perPage);
        res.render('student/index',{
            students:data.slice(start,end),
            countPages: countPage,
            curenPage: curenPage
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
    var sql = res.locals.studentHasValidate;
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
    var sql = res.locals.studentHasValidate;
    con.query(sql,function(err,data){
        if(err) throw err;
        res.redirect('/student');
    })
}

module.exports.getRemove = function(req,res){
    console.log(req.params);
    var sql = `DELETE FROM student WHERE id= ${req.params.id}`;
    con.query(sql,function(err, data){
        if(err) throw err;
        res.redirect('/student');
    })
}