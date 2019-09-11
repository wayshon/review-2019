console.log('this is b start ==');
exports.done = false;
const a = require('./a');
console.log('b 里 a.done 的值为  ', a.done);
exports.done = true;
console.log('this is b end ==');