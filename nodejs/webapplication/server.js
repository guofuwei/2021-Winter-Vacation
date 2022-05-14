const http = require("http");
const fs = require("fs");
const url = require("url")

http.createServer(function (request, response) {
    let pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " have received!");
    // 读取文件返回请求
    fs.readFile(pathname.substring(1), function (err, data) {
        if (err) {
            console.error(err);
            response.writeHead(404, {
                "Content-Type": "text/plain"
            });
        } else {
            response.write(data.toString());
        }
        response.end();
    });
}).listen(8888);

console.log("Server start at 127.0.0.1:8888");