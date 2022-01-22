var time = "2022-12-31T16:00:00.000Z";
var d = new Date(time);
var times = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
console.log(times)