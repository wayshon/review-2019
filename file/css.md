## CSS

#### border 三角形
- 我特么就会画四个三角形，至于为什么三遍和两邻边的诡异情况就不清楚了

#### box-shadow
- box-shadow: x偏移 y偏移 模糊程度, 宽度, 是否往内

#### linear-gradient
- linear-gradient(角度[0为由下往上]，颜色，颜色)

#### nth-child 与 nth-of-type
- nth-child 是指他爸爸底下第几个孩子，<u>是所有的孩子都计算在内</u>。比如他爸的第三个孩子是`div`,`p:nth-child(3)`就没卵用，他爸爸不认他，他爸的第三个孩子正好是`p`才生效(first-child,last-child一个意思)。
- nth-of-type 也是指他爸爸底下第几个孩子，<u>是只计算指定元素</u>。比如他爸的第三个孩子是`div`，第四个孩子是`p`，同时所有`p`孩子中第三个，这时候样式就是生效的，他爸爸认他。

#### css选择器
- 参考 [w3school](https://www.w3school.com.cn/cssref/css_selectors.ASP)

| 元字符 | 作用 |
| :------| :------ |
| [attribute] | 用于选取带有指定属性的元素 |
| [element1+element2] | 选择紧接在 element1 元素之后的所有 element2 元素 |
| [element1~element2] | 选择前面有 element1 元素的每个 element2 元素 |
| [attribute=value] | 用于选取带有指定属性和值的元素 |
| [attribute~=value] | 用于选取属性值中包含指定词汇的元素 |
| [attribute|=value] | 用于选取带有以指定值开头的属性值的元素，该值必须是整个单词 |
| [attribute^=value] | 匹配属性值以指定值开头的每个元素 |
| [attribute$=value] | 匹配属性值以指定值结尾的每个元素 |
| [attribute*=value] | 匹配属性值中包含指定值的每个元素 |

### 前端有哪些适配方案

#### 媒体查询
- 通过查询设备尺寸执行不同的css代码
- 或者用在link标签上按需加载`<link rel="stylesheet" href="css/1.css" media='(max-width:500px)'>`
- 优点:
  - 可以同时兼容PC与移动端用同一套代码
  - 响应式布局，屏幕尺寸发生变化不用刷新页面就能布局
- 缺点:
  - 代码冗余，维护不方便

#### rem
- 通过`window.devicePixelRatio`可以获取到物理像素和设备独立像素的比例,如iPhone6就是2,iPhone8是3
- 真实rem = 预期rem值 / 设计稿宽 * 设备宽度, 例如`font-size: calc(75 / 750 * 100vw)`
- 优点:
  - 实现设计稿在不同设备的等比缩放
  - 不用关心dpr,完全依赖的是逻辑像素
- 缺点:
  - rem会计算出小数,在小数敏感不一致的机型会出现问题
  - 小于12px的文字可能不会正常渲染
  - 会导致1像素边框问题，可以伙同 viewport 一起使用解决这个问题
  - 真正需要的可能不是设计稿等比缩放，例如文字可以岁屏幕大小变化，而图片却不一定非要变大缩放

#### flex 布局
- 高度定死，宽度自适应，元素采用px做单位

#### viewport
- 把 rem 的值乘以 dpr，将meta viewport里的initial-scale=1/dpr
- 可以实现高清页面

#### vw 和 vh
- 100vw = clientWidth, 100vh = clientHeight

#### 怎么精确到 1px
- dpr高的设备下，写的1像素，实际是比1的dpr倍
- 1、页面整体缩放，如上面的 viewport initial-scale=1/dpr
- 2、`transform: scale(1/devicePixelRatio)`

#### 各种宽度
- offsetWidth, 即 `border-box`, 返回元素的宽度（包括元素宽度、内边距和边框，不包括外边距）
- clientWidth, 返回元素的宽度（包括元素宽度、内边距，不包括边框和外边距）
- style.width, 即 `content-box`, 返回元素的宽度（包括元素宽度，不包括内边距、边框和外边距）
- scrollWidth, 返回元素的宽度（包括元素宽度、内边距和溢出尺寸，不包括边框和外边距），无溢出的情况，与clientWidth相同

### BFC 块格式化上下文
封闭健壮，子元素不会影响外部元素，所以不会出现margin重叠等。外部元素也不会影响到子元素，所以可以去除浮动的影响

#### 触发 BFC 条件
- 浮动元素 float
- 绝对定位 position: absolute / fixed
- overflow: hidden / auto / scroll (即除了 visible)
- display: inline-blocks / table-cells / table-captions

#### 作用
- 清除浮动
  - float 会导致元素脱离文档流使父元素塌陷，bfc可以使父元素不塌陷
  - 避免浮动元素与其他元素重叠，因为BFC的特性不影响别人也不被别人影响
- 避免margin重叠
- 避免文字环绕
  - float元素会覆盖在普通元素上，但是文本行块不可覆盖，所以会出现文字收缩环绕 float 元素的情况。给元素加上 bfc就不会环绕float元素了