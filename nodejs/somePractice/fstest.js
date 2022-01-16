const fs = require("fs");

fs.readFile("input.txt", function (err, data) {
    if (err) {
        return console.error(err);
    }
    console.log("异步读取:" + data.toString());
});

let data = fs.readFileSync("input.txt");
console.log("同步读取:" + data.toString());

console.log("程序执行完成");

fs.stat("./input.txt", function (err, stats) {
    console.log(stats.isFile());
})
// 写入文件
fs.writeFile("output.txt", "我是写入的数据", function (err) {
    if (err) {
        console.log("文件写入失败");
    }
});
// 读取文件
fs.readFile("input.txt", function (err, data) {
    if (err) {
        console.error(err);
    }
    console.log(data.toString());
});

// 打开并读取文件
fs.open("input.txt", "r+", function (err, fd) {
    if (err) {
        return console.error(err);
    }
    let buf = Buffer.alloc(1024);
    fs.read(fd, buf, 0, buf.length, 0, function (err, bytes) {
        if (err) {
            console.log(err);
        }
        console.log(bytes + "  字节被读取");

        // 仅输出读取的字节
        if (bytes > 0) {
            console.log(buf.slice(0, bytes).toString());
        }
    });
})

// // 删除文件
// fs.unlink("output.txt", function (err) {
//     if (err) {
//         return console.error(err);
//     }
//     console.log("文件删除成功");
// });

// 创建目录
// fs.mkdir("./test", function (err) {
//     if (err) {
//         throw err;
//     }
//     console.log("创建test目录成功");
// });

// 删除目录
// fs.rmdir("./test", (err) => {
//     if (err) {
//         throw err;
//     }
//     console.log("删除test目录成功");
// });

// 读取目录 
fs.readdir("./hello", function (err, files) {
    if (err) {
        throw err;
    }
    files.forEach(function (file) {
        console.log(file);
    })
})