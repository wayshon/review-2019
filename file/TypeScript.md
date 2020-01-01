## typescript 学习笔记

### 类型
- type 用来声明别名
- 类型断言，`<string>p`或者`p as string`，但是在jsx中只能用 as

### 泛型
- 泛型是用户传给函数用的，具体怎么使用取决于函数的实现

### interface
- interface 用来约束字典
- `&` 交叉类型，用来将多个interface交叉合并成一个新的interface，但是不能有冲突
- `|` 联合类型，用来表示多个类型之一
- 在interface中，交叉取并集，联合取交集，但是基本类型中表现却不是这样
- 细品下面的demo
```
interface Person<T> {
    name: T;
    father: Person<T>;
}
```
- 字面量类型，其实就是字面值里选一个，就像联合类型一样
```
type Person = 'teacher' | 'student'
fn(p: Person);
```
- 索引类型与映射类型
  - keyof 获取 T 的所有属性名，用来实现类型索引，见 p42
- interface 不同没事，只要对应的输赢能找到，就能兼容直接赋值

### 疑问
- `xxx<typeof A>`这里的typeof啥意思，返回结构对象吗
- `infer`关键字没理解
