## 再学 react 之 2019

### 调度 Fiber

#### 调度实现
- 任务分片，给每个子任务expriationTime，在过期时间来临前处理更高优先级的任务
- requestIdleCallback 里执行分片任务

#### expriationTime 优先级
- expriationTime 其实就是当前时间 + 一个固定时间(根据优先级)
- 一共有 5 个优先级:
  - ImmediatePriority = 1 -1
  - UserBlockingPriority = 2 250
  - NormalPriority = 3 5000
  - LowPriority = 4 10000
  - IdlePriority = 5 1073741823

#### requestIdleCallback
- 在浏览器空闲时执行，不会对动画和交互产生影响
- requestIdleCallback 是在浏览器渲染之后执行，也就是说一秒最多回调20次，react 自己实现一个替换了
- 利用 requestAnimationFrame，它是在渲染前执行，假设1秒60帧,一帧小于16秒剩下的就是空余时间
- 后台requestAnimationFrame不执行，所以用setTimeout兜底

#### virtual dom
- 从上到下，从左到右的深度遍历
- 遇到tagName和key(可能没有)相同就修改属性，继续遍历子树，没有匹配的就删除这个旧的节点
- 判断列表差异算法实现
  - 遍历旧的列表，对比哪些节点还存在新的列表中
  - 遍历新的列表，判断有哪些新增的节点，同时判断老节点的位置是否移动

#### 生命周期的变化
- Fiber 分为调和(reconciliation)阶段和提交(commit)阶段
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