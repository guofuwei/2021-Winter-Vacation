const express = require("express");
const app = express();

app.use("/public", express.static("public"))

app.get("/", function (req, res) {
    // console.log("主页get请求");
    // res.send("Hello GET");
    res.sendFile(__dirname + "/" + "index.html");
});

app.get("/index", function (req, res) {
    res.sendFile(__dirname + "/" + "index.html");
});

app.post("/process", function (req, res) {
    console.log(req.query);
    console.log(req.body);
    res.send("OK");
});

// app.post("/", function (req, res) {
//     console.log("主页post请求");
//     res.send("Hello POST")
// })

app.get("/list_user", function (req, res) {
    console.log("列出用户请求");
    res.send("list_user 请求");
})

app.listen(8888);

console.log("Server start at 127.0.0.1:8888");