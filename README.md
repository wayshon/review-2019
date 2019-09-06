## 进阶复习 2019

### 基础

#### 浏览器渲染流程

#### 函数组件

#### react hook
- 函数组件，以前是没有state的，这个可以使函数组件也能有state
- 未完待续

#### Promise+ 规范，实现一个Promise
- 见 Promise.js

#### 链式调用
- 见 ChainCall.js

#### nodejs 事件循环

#### fluter(稍微了解一下)
- Dart支持AOT(预编译),性能高于 js 的JIT(实时编译)
- 不同于RN是调用native组件渲染页面，flutter使用跨平台渲染引擎Skia
- Skia渲染GPU数据通过 OpenGL或者 Vulkan提供给 GPU

#### export, exports和module.exports，包括 commonjs,amd,es6都看一下
- node_modules 加载的顺序
  - Node.js 源代码的 lib/
  - 当前执行文件同级的 node_modules，没有就继续往上层目录node_modules找
- 目录作为引用需要在 package.json 里指定 main
- commonjs
  - 模块第一次加载后会被缓存，多次调用不会被执行多次。
  - 如果想要多次执行一个模块，可以导出一个函数，然后调用该函数。
  - 循环引用时候是先返回部分已执行的部分，另一个模块得到的相当于是部分执行的结果。参考 /module/commonjs
  - 模块代码执行时是放在函数里作用域执行的`(function(exports, require, module, __filename, __dirname) { //模块代码 });`
  - require.main 是进程入口文件
- requirejs amd
  - 我都不会，怎么办

#### diff key的具体使用，什么时候替换销毁新增

#### 函数的 this 有哪些不通，new调用，普通调用，箭头函数
- new 调用的this是当前函数的实例，好像是内部生成了一个对象赋给this，有待深入研究
- 普通函数的普通调用是调用的是上下文
- 普通函数的显示调用的this是显示指定的上下文(call,apply,bind)
- 箭头函数的this是定义时的上下文，相当于定义时就bind

#### shadow dom
- Web Component, 开发者自己封装的一套标签+css+js的组件
- 结构:
  - shadow-root 根节点
  - shadow-tree 子节点树
  - shadow-host 容器元素
- shadow-dom 和 主dom的样式互不影响，配合 template 更牛逼
- 参考 shadow-dom.html

#### node stream
- 见 stream.js


### 算法

#### diff 算法

#### 广度优先

#### 深度优先

#### 贪心算法

#### 背包算法

### CSS

#### 前端有哪些适配方案
- 未完待续

#### rem 优缺点

#### 怎么精确到 1px
- dpi什么的

#### border 三角形
- 我特么就会画四个三角形，至于为什么三遍和两邻边的诡异情况就不清楚了

#### box-shadow
- box-shadow: x偏移 y偏移 模糊程度, 宽度, 是否往内

#### linear-gradient
- linear-gradient(角度[0为由下往上]，颜色，颜色)

#### nth-child 与 nth-of-type
- nth-child 是指他爸爸底下第几个孩子，<u>是所有的孩子都计算在内</u>。比如他爸的第三个孩子是`div`,`p:nth-child(3)`就没卵用，他爸爸不认他，他爸的第三个孩子正好是`p`才生效(first-child,last-child一个意思)。
- nth-of-type 也是指他爸爸底下第几个孩子，<u>是只计算指定元素</u>。比如他爸的第三个孩子是`div`，第四个孩子是`p`，同时所有`p`孩子中第三个，这时候样式就是生效的，他爸爸认他。


### 实践

#### 瀑布流

#### 实现类 redis 的 LocalStorage 

#### 扑克牌问题
- 见 card-calc.js

### webpack

#### treeshaking

#### chrome 性能调试

#### webpack插件

## 看文档任务

#### nodejs

#### vue

#### react

#### css选择器