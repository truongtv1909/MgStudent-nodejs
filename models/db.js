
const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"dbstd"
});
con.connect(function(err){
if(err){
    throw err;
}
else{
    console.log("conect success.");
}
})


module.exports = con;