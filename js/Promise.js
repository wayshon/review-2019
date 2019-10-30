const PENDING = 'PENDING';
const RESOLVED = 'RESOLVED';
const REJECTED = 'REJECTED';

class Pro {
    static resolve(value) {
        if (value instanceof Pro) {
            return value;
        }
        return new Pro(resolve => resolve(value))
    }

    static reject(err) {
        if (err instanceof Pro) {
            return err;
        }
        return new Pro((resolve, reject) => reject(err))
    }

    constructor(fn) {
        this.value = undefined;
        this.error = undefined;
        this.status = PENDING;

        // 维护一个 resolve/pending 的函数队列
        this.resolveFns = [];
        this.rejectFns = [];

        const resolve = (value) => {
            this.value = value;
            this.status = RESOLVED;
            this.resolveFns.forEach(({ fn, resolve: res, reject: rej }) => res(fn(value)));
        }

        const reject = (e) => {
            this.error = e;
            this.status = REJECTED;
            this.rejectFns.forEach(({ fn, resolve: res, reject: rej }) => rej(fn(e)))
        }

        fn(resolve, reject);
    }

    then (fn) {
        if (this.status === RESOLVED) {
            const result = fn(this.value);
            // 需要返回一个 Promise
            // 如果状态为 resolved，直接执行
            return Pro.resolve(result);
        }
        if (this.status === PENDING) {
            // 也是返回一个 Promise
            return new Pro((resolve, reject) => {
                this.resolveFns.push({ fn, resolve, reject });
            });
        }
    }

    catch (fn) {
        if (this.status === REJECTED) {
            const result = fn(this.value);
            return Pro.reject(result);
        }
        if (this.status === PENDING) {
            return new Pro((resolve, reject) => {
                this.rejectFns.push({ fn, resolve, reject });
            })
        }
    }
}

const p = new Pro((resolve, reject) => {
    setTimeout(() => {
        resolve(666)
    }, 2000);
})
p.then(v => {
    console.log(v);
    return 888;
}).then(v => console.log(v))

/**************************************  promise 练习题 */
// const p1 = Promise.resolve(1);
// const p2 = Promise.reject(2);
// const p3 = Promise.resolve(3);
// const p4 = Promise.reject(4);
// const p5 = 5;

/**
 * 实现 Promise.all
 */
// Promise.myAll = function (list) {
//     return new Promise((resolve, reject) => {
//         const success = [], errors = [];
//         let len = list.length;
//         list.forEach(p => {
//             if (!(p instanceof Promise)) {
//                 p = Promise.resolve(p);
//             }
//             p.then(v => success.push(v), e => errors.push(e)).then(() => {
//                 len--;
//                 if (len === 0) {
//                     errors.length > 0 ? reject(errors) : resolve(success);
//                 }
//             });
//         });
//     });
// }
// // Promise.myAll([p1, p2, p3, p4, p5]).then(v => console.log(v)).catch(e => console.log(e));

// /**
//  * 实现 Promise.race
//  */
// Promise.myRace = function (list) {
//     return new Promise((resolve, reject) => {
//         let isSuccess = false;
//         for (let p of list) {
//             if (!(p instanceof Promise)) {
//                 p = Promise.resolve(p);
//             }
//             p.then(v => {
//                 if (!isSuccess) {
//                     isSuccess = true;
//                     resolve(v);
//                 }
//             }, e => {
//                 if (!isSuccess) {
//                     isSuccess = true;
//                     reject(e);
//                 }
//             });
//         }
//     });
// }
// // Promise.myRace([p2, p3, p4, p5, p1]).then(v => console.log(v)).catch(e => console.log(e));


// /**
//  * @param {*} list promise 数组
//  * @param {*} count 最多同时并发的数量
//  */
// function pTool(list, count) {
//     const initArray = list.splice(0, count);
//     const next = () => list.length && deal(list.shift());
//     const deal = (p) => {
//         if (!(p instanceof Promise)) {
//             Promise.resolve(p).then(next);
//         } else {
//             p.then(next);
//         }
//     }
//     for (let i = 0; i < initArray.length; i++) {
//         const p = list[i];
//         deal(p);
//     }
// }

// const p1 = new Promise((r, j) => {
//     setTimeout(() => {
//         console.log(1)
//         r();
//     }, 1000);
// })
// const p2 = new Promise((r, j) => {
//     setTimeout(() => {
//         console.log(2)
//         r();
//     }, 2000);
// })
// const p3 = new Promise((r, j) => {
//     setTimeout(() => {
//         console.log(3)
//         r();
//     }, 1000);
// })
// const p4 = new Promise((r, j) => {
//     setTimeout(() => {
//         console.log(4)
//         r();
//     }, 2000);
// })
// const p5 = new Promise((r, j) => {
//     setTimeout(() => {
//         console.log(5)
//         r();
//     }, 1000);
// })

// pTool([p1, p2, p3, p4, p5], 2);