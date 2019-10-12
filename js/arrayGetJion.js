const origin1 = [1];
const origin2 = [1, 1];

// const fn = function(list1, list2) {
//     let long, short;
//     if (list1.length > list2.length) {
//         long = list1;
//         short = list2;
//     } else {
//         long = list2;
//         short = list1;
//     }
//     const results = [];
//     while(short.length) {
//         for(let i = 0; i < long.length; i++) {
//             const index = short.findIndex(v => v === long[i]);
//             if (index > -1) {
//                 const item = short.splice(index, 1)[0];
//                 results.push(item);
//             }
//         }
//     }
//     return results;
// }

const fn = (nums1, nums2) => {
    const map = {}
    const res = []
    for (let n of nums1) {
      if (map[n]) {
        map[n]++
      } else {
        map[n] = 1
      }
    }
    for (let n of nums2) {
      if (map[n] > 0) {
        res.push(n)
        map[n]--
      }
    }
    return res
  }

const results = fn(origin1, origin2);
console.log(results)
