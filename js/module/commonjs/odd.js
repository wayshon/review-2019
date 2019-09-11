// var even = require('./even');
// module.exports = function (n) {
//   return n != 0 && even.even(n - 1);
// }

module.exports = odd;
var even = require('./even');
function odd(n) {
    return n != 0 && even.even(n - 1);
}