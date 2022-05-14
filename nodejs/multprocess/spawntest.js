const childProcess = require("child_process");
for (let i = 0; i < 3; i++) {
    let workerProcess = childProcess.spawn("node", ["support.js", i]);
    workerProcess.stdout.on("data", function (data) {
        console.log("stdout:" + data);
    });
    workerProcess.stderr.on("data", function (data) {
        console.log("stderr:" + data);
    });
    workerProcess.on("close", function (code) {
        console.log("退出码为:", code);
    });
}