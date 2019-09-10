/**
 * 实现一个函数，要求这个函数只能被 new 调用，否则报错
 * 讲解普通调用与 new 调用，函数内部 this 的区别
 */
// function Func() {
//     if (!(this instanceof Func)) {
//         throw new TypeError('must call by new');
//     }
// }
// Func();
// new Func();

/**
 * 普通函数调用，内部this指向全局环境，node里是global，浏览器是window
 */
// var a = 111;
// function func1() {
//     let b = 222;
//     var c = 333;
//     d = 555;
//     this.e = 666;
//     return this;
// }
// console.log(func1() === global); // true

/**
 * 闭包，得看外层的函数是怎么被调用的
 */
// var a = 111;
// function func2() {
//     let b = 222;
//     var c = 333;
//     d = 555;
//     this.e = 666;
//     var _that = this;
//     return function() {
//         return _that;
//     }
// }
// console.log(func2()()); // global
// var obj = { msg: 'I am Obj.msg =========== ', func: func2};
// console.log(func2.call(obj)()); // obj
// console.log(obj.func()()) // obj

/**
 * 模拟箭头函数是怎么生成的
 */
// const func3 = function() {
//     var a = 111;
//     this.b = 222;
//     const arrowFn = (function() {
//         console.log(this);
//     }).bind(this);
//     const fn = function() {
//         console.log(this);
//     }
//     return { arrowFn, fn };
// };
// const { arrowFn, fn } = func3.call({ msg: 'I am Obj.msg =========== ' });
// arrowFn(); // obj
// fn(); // global