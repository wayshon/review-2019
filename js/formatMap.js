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
            setValue(result, key, obj[key]);
            console.log(result)
        }
    }

    find(data);
    return result;
}

console.log(JSON.stringify(fn2(output)))

function getValue(obj, keys) {
    const list = keys.split('.');
    let r;
    for (let v of list) {
        r = r ? r[v] : obj[v];
    }
    return r;
}

function setValue(obj, keys, val) {
    const list = keys.split('.');
    let temp;
    for (let i = 0; i < list.length; i++) {
        if (i === list.length - 1) {
            temp[list[i]] = val;
        } else if (temp) {
            if (temp[list[i]]) {
                temp = temp[list[i]];
            } else {
                let t = {};
                temp[list[i]] = t;
                temp = t;
            }
        } else {
            if (obj[list[i]]) {
                temp = obj[list[i]];
            } else {
                temp = {};
                obj[list[i]] = temp;
            }
        }
    }
}