const express = require("express")
const app = express()

app.use(express.json())

app.get("/", function (req, res) {
    throw new Error("url:/有错误")
})


app.post("/user/new", function (req, res) {
    console.log(req.body)
    res.send("ok")
})

app.use(function (err, req, res, next) {
    console.log("发生了错误:" + err.message)
    res.send(err.message)
})
app.listen(8888)