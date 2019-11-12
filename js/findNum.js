/**
 * 找出数组 nums 里面所有和为 target 的子数组
 * 如: nums = [2, 7, 1, 2, 10, 9, 4, 5, 5, 6, 7], target = 9
 * 得: [[2, 7], [2, 1, 2, 4], [2, 2, 5], [2, 2, 5], [2, 1, 6], [2, 7], [7, 2], [1, 2, 6], [2, 7], [9], [4, 5], [4, 5]]
 * 思路:
 * 1. 取数组第一个值作为base，穷举所有包含这个base的结果
 * 2. 遍历数组剩下的值，stack 为已遍历到的符合条件的值
 * 3. 如果 base + 当前值 = 目标值，酒塞进 results，继续
 * 4. 已符合条件的stack和 + base + 当前遍历到的值，如果还是小于目标 target，就将值塞进 stack 继续遍历
 * 5. 如果等于 target 就证明这条stack是目标子集，将 base,stack,当前遍历值 塞进 result。继续遍历，但是当前值不塞进 stack，因为它已经被使用了，塞进去stack就已经等于 target 了，下面可能还有能与之前stack和符合的值
 * 6. 如果大于 target 可能是之前的stack有一些值不符合，获取stack所有的子数组，穷举所有可能的组合找出能与目标值相等的酒塞入results
 */

const nums = [2, 7, 1, 2, 10, 9, 4, 5, 5, 6, 7], target = 9;

function calc(list, t) {
    const results = [];

    const childrens = getChildArray(list);
    for (const arr of childrens) {
        if (arr.reduce((a, b) => a + b, 0) === t) {
            results.push(arr);
        }
    }
    return results;
}

const results = calc(nums, target);

console.log(JSON.stringify(results))

/**
 * 抄的，没整明白
 */
// const getChildArray = function (array) {
//     const results = [];

//     const find = (arr, position, isIns) => {
//         if (position === arr.length) {
//             const list = [];
//             for (let i = 0; i < arr.length; i++) {
//                 if (isIns[i]) {
//                     list.push(arr[i]);
//                 }
//             }
//             results.push(list);
//         } else {
//             isIns[position] = true;
//             find(arr, position + 1, isIns);
//             isIns[position] = false;
//             find(arr, position + 1, isIns);
//         }
//     }

//     const booleans = [];
//     find(array, 0, booleans);

//     return results;
// }

/**
 * 抄的，没整明白
 */
// const getChildArray = function (array) {
//     const results = [];
//     const len = Math.pow(2, array.length) - 1;
//     for (let i = 1; i <= len; i++) {
//         const t = [];
//         for (let s = i, k = 0; s > 0; s >>= 1, k++) {
//             // console.log(s.toString(2), s & 1)
//             if (s & 1 == 1) {
//                 console.log(array[k]);
//                 t.push(array[k]);
//             }
//         }
//         results.push(t);
//     }
//     return results;
// }

/**
 * 思路:
 * 设置初始二维数组：[ [ ] ] 。依次把每个数加入到数组中的每一个元素中，并保留原来的所有元素
 * 例如输入为nums = [1, 2, 3]。
 * 对于数字1，加入到[ ]中，成为[1]，此时结果数组为[[ ], [1]]
 * 对于数字2，加入到[ ]和[1]中，成为[2],[1,2]，此时结果数组为[[ ], [1], [2], [1,2]]
 * 最后把开头用来塞数的空数组去掉，得到正确结果
 */
function getChildArray(array) {
    let results = [[]];
    for (let v of array) {
        const list = [];
        for (let items of results) {
            list.push(items.concat(v));
        }
        results = results.concat(list);
    }
    results.shift();
    return results;
}