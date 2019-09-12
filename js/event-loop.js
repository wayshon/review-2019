/**
 * 宏任务最快
 * nextTick 是插在微任务前面
 * 微任务
 * 事件队列
 */
setImmediate(() => console.log(1));
setTimeout(() => {
    console.log(2);
}, 0);
Promise.resolve().then(() => console.log(3));
process.nextTick(() => console.log(4)); // 在微任务队列前面插入
console.log(5);

/**
 * 情况1
 * 先timers，执行
 * 再IO，没有
 * 遇到setImmediate执行
 * 结果：先 setTimeout，再 setImmediate
 */
setImmediate(() => {
    console.log('setImmediate');
});
setTimeout(() => {
    console.log('setTimeout');
}, 0);

/**
 * 情况2
 * 先timers，但是没有timers
 * 执行IO
 * 遇到 timers，扔入队列
 * 遇到setImmediate执行
 * 再次循环，遇到timers，执行
 * 结果 先 setImmediate，再 setTimeout
 */
const fs = require('fs');
fs.readFile(__filename, () => {
    setTimeout(() => {
        console.log('setTimeout');
    }, 0);
});
setImmediate(() => {
    console.log('setImmediate');
});