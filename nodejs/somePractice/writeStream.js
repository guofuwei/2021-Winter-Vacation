let fs = require("fs");
let data = "菜鸟教程 runoob.com";

let writeStream = fs.createWriteStream("output.txt");

writeStream.write(data, "utf-8");
writeStream.end();

writeStream.on("finish", function () {
    console.log("写入完成");
})
writeStream.on("error", function (err) {
    console.log(err.stack);
})

console.log("程序执行完成");