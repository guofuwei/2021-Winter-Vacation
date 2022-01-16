function Hello() {
    var name;
    this.setName = function (thename) {
        console.log("已成功设置" + thename + "为name");
        name = thename;
    };
    this.sayHello = function () {
        console.log("hello " + name);
    };
    var test = "test";
}
module.exports = Hello