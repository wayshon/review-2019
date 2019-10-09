/**
 * ES5 的组合继承
 */
function A(msg) {
  this.msg = msg;
}
A.prototype.a = 'a1';

function B(msg) {
  A.call(this, msg);
  this.b = 'b1';
}

B.prototype = Object.create(A.prototype);

var obj = new B('haha');
console.log(obj.a, obj.b, obj.msg)


/**
 * 模拟ES6的先生成父类实例，再修饰这个实例
 */
function A2(msg) {
  this.msg = msg;
}
A2.prototype.a = 'a2';

function B2(msg) {
  var ctx = new A2(msg);
  ctx.b = 'b2';
  return ctx;
}

// 注意这里不能用 new，因为是改造后的工厂函数
var obj2 = B2('hehe');
console.log(obj2.a, obj2.b, obj2.msg)

