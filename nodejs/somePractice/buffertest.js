const buf = Buffer.from("runoob");
console.log(buf.toString("utf-8"));

var buf2 = Buffer.alloc(1024);
len = buf2.write("runoob is a good learn web");
console.log(len);
console.log(buf2.toString());

var buf3 = Buffer.alloc(26);
for (var i = 0; i < 26; i++) {
    buf[i] = i + 97;
}
console.log(buf3.toString("utf-8"));