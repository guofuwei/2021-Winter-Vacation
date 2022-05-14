// express中间件练习
// 应用，路由级别的中间件
// 错误级别的中间件 
// express内置中间件的使用 express.json  express.urlencoded
// 自定义的中间件
// cors跨域的问题
// express路由文件router.js的使用
// session认证问题 
// JWT认证问题
const expressJWt = require("express-jwt") //解析密钥
const jwt = require("jsonwebtoken") //生成密钥
const secretKey = "This is a secret^-^"

const express = require("express")
const jwt = require("express-jwt")
const router = express.Router()

const mw1 = function (req, res, next) {
    console.log("全局生效的第一个中间件")
    next()
}

const mw2 = function (req, res, next) {
    console.log("这是局部生效的中间件")
    next()
}

router.use(mw1)

router.use(function (req, res, next) {
    console.log("全局生效的第二个中间件")
    next()
})

router.get("/", function (req, res) {
    // console.log("发送首页信息")
    throw new Error("url:/ 这里有一个错误")
    res.send("Hello get")
})

router.get("/user", mw2, function (req, res) {
    res.send("Hello get user")
})

router.post("/user/new", function (req, res) {
    console.log(req.body)
    res.send("ok")
})

// JWT的认证问题
app.post("api/login", function (req, res) {
    res.send({
        status: 0,
        msg: "登录成功",
        token: jwt.sign({
                username: "username"
            },
            secretKey, {
                expiresIn: "30s"
            }
        )
    })
})
module.exports = router