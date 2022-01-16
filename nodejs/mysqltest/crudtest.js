const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "localhost",
    user: "test",
    password: "123456",
    database: "test2",
    port: "3306"
});
connection.connect();

// 查
let sql = "select * from websites";
connection.query(sql, function (err, ret) {
    if (err) {
        console.error("SELECT ERR:" + err);
        return;
    }
    console.log("----------SELECT----------");
    console.log(ret[0].id);
    console.log("---------------------------\n\n");
});
// connection.end();

// 增
let addSql = "insert into websites(id,name,url,alexa,country) values(0,?,?,?,?)";
let addSqlParams = ['菜鸟工具', 'https://c.runoob.com', '23453', 'CN'];
connection.query(addSql, addSqlParams, function (err, ret) {
    if (err) {
        console.error("INSERT ERR:" + err);
        return;
    }
    console.log("----------INSERT----------");
    console.log(ret);
    console.log("--------------------------");
})
// connection.end()

// 改
var modSql = 'UPDATE websites SET name = ?,url = ? WHERE Id = ?';
var modSqlParams = ['菜鸟移动站', 'https://m.runoob.com', 6];
//改
connection.query(modSql, modSqlParams, function (err, result) {
    if (err) {
        console.log('[UPDATE ERROR] - ', err.message);
        return;
    }
    console.log('--------------------------UPDATE----------------------------');
    console.log('UPDATE affectedRows', result.affectedRows);
    console.log('-----------------------------------------------------------------\n\n');
});

// connection.end();

// 删
var delSql = 'DELETE FROM websites where id=6';
//删
connection.query(delSql, function (err, result) {
    if (err) {
        console.log('[DELETE ERROR] - ', err.message);
        return;
    }

    console.log('--------------------------DELETE----------------------------');
    console.log('DELETE affectedRows', result.affectedRows);
    console.log('-----------------------------------------------------------------\n\n');
});

connection.end();