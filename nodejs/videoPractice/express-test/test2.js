const express = require("express")
const router = require("./test2Router")
const qureystring = require("querystring")
const cors = require("cors")
const expressSession = require("express-session")
const expressJWt = require("express-jwt") //解析密钥
const jwt = require("jsonwebtoken") //生成密钥
const secretKey = "This is a secret^-^"
const app = express()

// app.use("/public",express.static("public"))

// app.use(express.urlencoded({
//     extended: false
// }))
// app.use(express.json())

// 自定义的中间件
app.use(function (req, res, next) {
    let str = ""
    req.on("data", function (chunk) {
        str += chunk
    })
    req.on("end", function () {
        // console.log(str)
        const body = qureystring.parse(str)
        // console.log(body)
        req.body = body
        next()
    })
})

// 使用cors()跨域中间件
app.use(cors())

// 使用session的中间件，使用req.session.key=value挂载session
app.use(expressSession({
    secret: "This is a secret",
    resave: false,
    saveUninitialized: true
}))

// 使用处理解析jwt的中间件
// 使用该中间件后jwt的解析内容会自动挂载到req.user中
app.use(expressJWt({
    secret: secretKey
}).unless({
    path: [/^\/api\//]
}))

// 调用router.js
app.use(router)
// 进行错误处理
// app.use(function (err, req, res, next) {
//     console.log("发生了一个错误:" + err.message)
//     res.send("服务器发生了错误")
// })

// 专门的jwtToken认证失败后的错误处理 
app.use(function (err, req, res, next) {
    if (err.name === "UnauthorizedError") {
        return res.send({
            status: 1,
            msg: "无效的Token"
        })
    }
    res.send({
        status: 500,
        msg: "服务器错误"
    })
})

app.listen(8888, function () {
    console.log("Server start at port:8888")
})