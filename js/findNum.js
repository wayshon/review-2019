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

    const getChildArray = function (array) {
        const results = [];
        for (let v of array) {
            results.push([v]);
        }
        const len = array.length;
        for (let i = 0; i < len - 1; i++) {
            let count = 1;
            while (count < len - 1) {
                const current = array.slice(i, i + count);
                for (let j = i + count; j < array.length; j++) {
                    results.push(current.concat(array[j]));
                }
                count++;
            }
        }
        return results;
    }

    const find = (arr) => {
        const base = arr.shift();
        const stack = [];

        if (base === t) {
            stack.push(base);
            results.push(stack);
            return;
        }

        for (const v of arr) {
            if (base + v === t) {
                results.push([base, v]);
                continue;
            }
            const sum = stack.reduce((a, b) => a + b, base + v);
            if (sum === t) {
                results.push([base, ...stack, v]);
            } else if (sum < t) {
                stack.push(v);
            } else {
                const childs = getChildArray(stack);
                for (const child of childs) {
                    const s = child.reduce((a, b) => a + b, base + v);
                    if (s === t) {
                        results.push([base, ...child, v]);
                    }
                }
            }
        }
    }

    for (let i = 0; i < list.length; i++) {
        find(list.slice(i));
    }

    return results;
}

const results = calc(nums, target);

console.log(JSON.stringify(results))