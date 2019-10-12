function LazyMan(name) {
    console.log(`Hi I am ${name}`);
    const ctx = {
        task: new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 5000);
        }),
        name,
        sleep: function(num) {
            this.task = new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve();
                }, num * 1000);
            })
            return this;
        },
        sleepFirst: function(num) {
            this.task = new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve();
                }, num * 1000);
            })
            return this;
        },
        eat: function(food) {
            this.task.then(() => console.log(`I am eating ${food}`));
            return this;
        }
    };
    return ctx;
}

// LazyMan('Tony').sleep(10).eat('lunch');
// LazyMan('Tony').eat('lunch').sleep(10).eat('dinner');
LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(10).eat('junk food');
// Hi I am Tony
// 等待了5秒...
// I am eating lunch
// I am eating dinner
// 等待了10秒...
// I am eating junk food

/************************ 下一题 */

// add(1); 			// 1
// add(1)(2);  	// 3
// add(1)(2)(3); // 6
// add(1)(2, 3); // 6
// add(1, 2)(3); // 6
// add(1, 2, 3); // 6

const add = function(...params) {
    let sum = 0;
    params.forEach(v => sum += v);
    const fn = add.bind(null, sum);
    fn.toString = function() {
        return sum;
    }
    return fn;
}

console.log(add(1, 2, 3) == 6)
