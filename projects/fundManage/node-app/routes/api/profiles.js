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
const {
    route
} = require("express/lib/application")

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
    // 检查字段是否为空 
    if (!req.body.type || !req.body.mydescribe || !req.body.income || !req.body.expend || !req.body.cash || !req.body.remark) {
        res.json({
            status: 406,
            msg: "非法请求"
        })
    }
    let sql = "insert into profiletable(userid,type,mydescribe,income,expend,cash,remark) values(?,?,?,?,?,?,?);"
    let sqlParams = [req.user.id, req.body.type, req.body.mydescribe, req.body.income, req.body.expend, req.body.cash, req.body.remark]
    connection.query(sql, sqlParams, function (err, ret) {
        if (err) {
            console.log("MYSQL profile add err:" + err)
            res.json({
                status: 504,
                msg: "服务器错误"
            })
            return
        }
        res.json({
            status: 200,
            msg: "ok"
        })
    })
})


// @route GET api/profile/
// @desc  获取所有信息
// @access private
router.get("/", passport.authenticate("jwt", {
    session: false
}), function (req, res) {
    let sql = "select * from profiletable where userid=?"
    connection.query(sql, req.user.id, function (err, ret) {
        if (err) {
            console.log("MYSQL profile getall err:" + err)
            res.json({
                status: 504,
                msg: "服务器错误"
            })
            return
        }
        if (ret == "") {
            res.json({
                status: 200,
                msg: "no",
                data: "没有任何内容"
            })
            return
        }
        // res.json({
        //     status: 200,
        //     msg: "ok",
        //     data: ret
        // })
        res.json(ret)
    })
})


// @route POST api/profile/edit/:id
// @desc  编辑信息接口
// @access private
router.post("/edit/:id", passport.authenticate("jwt", {
    session: false
}), function (req, res) {
    // 检查字段是否为空 
    if (!req.body.type || !req.body.mydescribe || !req.body.income || !req.body.expend || !req.body.cash || !req.body.remark) {
        res.json({
            status: 406,
            msg: "非法请求"
        })
    }
    let profileId = req.params.id
    let sql = "update profiletable set type=?,mydescribe=?,income=?,expend=?,cash=?,remark=? where id=?;"
    let sqlParams = [req.body.type, req.body.mydescribe, req.body.income, req.body.expend, req.body.cash, req.body.remark, profileId]
    connection.query(sql, sqlParams, function (err, ret) {
        if (err) {
            console.log("MYSQL profile update err:" + err)
            res.json({
                status: 504,
                msg: "服务器错误"
            })
            return
        }
        res.json({
            status: 200,
            msg: "ok"
        })
    })
})


// @route DELETE api/profile/delete/:id
// @desc  删除信息接口
// @access private
router.delete("/delete/:id", passport.authenticate("jwt", {
    session: false
}), function (req, res) {
    // 检查字段是否为空 
    let profileId = req.params.id
    let sql = "delete from profiletable where id=?;"
    connection.query(sql, profileId, function (err, ret) {
        if (err) {
            console.log("MYSQL profile delete err:" + err)
            res.json({
                status: 504,
                msg: "服务器错误"
            })
            return
        }
        // console.log(ret)
        res.json({
            status: 200,
            msg: "ok"
        })
    })
})




// @route GET api/profile/:id
// @desc  获取单个信息
// @access private
router.get("/:id", passport.authenticate("jwt", {
    session: false
}), function (req, res) {
    profileId = req.params.id
    let sql = "select * from profiletable where id=? and userid=?"
    connection.query(sql, [profileId, req.user.id], function (err, ret) {
        if (err) {
            console.log("MYSQL profile getone err:" + err)
            res.json({
                status: 504,
                msg: "服务器错误"
            })
            return
        }
        if (ret == "") {
            res.json({
                status: 200,
                msg: "no",
                data: "没有任何内容"
            })
            return
        }
        res.json({
            status: 200,
            msg: "ok",
            data: ret[0]
        })
    })
})


module.exports = router