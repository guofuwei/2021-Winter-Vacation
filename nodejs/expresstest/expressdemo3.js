const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const util = require("util");

app.use("/public", express.static("public"));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(multer({
    dest: "./tmp"
}).array("image"));
app.use(cookieParser());

app.get("/", function (req, res) {
    console.log(util.inspect(req.cookies));
    res.sendFile(__dirname + "/index3.html");
});

app.post("/file_upload", function (req, res) {
    console.log(req.files[0]); // 上传的文件信息
    let dest_file = __dirname + "/" + req.files[0].originalname;
    fs.readFile(req.files[0].path, function (err, data) {
        fs.writeFile(dest_file, data, function (err) {
            if (err) {
                console.error(err);
            } else {
                response = {
                    "message": "File upload successfully",
                    filename: req.files[0].originalname,
                };
            }
            console.log(response)
            res.end(JSON.stringify(response));
        });
    });
});

app.listen(8888);

console.log("Server start at 127.0.0.1:8888");