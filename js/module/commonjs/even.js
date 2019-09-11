// var odd = require('./odd');
// var counter = 0;
// module.exports = {
//     get counter() {
//         return counter;
//     },
//     even(n) {
//         counter++;
//         return n == 0 || odd(n - 1);
//     }
// }

exports.even = even;
var odd = require('./odd');
var counter = 0;
function even(n) {
    counter++;
    return n == 0 || odd(n - 1);
}
exports.counter = function() {
    return counter;
}