var entry = {
    a: {
        b: {
            c: {
                dd: 'abcdd'
            },
            e: 'ee'
        },
        d: {
            xx: 'adxx'
        },
        e: 'ae'
    }
}

// 要求转换成如下对象
var output = {
    'a.b.c.dd': 'abcdd',
    'a.b.e': 'ee',
    'a.d.xx': 'adxx',
    'a.e': 'ae'
}


function fn1(data) {
    const result = {};
    const list = [];

    const find = function (obj) {
        for (let key in obj) {
            list.push(key);
            if (Object.prototype.toString.call(obj[key]) !== '[object Object]') {
                const k = list.join('.');
                result[k] = obj[key];
                list.pop();
            } else {
                find(obj[key]);
            }
        }
        list.pop();
    }

    find(data);
    return result;
}
console.log(fn1(entry))

function fn2(data) {
    const result = {};

    const find = function (obj) {
        for (let key in obj) {
            const list = key.split('.');
            let temp;
            for (let i = list.length - 1; i >= 0; i--) {
                if (i === 0) {
                    if (result[list[0]]) {
                        result[list[0]] = Object.assign(result[list[0]], temp);
                    } else {
                        result[list[0]] = temp;
                    }
                } if (i === list.length - 1) {
                    const item = {};
                    item[list[i]] = obj[key];
                    temp = item;
                } else {
                    const item = {};
                    if (item[list[i]]) {
                        item[list[i]] = Object.assign(item[list[i]], temp);
                    } else {
                        item[list[i]] = temp;
                    }
                    temp = item;
                }
            }
        }
    }

    find(data);
    return result;
}
console.log(JSON.stringify(fn2(output)))