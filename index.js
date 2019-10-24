// 就是找一个数组中拥有最大和的子数组，返回其和
 /**
 * 子数组长度为 1 到 list.length
 * list元素逐个进来，计算每种length情况下的最大值
 * 当所有list元素都处理后，就能知道最后一行所有length下的值，选取最大的
 */
const arr = [-1, 4, -2, 1];
function fn(list) {
    const table = [];
    for (let i = 0; i < list.length; i++) {
        table[i] = [];
        for (let tempLength = 0; tempLength < list.length; tempLength++) {
            if (i === 0) {
                table[i][tempLength] = list[i];
                continue;
            }
            if(tempLength === 0) {
                table[i][tempLength] = Math.max(list[i], table[i - 1][tempLength]);
            } else {
                table[i][tempLength] = Math.max(list[i] + table[i - 1][tempLength - 1], table[i - 1][tempLength]);
            }
        }
    }
    console.log(table);
    const lasts = table[table.length - 1];
    let max = lasts[lasts.length - 1];
    for (let i = lasts.length - 2; i >= 0; i--) {
        max = Math.max(lasts[i], max);
    }
    return max;
}

console.log(fn(arr))