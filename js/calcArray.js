// 给定 nums = [2, 7, 11, 15, 4, 8, 0, 5, 9], target = 9
// 找出arr中所有的和为target的元素子集
// nums[0] + nums[1] = 2 + 7 = 9
// [ [ 2, 7 ], [ 4, 5 ], [ 0, 9 ] ]

const nums = [2, 7, 11, 15, 4, 8, 0, 5, 9], target = 9;

function calc(list, t) {
    const results = [];
    const len = list.length;
    for (let i = 0; i < len - 1; i++) {
        for (let j = i + 1; j < len; j++) {
            if (list[i] + list[j] === t) {
                results.push([list[i], list[j]])
            }
        }
    }
    return results;
}

console.log(calc(nums, target))