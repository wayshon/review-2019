setImmediate(() => console.log(1));
setTimeout(() => {
    console.log(2);
}, 0);
Promise.resolve().then(() => console.log(3));
process.nextTick(() => console.log(4)); // 在微任务队列前面插入
console.log(5);