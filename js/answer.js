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