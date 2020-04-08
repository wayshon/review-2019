class Watcher {
    constructor(data, key, cb) {
        this.data = data;
        this.key = key;
        this.cb = cb;
        this.value = this.init();  // 将自己添加到订阅器的操作
    }
    init() {
        Dep.target = this;  // 缓存自己
        let value = this.data[this.key]  // 强制执行监听器里的get函数
        Dep.target = null;  // 释放自己
        return value;
    }
    update() {
        let value = this.data[this.key];
        let oldVal = this.value;
        if (value !== oldVal) {
            this.value = value;
            this.cb(this.value);
        }
    }
}