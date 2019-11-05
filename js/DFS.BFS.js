const tree = {
    value: 'root',
    children: [
        {
            value: '1',
            children: [
                {
                    value: '1.1',
                    children: [
                        {
                            value: '1.1.1'
                        }
                    ]
                }
            ]
        },
        {
            value: '2',
            children: [
                {
                    value: '2.1'
                },
                {
                    value: '2.2',
                    children: [
                        {
                            value: '2.2.1'
                        },
                        {
                            value: '2.2.2'
                        }
                    ]
                }
            ]
        },
        {
            value: '3',
            children: [
                {
                    value: '3.1'
                }
            ]
        },
    ]
}

/**
 * 深度遍历
 * 递归
 * 重复对一个节点追根究底的遍历
 * @param {*} node 
 */
function bfs(node) {
    const results = [];
    
    const deep = (item) => {
        if (item) {
            results.push(item);
        }
        if (item.children) {
            for (let i = 0; i < item.children.length; i++) {
                deep(item.children[i])
            }
        }
    }
    deep(node);
    return results;
}

const resultBFS = bfs(tree).map(v => v.value);
console.log(resultBFS);

/**
 * 广度遍历
 * 一层一层遍历，将遍历到的节点塞进queue
 * 每轮循环后又从这轮循环的第一个节点的子节点开始循环，不停的往queue塞，queue的顺序就是广度遍历的顺序
 * 每轮循开始时又不停的从queue头部取出节点，通过queue.length控制循环
 * 例如遍历第二层的时候，取出queue的第一个节点塞进results，并遍历它的子节点再塞到queue，然后继续取出queue的第二个节点遍历它的子节点
 * 直到queue取不到节点，证明所有节点已经遍历完成
 * @param {*} node 
 */
function dfs(node) {
    const results = [];
    const queue = [];
    if (node) {
        queue.push(node);
        while (queue.length) {
            const item = queue.shift();
            results.push(item);
            if (item.children) {
                for (let i = 0; i < item.children.length; i++) {
                    queue.push(item.children[i]);
                }
            }
        }
    }
    return results;
}

const resultDFS = dfs(tree).map(v => v.value)
console.log(resultDFS);