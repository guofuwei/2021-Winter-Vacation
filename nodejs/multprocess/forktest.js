const childProcess = require("child_process");

for (let i = 0; i < 3; i++) {
    let workerProcess = childProcess.fork("support.js", [i]);
    workerProcess.on("close", function (code) {
        console.log("子进程已退出，退出码为%d", code);
    });
}