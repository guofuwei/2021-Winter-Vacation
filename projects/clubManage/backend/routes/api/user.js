const express = require("express")
const router = express.Router()
const mysql = require("mysql")
const config = require("../../config/config")
const connection = mysql.createConnection(config.mysqlConfig)
connection.connect(function (err) {
    if (!err) {
        console.log("USER mysql connect success!")
    } else {
        console.log("mysql connect error:" + err)
    }
})
const bcrypt = require("bcrypt")
const jsonWebToken = require("jsonwebtoken")
const passport = require("passport")


// @route GET api/user/test
// @desc 返回是json数据
// @access public
router.get("/test", function (req, res) {
    res.json({
        status: 200,
        msg: "api/user/test success"
    })
})

// @route POST api/user/register
// @desc 返回是json数据
// @access public
router.post("/register", function (req, res) {
    let name = req.body.name
    let faculty = req.body.faculty
    let classroom = req.body.classroom
    let studentid = req.body.studentid
    let password = req.body.password
    let identity = req.body.identity
    if (!name || !faculty || !classroom || !studentid || !password || !identity) {
        res.status(200).json({
            status: 10001,
            msg: "非法请求"
        })
    }
    sql = "select * from user_table where studentid=?;"
    connection.query(sql, studentid, function (err, ret) {
        if (err) {
            console.log("/register mysql select error")
            res.json({
                status: 10002,
                msg: "/register mysql select error"
            })
            return
        }
        if (ret != "") {
            res.json({
                status: 10011,
                msg: "该学号已被注册"
            })
            return
        } else {
            // 生成加密密码
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(password, salt, function (err, hash) {
                    if (err) {
                        console.log("/register gen password error")
                        res.json({
                            status: 10003,
                            msg: "/register gen password error"
                        })
                        return
                    }
                    let passwordGen = hash
                    sql = "insert into user_table(name, faculty, classroom, studentid, password, identity) VALUES(?, ?, ?, ?, ?, ?)"
                    sqlParams = [name, faculty, classroom, studentid, passwordGen, identity]
                    connection.query(sql, sqlParams, function (err, ret) {
                        if (err) {
                            console.log("/register mysql insert error")
                            res.json({
                                status: 10002,
                                msg: "/register mysql insert error"
                            })
                            return
                        }
                        res.json({
                            status: 200,
                            msg: "ok"
                        })
                    })
                })
            })
        }
    })
})

// @route POST api/user/login
// @desc 返回是json数据
// @access public
router.post("/login", function (req, res) {
    const studentid = req.body.studentid
    const password = req.body.password
    // 查看是否有非法请求
    if (!studentid || !password) {
        res.json({
            status: 10001,
            msg: "非法请求"
        })
        return
    }
    // 数据库操作
    let sql = "select * from user_table where studentid=?"
    connection.query(sql, studentid, function (err, ret) {
        if (err) {
            console.log("/login mysql select err")
            res.json({
                status: 10002,
                msg: "/login mysql select err"
            })
            return
        }
        if (ret == "") {
            // console.log("学号错误")
            res.json({
                status: 10012,
                msg: "学号或密码错误"
            })
            return
        }
        // 密码匹配
        bcrypt.compare(password, ret[0].password, function (err, result) {
            if (!result) {
                // console.log("密码错误")
                // console.log(password)
                res.json({
                    status: 10012,
                    msg: "学号或密码错误"
                })
                return
            }
            // 生成登录令牌
            jsonWebToken.sign({
                id: ret[0].id,
                name: ret[0].name,
                faculty: ret[0].faculty,
                classroom: ret[0].classroom,
                studentid: ret[0].studentid,
                identity: ret[0].identity
            }, config.secretKey, {
                expiresIn: "24h"
            }, function (err, token) {
                if (err) {
                    console.log("/login gen token err")
                    res.json({
                        status: 10004,
                        msg: "gen token err"
                    })
                    return
                }
                res.json({
                    status: 200,
                    msg: "ok",
                    token: "Bearer " + token
                })
            })
        })
    })
})


// @route POST api/user/changeinfo
// @desc 返回是json数据
// @access private
router.post("/changeinfo", passport.authenticate("jwt", {
    session: false
}), function (req, res) {
    // 检查字段是否为空 
    if (!req.body.name || !req.body.faculty || !req.body.classroom || !req.body.studentid || !req.body.identity) {
        res.json({
            status: 10001,
            msg: "非法请求"
        })
    }
    let sql = "update user_table set name=?,faculty=?,classroom=?,studentid=?,identity=? where id=?;"
    let sqlParams = [req.body.name, req.body.faculty, req.body.classroom, req.body.studentid, req.body.identity, req.user.id]
    connection.query(sql, sqlParams, function (err, ret) {
        if (err) {
            console.log("api/user/changeinfo mysql update err")
            res.json({
                status: 10002,
                msg: "MYSQL user/changinfo update err"
            })
            return
        }
        sql = "select * from user_table where id=?"
        connection.query(sql, req.user.id, function (err, ret) {
            if (err) {
                console.log("api/user/changeinfo mysql select err")
                res.json({
                    status: 10002,
                    msg: "MYSQL user/changinfo select err"
                })
                return
            }
            // 生成登录令牌
            jsonWebToken.sign({
                id: ret[0].id,
                name: ret[0].name,
                faculty: ret[0].faculty,
                classroom: ret[0].classroom,
                studentid: ret[0].studentid,
                identity: ret[0].identity
            }, config.secretKey, {
                expiresIn: "24h"
            }, function (err, token) {
                if (err) {
                    console.log("/api/user/changinfo gen token err")
                    res.json({
                        status: 10004,
                        msg: "/api/user/changinfo gen token err"
                    })
                    return
                }
                res.json({
                    status: 200,
                    msg: "ok",
                    token: "Bearer " + token
                })
            })
        })
    })
})







// @route POST api/user/changepwd
// @desc 修改密码
// @access private
router.post("/changepwd", passport.authenticate("jwt", {
    session: false
}), function (req, res) {
    // 检查字段是否为空 
    if (!req.body.oldpassword || !req.body.password) {
        res.json({
            status: 10001,
            msg: "非法请求"
        })
    }
    let sql = "select * from user_table where id=?;"
    connection.query(sql, req.user.id, function (err, ret) {
        if (err) {
            console.log("api/user/changepwd mysql select err")
            res.json({
                status: 10002,
                msg: "MYSQL user/changpwd select err"
            })
            return
        }
        // 密码匹配
        bcrypt.compare(req.body.oldpassword, ret[0].password, function (err, result) {
            if (!result) {
                res.json({
                    status: 10013,
                    msg: "旧密码错误"
                })
                return
            }
        })
        // 生成新加密密码
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(req.body.password, salt, function (err, hash) {
                if (err) {
                    console.log("/api/user/changepwd gen password error")
                    res.json({
                        status: 10003,
                        msg: "/api/user/changepwd gen password error"
                    })
                    return
                }
                // 更新密码
                let passwordGen = hash
                sql = "update user_table set password=? where id=?"
                connection.query(sql, [passwordGen, req.user.id], function (err, ret) {
                    if (err) {
                        console.log("api/user/changepwd mysql update err")
                        res.json({
                            status: 10002,
                            msg: "MYSQL user/changepwd update err"
                        })
                        return
                    }
                    res.json({
                        status: 200,
                        msg: "ok"
                    })
                })
            })
        })
    })
})





module.exports = router