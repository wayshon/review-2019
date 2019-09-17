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