const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "localhost",
    user: "test",
    password: "123456",
    database: "test2"
});
connection.connect();

connection.query("select 1 + 1 as sol", function (err, rets, fields) {
    console.log("The sol is " + rets[0].sol);
});
connection.end();