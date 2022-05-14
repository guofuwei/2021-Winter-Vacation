const fs = require("fs")

const path = require("path")

const regStyle = /<style>[\s\S]*<\/style>/
const regScript = /<script>[\s\S]*<\/script>/

// 开始读取文件
fs.readFile(path.join(__dirname, "./src/index.html"), "utf8", function (err, data) {
    if (err) {
        console.error("读取index.html错误:" + err)
        return
    }
    // 调用相对应的方法
    resolveHTML(data)
    resolveCSS(data)
    resolveJS(data)
})

function resolveHTML(data) {
    newData = data.replace(regStyle, "<link rel='stylesheet' href='./index.css'/>")
        .replace(regScript, "<script src='./index.js'></script>")
    fs.writeFile(path.join(__dirname, "./clock/index.html"), newData, function (err) {
        if (err) {
            console.error("转化index.html错误:" + err)
        }
        console.log("写入index.html成功")
    })
}

function resolveCSS(data) {
    const regCSS = regStyle.exec(data)
    const newCSS = regCSS[0].replace("<style>", "").replace("</style>", "")
    fs.writeFile(path.join(__dirname, "./clock/index.css"), newCSS, function (err) {
        if (err) {
            console.log("转化index.css错误:" + err)
            return
        }
        console.log("写入index.css文件成功")
    })
}

function resolveJS(data) {
    const regJS = regScript.exec(data)
    const newJS = regJS[0].replace("<script>", "").replace("</script>", "")
    fs.writeFile(path.join(__dirname, "./clock/index.js"), newJS, function (err) {
        if (err) {
            console.log("转化index.js错误:" + err)
            return
        }
        console.log("写入index.js文件成功")
    })
}