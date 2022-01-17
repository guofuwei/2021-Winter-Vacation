const express = require("express")
const app = express()

app.use("/public", express.static("../clock"))

app.get("/user/:id", function (req, res) {
    // res.send("已经接收到/user的请求\r\n")
    // console.log(req.params.id)
    res.send(req.params)
})

app.listen(8888, function () {
    console.log("Server start at port:8888")
})