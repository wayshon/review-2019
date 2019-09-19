## 再学 react 之 2019

### Fiber

#### 生命周期的变化
- Fiber 分为调和(reconciliation)阶段和提交(commit)阶段，
- 调和阶段: 会被打断，所以下面生命周期会多次执行，导致一些bug
  - componentWillMount
  - componentWillReceiveProps
  - shouldComponentUpdate
  - componentWillUpdate
- 提交阶段: 不会被打断，正常执行
  - componentDidMount
  - componentDidUpdate
  - componentWillUnmount
- 由于调和阶段会被打断，所以react提供了`getDerivedStateFromProps`代替`componentWillReceiveProps`，`getSnapshotBeforeUpdate`代替`componentWillUpdate`
- getDerivedStateFromProps: 
  - 并非每次 render 都会执行,严格来说只有父组件导致重新渲染时才会触发
  - 即使props没有任何变化，而是父state发生了变化，导致子组件发生了re-render，这个生命周期函数依然会被调用
- getSnapshotBeforeUpdate
  - 用于获得最新的 DOM 数据
  - 这个方法会在render之后把渲染结果提交到DOM之前被调用。
  - 它可以返回一个参数，这个参数被componentDidUpdate(prevProps, prevState, snapshot)方法的第三个参数接收


### redux

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