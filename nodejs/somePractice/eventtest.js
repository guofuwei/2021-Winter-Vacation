var events = require("events");

var eventEmitter = new events.EventEmitter();

var connectHanler = function connected() {
    console.log('连接成功');
    eventEmitter.emit("data_recv");
}

eventEmitter.on("connect", connectHanler);

eventEmitter.on("data_recv", function () {
    console.log("数据接收成功");
})
eventEmitter.emit("connect");
console.log("程序执行完毕");

var event1 = new events.EventEmitter();
event1.on("something", function (arg1, arg2) {
    console.log("arg1:", arg1);
    console.log("arg2:", arg2);
})
event1.emit("something", 1, 2);