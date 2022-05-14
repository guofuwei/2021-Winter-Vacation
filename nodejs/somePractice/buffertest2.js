const buf = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5]);
const json = JSON.stringify(buf);

// 输出: {"type":"Buffer","data":[1,2,3,4,5]}
console.log(json);

const copy = JSON.parse(json, (key, value) => {
    return value && value.type === 'Buffer' ?
        Buffer.from(value.data) :
        value;
});

// 输出: <Buffer 01 02 03 04 05>
console.log(copy);

buffer1 = Buffer.from("菜鸟教程");
buffer2 = Buffer.from("runoob");
buffer3 = Buffer.concat([buffer1, buffer2]);
console.log("buffer3:", buffer3.toString());

let ret = buffer1.compare(buffer2);
console.log(ret);
console.log(buffer2.slice(0, 2).toString());
console.log("buffer1 length:", buffer1.length);