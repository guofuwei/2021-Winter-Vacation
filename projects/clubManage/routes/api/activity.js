const express = require("express")
const router = express.Router()
const mysql = require("mysql")
const config = require("../../config/config")
const connection = mysql.createConnection(config.mysqlConfig)
connection.connect(function (err) {
    if (!err) {
        console.log("ACTIVITY mysql connect success!")
    }
})
const passport = require("passport")
const moment = require("moment")


// @route GET api/activity/test
// @desc 返回是json数据
// @access public
router.get("/test", function (req, res) {
    res.json({
        "msg": "/api/activity test"
    })

})


// @route POST api/activity/add
// @desc  添加活动
// @access private
router.post("/add", passport.authenticate("jwt", {
    session: false
}), function (req, res) {
    // 检查字段是否为空 
    if (!req.body.name || !req.body.type || !req.body.initiator || !req.body.thedescribe || !req.body.starttime || !req.body.endtime || !req.body.place || !req.body.maxnum) {
        res.json({
            status: 10001,
            msg: "非法请求"
        })
    }
    // 开始进行时间转化为存入数据库做准备
    let starttime = moment(req.body.starttime).format('YYYY-MM-DD HH:mm:ss')
    let endtime = moment(req.body.endtime).format('YYYY-MM-DD HH:mm:ss')
    let sql = "insert into activity_table(name,type,initiator,thedescribe,starttime,endtime,place,maxnum) values(?,?,?,?,?,?,?,?);"
    let sqlParams = [req.body.name, req.body.type, req.body.initiator, req.body.thedescribe, starttime, endtime, req.body.place, req.body.maxnum]
    connection.query(sql, sqlParams, function (err, ret) {
        if (err) {
            console.log("api/activity/add mysql add err:" + err)
            res.json({
                status: 10002,
                msg: "MYSQL activity add err"
            })
            return
        }
        // 将活动组织者添加到参与者中
        sql = "insert into user_ref_act values(?,?)"
        let actId = ret.insertId
        connection.query(sql, [req.user.id, actId], function (err, ret) {
            if (err) {
                console.log("api/activity/add mysql addjoin err:" + err)
                res.json({
                    status: 10002,
                    msg: "MYSQL activity addjoin err"
                })
                return
            }
        })
        res.json({
            status: 200,
            msg: "ok"
        })
    })
})





// @route GET api/activity/
// @desc  获取所有活动
// @access private
router.get("/", passport.authenticate("jwt", {
    session: false
}), function (req, res) {
    // 首先查询所有的活动
    let sql = "select * from activity_table;"
    connection.query(sql, function (err, ret) {
        if (err) {
            console.log("api/activity/ mysql getall err")
            res.json({
                status: 10002,
                msg: "api/activity/ mysql getall err"
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
        let data = ret
        // 查询该用户已参加的活动，方便用于显示是否能参加（若已参加就不应再参加）
        sql = "select act_id from user_ref_act where user_id=?;"
        connection.query(sql, req.user.id, function (err, ret) {
            if (err) {
                console.log("api/activity/ mysql getactmsg err:" + err)
                res.json({
                    status: 10002,
                    msg: "MYSQL activity getactmsg err"
                })
                return
            }
            res.json({
                status: 200,
                msg: "ok",
                data: data,
                actData: ret
            })
        })
    })
})


// @route GET api/activity/myact
// @desc  获取某人参加的所有活动
// @access private
router.get("/myact", passport.authenticate("jwt", {
    session: false
}), function (req, res) {
    // 直接数据库查询该用户参加的所有活动
    let sql = "select activity_table.* from  user_table,activity_table,user_ref_act where user_table.id = user_ref_act.user_id and activity_table.id = user_ref_act.act_id and user_table.id=?;"
    connection.query(sql, req.user.id, function (err, ret) {
        if (err) {
            console.log("api/activity/add mysql getmyact err")
            res.json({
                status: 10002,
                msg: "api/activity/add mysql getmyact err"
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


// @route GET api/activity/myappact
// @desc  获取某人组织的所有活动
// @access private
router.get("/myappact", passport.authenticate("jwt", {
    session: false
}), function (req, res) {
    // 查询该用户所组织的所有活动
    let sql = "select * from activity_table where initiator=?;"
    connection.query(sql, req.user.name, function (err, ret) {
        if (err) {
            console.log("api/activity/myappact mysql getmyappact err")
            res.json({
                status: 10002,
                msg: "api/activity/myappact mysql getmyappact err"
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


// @route POST api/activity/join
// @desc  某人参加活动
// @access private
router.post("/join", passport.authenticate("jwt", {
    session: false
}), function (req, res) {
    // 检查字段是否为空 
    if (!req.body.id) {
        res.json({
            status: 10001,
            msg: "非法请求"
        })
    }
    // 直接向用户活动表中添加活动
    let sql = "insert into user_ref_act values(?,?);"
    let sqlParams = [req.user.id, req.body.id]
    connection.query(sql, sqlParams, function (err, ret) {
        if (err) {
            console.log("api/activity/join mysql add err:" + err)
            res.json({
                status: 10002,
                msg: "MYSQL api/activity/join add err"
            })
            return
        }
        res.json({
            status: 200,
            msg: "ok"
        })
    })
})


// @route POST api/activity/cancelJoin
// @desc  某人退出活动
// @access private
router.post("/cancelJoin", passport.authenticate("jwt", {
    session: false
}), function (req, res) {
    // 检查字段是否为空 
    if (!req.body.act_id) {
        res.json({
            status: 10001,
            msg: "非法请求"
        })
    }
    // 直接向用户活动表中删除活动
    let sql = "delete from user_ref_act where user_id=? and act_id=?;"
    let sqlParams = [req.user.id, req.body.act_id]
    connection.query(sql, sqlParams, function (err, ret) {
        if (err) {
            console.log("api/activity/cancelJoin mysql delete err:" + err)
            res.json({
                status: 10002,
                msg: "MYSQL api/activity/cancelJoin delete err"
            })
            return
        }
        res.json({
            status: 200,
            msg: "ok"
        })
    })
})

// @route POST api/activity/audit/pass
// @desc  活动审核通过
// @access private
router.post("/audit/pass", passport.authenticate("jwt", {
    session: false
}), function (req, res) {
    // 检查字段是否为空 
    if (!req.body.id) {
        res.json({
            status: 10001,
            msg: "非法请求"
        })
    }
    // 更新数据库信息，让活动审核通过
    let sql = "update activity_table set state='审核通过' where id=?;"
    connection.query(sql, req.body.id, function (err, ret) {
        if (err) {
            console.log("api/activity/audit/pass mysql update err")
            res.json({
                status: 10002,
                msg: "api/activity/audit/pass mysql update err"
            })
            return
        }
        res.json({
            status: 200,
            msg: "ok",
        })
    })
})


// @route POST api/activity/audit/fail
// @desc  活动审核不通过
// @access private
router.post("/audit/fail", passport.authenticate("jwt", {
    session: false
}), function (req, res) {
    if (!req.body.id) {
        res.json({
            status: 10001,
            msg: "非法请求"
        })
    }
    // 更新数据库信息，让活动审核不通过
    let sql = "update activity_table set state='审核未通过' where id=?;"
    connection.query(sql, req.body.id, function (err, ret) {
        if (err) {
            console.log("api/activity/audit/fail mysql update err")
            res.json({
                status: 10002,
                msg: "api/activity/audit/fail mysql update err"
            })
            return
        }
        res.json({
            status: 200,
            msg: "ok",
        })
    })
})










module.exports = router