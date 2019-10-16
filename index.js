// function fn(list) {
//     const map = {};
//     for (let v of list) {
//         const key = JSON.stringify(v);
//         if (!map[key]) {
//             map[key] = v;
//         }
//     }
//     const results = [];
//     for (let key in map) {
//         results.push(map[key]);
//     }
//     return results;
// }
// console.log(fn([123, {a: 1}, {a: {b: 1}}, {a: "1"}, {a: {b: 1}}, "meili"]))

function fn(str) {
    const map = {};
    const list = str.split('');
    for (let v of list) {
        if (map[v]) {
            map[v] += 1;
        } else {
            map[v] = 1;
        }
    }

    let result = {
        key: '',
        count: 0
    };
    for (let key in map) {
        if (map[key] > result.count) {
            result.count = map[key];
            result.key = key;
        }
    }
    return result;
}

const s = 'abcaakjbb'
console.log(fn(s));