var mysql = require('mysql');

var dbconnect = mysql.createPool({
    // connectionLimit : 100,
    host: "localhost",
    user: "root",
    password: "1234",
    database: "dbfurniture"
});
module.exports = dbconnect