export default class Storage {
    static trySetCount = 0;

    static async set({ key, value, age }) {
        let item;
        try {
            item = JSON.stringify({
                value,
                age: age ? age * 1000 + Date.now() : undefined,
            })
        } catch (e) {
            throw new TypeError('invalid value');
        }

        Storage.trySetCount = 0;
        await Storage.setItem(key, item);
    }

    static async setItem(key, item) {
        try {
            localStorage.setItem(key, item);
        } catch (e) {
            // 0 代表第一次存储，1代表已经清除后再存储，如果清除了还是存不进，就报错
            if (Storage.trySetCount > 0) {
                throw e;
            }
            Storage.filterDeadline();
            Storage.trySetCount++;
            Storage.setItem(key, item);
        }
    }

    static get(key) {
        const item = JSON.parse(localStorage.getItem(key));
        return item.age < Date.now() ? undefined : item.value;
    }

    static filterDeadline() {
        for (let i = localStorage.length - 1; i >= 0; i--) {
            const key = localStorage.key(i);
            const item = JSON.parse(localStorage.getItem(key));
            if (item.age < Date.now()) {
                localStorage.removeItem(key);
            }
        }
    }
}