function StringFormat() {
    if (arguments.length == 0)
        return null;
    var str = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
        str = str.replace(re, arguments[i]);
    }
    return str;
}

// console.log(StringFormat("123'{0}'", "4"))

function repeatStr(str, num) {
    return num > 1 ? str.repeat(num) : str;
}
// console.log(repeatStr('?', 3));
// let data = "1分"
// a = data.find(1)
let sql = "insert into moral_edu(id,user_id,act_id,{0},{1}) values(0,?,?,?,{2});"
scores = [
    "2分",
    "5分",
]
temp1 = []
temp2 = []
eduType = {
    "德育": "moral_edu",
    "智育": "intellectual_edu",
    "体育": "sports_edu",
    "美育": "aesthetic_edu",
    "劳育": "labor_edu",
}
for (let i = 0; i < scores.length; i++) {
    temp1[i] = "?"
    temp2[i] = "name" + (i + 1)
}

console.log(StringFormat(sql, eduType["德育"], temp2.join(","), temp1.join(",")))


"select user_act_score4_view.*,labor_edu.labor_education from user_act_score4_view left join labor_edu on user_act_score4_view.act_id=labor_edu.act_id and user_act_score4_view.id=labor_edu.user_id;"