const citys = [{
    id: '1',
    name: '广东省',
    children: [
        {
            id: '11',
            name: '深圳市',
            children: [
                {
                    id: '111',
                    name: '南山区'
                },
                {
                    id: '112',
                    name: '福田区',
                    children: [{
                        id: '1121',
                        name: 'A街道'
                    }]
                }
            ]
        },
        {
            id: '12',
            name: '深圳市',
            children: [
                {
                    id: '121',
                    name: '2山区'
                },
                {
                    id: '122',
                    name: '2田区',
                    children: [{
                        id: '666',
                        name: '666街道'
                    }]
                }
            ]
        },
        {
            id: '13',
            name: '东莞市',
            children: [
                {
                    id: '131',
                    name: 'A区',
                    children: [{
                        id: '666',
                        name: '666街道'
                    }]
                },
                {
                    id: '132',
                    name: 'B区',
                }
            ]
        },
        {
            id: '666',
            name: '666街道'
        }
    ]
}, {
    id: '666',
    name: '666街道'
}];

/**
 * 找到一条线路就停止
 * 思路:
 * 递归，深度优先
 * 需要一个 isComplete 字段停止循环
 * 每次遍历到一个一个节点:
 * 1. 如果符合就推入栈，结束
 * 2. 如果不符合，但是有子节点，也把这个节点推入栈，继续遍历子节点
 * 3. 一轮循环结束后，如果未 isComplete 找到匹配的，就把栈末尾节点推出去，因为这个节点的子节点能循环完说明没有匹配到，所以这个节点也不是正确的路径
 */
const findOne = function (array, targetId) {
    const results = [];
    let isComplete = false;

    const fn = function (list) {
        for (let v of list) {
            if (isComplete) return;
            if (v.id === targetId) {
                isComplete = true;
                results.push(v.id);
                return;
            } else if (v.children) {
                results.push(v.id);
                fn(v.children)
            }
        }
        if (!isComplete) {
            results.pop();
        }
    }
    fn(array);

    return results;
}

/**
 * 找到所有线路
 * 通常用来找出最短路径等等
 * 思路:
 * 递归，深度优先
 * 每次遍历到一个一个节点:
 * 1. 如果符合就推入栈，保存这条栈到结果集中
 * 2. 从栈中推出当节点，假装没匹配到
 * 3. 如果不符合，但是有子节点，也把这个节点推入栈，继续遍历子节点
 * 4. 一轮循环结束后把栈末尾节点推出去，因为这个节点的子节点能循环完说明没有匹配到，所以这个节点也不是正确的路径
 * 这里跟上面不一样的地方在于:
 * 1. 不用控制结束循环，因为找出所有路径需要全部遍历。
 * 2. 找到目标节点记录后再推出，假装没匹配继续找
 */
const findAll = function (array, targetId) {
    const results = [];
    let stack = [];

    const fn = function (list) {
        for (let v of list) {
            if (v.id === targetId) {
                stack.push(v.id);
                results.push([...stack]);
                stack.pop();
            } else if (v.children) {
                stack.push(v.id);
                fn(v.children)
            }
        }
        stack.pop();
    }
    fn(array);

    return results;
}

const results1 = findOne(citys, '666');
console.log(results1)
// [ '1', '12', '122', '666' ]

const results2 = findAll(citys, '666');
console.log(results2)
// [
//   [ '1', '12', '122', '666' ],
//   [ '1', '13', '131', '666' ],
//   [ '1', '666' ],
//   [ '666' ]
// ]
