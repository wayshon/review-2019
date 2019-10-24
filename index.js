// 就是找一个数组中拥有最大和的子数组，返回其和

// 子数组长度为 1 到 list.length
// list元素逐个进来，计算每种length情况下的最大值
// 当所有list元素都处理后，就能知道最后一行所有length下的值，选取最大的
const arr = [-1, 4, -2];
function fn(list) {
    const table = [];
    for (let i = 0; i < list.length; i++) {
        table[i] = [];
        for (let tempLength = 0; tempLength < list.length; tempLength++) {
            if (i === 0) {
                table[i][tempLength] = list[i];
                continue;
            }
        }
    }
    console.log(table)
}

fn(arr)