/**
 * 有一堆扑克牌, 将第一张放到桌子上, 第二张放到牌底; 第三张再放到桌子上, 第四张也放入牌底, 如此往复
 * 最后桌子上的牌顺序为: (牌底) 1,2,3,4,5,6,7,8,9,10,11,12,13 (牌顶)
 * 问: 原来那堆牌的顺序, 用函数实现
 */
const result = [13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

/**
 * 解法1
 * 生成一个默认的数组 originTemp, 认为是原始的那堆牌, index 用作索引, value 是牌真正的值
 * 创建一个空数组作为放到桌面上的牌
 * 因为操作顺序是一张放桌子上一张放牌底, 所以需要一个标志位 shouldOnDesk 来判断当前这张牌的操作
 * 实现一个 while 循环, 用来模拟不听的从原始数组抽牌的动作, 直到原始数组的牌被抽光
 * 循环内部判断抽取的牌是放桌子上还是放牌底
 * 循环结束, 所有的牌都放到的桌上的牌堆 resultTemp, 这时候给 resultTemp 所有项的 value 赋值, 就是最终的结果 1 到 13
 * index 为原始牌堆的顺序, resultTemp 里的 index 已经打乱了, 所以这时候将 resultTemp 按照 index 排序就能回到 originTemp 的顺序
 * 排序后的 resultTemp 每一项的 value 值相当于原始牌堆里的牌面, 全部取出来得到原来的那堆牌
 */
const calc1 = () => {
    const originTemp = result.map((v, i) => {
        return {
            index: i,
            value: ''
        };
    });
    const resultTemp = [];
    let shouldOnDesk = true;
    while (originTemp.length) {
        let item = originTemp.splice(0, 1)[0];
        if (shouldOnDesk) {
            resultTemp.push(item);
        } else {
            originTemp.push(item);
        }
        shouldOnDesk = !shouldOnDesk;
    }
    resultTemp.forEach((v, i) => v.value = i + 1);
    resultTemp.sort((a, b) => a.index - b.index);
    const origin = resultTemp.map(v => v.value);
    return origin;
}
console.log(calc1())

/**
 * 解法2
 * 假设手牌为数组 origin, 桌面牌堆为数组 result;
 * origin: (牌顶) [] (牌底)
 * result: (牌顶) [13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1] (牌底)
 * 正向的操作为: origin 拿出第一个插入 result 前面, origin 再拿出第一个换到自己的末尾, 如此重复
 * 反向操作为: origin 最后一个放到自己的第一个前面, result 拿出第一个插入 origin 前面, 如此重复
 */
const calc2 = () => {
    const origin = [];
    for (let i = 0; i < result.length; i++) {
        if (origin.length) {
            const item = origin.splice(origin.length - 1, 1)[0];
            origin.unshift(item);
        }
        origin.unshift(result[i])
    }
    return origin;
}
console.log(calc2());