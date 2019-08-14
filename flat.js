const origin = [
    { "id": 1, "pid": 0, "name": "节点1" },
    { "id": 2, "pid": 0, "name": "节点2" },
    { "id": 3, "pid": 1, "name": "子节点3" },
    { "id": 4, "pid": 1, "name": "子节点4" },
    { "id": 5, "pid": 2, "name": "子节点5" },
    { "id": 6, "pid": 2, "name": "子节点6" },
    { "id": 7, "pid": 3, "name": "子节点7" },
    { "id": 8, "pid": 6, "name": "子节点8" },
    { "id": 9, "pid": 8, "name": "子节点9" },
];

// function calc() {
//     const result = [];
//     for (let val of origin) {
//         const index = result.findIndex(v => v.id === val.pid);
//         if (index > -1) {
//             if (!Array.isArray(result[index].nodes)) {
//                 result[index].nodes = [];
//             }
//             result[index].nodes.push(val);
//         } else {
//             result.push(val);
//         }
//     }
//     return result;
// }

function calc() {
    const result = [];
    const handle = (val, item) => {
        if (val.pid === item.id) {
            if (!Array.isArray(item.nodes)) {
                item.nodes = [];
            }
            item.nodes.push(val);
        } else if (Array.isArray(item.nodes)) {
            for (let v of item.nodes) {
                handle(val, v);
            }
        }
    }
    for (let val of origin) {
        if (val.pid === 0) {
            result.push(val);
        } else {
            for (let item of result) {
                handle(val, item);
            }
        }
    }
    return result;
}

const result = calc();
console.log(JSON.stringify(result))