function A() {
    this.a = 11
}

A.prototype.aa = 22;

function B() {
    this.b = 33
}

B.prototype.bb = 44;


var c = new A();
c.__proto__ = B.prototype;
console.log(c.__proto__);
console.log(c.__proto__ === A.prototype);
console.log(c.__proto__ === B.prototype);