var mysql = require('mysql');


let con = mysql.createConnection({
    host: "localhost",
    database: "world",
    user: "root",
    password: "password",
    port: '3306'
});

module.exports = con