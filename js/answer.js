// /**** 实现一个_new */
// function _new(fn, ...params) {
//     const ctx = new Object();
//     fn.apply(ctx, params);
//     return ctx;
// }
// const obj = _new(function(name, age) {
//     this.name = name;
//     this.age = age;
//     this.show = function() {
//         console.log(`${this.name} is ${this.age}`);
//     }
// }, 'haha', 19);
// console.log(obj);
// obj.show();

// /********* 两个数组合并成一个数组 */
// function contact(list1, list2) {
//     let index = 0;
//     for (let j = 0; j < list2.length; j++) {
//         const target = list2[j];
//         if (j === list2.length - 1) {
//             list1.push(target);
//             break;
//         }
//         for (let i = index; i < list1.length; i++) {
//             if (list1[i].indexOf(target) === -1) {
//                 list1.splice(i, 0, target);
//                 index = i + 1;
//                 break;
//             }
//         }
//     }
//     return list1;
// }
// const list1 = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'];
// const list2 = ['A', 'B', 'C', 'D'];
// const result = contact(list1, list2);
// console.log(result)

/********** 找出字符串中连续出现最多的字符和个数 */
// /*
// 'abcaakjbb' => {'a':2,'b':2}
// 'abbkejsbcccwqaa' => {'c':3}
// */
// function findStringNum(str) {
//     const map = {};
//     const list = str.split('');
//     let max = 0;
//     for (let i = 0; i < list.length; i++) {
//         if (i > 0 && list[i] === list[i - 1]) {
//             map[list[i]] += 1;
//         } else {
//             map[list[i]] = 1;
//         }
//         max = map[list[i]] > max ? map[list[i]] : max;
//     }
//     const result = {};
//     for (let key in map) {
//         if (map[key] === max) {
//             result[key] = map[key];
//         }
//     }
//     return result;
// }
// const s = 'abbkejsbcccwqaa'
// console.log(findStringNum(s));