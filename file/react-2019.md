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

#### setState
- 同步还是异步
  - react 触发的函数是异步的，异步的是为了合并批量渲染
  - 反之原生事件触发的是同步的
  - 原理：React会根据 isBatchingUpdates（默认false，是直接更新）判断是否直接更新 state。还有一个 batchedUpdate 函数负责把isBatchingUpdates=true，React在调用事件函数或生命周期函数之前会调用batchedUpdate，所以会扔到队列里异步执行。而原生事件和settimeout没有触发batchedUpdate所以是同步执行

#### 函数组件
- 就是无状态组件
- 接收一个props参数，只关心UI渲染，没有自己的state(react hook可以使它有state)
- 代码少，没有this，没有各种生命周期

#### 组件状态共享的方式
- mixin 已废弃，命名冲突，耦合高，后期难以维护
- 高阶组件 也就是反继承统一处理状态和生命周期，或者render接收的组件，注入 props。缺点: 层级嵌套多,生命周期钩子函数中会同时做很多事情，难以排错
- 渲染属性(render props)，A组件接受一个函数参数，给这个函数一个值，render的时候返回这个函数，实际使用的时候这个函数参数可以返回B组件，并把函数参数给B组件props，相当于在要用的B组件外面套一层A组件负责注入props。缺点: 同上
- react hook

### react hook
- 函数组件，以前是没有state的，这个可以使函数组件也能有state
- 没有this的烦恼
#### state Hook 使用:
- useState，参数可以是 number,string,object等等, 返回一个数组，数组第一个成员是state的值，第二个是用来更新这个state的函数
- useState的初始值只在首次渲染的时候有效，后续每次渲染都是返回最新的state
- this.setState做的是合并状态后返回一个新状态，而 useState是直接替换老状态后返回新状态,set里可以传函数手动合并然后return，或者用useReducer
- 生命多个state变量就调用多次 useState。React 假设当你多次调用 useState 的时候，你能保证每次渲染时它们的调用顺序是不变的,可以使用 eslint-plugin-React-Hooks来强制约束，所以千万不要在if和for里面使用，因为不能保证每次函数调用时 useState 的顺序
- useState只是传值，并没有传key，react是根据useState出现的顺序来找到它对应的state
- Hook 规则:
  - 1. 只在最顶层使用 Hook。不要在循环，条件或嵌套函数中调用 Hook， 确保总是在你的 React 函数的最顶层调用他们
  - 2. 只在 React 函数中调用 Hook。不要在普通的 JavaScript 函数中调用 Hook
#### Effect Hook 使用
- Effect Hook 是每次渲染之后和更新之后都会执行，其实就是componentDidMount，componentDidUpdate 和 componentWillUnmount 这三个函数的组合
- 如果`useEffect(() => { return });`里return一个函数，useEffect会在每次渲染之前都会执行return的函数，可以用来代替componentWillUnmount,不同的是componentWillUnmount只会执行一次
- useEffect 每次更新都会执行，浪费性能。`useEffect(() => { return }, [count]);`第二个参数是个数组，里面的值变了才会触发，相当于在`componentDidUpdate(prevProps, prevState)`周期里比较 prevProps.count
#### Reducer Hook 使用
- useReducer 则是 hooks 提供的一个类似于 redux 的 api，让我们可以通过 action 的方式来管理 context，或者 state
- 更适合用于管理包含多个子值的 state 对象
#### Context Hook 使用
- 接受一个 context（上下文）对象（从React.createContext返回的值）并返回当前 context 值
- 可以避免通过render props那种组建嵌套才能获取到多个组建的context,通过 useContext 可以直接返回
#### hook 是怎么解决共享状态，并且避免高阶组件和渲染属性那种层级嵌套的呢
- 主要效果是能用到公共的state，能有生命周期，state能驱动组建更新。注意状态是state而不是普通的死数据。
```
// Hooks
import { useState, useEffect } from "react";
const useHooks = () => {
  const [data, setData] = useState(null);
  const fetchData = () => {
    fetch("/api", params).then(response => {
      const { data } = data;
      setData(data);
    });
  };
  useEffect(() => {
    fetchData();
  });
  return data;
};
export default useHooks();

// 然后在需要用到的地方
render() {
  // 这一行便是调用data的方法了
  const data = Hooks();
  return <div>{data}</div>;
}
```

#### suspense 异步渲染
- React.lazy()可以懒加载模块
- 在使用的时候需要 `<Suspense>` 组建包裹，这个组建其实就是利用了componentDidCatch与getDerivedStateFromProps来抓取渲染时抛出的异常，以为渲染是一次性的，异步渲染会被`<Suspense>`捕捉到，然后等待资源加载完成，`<Suspense>`底下所有的子组件将会被重新渲染

#### react 合成事件
- 考虑到浏览器的兼容性和性能问题，react拥有自己的事件系统，即合成事件
- 在document代理监听冒泡事件,将触发的事件存储在事件队列
- ReactEventListener 维持一个映射保存组件事件监听与处理函数，负责事件注册与分发
- ReactEventEmitter 负责每个组件上事件的执行
- 注意:
  - 合成事件解决了IE兼容性问题，使用stopPropagation()即可禁止事件冒泡。
  - 阻止 React 合成事件冒泡，并不能阻止原生事件的冒泡，就算使用 stopPropagation 也无法阻止原生事件的冒泡。
  - 取消原生事件的冒泡也会同时取消 React 事件，并且原生事件的冒泡在 React 事件的触发和冒泡之前
  - 使用原生事件记得手动移除

### redux, redux-react
- redux 就是一个状态管理库
- 单store，dispatch action触发reducer，纯函数reducer返回一个新的值改变state
- react-redux的connect 负责将state，action注入尽组件的props
- 我比较喜欢 mobx，因为mobx是proxy拦截，我用不到状态追踪和撤销，所以mobx对于我来说更加灵活