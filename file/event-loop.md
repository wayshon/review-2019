## event loop

### 单线程
- js是单线程，IO操作会阻塞线程，node是把IO操作扔给libuv的线程池处理(一般保持4个线程)
- 线程池处理好IO之后以事件通知主线程，主线程没有实际操作IO，只负责调度

### 浏览器 event loop
- 执行同步代码，这属于宏任务
- 执行栈为空，查询是否有微任务需要执行
- 执行所有微任务
- 必要的话渲染 UI
- 然后开始下一轮 Event loop，执行宏任务中的异步代码

### Node Event Loop
- timers **setTimeout和setInterval的回调**
- I/O callbacks **除了其他回调之外的几乎所有回调**
- idle, prepare **node 内部使用**
- poll阶段 **获取新的I/O事件, 适当的条件下node将阻塞在这里**
- check **setImmediate()的回调将会在这个阶段执行**
- close callbacks **执行close事件回调，比如TCP断开连接**

#### 具体执行
- <u>最需要关心的是 timer, I/O 和 check**</u>
- 先执行整个代码块，即红任务，这时候是没有任何事件回调的，执行的过程中遇到异步代码分别扔到对应的队列
- 如上所示的回调是一步步执行的，也就是先执行timers回调，再IO，再check
- 每个类型的回调执行后都会去 微任务 队列拉取任务执行！切记

#### process.nextTick 和 setImmediate
- nextTick 是在微任务队列队首插入，所以比 promise 执行的优先级更高
- **注意！nextTick会导致饥饿陷进**因为nextTick会一直往微任务队首插入，微任务执行完才会进入下一个事件队列，但是nextTick自己无限递归的时候，下面的事件循环就永远等待没法执行
- setImmediate 类似 setTimeout，但是两者具体哪个限制性取决于上面的 Loop 顺序。具体demo见 [/event-loop](../js/event-loop.js)