const express = require("express")
const router = express.Router()
const mysql = require("mysql")
const config = require("../../config/config")
const connection = mysql.createConnection(config.mysqlConfig)
connection.connect(function (err) {
    if (!err) {
        console.log("SCORE mysql connect success!")
    }
})
const passport = require("passport")
const NameHashTable = {
    "德育": "moral_edu",
    "智育": "intellectual_edu",
    "体育": "sports_edu",
    "美育": "aesthetic_edu",
    "劳育": "labor_edu",
}

// @route GET api/score/test
// @desc 返回是json数据
// @access public
router.get("/test", function (req, res) {
    res.json({
        "msg": "/api/score test"
    })
})




// @route GET api/score/desc
// @desc 返回是json数据
// @access private
router.get("/desc", passport.authenticate("jwt", {
    session: false
}), function (req, res) {

    var data = []

    let sql = "desc moral_edu;"
    connection.query(sql, function (err, ret) {
        if (err) {
            console.log("api/score/desc mysql desc err:" + err)
            res.json({
                status: 10002,
                msg: "MYSQL api/score/desc desc err"
            })
            return
        }
        for (let i = 0, j = 0; i < ret.length; i++) {
            if (ret[i].Field.indexOf("name") != -1) {
                data.push({
                    id: j++,
                    Name: "德育",
                    name: ret[i].Default,
                    scoreType: ret[ret.length - 2].Default,
                    upperLimit: ret[ret.length - 1].Default
                })
            }
        }
    })


    sql = "desc intellectual_edu;"
    connection.query(sql, function (err, ret) {
        if (err) {
            console.log("api/score/desc mysql desc err:" + err)
            res.json({
                status: 10002,
                msg: "MYSQL api/score/desc desc err"
            })
            return
        }
        for (let i = 0, j = 0; i < ret.length; i++) {
            if (ret[i].Field.indexOf("name") != -1) {
                data.push({
                    id: j++,
                    Name: "智育",
                    name: ret[i].Default,
                    scoreType: ret[ret.length - 2].Default,
                    upperLimit: ret[ret.length - 1].Default
                })
            }
        }
    })

    sql = "desc sports_edu;"
    connection.query(sql, function (err, ret) {
        if (err) {
            console.log("api/score/desc mysql desc err:" + err)
            res.json({
                status: 10002,
                msg: "MYSQL api/score/desc desc err"
            })
            return
        }
        for (let i = 0, j = 0; i < ret.length; i++) {
            if (ret[i].Field.indexOf("name") != -1) {
                data.push({
                    id: j++,
                    Name: "体育",
                    name: ret[i].Default,
                    scoreType: ret[ret.length - 2].Default,
                    upperLimit: ret[ret.length - 1].Default
                })
            }
        }
    })


    sql = "desc aesthetic_edu;"
    connection.query(sql, function (err, ret) {
        if (err) {
            console.log("api/score/desc mysql desc err:" + err)
            res.json({
                status: 10002,
                msg: "MYSQL api/score/desc desc err"
            })
            return
        }
        for (let i = 0, j = 0; i < ret.length; i++) {
            if (ret[i].Field.indexOf("name") != -1) {
                data.push({
                    id: j++,
                    Name: "美育",
                    name: ret[i].Default,
                    scoreType: ret[ret.length - 2].Default,
                    upperLimit: ret[ret.length - 1].Default
                })
            }
        }
    })

    sql = "desc labor_edu;"
    connection.query(sql, function (err, ret) {
        if (err) {
            console.log("api/score/desc mysql desc err:" + err)
            res.json({
                status: 10002,
                msg: "MYSQL api/score/desc desc err"
            })
            return
        }
        for (let i = 0, j = 0; i < ret.length; i++) {
            if (ret[i].Field.indexOf("name") != -1) {
                data.push({
                    id: j++,
                    Name: "劳育",
                    name: ret[i].Default,
                    scoreType: ret[ret.length - 2].Default,
                    upperLimit: ret[ret.length - 1].Default
                })
            }
        }
        res.json({
            status: 200,
            data: data
        })
    })
})

// @route GET api/score/updateset
// @desc 返回是json数据
// @access private
router.post("/updateset", passport.authenticate("jwt", {
    session: false
}), function (req, res) {
    if (!req.body.upperLimit) {
        res.json({
            status: 10001,
            msg: "非法请求"
        })
        return
    }
    let sql = StringFormat("desc {0};", NameHashTable[req.body.Name])
    let oldScoreType = ""
    let newScoreType = ""
    let Field = ""
    connection.query(sql, function (err, ret) {
        if (err) {
            console.log("api/score/updateset mysql desc err:" + err)
            res.json({
                status: 10002,
                msg: "MYSQL score desc err"
            })
            return
        }
        oldScoreType = ret[ret.length - 2].Default
        for (i = 0; i < oldScoreType.length; i++) {
            if (i == req.body.id) {
                newScoreType = oldScoreType.replace(oldScoreType[i], req.body.scoreType)
                break
            }
        }
        for (i = 0; i < ret.length; i++) {
            if (ret[i].Field.indexOf("name") != -1 && ret[i].Field.indexOf(req.body.id + 1) != -1) {
                Field = ret[i].Field
                break
            }
        }
        // 更新评分小类的计分类型
        sql = StringFormat("alter table {0} modify score_type varchar(10) not null default '{1}';", NameHashTable[req.body.Name], newScoreType)
        connection.query(sql, function (err, ret) {
            if (err) {
                console.log("api/score/updateset mysql alter3 err:" + err)
                res.json({
                    status: 10002,
                    msg: "MYSQL score alter3 err"
                })
                return
            }
        })

        // 更新评分小类名称
        sql = StringFormat("alter table {0} modify {1} varchar(50) not null default '{2}';", NameHashTable[req.body.Name], Field, req.body.name)
        connection.query(sql, function (err, ret) {
            if (err) {
                console.log("api/score/updateset mysql alter err:" + err)
                res.json({
                    status: 10002,
                    msg: "MYSQL score alter err"
                })
                return
            }
        })
    })

    // 更新评分大类的分数上限
    sql = StringFormat("alter table {0} modify upper_limit int not null default {1};", NameHashTable[req.body.Name], req.body.upperLimit)
    connection.query(sql, function (err, ret) {
        if (err) {
            console.log("api/score/updateset mysql alter2 err:" + err)
            res.json({
                status: 10002,
                msg: "MYSQL score alter2 err"
            })
            return
        }
        res.json({
            status: 200,
            msg: "ok"
        })
    })
})

function StringFormat() {
    if (arguments.length == 0)
        return null;
    var str = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
        str = str.replace(re, arguments[i]);
    }
    return str;
}




module.exports = router