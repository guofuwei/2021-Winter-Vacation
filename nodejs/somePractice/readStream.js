let fs = require("fs");
let data = "";
let readStream = fs.createReadStream("input.txt");

readStream.setEncoding("utf-8");

readStream.on("data", function (chunk) {
    data += chunk;
})

readStream.on("end", function () {
    console.log(data);
})
readStream.on("finish",function(){
    console.log("readStream has finished")
})
readStream.on("error", function (err) {
    console.log(err.stack);
})
console.log("程序执行完成");