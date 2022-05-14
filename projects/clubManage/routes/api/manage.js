const express = require("express")
const router = express.Router()
const mysql = require("mysql")
const config = require("../../config/config")
const connection = mysql.createConnection(config.mysqlConfig)
connection.connect(function (err) {
    if (!err) {
        console.log("MANAGE mysql connect success!")
    }
})
const passport = require("passport")
// 让五个评分大类对应分别的数据表
const NameHashTable = {
    "德育": "moral_edu",
    "智育": "intellectual_edu",
    "体育": "sports_edu",
    "美育": "aesthetic_edu",
    "劳育": "labor_edu",
}

// @route GET api/manage/test
// @desc 返回是json数据
// @access public
router.get("/test", function (req, res) {
    res.json({
        "msg": "/api/manage test"
    })
})




// @route GET api/manage/
// @desc 获取所有的部门管理信息
// @access private
router.get("/", passport.authenticate("jwt", {
    session: false
}), function (req, res) {
    let data = []
    let depart_ids = []
    let collage_ids = []
    sql = "select depart_man.id as depart_man_id,depart_man.department,collage_man.id as collage_man_id,collage_man.collage from depart_man left join collage_man on depart_man.id=collage_man.depart_id order by depart_man.id;"
    connection.query(sql, function (err, ret) {
        if (err) {
            console.log("api/manage/ mysql get deaprtment err:" + err)
            res.json({
                status: 10002,
                msg: "MYSQL api/manage/ get department err"
            })
            return
        }
        data = ret
        //  开始初始化数据
        for (let i = 0; i < data.length; i++) {
            data[i].depart_man_user_id = [] // 部门管理员的id
            data[i].depart_man_user_name = [] // 部门管理员的姓名
            data[i].collage_man_user_id = [] // 学院管理员的id
            data[i].collage_man_user_name = [] // 学院管理员的姓名
            data[i].depart_man_user_studentid = [] // 部门管理员的学号
            data[i].collage_man_user_studentid = [] // 学院管理员的学号
            depart_ids.push(data[i].depart_man_id)
            collage_ids.push(data[i].collage_man_id)
        }

        // 查找部门管理员
        sql = "select depart_man.id as depart_man_id,user_table.id as user_id,user_table.studentid,user_table.name from depart_man,user_table where depart_man.id=user_table.depart_man_id;"
        connection.query(sql, function (err, ret) {
            if (err) {
                console.log("api/manage/ mysql get user_depart_id err:" + err)
                res.json({
                    status: 10002,
                    msg: "MYSQL api/manage/ get user_depart_id err"
                })
                return
            }
            let index = -1
            let i = 0
            let j = 0;
            for (i = 0; i < ret.length; i++) {
                index = depart_ids.indexOf(ret[i].depart_man_id)
                data[index].depart_man_user_id.push(ret[i].user_id)
                data[index].depart_man_user_name.push(ret[i].name)
                data[index].depart_man_user_studentid.push(ret[i].studentid)
                for (j = index + 1; j < depart_ids.length; j++) {
                    if (depart_ids[j] === ret[i].depart_man_id) {
                        data[j].depart_man_user_id.push(ret[i].user_id)
                        data[j].depart_man_user_name.push(ret[i].name)
                        data[j].depart_man_user_studentid.push(ret[i].studentid)
                    } else {
                        break
                    }
                }
            }

            // 查找二级学院的管理员
            sql = "select collage_man.id as collage_man_id,user_table.id as user_id,user_table.studentid,user_table.name from collage_man,user_table where collage_man.id=user_table.collage_man_id;"
            connection.query(sql, function (err, ret) {
                if (err) {
                    console.log("api/manage/ mysql get user_collage_id err:" + err)
                    res.json({
                        status: 10002,
                        msg: "MYSQL api/manage/ get user_collage_id err"
                    })
                    return
                }
                let index = -1
                for (let i = 0; i < ret.length; i++) {
                    index = collage_ids.indexOf(ret[i].collage_man_id)
                    data[index].collage_man_user_id.push(ret[i].user_id)
                    data[index].collage_man_user_name.push(ret[i].name)
                    data[index].collage_man_user_studentid.push(ret[i].studentid)
                }
                res.json({
                    status: 200,
                    data: data,
                })
            })
        })
    })
})


// @route POST api/manage/add
// @desc  添加学院
// @access private
router.post("/add", passport.authenticate("jwt", {
    session: false
}), function (req, res) {
    if (!req.body.depart || !req.body.depart_id || !req.body.depart_id_list || !req.body.depart_list) {
        res.status(200).json({
            status: 10001,
            msg: "非法请求"
        })
    }
    // 先查找是否有同名的学院
    let sql = "select * from collage_man where collage=?"
    connection.query(sql, [req.body.collage], function (err, ret) {
        if (err) {
            console.log("api/manage/add mysql select err:" + err)
            res.json({
                status: 10002,
                msg: "MYSQL manage select err"
            })
            return
        }
        if (ret != "") {
            res.json({
                status: 10015,
                msg: "该学院已存在"
            })
            return
        } else {
            // 当无同名的学院时，进行新学院的插入
            sql = "insert into collage_man values(0,?,?);"
            connection.query(sql, [req.body.depart_id, req.body.collage], function (err, ret) {
                if (err) {
                    console.log("api/manage/add mysql insert err:" + err)
                    res.json({
                        status: 10002,
                        msg: "MYSQL manage insert err"
                    })
                    return
                }
                res.json({
                    status: 200,
                    msg: "ok"
                })
            })
        }
    })
})

// @route POST api/manage/add2
// @desc 新建部门
// @access private
router.post("/add2", passport.authenticate("jwt", {
    session: false
}), function (req, res) {
    if (!req.body.depart) {
        res.status(200).json({
            status: 10001,
            msg: "非法请求"
        })
    }
    // 同样查询有无同名的部门
    let sql = "select * from depart_man where department=?"
    connection.query(sql, [req.body.depart], function (err, ret) {
        if (err) {
            console.log("api/manage/add2 mysql select err:" + err)
            res.json({
                status: 10002,
                msg: "MYSQL manage select err"
            })
            return
        }
        if (ret != "") {
            res.json({
                status: 10014,
                msg: "该部门已存在"
            })
            return
        } else {
            // 插入新部门
            sql = "insert into depart_man values(0,?);"
            connection.query(sql, [req.body.depart], function (err, ret) {
                if (err) {
                    console.log("api/manage/add2 mysql insert err:" + err)
                    res.json({
                        status: 10002,
                        msg: "MYSQL manage insert err"
                    })
                    return
                }
                res.json({
                    status: 200,
                    msg: "ok"
                })
            })
        }
    })
})


// @route POST api/manage/delete/collage/:id
// @desc 删除学院
// @access private
router.delete("/delete/collage/:id", passport.authenticate("jwt", {
    session: false
}), function (req, res) {
    let sql = "delete from collage_man where id=?"
    connection.query(sql, [req.params.id], function (err, ret) {
        if (err) {
            console.log("api/manage/delete/collage/:id mysql delete err:" + err)
            res.json({
                status: 10002,
                msg: "MYSQL manage delete err"
            })
            return
        }
        res.json({
            status: 200,
            msg: ""
        })
    })
})


// @route POST api/manage/delete/depart/:id
// @desc 删除部门（同时删除所属学院）
// @access private
router.delete("/delete/depart/:id", passport.authenticate("jwt", {
    session: false
}), function (req, res) {
    // 先删除所属的学院
    let sql = "delete from collage_man where depart_id=?"
    connection.query(sql, [req.params.id], function (err, ret) {
        if (err) {
            console.log("api/manage/delete/depart/:id mysql delete err:" + err)
            res.json({
                status: 10002,
                msg: "MYSQL manage delete err"
            })
            return
        }
        // 删除该部门
        sql = "delete from depart_man where id=?"
        connection.query(sql, [req.params.id], function (err, ret) {
            if (err) {
                console.log("api/manage/delete/:id mysql delete err:" + err)
                res.json({
                    status: 10002,
                    msg: "MYSQL manage delete err"
                })
                return
            }
            res.json({
                status: 200,
                msg: ""
            })
        })
    })
})





// @route DELETE api/manage/delete1/:studentid
// @desc 删除部门管理员
// @access private
router.delete("/delete1/:studentid", passport.authenticate("jwt", {
    session: false
}), function (req, res) {
    // 更新部门管理员的数据
    let sql = "update user_table set depart_man_id=0,identity='普通学生' where studentid=?;"
    connection.query(sql, [req.params.studentid], function (err, ret) {
        if (err) {
            console.log("api/manage/delete1 mysql update err:" + err)
            res.json({
                status: 10002,
                msg: "MYSQL manage update err"
            })
            return
        }
        res.json({
            status: 200,
            msg: ""
        })
    })
})



// @route DELETE api/manage/delete2/:studentid
// @desc 删除学院管理员
// @access private
router.delete("/delete2/:studentid", passport.authenticate("jwt", {
    session: false
}), function (req, res) {
    let sql = "update user_table set collage_man_id=0,identity='普通学生' where studentid=?;"
    connection.query(sql, [req.params.studentid], function (err, ret) {
        if (err) {
            console.log("api/manage/delete1 mysql update err:" + err)
            res.json({
                status: 10002,
                msg: "MYSQL manage update err"
            })
            return
        }
        res.json({
            status: 200,
            msg: ""
        })
    })
})




// @route POST api/manage/new/manager
// @desc 新建管理员(部门和学院)
// @access private
router.post("/new/manager", passport.authenticate("jwt", {
    session: false
}), function (req, res) {
    // console.log(req.body)
    if (!req.body.title || !req.body.name || !req.body.studentid) {
        res.status(200).json({
            status: 10001,
            msg: "非法请求"
        })
        return
    }
    let sql = "select * from user_table where name=? and studentid=?;"
    let man_id = 0
    // 验证学号与姓名是否匹配
    connection.query(sql, [req.body.name, req.body.studentid], function (err, ret) {
        if (err) {
            console.log("api/manage/new/manager mysql select err:" + err)
            res.json({
                status: 10002,
                msg: "MYSQL manage select err"
            })
            return
        }
        if (ret == "") {
            res.json({
                status: 10016,
                msg: "学号与姓名不相符"
            })
            return
        } else {
            // 通过上传的数据判断是新增部门管理员还是学院管理员
            if (req.body.title === "新增部门管理员") {
                sql = "update user_table set depart_man_id=?,identity='部门管理员' where studentid=?;"
                man_id = req.body.depart_id
            } else if (req.body.title === "新增学院管理员") {
                sql = "update user_table set collage_man_id=?,identity='部门管理员' where studentid=?;"
                man_id = req.body.collage_id
            } else {
                res.status(200).json({
                    status: 10001,
                    msg: "非法请求"
                })
                return
            }
            // console.log(sql, man_id, req.body.studentid)
            connection.query(sql, [man_id, req.body.studentid], function (err, ret) {
                // console.log(ret)
                if (err) {
                    console.log("api/manage/new/manager mysql update err:" + err)
                    res.json({
                        status: 10002,
                        msg: "MYSQL manage update err"
                    })
                    return
                }
                res.json({
                    status: 200,
                    msg: "ok"
                })
            })
        }
    })
})


// @route POST api/manage/edit/manager
// @desc 编辑管理员(部门和学院)
// @access private
router.post("/edit/manager", passport.authenticate("jwt", {
    session: false
}), function (req, res) {
    if (!req.body.title || !req.body.name || !req.body.studentid) {
        res.status(200).json({
            status: 10001,
            msg: "非法请求"
        })
        return
    }
    let sql = "select * from user_table where name=? and studentid=?;"
    let man_id = 0
    // 验证学号与姓名是否匹配
    connection.query(sql, [req.body.name, req.body.studentid], function (err, ret) {
        if (err) {
            console.log("api/manage/edit/manager mysql select err:" + err)
            res.json({
                status: 10002,
                msg: "MYSQL manage select err"
            })
            return
        }
        if (ret == "") {
            res.json({
                status: 10016,
                msg: "学号与姓名不相符"
            })
            return
        } else {
            // 通过上传的数据判断是编辑部门管理员还是学院管理员
            // 删除老的管理员
            if (req.body.title === "编辑部门管理员") {
                sql = "update user_table set depart_man_id=0 where studentid=?;"
            } else if (req.body.title === "编辑学院管理员") {
                sql = "update user_table set collage_man_id=0 where studentid=?;"
            } else {
                res.status(200).json({
                    status: 10001,
                    msg: "非法请求"
                })
                return
            }
            connection.query(sql, [req.body.oldStudentid], function (err, ret) {
                if (err) {
                    console.log("api/manage/edit/manager mysql update err:" + err)
                    res.json({
                        status: 10002,
                        msg: "MYSQL manage update err"
                    })
                    return
                }

                // 通过上传的数据判断是编辑部门管理员还是学院管理员
                if (req.body.title === "编辑部门管理员") {
                    sql = "update user_table set depart_man_id=? where studentid=?;"
                    man_id = req.body.depart_id
                } else if (req.body.title === "编辑学院管理员") {
                    sql = "update user_table set collage_man_id=? where studentid=?;"
                    man_id = req.body.collage_id
                } else {
                    res.status(200).json({
                        status: 10001,
                        msg: "非法请求"
                    })
                    return
                }
                connection.query(sql, [man_id, req.body.studentid], function (err, ret) {
                    if (err) {
                        console.log("api/manage/edit/manager mysql update err:" + err)
                        res.json({
                            status: 10002,
                            msg: "MYSQL manage update err"
                        })
                        return
                    }
                    res.json({
                        status: 200,
                        msg: "ok"
                    })
                })
            })
        }
    })
})

// @route POST api/manage/edit/departcollage
// @desc 编辑部门和学院
// @access private
router.post("/edit/departcollage", passport.authenticate("jwt", {
    session: false
}), function (req, res) {
    if (!req.body.depart_id) {
        res.status(200).json({
            status: 10001,
            msg: "非法请求"
        })
        return
    }
    let sql = "select * from depart_man where department=? and id!=?"
    connection.query(sql, [req.body.department, req.body.depart_id], function (err, ret) {
        if (err) {
            console.log("api/manage/edit/departcollage mysql select err:" + err)
            res.json({
                status: 10002,
                msg: "MYSQL manage select err"
            })
            return
        }
        if (ret != "") {
            res.json({
                status: 10014,
                msg: "该部门已存在"
            })
            return
        } else {
            sql = "update depart_man set department=? where id=?"
            connection.query(sql, [req.body.department, req.body.depart_id], function (err, ret) {
                if (err) {
                    console.log("api/manage/edit/departcollage mysql update err:" + err)
                    res.json({
                        status: 10002,
                        msg: "MYSQL manage update err"
                    })
                    return
                }
                if (req.body.collage_id) {
                    let sql = "select * from collage_man where collage=? and id!=?"
                    connection.query(sql, [req.body.collage, req.body.collage_id], function (err, ret) {
                        if (err) {
                            console.log("api/manage/edit/departcollage mysql select2 err:" + err)
                            res.json({
                                status: 10002,
                                msg: "MYSQL manage select2 err"
                            })
                            return
                        }
                        if (ret != "") {
                            res.json({
                                status: 10014,
                                msg: "该学院已存在"
                            })
                            return
                        } else {
                            sql = "update collage_man set collage=? where id=?"
                            connection.query(sql, [req.body.collage, req.body.collage_id], function (err, ret) {
                                if (err) {
                                    console.log("api/manage/edit/departcollage mysql update2 err:" + err)
                                    res.json({
                                        status: 10002,
                                        msg: "MYSQL manage update2 err"
                                    })
                                    return
                                }
                                res.json({
                                    status: 200,
                                    msg: "ok"
                                })
                            })
                        }
                    })
                } else {
                    sql = "insert into collage_man values(0,?,?);"
                    connection.query(sql, [req.body.depart_id, req.body.collage], function (err, ret) {
                        if (err) {
                            console.log("api/manage/edit/departcollage mysql insert err:" + err)
                            res.json({
                                status: 10002,
                                msg: "MYSQL manage insert err"
                            })
                            return
                        }
                        res.json({
                            status: 200,
                            msg: "ok"
                        })
                    })
                }
            })
        }
    })
})





module.exports = router