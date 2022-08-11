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
app.use("/api/user", userRouter)

// 注册activityRouter路由
const activityRouter = require("./routes/api/activity")
app.use("/api/activity", activityRouter)

// 注册appealRouter路由
const appealRouter = require("./routes/api/appeal")
app.use("/api/appeal", appealRouter)


// 注册scoreRouter路由
const scoreRouter = require("./routes/api/score")
app.use("/api/score", scoreRouter)

// 注册manageRouter路由
const manageRouter = require("./routes/api/manage")
app.use("/api/manage", manageRouter)

// 启动服务器
app.listen(PORT, () => {
    var host = server.address().address
    var port = server.address().port
    console.log(`Server running on http://%s:%s`,host,port);
})
