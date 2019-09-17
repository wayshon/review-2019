## 再学 react 之 2019

#### 函数组件

#### react hook
- 函数组件，以前是没有state的，这个可以使函数组件也能有state
- 未完待续

#### diff key的具体使用，什么时候替换销毁新增

#### react 是如何处理事件的
- 据说有个事件池，在document监听进行集中处理

#### setState
- 同步还是异步
  - react 触发的函数是异步的，异步的是为了合并批量渲染
  - 反之原生事件触发的是同步的
  - 原理：React会根据 isBatchingUpdates（默认false，是直接更新）判断是否直接更新 state。还有一个 batchedUpdate 函数负责把isBatchingUpdates=true，React在调用事件函数或生命周期函数之前会调用batchedUpdate，所以会扔到队列里异步执行。而原生事件和settimeout没有触发batchedUpdate所以是同步执行