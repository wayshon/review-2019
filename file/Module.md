## export,exports/module.exports,commonjs,amd,es6

#### 代码demo
- 见 [/module](../js/module)

#### node_modules 加载的顺序
- Node.js 源代码的 lib/
- 当前执行文件同级的 node_modules，没有就继续往上层目录node_modules找
- 目录作为引用需要在 package.json 里指定 main

#### commonjs
- 代码在require的时候，就会全部执行,第一次加载后会被缓存，多次调用不会被执行多次。
- 如果想要多次执行一个模块，可以导出一个函数，然后调用该函数。
- 模块代码执行时是放在函数里作用域执行的`(function(exports, require, module, __filename, __dirname) { //模块代码 });`
- require.main 是进程入口文件
- 基本值是拷贝，对象等是引用
- 循环引用时候是先返回部分已执行的部分，另一个模块得到的相当于是部分执行的结果。参考 /module/commonjs

#### requirejs amd
- 其实就是浏览器端的commonjs，但是浏览器端资源加载是异步的，所以需要搞出个这种依赖规范
- `<script>`指定`data-main`属性作为入口文件
- require.config 里定义模块名与映射文件
- require引入和define引入并导出
- 当依赖的模块载入后才会执行函数

#### ES6 module
- ES6 自动采用严格模式，不管有没有写"use strict";arguments,require,module,exports,__filename,__dirname 在 ES6模块中都不存在
- 同一个模块如果加载多次，也是只执行一次
- 基本值与对象都是引用
- 循环引用:
  - A引入B的时候默认A模块已经有了且导入了自己需要的接口，其实也就是默认A export了这个接口。这跟commonjs不一样，commonjs会直接拿出A部分执行到这个点的module模块，必须读到A里面的exports才有值。
  - B在使用这个接口的时候，如果A在引入B这个点还没定义这个变量，就会undefined。因为B相当于默认A里export了这个接口，产生了一个引用A里面的这个变量，没有的话当然是undefined
  - A模块 export 可以写在后面，但是在引入B之前需要的变量要定义好，所以使用函数比较好，函数有提升功能，var没有用，var只是声明提前。
  - A 里 export 写在最后没事，但是一定要写，不然会报错，因为B循环引用A的时候是默认A里export了这个接口，直接产生了软链的引用

#### commonjs与ES6差异
- commonjs 是引入整个模块对象，ES6是引入需要的部分
- ES6 模块之中，顶层的this指向undefined，CommonJS 模块的顶层this指向当前模块
- commonjs 被引入之后相当于copy一份存在内存中，一个引用的地方修改其他引用的地方也会改变。但是，如果是源文件中延时之类的修改，其他文件里就不会变，因为已经被copy到内存中了，源文件修改也没用
- es6 因为全是引用而不是copy，所以任何修改都会跟着改变
- CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。因为CommonJS
- CommonJS 基本值是拷贝，对象等是引用;es6 基本值与对象都是引用
- CommonJS 是单个值导出;ES6是多值导出
- 循环引用的时候，ES6 A可以最后export,只要该声明的在引入B之前声明即可，因为ES6是引用，默认有输出接口就行，使用的时候才执行。但是CommonJS在引入B之前不仅该声明的要声明好，还要exports出去，因为exports出去的才是拷贝。