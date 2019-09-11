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