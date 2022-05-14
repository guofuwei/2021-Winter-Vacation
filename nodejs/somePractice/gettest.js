const http = require("http");
const url = require("url");
const util = require("util");

http.createServer(function (req, res) {
    console.log(req.url);
    res.writeHead(200, {
        "Content-Type": "text.plain"
    });
    // res.write("Hello node.js");
    param = url.parse(req.url, true).query;
    res.write("url:" + param.url);
    res.end(util.inspect(url.parse(req.url, true)));
}).listen(8888);