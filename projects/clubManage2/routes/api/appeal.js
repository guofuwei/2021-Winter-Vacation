const express = require("express")
const router = express.Router()
const mysql = require("mysql")
const config = require("../../config/config")
const connection = mysql.createConnection(config.mysqlConfig)
connection.connect(function (err) {
    if (!err) {
        console.log("APPEAL mysql connect success!")
    }
})
const passport = require("passport")


// @route GET api/appeal/test
// @desc 返回是json数据
// @access public
router.get("/test", function (req, res) {
    res.json({
        "msg": "/api/appeal test"
    })
})


// @route POST api/appeal/add
// @desc  创建信息接口
// @access private
router.post("/add", passport.authenticate("jwt", {
    session: false
}), function (req, res) {
    // 检查字段是否为空 
    if (!req.body.act_id || !req.body.act_name || !req.body.act_type || !req.body.user_id || !req.body.user_name || !req.body.reason) {
        res.json({
            status: 10001,
            msg: "非法请求"
        })
    }
    let sql = "insert into appeal_table(act_id,act_name,act_type,user_id,user_name,reason) values(?,?,?,?,?,?);"
    let sqlParams = [req.body.act_id, req.body.act_name, req.body.act_type, req.body.user_id, req.body.user_name, req.body.reason]
    connection.query(sql, sqlParams, function (err, ret) {
        if (err) {
            console.log("api/appeal/add mysql add err")
            res.json({
                status: 10002,
                msg: "MYSQL appeal add err"
            })
            return
        }
        res.json({
            status: 200,
            msg: "ok"
        })
    })
})


// @route GET api/appeal/
// @desc  获取所有信息
// @access private
router.get("/", passport.authenticate("jwt", {
    session: false
}), function (req, res) {
    let sql = "select * from appeal_table;"
    connection.query(sql, function (err, ret) {
        if (err) {
            console.log("api/appeal/ mysql getall err")
            res.json({
                status: 10002,
                msg: "api/appeal/ mysql getall err"
            })
            return
        }
        if (ret == "") {
            res.json({
                status: 200,
                msg: "no",
                data: []
            })
            return
        }
        res.json({
            status: 200,
            msg: "ok",
            data: ret
        })
    })
})


module.exports = router