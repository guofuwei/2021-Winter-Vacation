const express = require("express")
const mysql = require("mysql")
const config = require("./config/config")
const app = express()
const port = 8888
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
const userRouter = require("./routes/api/users")
app.use("/api/user", userRouter)

// 注册profileRouter路由
const profileRouter = require("./routes/api/profiles")
app.use("/api/profile", profileRouter)

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})