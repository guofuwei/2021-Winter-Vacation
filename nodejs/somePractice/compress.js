let fs = require("fs");
let zlib = require("zlib");

fs.createReadStream("input.txt").pipe(zlib.createGzip()).pipe(fs.createWriteStream("input.txt.gz"));
console.log("程序执行完成");