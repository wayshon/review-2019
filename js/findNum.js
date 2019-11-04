// 给定 nums = [2, 7, 1, 3, 1, 15, 9, 5, 2], target = 9
// 找出arr中所有的和为target的元素子集
// [[2, 7], [2, 1, 1, 5], [7, 1, 1], [3, 1, 5], [3, 1, 5], [9]]

const nums = [2, 7, 1, 1, 5, 15, 9], target = 9;

function calc(list, t) {
    let results = [];
    if (list.length === 1 && list[0] === t) {
        results.push(list[0])
    } else {
        const nextList = list.filter(v => v <= t);
        const temp = nextList.splice(0, 1)[0];
        if (temp === t) {
            results.push(temp);
            const ttt = calc(nextList, t);
            if (ttt.length) {
                results = results.concat(ttt)
            }
        } else {
            const ttt = calc(nextList, t - temp)
            if (ttt.length) {
                results = results.concat(temp, ttt)
            }
        }
    }
    return results;
}

let results = [];
for (let i = 0; i < nums.length; i++) {
    if (nums[i] <= target && i === 0) {
        // results = results.concat(nums[i], calc(nums.slice(i + 1), target - nums[i]));
        const

    }
}

console.log(results)