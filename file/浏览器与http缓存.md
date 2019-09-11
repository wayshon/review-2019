## 浏览器与http缓存

### 缓存位置

#### service woker
- 拦截请求指向本地缓存资源，存在缓存的话就可以直接读取缓存文件，否则就去请求数据

#### Memory Cache
- 内存中的缓存，读取速度比磁盘快，但是周期短，并且是随着进程释放的，tab被关闭内存中的缓存就释放了
- 通过 prefetch preload,会导致资源存入内存缓存区
- 内存缓存在缓存资源时并不关心返回资源的HTTP缓存头Cache-Control是什么值，同时资源的匹配也并非仅仅是对URL做匹配，还可能会对Content-Type，CORS等其他特征做校验
- http code 是200，显示 from memory cache

#### Disk Cache
- 存在硬盘中的缓存，没内存读取快，但是时效长，容量大
- 根据http header中的字段判断是否需要请求，是否过期
- http code 是200，显示 from disk cache

#### Push Cache
- 这是HTTP2的服务推送，上面都不符合时才有机会出发，并且时效短，受session限制，chrome是5分钟

### 强缓存和协商缓存（最主要的两种缓存）

#### 强缓存
- 强缓存主要指 Memory 和 Disk，可以通过 HTTP Header 的Expires 和 Cache-Control 实现
- Expires是http1的东西，表示绝对过期时间，但是改了本地系统时间就没用了
- Cache-Control 是http1.1的东西，可不止 max-age 这一个值：
  - public：所有内容都将被缓存（客户端和代理服务器都可缓存）
  - private：所有内容只有客户端可以缓存
  - no-cache：客户端缓存内容，是否使用缓存则需要经过协商缓存来验证决定。就是还是要请求的，但是是根据服务返回的Etag 或者Last-Modified控制
  - no-store：所有内容都不会被缓存，即不使用强制缓存，也不使用协商缓存
  - max-age：max-age=xxx (xxx is numeric)表示缓存内容将在xxx秒后失效
  - Cache-Control优先级高于Expires
#### 协商缓存
- 强制缓存失效后，浏览器携带缓存标识向服务器发起请求，由服务器根据缓存标识决定是否使用缓存的过程
  - 1、协商有效，返回304
  - 2、协商失效，返回200
- Last-Modified和If-Modified-Since
  - 服务 response 会返回 Last-Modified，这个资源在服务器最后一次修改时间
  - 浏览器请求时，返现这个 Last-Modified，就在 request 头里加一个 If-Modified-Since,值就是Last-Modified的值
  - 服务器用 If-Modified-Since 跟资源最后一次修改时间对比，如果没有变化就返回 304 和空响应体，如果小于就返回 200 和新的文件体
  - Last-Modified 的缺点：
    - 就算打开文件没有修改，Last-Modified 也会更新
    - Last-Modified 只能精确到秒单位，高频更新还是会命中缓存
- ETag
  - Etag是服务器响应请求时，返回当前资源文件的一个唯一标识(由服务器生成)，**只要资源有变化，Etag就会重新生成**
  - 浏览器下一次请求时会把上一次的Etag值放到header 的If-None-Match里，服务端对比Etag判断返回304还是200
- Last-Modified和ETag对比
  - Last-Modified性能优于ETag，前者只是时间，后者还要用算法计算出hash值
  - ETag 比 Last-Modified 更精确
  - ETag 优先级高于 Last-Modified
  - Last-Modified是系统文件自带属性，ETag 则是需要nginx之类的进行配置

### 优化与配置
- 为了避免强缓存，要在连接加hash，防止服务端更新了浏览器也不请求直接取本地资源
- nginx 配置
  - etag on;   //开启etag验证
  - expires 7d;    //设置缓存过期时间为7天