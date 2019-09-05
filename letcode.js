// var twoSum = function (nums, target) {
//     let len = nums.length;
//     for (let i = 0; i < len; i++) {
//         for (let j = 1; j < len; j++) {
//             console.log(nums[i], nums[j])
//             if (nums[i] + nums[j] === target) {
//                 return [i, j];
//             }
//         }
//     }
// };

// console.log(twoSum([3, 2, 3], 6));


/**
 * @param {number} L
 * @param {number} R
 * @return {number}
 */
var countPrimeSetBits = function(L, R) {
    function isSNum(num) {
        if (num === 0 || num === 1) {
            return false;
        }
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) {
                return false;
            }
        }
        console.log(num)
        return true;
    }
    let sum = 0;
    for (let i = L; i <= R; i++) {
        let str = i.toString(2);
        let count = 0;
        [...str].forEach(v => {
            if (v === '1') {
                count++;
            }
        });
        if (isSNum(count)) {
            sum++;
        }
    }
    return sum;
};

console.log(countPrimeSetBits(842, 888));
