/**
 * 链式操作原理，每次都返回 this
 * 缺点：只能应用在不需要返回值的情况下，或者只能最后一步需要返回值。jQuery主要是对DOM元素的操作，只需要改变DOM元素的表现而不需要返回值，所以适合链式操作。
 * 优点：解耦，调用流程清晰
 * 下题要求: 实现chain.set(10).get()返回20
 */

function ChainCall(){
    this.set = function(v) {
        this.val = v * 2;
        return this;
    };
    this.get = function() {
        return this.val
    };
};
var chain  = new ChainCall();
console.log(chain.set(10).get())