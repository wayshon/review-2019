## 未完成

#### 函数组件

#### react hook
- 函数组件，以前是没有state的，这个可以使函数组件也能有state
- 未完待续

#### nodejs 事件循环

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

#### last-modify etag 实际应用
- 为了避免强缓存，要在连接加hash，防止服务端更新了浏览器也不请求直接取本地资源
- nginx 配置
  - etag on;   //开启etag验证
  - expires 7d;    //设置缓存过期时间为7天

#### 前端有哪些适配方案

#### rem 优缺点

#### background

#### 怎么精确到 1px
- dpi什么的

## 看文档任务

#### nodejs -- ok

#### css选择器

#### vue

#### react

#### BFS（广度优先遍历）和深度优先遍历


## 心存疑问
- cookie 有哪些属性。
- JS 域页面渲染互斥吗
- 网络传输性能检测工具—— chrome 插件 Page Speed
- 浏览器有哪几个线程
- 浏览器并发请求域名控制在多少个最好，2-4个
- 浏览器并发请求控制在多少个最好
- vue 是怎么利用 get 和 set 的
