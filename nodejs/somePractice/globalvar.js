console.log(__filename);
console.log(__dirname);

function helloWorld() {
    console.log("Hello World");
}

// let t = setInterval(helloWorld, 2000);
console.log("这是第%d函数", 1);
console.error("这是一条错误信息");
console.warn("这是一条警告信息");
// console.trace()
console.time("获取数据");
// setTimeout(helloWorld, 2000);
console.timeEnd("获取数据");

process.on("exit", function (code) {
    setTimeout(function () {
        console.log("该代码不会执行");
    }, 0);
    console.log("退出码为:", code);
})
console.log("程序执行结束");