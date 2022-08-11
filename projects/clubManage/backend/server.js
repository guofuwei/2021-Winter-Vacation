const express = require("express")
const app = express()
const PORT= 8888
const passport = require("passport")

// 使用bodyParser中间件
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

// 使用passport中间件
app.use(passport.initialize())
require("./config/passport")(passport)

// 注册userRouter路由 
const userRouter = require("./routes/api/user")
app.use("/user", userRouter)

// 注册activityRouter路由
const activityRouter = require("./routes/api/activity")
app.use("/activity", activityRouter)

// 注册appealRouter路由
const appealRouter = require("./routes/api/appeal")
app.use("/appeal", appealRouter)


// 注册scoreRouter路由
const scoreRouter = require("./routes/api/score")
app.use("/score", scoreRouter)

// 注册manageRouter路由
const manageRouter = require("./routes/api/manage")
app.use("/manage", manageRouter)

// 启动服务器
var server=app.listen(PORT, () => {
    var host = server.address().address
    var port = server.address().port
    console.log(`Server running on http://%s:%s`,host,port);
})
