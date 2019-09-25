/**
 * 把一个对象的每一项都转化成可观测对象
 * @param { Object } obj 对象
 */
function observable(obj) {
    if (!obj || typeof obj !== 'object') {
        return;
    }
    let keys = Object.keys(obj);
    keys.forEach((key) => {
        defineReactive(obj, key, obj[key])
    })
    return obj;
}
/**
 * 使一个对象转化成可观测对象
 * @param { Object } obj 对象
 * @param { String } key 对象的key
 * @param { Any } val 对象的某个key的值
 */
function defineReactive(obj, key, val) {
    let dep = new Dep();
    Object.defineProperty(obj, key, {
        get() {
            dep.depend();
            return val;
        },
        set(newVal) {
            val = newVal;
            dep.notify(); //数据变化通知所有订阅者
        }
    })
}
class Dep {
    constructor() {
        this.subs = []
    }
    //增加订阅者
    // subs里面的watcher有很多个关心不同key的watcher
    addSub(sub) {
        this.subs.push(sub);
    }
    //判断是否增加订阅者
    depend() {
        if (Dep.target) {
            this.addSub(Dep.target)
        }
    }

    //通知订阅者更新
    // 当任何key触发set都会通知所有watcher更新，但是在watcher内部有判断，如果自己关心的值没变，就不会触发dom操作
    notify() {
        console.log('sub =====  ', this.subs);
        this.subs.forEach((sub) => {
            sub.update()
        })
    }

}
Dep.target = null;



/**
 * get 是收集依赖，即当set触发的时候，知道自己究竟要更新哪些依赖，否做你set里面也不知道 querySlect谁啊
 * get 收集的依赖是 watcher，这个watcher其实就是个打工的，负责更新dom
 * 问：那么问题来了，为什么需要 deps，与全局变量Dep.target
 * 答：首先每个key都会建立新的 deps 数组，但是一个key可能会被多个dom监听，比如页面中多个 {{ name }}，只要name变了，需要所有的watcher都触发更新
 */