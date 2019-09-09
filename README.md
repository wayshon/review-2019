## 进阶复习 2019

### 基础

#### 浏览器渲染流程
- 加载
  - 自上而下，加载过程中流式渲染
  - 加载中遇到css,img会发出异步请求，不影响文档加载
  - 加载中遇到js会挂起渲染线程，要等js加载和执行完才会恢复html渲染线程(因为js的执行和渲染互斥，js会改变dom)，webkit有优化，只有在js访问css时才会互斥
  - css加载不影响js的加载，但是会阻塞js的执行，因为js里面会根据样式表查询dom
  - prefetch会提前加载js，但是不会执行，会留给主加载执行
- 解析
  - html文档解析生成dom树，由dom元素和属性节点组成，根节点为document
  - css解析成样式表对象，
  - 渲染 DOM 节点的时候会有一个RenderObject,太多的渲染会消耗大量资源
  - 所以浏览器会构建多个RenderLayer，RenderLayer里有多个RenderObject。canvas，position等会触发RenderLayer
  - CPU缓存：即会部分重计算某个layer底下的object，而不是整个重计算
  - css树的遍历是由下往上，即样式代码是从右往左查找，要避免选择器迭代太深，造成太多的无用遍历
  - 渲染过程中，webkit使用一个标志位标志所有顶层样式都已经被加载完毕，如果dom元素进行attach时，css元素并没有被加载完毕，则放置占位符，并在文档中标记，当样式表加载完毕，则重新进行计算。说明：文档的渲染还是要等待顶层css加载完毕
  - DOM和CSSOM一起生成Render Tree
  - css解析与DOM解析可以同时进行
  - Render Tree和DOM Tree不完全对应
    - display: none的元素不在Render Tree中,visibility: hidden的元素在Render Tree中
    - float,absolute,fixed脱离了文档流

#### v8引擎
- jit
  - 一直以来有两种执行js的方法，逐行解释和一次性编译成机器码，各有优缺点
  - Just In Time，所有代码首先编译成字节码
  - 将适合优化的代码扔进hot队列编译成机器码一直保存，如重复执行的函数
  - 不能优化的和不适合优化的会打回普通队列，比如arguments和某些不能转成强类型的,如入参类型不确定和返回类型不确定的函数。
  - hidden class 会优化公用map，会记录内存偏移量。比如两个类似的对象，调用过第一个之后调用第二个特别快，因为第二个在查找时根据公用的map记录的内存偏移量直接查找
- gc
  - node 1.4GB内存
  - 新生代快速gc
  - 新生代扫了几次还在引用的就扔入老生代，老生代gc频率低
  - 新生代gc是有两块块内存，找到有用的复制，然后整个删除
  - 三色gc

#### Promise+ 规范，实现一个Promise
- 见 Promise.js

#### 链式调用
- 见 ChainCall.js

#### fluter(稍微了解一下)
- Dart支持AOT(预编译),性能高于 js 的JIT(实时编译)
- 不同于RN是调用native组件渲染页面，flutter使用跨平台渲染引擎Skia
- Skia渲染GPU数据通过 OpenGL或者 Vulkan提供给 GPU

#### 函数的 this 有哪些不同，new调用，普通调用，箭头函数
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

### 性能优化

#### 首次加载优化
- 请求优化
  - CDN,减少了各种不必要的请求头和cookie等，子域会带上父域的 cookie，反之不会
  - DNS Prefetch， 用到CDN，域名不一样，就得用
  - 不影响页面的js加deffer(deffer是顺序执行,async是加载完立即执行)
  - 配置http缓存头(expires/max-age,last-modified,etag)
  - 样式表放在头部，可以使内容逐步呈现，避免白屏
  - 使用外部js和css，因为浏览器可能会缓存他们，比如jq
  - 减少DNS查找，即资源放同一个域下；但是http1.1会对同一个域有并发限制。所以最好在2到4个域之间
  - 避免空的 href 和 src。因为浏览器渲染过程中仍会对空内容加载，直到加载失败，这占用了其他资源下载进程。
  - 减少页面重定向
  - 减少cookie大小，静态资源放在别的域名下，因为跨域默认不带cookie
  - 使用http2，http2 会使用 HPACK算法压缩请求头
  - 避免 css @import，因为在css解析到 @import时才会加载另外的css，延后了css渲染完成的时间
  - 避免使用 table和iframe等慢元素。table是全部渲染完之后一次性绘制到页面上，长表格很耗时
  - 首屏数据提前请求，或者服务端吐出文档的时候直接打在html里面，避免二次请求
  - 首屏渲染，按需加载与ssr
  - 资源预加载：link的 prefetch，preload，prerender
  - 谷歌的 AMP
- 压缩代码
  - webpack uglifyjs压缩代码
  - 提取公共资源 vender
  - 服务开启 Gzip，注意不要配置对图片gzip，浪费服务资源效果也不好，可以使用CDN
- 图片处理
  - 使用尺寸合适的图片，别在客户端缩小图片
  - 通过媒体查询加载不同大小的图片
  - 雪碧图，减少请求
  - iconfont
  - webp safari 不支持，需要插件
  - 图片懒加载

#### 后续优化
- 合理试用BFC，避免页面布局的修改，因为重排必然导致重绘。对页面中可能发生大量重排重绘的元素单独触发渲染层，使用GPU分担CPU压力 translate3d
- 避免重排
  - display:none会导致重拍，visibility: hidden只会导致重绘
  - 用transform做形变和位移,通过绝对位移来脱离当前层叠上下文，形成新的Render Layer。
- meta viewport 固定屏幕渲染，避免缩放导致屏幕重排重绘
- 减少dom操作，缓存查出的结果
- DOM元素离线更新: innrHTML是浏览器线程逼js效率高，Document Fragment一次性插入，对需要操做的DOM先display:none消失后再操作
- 没用的元素visibility: hidden，这样可以减小重绘的压力
- img 最好在渲染前就指定其大小，或者让其脱离文档流，加载完改变大小严重时会导致重排
- 闭包设为 null 释放掉
- 用事件代理代替html事件绑定，DOM元素绑定了事件回调，删除该元素的时候也记得删除回调,防止内存泄露
- 作用域：避免不必要的属性查找和全局查找，避免with 语句
- 优化循环体，终止条件，减值迭代
- service worker 本地缓存打开


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