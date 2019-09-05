## 性能优化

### cookie 有哪些属性。
### JS 域页面渲染互斥吗

### 网络传输性能检测工具—— chrome 插件 Page Speed

### 首次加载优化

#### 请求优化
- CDN,减少了各种不必要的请求头和cookie等，子域会带上父域的 cookie，反之不会
- DNS Prefetch， 用到CDN，域名不一样，就得用

#### 压缩代码
- 压缩代码
- 提取公共资源 vender
- 服务开启 Gzip，注意不要配置对图片gzip，浪费服务资源效果也不好

#### 图片处理
- 使用尺寸合适的图片，别在客户端缩小图片
- 雪碧图，减少请求
- iconfont
- webp safari 不支持，需要插件



### 后续优化
- 对页面中可能发生大量重排重绘的元素单独触发渲染层，使用GPU分担CPU压力 translate3d
- DOM元素离线更新: innrHTML是浏览器线程逼js效率高，Document Fragment一次性插入，对需要操做的DOM先display:none消失后再操作
- 没用的元素visibility: hidden，这样可以减小重绘的压力
- img 最好在渲染前就指定其大小，或者让其脱离文档流，加载完改变大小严重时会导致重排
- 删除臂包；DOM元素绑定了事件回调，删除该元素的时候也记得删除回调,防止内存泄露

#### 配置缓存
- 为了避免强缓存，要在连接加hash，防止服务端更新了浏览器也不请求直接取本地资源
- nginx 配置
  - etag on;   //开启etag验证
  - expires 7d;    //设置缓存过期时间为7天



## 浏览器渲染机制
- 渲染 DOM 节点的时候会有一个RenderObject,太多的渲染会消耗大量资源
- 所以浏览器会构建多个RenderLayer，RenderLayer里有多个RenderObject。canvas，position等会触发RenderLayer
- CPU缓存：即会部分重计算某个layer底下的object，而不是整个重计算

#### 疑问
- 执行js的时候，会影响页面渲染吗，会影响页面交互吗
- 浏览器有哪几个线程

#### last-modify etag 实际应用
- 为了避免强缓存，要在连接加hash，防止服务端更新了浏览器也不请求直接取本地资源
- nginx 配置
  - etag on;   //开启etag验证
  - expires 7d;    //设置缓存过期时间为7天