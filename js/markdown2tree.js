const markString = `
    #### 标题4.1
    444444444444444
    #### 标题4.2
    444444444444444
    ### 标题3.1
    333333333333333
    #### 标题4.3
    444444444444444
    # 标题1.1
    111111111111111
    ## 标题2.1
    222222222222222
    ### 标题3.2
    333333333333333
    ### 标题3.3
    333333333333333
    #### 标题4.4
    444444444444444
    ### 标题3.4
    333333333333333
    ###### 标题6
    666666666666666
    ##### 标题5
    555555555555555
    ## 标题2.2
    222222222222222
    # 标题1.2
    111111111111111
`

const fn = function (string) {
    const list = [];
    for (let v of string.split(/\n/)) {
        v = v.trim();
        /^#/.test(v) && list.push(v)
    }
    const result = [];

    const find = (node, item) => {
        if (!node.children.length) {
            node.children.push(item);
            return;
        }
        const lastNode = node.children[node.children.length - 1];
        if (item.level > lastNode.level) {
            find(lastNode, item);
        } else {
            node.children.push(item);
        }
    }

    for (let v of list) {
        const level = v.match(/^(#+ )/g)[0].length - 1;
        const item = {
            level,
            title: v.substring(level + 1),
            children: []
        }
        if (level === 1 || !result.length || item.level <= result[result.length - 1].level) {
            result.push(item);
        } else {
            find(result[result.length - 1], item);
        }
    }

    return result;
}

const result = fn(markString);
console.log(JSON.stringify(result))