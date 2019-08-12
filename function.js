/**
 * 实现一个函数，要求这个函数只能被 new 调用，否则报错
 * 讲解普通调用与 new 调用，函数内部 this 的区别
 */
function Func() {
    if (!(this instanceof Func)) {
        throw new TypeError('must call by new');
    }
}
Func();
new Func();