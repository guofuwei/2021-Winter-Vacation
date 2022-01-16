const fs = require("fs")



fs.readFile(__dirname + "/files/score.txt", "utf8", function (err, data) {
    if (err) {
        console.error(err)
        return
    }
    let arrOld = data.split(" ");
    console.log(arrOld)
    let arrNew = []
    arrOld.forEach(item => {
        arrNew.push(item.replace("=", ":"))
    })
    console.log(arrNew)
    let newStr = arrNew.join("\r\n")
    console.log(newStr)
    fs.writeFile(__dirname + "/files/scoreX.txt", newStr, function (err) {
        if (err) {
            console.error(err)
            return
        }
    })
})