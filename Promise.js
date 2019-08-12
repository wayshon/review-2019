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
            return Pro.resolve(result);
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