
// function pack(weights, values, W){
//     var f = [[]]
//     for(var j = 0; j <= W; j++){
//         if(j < weights[0]){ //如果容量不能放下物品0的重量，那么价值为0
//             f[0][j] = 0
//         }else{ //否则等于物体0的价值
//             f[0][j] = values[0]
//         }
//     }
//     for(var j = 0; j <= W; j++){
//         for(var i = 1; i < weights.length; i++ ){
//             if(!f[i]){ //创建新一行
//                 f[i] = []
//             }
//             if(j < weights[i]){ //等于之前的最优值
//                 f[i][j] = f[i-1][j]
//             }else{
//                 f[i][j] = Math.max(f[i-1][j], f[i-1][j-weights[i]] + values[i]) 
//             }
//         }
//     }

//     console.log(f)
//     return f[weights.length - 1][W]
// }

// 有 5个东西，重量依次为 weightList, 价值依次为 valueList, 包的承重为 weight
const weightList = [2,2,6,5,4];
const valueList = [6,3,5,4,6];
const weight = 10;

/**
 * 总的思路是：
 * a.每次塞进来一个物品，得出1到目标weight所有价值，即每个物品都有一个自己的队列保存了当前物品所有容积下最大价值1
 * b.整体结构是 物品数 * weight 的二维数组，外面的大数组保存了每个物品的价值数组，可以方便循环的时候取上一次的价值
 * 1. 将第一个物品，计算从1到目标weight的价值，能塞进去就是第一个物品的价值，不能塞进去价值就是0
 * 问：为什么要计算从1递增到目标weight，每个容量下能装下的最大价值？
 * 答：是为了确定，当背包剩余一定的容量下，找出对应的容量下的价值，就是还能塞进包里的最大价值。
 * 2. 从第2个物品开始，每有一个新的物品塞进来，就计算他在每种容量下的最大价值。
 * 2.1 如果不能装下，当前价值还是上一轮这个容量下的价值
 * 2.2 如果能装下且剩余 t 容量，就去查上一轮 t 容量下的价值。当前物品价值 + t 的价值就是当前容量下塞入当前物品（如果和小于上次的价值就可以不塞入）的最大价值，此后有新物品进来重复此过程
 * 注：这里的 当前物品价值 + t 里的物品是不可能重复的，因为当前塞进来的物品是新的且已经塞进背包，t 代表的是剩下的容量，而之前计算 t 的价值的时候也是这种模式，每次进来新的物品与老的计算
 * @param {*} weights 
 * @param {*} values 
 * @param {*} weight 
 */
function pack(weights, values, weight) {
    const table = [];
    let index;

    for (index = 0; index < weights.length; index++) {
        // 每次有新的物品进来，就给他新的队列
        table[index] = [];

        for (let tempWeight = 1; tempWeight <= weight; tempWeight++) {
            // 步骤1，尝试第一个物品，并得出它在所有容量下的价值
            if (index === 0) {
                if (weights[index] > tempWeight) {
                    // 如果物品重量大于当前容量，当前容量下价值就为 0
                    table[index][tempWeight] = 0;
                } else {
                    // 因为是第一个物品，当前容量下的价值就是物品的价值
                    table[index][tempWeight] = values[index];
                }
                continue;
            }

            // 步骤2，后面进来的物品，当前容量价值就需要参考之前的价值
            if (weights[index] > tempWeight) {
                // 如果物品重量大于当前容量就不塞入，价值还是上次这个容量下的价值
                table[index][tempWeight] = table[index - 1][tempWeight];
            } else {
                // 塞入物品，如果还剩下一些容量，就在取上一次这个容量的价值(这个是核心思想)。
                // 对比是塞进此物品并加上剩余容量的价值大，或是不塞入之前的那次价值更大
                const remainWeight = tempWeight - weights[index];
                const remianValue = remainWeight > 0 ? table[index - 1][remainWeight] : 0;
                table[index][tempWeight] = Math.max(values[index] + remianValue, table[index - 1][tempWeight]);
            }
        }
    }

    console.log(table)
    // 最后一个物品处理完后，最后的重量 weight 就是我们需要的价值
    return table[index - 1][weight];
}

const maxValue = pack(weightList, valueList, weight)
console.log(maxValue)
