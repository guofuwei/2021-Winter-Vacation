const {
    path
} = require("express/lib/application");
const http = require("http");

let options = {
    host: "localhost",
    port: "8888",
    path: "/index.html",
};

let callback = function (response) {
    let body = "";
    response.on("data", function (data) {
        body += data;
    });
    response.on("end", function () {
        console.log(body);
    });

}

let req = http.request(options, callback);
req.end()
