// login & register

const express = require("express")
const router = express.Router()
const mysql = require("mysql")
const config = require("../../config/config")
const connection = mysql.createConnection(config.mysqlConfig)
connection.connect(function (err) {
    if (!err) {
        console.log("USER mysql connect success!")
    }
})
const bcrypt = require("bcrypt")
const gravatar = require('gravatar')
const jsonWebToken = require("jsonwebtoken")
const passport = require("passport")


// @route GET api/user/test
// @desc 返回是json数据
// @access public
router.get("/test", function (req, res) {
    res.json({
        "msg": "/api/user test"
    })
})

// @route POST api/user/register
// @desc 返回是json数据
// @access public
router.post("/register", function (req, res) {
    let name = req.body.name
    let password = req.body.password
    let email = req.body.email
    let identify = req.body.identify
    if (!name || !password || !email || !avatar || !identify) {
        res.status(200).json({
            status: 401,
            msg: "非法请求"
        })
    }
    sql = "select * from usertable where email=?"
    connection.query(sql, email, function (err, ret) {
        if (err) {
            console.log("select email err:" + err)
            res.json({
                status: 500,
                msg: "服务器错误"
            })
            return
        }
        if (ret != "") {
            res.json({
                status: 400,
                msg: "邮箱已被注册"
            })
            return
        } else {
            // 生成头像
            let avatar = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            });
            // 生成加密密码
            var passwordGen = ""
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(password, salt, function (err, hash) {
                    if (err) {
                        console.log("Gen password error:" + err)
                        return
                    }
                    passwordGen = hash

                    // 开始执行数据库插入操作 
                    sql = "insert into usertable(name,password,email,avatar,identify) VALUES(?,?,?,?,?);"
                    sqlParams = [name, passwordGen, email, avatar, identify]
                    connection.query(sql, sqlParams, function (err, ret) {
                        if (err) {
                            console.log("mysql insert err:" + err)
                            return
                        }
                        res.json({
                            status: 200,
                            msg: "ok"
                        })
                    })
                });
            });
        }
    })
})


// @route POST api/user/login
// @desc 返回是json数据
// @access public
router.post("/login", function (req, res) {
    const email = req.body.email
    const password = req.body.password

    // 查看是否有非法请求
    if (!email || !password) {
        res.json({
            status: 401,
            msg: "非法请求"
        })
        return
    }

    // 数据库操作
    let sql = "select * from usertable where email=?"
    connection.query(sql, email, function (err, ret) {
        if (err) {
            console.log("login api select err:" + err)
            return
        }
        if (ret == "") {
            res.json({
                status: 402,
                msg: "邮箱或密码错误"
            })
            return
        }

        // 密码匹配
        bcrypt.compare(password, ret[0].password, function (err, result) {
            if (!result) {
                res.json({
                    status: 405,
                    msg: "用户名或密码错误"
                })
                return
            }
            jsonWebToken.sign({
                    id: ret[0].id,
                    name: ret[0].name,
                    email: email,
                    identify: ret[0].identify
                },
                config.secretKey, {
                    expiresIn: "24h"
                },
                function (err, token) {
                    if (err) {
                        res.json({
                            status: 503,
                            msg: "服务器错误"
                        })
                    }
                    res.json({
                        status: 200,
                        msg: "ok",
                        token: "Bearer " + token
                    })
                })
        });
    })
})


// @route GET api/user/current
// @desc 返回是json数据
// @access private
router.get("/current", passport.authenticate("jwt", {
    session: false
}), function (req, res) {
    res.json({
        status: 200,
        msg: "ok",
        data: {
            id: req.user.id,
            name: req.user.name,
            email: req.user.email,
            identify: req.user.identify
        }
    })
})



module.exports = router