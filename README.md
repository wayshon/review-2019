## 进阶复习 2019

### 基础

#### 浏览器渲染流程
- 见 [浏览器渲染流程](./file/浏览器渲染流程.md)

#### v8引擎
- 见 [v8引擎](./file/v8引擎.md)

#### Promise+ 规范，实现一个Promise
- 见 [Promise.js](./file/Promise.js)

#### 链式调用
- 见 [ChainCall.js](./file/ChainCall.js)

#### fluter
- 见 [fluter](./file/fluter.md)

#### 函数的this
- 见 [函数的this](./file/函数的this.md)

#### shadow dom
- 见 [shadow-dom](./file/shadow-dom.md)

#### node stream
- 见 [stream.js](./file/stream.js)

#### 性能优化
- 见 [性能优化](./file/性能优化.md)

### CSS

#### border 三角形
- 我特么就会画四个三角形，至于为什么三遍和两邻边的诡异情况就不清楚了

#### box-shadow
- box-shadow: x偏移 y偏移 模糊程度, 宽度, 是否往内

#### linear-gradient
- linear-gradient(角度[0为由下往上]，颜色，颜色)

#### nth-child 与 nth-of-type
- nth-child 是指他爸爸底下第几个孩子，<u>是所有的孩子都计算在内</u>。比如他爸的第三个孩子是`div`,`p:nth-child(3)`就没卵用，他爸爸不认他，他爸的第三个孩子正好是`p`才生效(first-child,last-child一个意思)。
- nth-of-type 也是指他爸爸底下第几个孩子，<u>是只计算指定元素</u>。比如他爸的第三个孩子是`div`，第四个孩子是`p`，同时所有`p`孩子中第三个，这时候样式就是生效的，他爸爸认他。


### 算法

#### diff 算法

#### 广度优先

#### 深度优先

#### 贪心算法

#### 背包算法

### 实践

#### 瀑布流

#### 实现类 redis 的 LocalStorage 

#### 扑克牌问题
- 见 card-calc.js

### webpack

#### treeshaking

#### chrome 性能调试

#### webpack插件