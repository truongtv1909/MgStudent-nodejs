const express = require('express');
const studentRounter = require('./rountes/student.rounter');
const bodyParser = require('body-parser');



const app = express();
const port = 3000;

app.set('view engine','pug');
app.set('views','./views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/student',studentRounter);

app.get('/',function(req, res){
    res.render('index',{
        student:'hoang'
    });
});
app.use(express.static('public'));
app.listen(port,function(){
    console.log('Serve is running on port: ',port);
})
