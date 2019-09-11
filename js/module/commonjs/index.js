// console.log('main 开始');
// const a = require('./a.js');
// const b = require('./b.js');
// console.log('在 main 中，a.done=%j，b.done=%j', a.done, b.done);

// const demo1 = require('./demo1.js');
// const demo2 = require('./demo2.js');
// const demo = require('./demo.js');

var m = require('./even');
m.even(10)
console.log(m.counter())