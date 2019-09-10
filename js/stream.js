const fs = require('fs');
const rs = fs.createReadStream('README.md');

/**
 * 方法 1
 */
const ws1 = fs.createWriteStream('ws1.md');
rs.pipe(ws1);

/**
 * 方法 2，其实与方法1一样，方法1更好不用监听事件关闭
 */
const ws2 = fs.createWriteStream('ws2.md');
rs.on("data", (buffer) => {
    ws2.write(chunk);
});
rs.on("end", function () {
    ws.end();
});

/**
 * 方法 3
 */
fs.readFile('README.md', (error, buffer) => {
    if (!error) {
        fs.writeFile('ws3.md', buffer, (err) => {
            console.log(err)
        })
    }
})