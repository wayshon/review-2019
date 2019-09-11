console.log('this is a start ==');
exports.done = false;
const b = require('./b');
console.log('a 里 b.done 的值为  ', b.done);
exports.done = true;
console.log('this is a end ==');