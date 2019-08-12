/**
 * 有一对扑克牌，将第一张放到桌子上，第二张放到牌底；第三张再放到桌子上，第四张也放入牌底，如此往复。
 * 最后桌子上的牌顺序为：（牌底）1,2,3,4,5,6,7,8,9,10,11,12,13（牌顶）
 * 问：原来那堆牌的顺序，用函数实现
 * 答案：[ 1, 12, 2, 8, 3, 11, 4, 9, 5, 13, 6, 10, 7 ]
 */
const result = [13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
const calc = () => {
    const origin = [];
    for (let i = 0; i < result.length; i++) {
        if (origin.length > 1) {
            const item = origin.splice(origin.length - 1, 1)[0];
            origin.unshift(item);
        }
        origin.unshift(result[i])
    }
    return origin;
}
console.log(calc());