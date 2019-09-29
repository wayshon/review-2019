## 再学 react 之 2019

### 调度 与 Fiber

#### 调度实现
- 任务分片，给每个子任务expriationTime，在过期时间来临前处理更高优先级的任务
- requestIdleCallback 里执行分片任务

##### expriationTime 优先级
- expriationTime 其实就是当前时间 + 一个固定时间(根据优先级)
- 一共有 5 个优先级:
  - ImmediatePriority = 1 -1
  - UserBlockingPriority = 2 250
  - NormalPriority = 3 5000
  - LowPriority = 4 10000
  - IdlePriority = 5 1073741823

##### requestIdleCallback
- 在浏览器空闲时执行，不会对动画和交互产生影响
- requestIdleCallback 是在浏览器渲染之后执行，也就是说一秒最多回调20次，react 自己实现一个替换了
- 利用 requestAnimationFrame + MessageChannel 实现，它是在渲染前执行，假设1秒60帧,一帧小于16秒剩下的就是空余时间,选然后会执行port.onmessage里判断当前任务是否过期，过期就执行，没过期就扔入下一帧看能不能执行
- 后台requestAnimationFrame不执行，所以用setTimeout兜底

#### 新的数据结构 fiber
- fifer 不再是树，而是链表，之前输机构是一次性更行整个vd，导致主线程阻塞。
- fiber 是很多个工作单元，调度器循环查找单元并执行，除非没有单元了或者被打断了
- fiber有指向兄弟组件的sibling和指向子组件的child
- 循环规则:
  - 1. root 永远是第一个工作单元，不管之前有没有被打断过任务
  - 2. 首先判断当前节点是否存在第一个子节点，存在的话它就是下一个工作单元，并让下一个工作节点继续执行该条规则，不存在的话就跳到规则 3
  - 3. 判断当前节点是否存在兄弟节点。如果存在兄弟节点，就回到规则 2，否则跳到规则 4
  - 4. 回到父节点并判断父节点是否存在。如果存在则执行规则 3，否则跳到规则 5
  - 5. 当前工作单元为 null，即为完成整个循环

### virtual dom diff 的具体实现

#### virtual dom
- 从上到下，从左到右的深度遍历
- 遇到tagName和key(可能没有)相同就修改属性，继续遍历子树，没有匹配的就删除这个旧的节点
- 判断列表差异算法实现
  - 遍历旧的列表，对比哪些节点还存在新的列表中
  - 遍历新的列表，判断有哪些新增的节点，同时判断老节点的位置是否移动

#### 一共有三次 for 循环，但是本质上只是遍历了一次整个child
- 须知: 当出现需要在渲染阶段进行处理的节点时，会把这些节点放入父节点的 effect 链表中，比如需要被删除的节点就会把加入进链表。这个链表的作用是可以帮助我们在渲染阶段迅速找到需要更新的节点。

##### 第一次遍历
- 主要目的是复用和当前节点索引一致的老节点。一旦出现不能复用的情况就跳出遍历
- 新旧节点都是文本节点，直接复用，因为文本节点不需要key
- 其他类型节点一律通过判断 key 是否相同来复用或创建节点

##### 第二次遍历
- 第二次循环时有两种情况:
  - 1. 新节点已经遍历完: 将老节点里没有匹配到的节点设置effectTag 为 Deletion，放入父节点的 effect 链表中
  - 2. 老节点已经遍历完: 将剩余的新节点创建

##### 第三次遍历
- 目的是找出可以复用的老节点并移动位置，不能复用的话就只能创建一个新的了
- 1. 将所有剩余的老节点扔到一个 map 中,节点的 key 作为 map 的 key,不存在key就用index
- 2. 遍历时会寻找新节点的key是否存在于map，如果存在就复用并从map里删除，然后移动。不存在就创建。这里的移动依旧不涉及 DOM 操作，而是给 effectTag 赋值为 Placement
- 3. 这轮遍历结束后就将map里剩余的老节点删除

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

#### react 是如何处理事件的
- 据说有个事件池，在document监听进行集中处理

#### setState
- 同步还是异步
  - react 触发的函数是异步的，异步的是为了合并批量渲染
  - 反之原生事件触发的是同步的
  - 原理：React会根据 isBatchingUpdates（默认false，是直接更新）判断是否直接更新 state。还有一个 batchedUpdate 函数负责把isBatchingUpdates=true，React在调用事件函数或生命周期函数之前会调用batchedUpdate，所以会扔到队列里异步执行。而原生事件和settimeout没有触发batchedUpdate所以是同步执行