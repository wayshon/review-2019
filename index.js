/**
 * 防抖函数
 * @param {Function} fn 
 * @param {int} ms 
 * @param {*} ctx 
 */
function debunce(fn, ms, ctx) {
    let timer;
    return function (...params) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(ctx, params);
        }, ms);
    }
}

/**
 * 节流函数
 * @param {Function} fn 
 * @param {int} ms 
 * @param {*} ctx 
 */
function tro(fn, ms, ctx) {
    let result;
    let lastTime;
    return function(...params) {
        if (Date.now() - lastTime < ms) {
            return result;
        }
        result = fn.apply(ctx, params);
        lastTime = Date.now();
        return result;
    }
}

function t() {
    this.n += 1;
    return this.n;
}
const ttt = tro(t, 2000, { n: 1 });
let i = 1000;
function temp() {
    ttt();
    if (i--) {
        setTimeout(() => {
            temp();
        }, 200);
    }
}

temp();
