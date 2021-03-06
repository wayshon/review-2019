## 函数的this

- new 调用的this是当前函数的实例，好像是内部生成了一个对象赋给this，有待深入研究
- 普通函数的普通调用是调用的是上下文
- 普通函数的显示调用的this是显示指定的上下文(call,apply,bind)
- 箭头函数的this是定义时的上下文，相当于定义时就bind
- 方法调用模式，函数调用模式，构造器调用模式，apply调用模式。this存在差异:
  - 方法调用：this被绑定到改对象。函数调用：this绑定到全局对象。(这是语言设计上的错误，应该是内部函数调用时this仍然绑定到外部函数的this变量。内部函数的this不对导致不能共享外部函数的访问权限，可以定义that=this什么的解决)
  - 构造器调用：在函数前加上new调用，背地里会会创建一个连接到该函数的prototype成员的新对象，同时this会绑定到这个新对象上。
  - Apply调用：apply第一个参数是要绑定的this的值，第二个是参数数组。
- 给prototype扩展方法或属性，其他的实例可以直接使用
- 如果构造函数前没加 new，this就不会绑到新对象上，而是全局对象，污染了全局对象！
- 切记！<u>函数内部的 this 取决于函数被调用的方式！</u>，如：this.xx(),xx.apply()。理解一下下面的题目
```
class Foo {
    sayThis() {
        console.log(this); // 这里的 `this` 指向谁？
    }

    exec(cb) {
        cb();
    }

    render() {
        this.exec(this.sayThis);
    }
}

var foo = new Foo();
foo.render(); 
```