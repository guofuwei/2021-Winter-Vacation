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

// @route GET api/score/givescore
// @desc 返回是json数据
// @access private
router.get("/givescore", passport.authenticate("jwt", {
    session: false
}), function (req, res) {
    // console.log("--------------")
    if (!req.query.act_id) {
        res.json({
            status: 10001,
            msg: "非法请求"
        })
        return
    }
    let data = null
    let scoreData = []
    let i = 0
    let act_id = req.query.act_id
    let sql = "select * from user_act_score5_view where act_id=?;"
    connection.query(sql, [act_id], function (err, ret) {
        if (err) {
            console.log("api/score/givescore mysql select err:" + err)
            res.json({
                status: 10002,
                msg: "MYSQL score select err"
            })
            return
        }
        data = ret
        // res.json({
        //     status: 200,
        //     data: data
        // })
        // return
        // // console.log(ret)
        sql = "desc moral_edu;"
        connection.query(sql, function (err, ret) {
            if (err) {
                console.log("api/score/givescore mysql desc err:" + err)
                res.json({
                    status: 10002,
                    msg: "MYSQL score desc err"
                })
                return
            }
            scoreData.push({
                Name: "德育",
                names: []
            })
            for (i = 0; i < ret.length; i++) {
                if (ret[i].Field.indexOf("name") != -1) {
                    scoreData[0].names.push(ret[i].Default)
                } else if (ret[i].Field === "score_type") {
                    scoreData[0].scoreType = ret[i].Default
                }
            }



            sql = "desc intellectual_edu;"
            connection.query(sql, function (err, ret) {
                if (err) {
                    console.log("api/score/givescore mysql desc2 err:" + err)
                    res.json({
                        status: 10002,
                        msg: "MYSQL score desc2 err"
                    })
                    return
                }
                scoreData.push({
                    Name: "智育",
                    names: []
                })
                for (i = 0; i < ret.length; i++) {
                    if (ret[i].Field.indexOf("name") != -1) {
                        scoreData[1].names.push(ret[i].Default)
                    } else if (ret[i].Field === "score_type") {
                        scoreData[1].scoreType = ret[i].Default
                    }
                }

                sql = "desc sports_edu;"
                connection.query(sql, function (err, ret) {
                    if (err) {
                        console.log("api/score/givescore mysql desc3 err:" + err)
                        res.json({
                            status: 10002,
                            msg: "MYSQL score desc3 err"
                        })
                        return
                    }
                    scoreData.push({
                        Name: "体育",
                        names: []
                    })
                    for (i = 0; i < ret.length; i++) {
                        if (ret[i].Field.indexOf("name") != -1) {
                            scoreData[2].names.push(ret[i].Default)
                        } else if (ret[i].Field === "score_type") {
                            scoreData[2].scoreType = ret[i].Default
                        }
                    }

                    sql = "desc aesthetic_edu;"
                    connection.query(sql, function (err, ret) {
                        if (err) {
                            console.log("api/score/givescore mysql desc4 err:" + err)
                            res.json({
                                status: 10002,
                                msg: "MYSQL score desc4 err"
                            })
                            return
                        }
                        scoreData.push({
                            Name: "美育",
                            names: []
                        })
                        for (i = 0; i < ret.length; i++) {
                            if (ret[i].Field.indexOf("name") != -1) {
                                scoreData[3].names.push(ret[i].Default)
                            } else if (ret[i].Field === "score_type") {
                                scoreData[3].scoreType = ret[i].Default
                            }
                        }

                        sql = "desc labor_edu;"
                        connection.query(sql, function (err, ret) {
                            if (err) {
                                console.log("api/score/givescore mysql desc5 err:" + err)
                                res.json({
                                    status: 10002,
                                    msg: "MYSQL score desc5 err"
                                })
                                return
                            }
                            scoreData.push({
                                Name: "劳育",
                                names: []
                            })
                            for (i = 0; i < ret.length; i++) {
                                if (ret[i].Field.indexOf("name") != -1) {
                                    scoreData[4].names.push(ret[i].Default)
                                } else if (ret[i].Field === "score_type") {
                                    scoreData[4].scoreType = ret[i].Default
                                }
                            }
                            res.json({
                                status: 200,
                                msg: "ok",
                                data: data,
                                scoreData: scoreData,
                            })
                        })
                    })
                })
            })
        })
    })
})




// @route POST api/score/newscore
// @desc 新建打分数据
// @access private
router.post("/newscore", passport.authenticate("jwt", {
    session: false
}), function (req, res) {
    if (!req.body.Name || !req.body.names || !req.body.scoreType || !req.body.scores || !req.body.stu_id || !req.body.stu_name || !req.body.stu_studentid || !req.body.act_id) {
        res.json({
            status: 10001,
            msg: "非法请求"
        })
        return
    }
    eduType = {
        "德育": "moral_education",
        "智育": "intellectual_education",
        "体育": "sports_education",
        "美育": "aesthetic_education",
        "劳育": "labor_education",
    }
    tableHash = {
        "德育": "moral_edu",
        "智育": "intellectual_edu",
        "体育": "sports_edu",
        "美育": "aesthetic_edu",
        "劳育": "labor_edu",
    }
    let sql = "update {0} set {1} where user_id={2} and act_id={3};"
    let temp = []
    let scores = []
    let allScore = 0
    for (let i = 0; i < req.body.names.length; i++) {
        scores[i] = req.body.scores[i].split("分")[0]
        allScore += parseInt(scores[i])
    }
    temp.push(eduType[req.body.Name] + "=" + allScore)
    for (let i = 0; i < scores.length; i++) {
        temp.push("score" + (i + 1) + "=" + scores[i])
    }
    sql = StringFormat(sql, tableHash[req.body.Name], temp.join(","), req.body.stu_id, req.body.act_id)
    // console.log(sql)

    connection.query(sql, function (err, ret) {
        if (err) {
            console.log("api/score/givescore mysql update err:" + err)
            res.json({
                status: 10002,
                msg: "MYSQL score update err"
            })
            return
        }
        // console.log(ret)
        // console.log(ret.affectedRows == 0)
        // res.json({
        //     status: 200
        // })
        // return
        if (ret.affectedRows == 0) {
            sql = "insert into {0}(id,user_id,act_id,{1},{2}) values(0,?,?,?,{3});"
            let sqlParam = [req.body.stu_id, parseInt(req.body.act_id)]
            let temp1 = []
            let temp2 = []
            let scores = []
            let allScore = 0
            for (let i = 0; i < req.body.names.length; i++) {
                temp1[i] = "?"
                temp2[i] = "score" + (i + 1)
                scores[i] = req.body.scores[i].split("分")[0]
                allScore += parseInt(scores[i])
            }
            sqlParam.push(allScore)
            for (i = 0; i < scores.length; i++) {
                sqlParam.push(parseInt(scores[i]))
            }
            sql = StringFormat(sql, tableHash[req.body.Name], eduType[req.body.Name], temp2.join(","), temp1.join(","))
            // console.log(sql)
            connection.query(sql, sqlParam, function (err, ret) {
                if (err) {
                    console.log("api/score/givescore mysql desc5 err:" + err)
                    res.json({
                        status: 10002,
                        msg: "MYSQL score desc5 err"
                    })
                    return
                }
                res.json({
                    status: 200,
                    msg: "ok"
                })
            })
        } else {
            res.json({
                status: 200,
                msg: "ok"
            })
        }
    })
})


// @route GET api/score/myscore
// @desc 新建打分数据
// @access private
router.get("/myscore", passport.authenticate("jwt", {
    session: false
}), function (req, res) {
    // res.json({
    //     status: 200,
    //     data: req.user
    // })
    // return
    let sql = "select user_act_score5_view.*,activity_table.name as act_name,activity_table.type from user_act_score5_view inner join activity_table on user_act_score5_view.act_id=activity_table.id where user_act_score5_view.id=?;"
    connection.query(sql, [req.user.id], function (err, ret) {
        if (err) {
            console.log("api/score/myscore mysql select err:" + err)
            res.json({
                status: 10002,
                msg: "MYSQL score select err"
            })
            return
        }
        res.json({
            status: 200,
            data: ret
        })
    })
})

// @route GET api/score/scoredetail
// @desc 返回某一项详细打分数据 
// @access private
router.get("/scoredetail", passport.authenticate("jwt", {
    session: false
}), function (req, res) {
    if (!req.query.act_id || !req.query.Name) {
        res.json({
            status: 10001,
            msg: "非法请求"
        })
        return
    }
    let tableHash = {
        "德育": "moral_edu",
        "智育": "intellectual_edu",
        "体育": "sports_edu",
        "美育": "aesthetic_edu",
        "劳育": "labor_edu",
    }
    let data = null
    let sql = "select * from {0} where act_id=? and user_id=?;"
    sql = StringFormat(sql, tableHash[req.query.Name])
    connection.query(sql, [req.query.act_id, req.user.id], function (err, ret) {
        if (err) {
            console.log("api/score/scoredetail mysql select err:" + err)
            res.json({
                status: 10002,
                msg: "MYSQL score select err"
            })
            return
        }
        data = {
            Name: req.query.Name,
            names: [],
            scores: [],
        }
        if (ret != "") {
            let i = 1
            while (true) {
                if (ret[0]["name" + i] != undefined) {
                    data.names.push(ret[0]["name" + i])
                    data.scores.push(ret[0]["score" + i])
                } else {
                    break
                }
                i++
            }
        }
        res.json({
            status: 200,
            data: data,
        })
    })
})




// @route GET api/score/scoreinfo
// @desc 某人的得分缩略信息
// @access private
router.get("/scoreinfo", passport.authenticate("jwt", {
    session: false
}), function (req, res) {
    let data = [0, 0, 0, 0, 0, 0]
    let sql = "select * from user_act_score5_view where id=5;"
    connection.query(sql, [req.user.id], function (err, ret) {
        if (err) {
            console.log("api/score/scoreinfo mysql select err:" + err)
            res.json({
                status: 10002,
                msg: "MYSQL score select err"
            })
            return
        }
        if (ret != "") {
            for (let i = 0; i < ret.length; i++) {
                if (ret[i].moral_education != null) {
                    data[0] += ret[i].moral_education
                }
                if (ret[i].intellectual_education != null) {
                    data[1] += ret[i].intellectual_education
                }
                if (ret[i].sports_education != null) {
                    data[2] += ret[i].sports_education
                }
                if (ret[i].aesthetic_education != null) {
                    data[3] += ret[i].aesthetic_education
                }
                if (ret[i].labor_education != null) {
                    data[4] += ret[i].labor_education
                }
            }
            data[5] = data[0] + data[1] + data[2] + data[3] + data[4]
        }
        res.json({
            status: 200,
            data: data,
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