var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];

function flat(list) {
    const map = {};
    const deep = (params) => {
        for (let v of params) {
            if (Array.isArray(v)) {
                deep(v);
            } else {
                map[v] = v;
            }
        }
    }
    deep(list);
    const results = [];
    for (const key in map) {
        results.push(map[key]);
    }
    return results.sort((a, b) => a - b);
}

function flat2(list) {
    while(list.find(v => Array.isArray(v))) {
        list = [].concat(...list)
    }
    const map = {};
    for (let v of list) {
        map[v] = v;
    }
    const results = [];
    for (const key in map) {
        results.push(map[key]);
    }
    return results.sort((a, b) => a - b);
}

const list = flat2(arr);
console.log(list)