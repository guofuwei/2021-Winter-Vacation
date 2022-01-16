const util = require("util");

function Base() {
    this.name = "base";
    this.year = 1991;
    this.sayHello = function () {
        console.log("Hello," + this.name);
    };
};

Base.prototype.showName = function () {
    console.log(this.name);
};

function Sub() {
    this.name = "sub";
};

util.inherits(Sub, Base);
let objSub = new Sub();
objSub.showName();
console.log(util.inspect(Base));