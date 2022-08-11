const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require("./config")
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

// 调用数据库
const mysql = require("mysql")
const connection = mysql.createConnection(config.mysqlConfig)
connection.connect(function (err) {
    if (!err) {
        console.log("PASSPORT mysql connect success!")
    }
})

// 这边使用了passport这个模块，对用户的状态进行检查，保证用户已登录
module.exports = passport => {
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        let sql = "select * from user_table where studentid=?"
        connection.query(sql, jwt_payload.studentid, function (err, ret) {
            if (err) {
                console.log("passport jwt err:" + err)
                return done(null, false)
            }
            if (ret == "") {
                console.log("无效的TOKEN")
                return done(null, false)
            }
            // 将用户的信息保存在req.user中，方便下次调用
            // console.log(ret[0].studentid)
            return done(null, ret[0])
        })
    }))
}

//