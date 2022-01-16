const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const urlencodeParser = bodyParser.urlencoded({
    extended: false
});

app.use("/public", express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index2.html")
})

app.post("/process_post", urlencodeParser, function (req, res) {
    let data = {
        "firstname": req.body.firstname,
        "lastname": req.body.lastname,
    };
    console.log(data);
    res.send(JSON.stringify(data));
})

app.listen(8888);

console.log("Server start at 127.0.0.1:8888");