var events = require("events");

var listener1 = function () {
    console.log("listener1 start!");
}

var listener2 = function () {
    console.log("listener2 start!");
}

var listener3 = function () {
    console.log("listener3 start!");
}

var event1 = new events.EventEmitter();
event1.addListener("something", listener1);
event1.on("something", listener2);

console.log("现在有", event1.listenerCount("something"), "监听事件");
event1.emit("something");

event1.removeListener("something", listener1);
console.log("listener1 is not be listenered!");
console.log("现在有", event1.listenerCount("something"), "监听事件");

event1.on("nothing", listener3);
event1.emit("nothing");