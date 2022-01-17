// 

const express = require("express")
const router = express.Router()
const mysql = require("mysql")
const config = require("../../config/config")
const connection = mysql.createConnection(config.mysqlConfig)
connection.connect(function (err) {
    if (!err) {
        console.log("PROFILE mysql connect success!")
    }
})
const passport = require("passport")

// @route GET api/profile/test
// @desc 返回是json数据
// @access public
router.get("/test", function (req, res) {
    res.json({
        "msg": "/api/profile test"
    })
})


// @route POST api/profile/add
// @desc  创建信息接口
// @access private
router.post("/add", passport.authenticate("jwt", {
    session: false
}), function (req, res) {
    if (!req.body.type || !req.body.mydescribe || !req.body.income || !req.body.expend || !req.body.cash || !req.body.remark) {

    }
})


module.exports = router