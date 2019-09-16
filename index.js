const express           = require('express');
const cookiesParser     = require('cookie-parser');
const bodyParser        = require('body-parser');

const con               = require('./models/db');
const studentRounter    = require('./rountes/student.rounter');
const userRounter       = require('./rountes/user.rounter');
const authRounter       = require('./rountes/auth.rounter');
const authLogin         = require('./middleware/auth.login');




const app = express();
const port = 3000;

app.set('view engine','pug');
app.set('views','./views');

app.use(cookiesParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/student',authLogin.requireAuth,studentRounter);
app.use('/user',authLogin.requireAuth,userRounter);
app.use('/auth',authRounter);

app.get('/',function(req, res){
    let id =  req.cookies.uId
    let sql = `SELECT * FROM user WHERE id = '${id}'`
    con.query(sql,function(err,datas){
        if(err) throw err;
        res.render('index',{
            userData:datas[0]
        });
    });
});

app.use(express.static('public'));
app.listen(port,function(){
    console.log('Serve is running on port: ',port);
})
