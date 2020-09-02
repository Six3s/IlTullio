const mysql = require('mysql');

module.exports = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '0000',
    database : 'statistiche'
});