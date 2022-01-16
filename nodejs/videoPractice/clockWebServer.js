const http = require("http")
const fs = require("fs")
const path = require("path")

const server = http.createServer()

server.on("request", function (req, res) {
    let fpath = ""
    if (req.url == "/") {
        fpath = path.join(__dirname, "./clock/index.html")
    } else {
        fpath = path.join(__dirname, "./clock", req.url)
    }
    fs.readFile(fpath, "utf8", (err, data) => {
        if (err) {
            res.end("<h1>该文件不存在</h1>")
            return
        }
        res.end(data);
    })
})
server.listen(8888, () => {
    console.log("Server start at http://localhost:8888")
})