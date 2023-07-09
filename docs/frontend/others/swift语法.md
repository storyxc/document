# swift语法

> 英文原版：https://docs.swift.org/swift-book/
>
> 中文版：https://swiftgg.gitbook.io/swift/



## 可选类型

*可选类型（optionals）*来处理值可能缺失的情况。可选类型实际也是一个枚举:

```swift
enum Optional<T> {
  case none
  case some(T) 
}
```

### nil

如果声明一个可选常量或者变量但是没有赋值，它们会自动被设置为`nil`：

```swift
var hello: String?							var hello: Optional<String> = .none
var hello: String? = "hello"    var hello: Optional<String> = .some("hello")
var hello: String? = nil        var hello: Optional<String> = .none
```

```swift
var surveyAnswer: String? 
// surveyAnswer 会被自动设置为 nil -> var surveyAnswer: String? = nil
```

### 强制解析

```swift
let hello: String? = ...
print(hello!)
```

等价于

```swift
switch hello {
  case .none: //raise an exception(crash)
  case .some(let data): print(data)
}
```

### 可选绑定

强制解析可能会导致异常，可以使用`if let`来安全的获取可选类型中的值

```swift
if let safehello = hello {
  print(safehello)
} else {
  //do something else
}
```

等价于

```swift
switch hello {
  case .none: //do something else
  case .some(let data): print(data)
}
```

> 使用可选绑定时后面不能用`&&`,可以用`,`隔开语句

### 空合运算符（Nil Coalescing Operator）

*空合运算符*（`a ?? b`）将对可选类型 `a` 进行空判断，如果 `a` 包含一个值就进行解包，否则就返回一个默认值 `b`。表达式 `a` 必须是 Optional 类型。默认值 `b` 的类型必须要和 `a` 存储值的类型保持一致。

空合运算符是对以下代码的简短表达方法：

```swift
a != nil ? a! : b
```

例子：

```swift
let x: String? = ...
let y = x ?? z
```

实际等价于上：

```swift
switch a {
  case .none: y = z
  case .some(let data): y = data
}
```

### 可选链

*可选链式调用*是一种可以在当前值可能为 `nil` 的可选值上请求和调用属性、方法及下标的方法。如果可选值有值，那么调用就会成功；如果可选值是 `nil`，那么调用将返回 `nil`。多个调用可以连接在一起形成一个调用链，如果其中任何一个节点为 `nil`，整个调用链都会失败，即返回 `nil`。

```swift
let x: String = ...
let y = x?.foo()?.bar?.z
```

等价于

```swift
switch x {
  case .none: y = nil
  case .some(let xval):
  	switch xval.foo() {
      case .none: y = nil
      case .some(let xfooval):
      	switch xfooval.bar {
          case .none: y = nil
          case .some(let xfbval): y = xfbval.z
        }
    }
}
```



## 闭包

### 闭包表达式

```swift
{ (parameters) -> return_type in
    statements
}
```

### 尾随闭包（Trailing Closures）

尾随闭包是一个书写在函数圆括号之后的闭包表达式，函数支持将其作为最后一个参数调用。在使用尾随闭包时，不用写出它的参数标签



例如：

```swift
ForEach(modelData.categories.keys.sorted(), id: \.self) { key in
    CategoryRow(categoryName: key, items: modelData.categories[key]!)
}
```

### 多重尾随闭包（multiple trailing closure）

```swift
struct SignInView: View {
    var body: some View {
        Button {
            showingProfile.toggle()
        } label: {
            Label("User Profile", systemImage: "person.crop.circle")
        }
    }
}
```

## 方法

### 在实例方法中修改值类型

结构体和枚举是*值类型*。默认情况下，值类型的属性不能在它的实例方法中被修改。

如果确实需要在某个特定的方法中修改结构体或者枚举的属性，可以为这个方法选择 `可变（mutating）`

```swift
struct Point {
    var x = 0.0, y = 0.0
    mutating func moveBy(x deltaX: Double, y deltaY: Double) {
        x += deltaX
        y += deltaY
    }
}
var somePoint = Point(x: 1.0, y: 1.0)
somePoint.moveBy(x: 2.0, y: 3.0)
print("The point is now at (\(somePoint.x), \(somePoint.y))")
// 打印“The point is now at (3.0, 4.0)”
```



## 属性

### 计算属性

计算属性不直接存储值，而是提供一个 getter 和一个可选的 setter，来间接获取和设置其他属性或变量的值。

```swift
struct Point {
    var x = 0.0, y = 0.0
}
struct Size {
    var width = 0.0, height = 0.0
}
struct Rect {
    var origin = Point()
    var size = Size()
    var center: Point {
        get {
            let centerX = origin.x + (size.width / 2)
            let centerY = origin.y + (size.height / 2)
            return Point(x: centerX, y: centerY)
        }
        set(newCenter) {
            origin.x = newCenter.x - (size.width / 2)
            origin.y = newCenter.y - (size.height / 2)
        }
    }
}
var square = Rect(origin: Point(x: 0.0, y: 0.0),
    size: Size(width: 10.0, height: 10.0))
let initialSquareCenter = square.center
square.center = Point(x: 15.0, y: 15.0)
print("square.origin is now at (\(square.origin.x), \(square.origin.y))")
// 打印“square.origin is now at (10.0, 10.0)”
```

#### 简化 Setter 声明

如果计算属性的 setter 没有定义表示新值的参数名，则可以使用默认名称 `newValue`。下面是使用了简化 setter 声明的 `Rect` 结构体代码：

```swift
struct AlternativeRect {
    var origin = Point()
    var size = Size()
    var center: Point {
        get {
            let centerX = origin.x + (size.width / 2)
            let centerY = origin.y + (size.height / 2)
            return Point(x: centerX, y: centerY)
        }
        set {
            origin.x = newValue.x - (size.width / 2)
            origin.y = newValue.y - (size.height / 2)
        }
    }
}
```

#### 简化 Getter 声明

如果整个 getter 是单一表达式，getter 会隐式地返回这个表达式结果。下面是另一个版本的 `Rect` 结构体，用到了简化的 getter 和 setter 声明：

```swift
struct CompactRect {
    var origin = Point()
    var size = Size()
    var center: Point {
        get {
            Point(x: origin.x + (size.width / 2),
                  y: origin.y + (size.height / 2))
        }
        set {
            origin.x = newValue.x - (size.width / 2)
            origin.y = newValue.y - (size.height / 2)
        }
    }
}
```

在 getter 中忽略 `return` 与在函数中忽略 `return` 的规则相同.

#### 只读计算属性

只有 getter 没有 setter 的计算属性叫*只读计算属性*。只读计算属性总是返回一个值，可以通过点运算符访问，但不能设置新的值。

> 注意
>
> 必须使用 `var` 关键字定义计算属性，包括只读计算属性，因为它们的值不是固定的。`let` 关键字只用来声明常量属性，表示初始化后再也无法修改的值。

只读计算属性的声明可以去掉 `get` 关键字和花括号：

```swift
struct Cuboid {
    var width = 0.0, height = 0.0, depth = 0.0
    var volume: Double {
    	return width * height * depth
    }
}
let fourByFiveByTwo = Cuboid(width: 4.0, height: 5.0, depth: 2.0)
print("the volume of fourByFiveByTwo is \(fourByFiveByTwo.volume)")
// 打印“the volume of fourByFiveByTwo is 40.0”
```

### 属性观察器

属性观察器监控和响应属性值的变化，每次属性被设置值的时候都会调用属性观察器，即使新值和当前值相同的时候也不例外。

可以在以下位置添加属性观察器：

- 自定义的存储属性
- 继承的存储属性
- 继承的计算属性

可以为属性添加其中一个或两个观察器：

- `willSet` 在新的值被设置之前调用
- `didSet` 在新的值被设置之后调用

`willSet` 观察器会将新的属性值作为常量参数传入，在 `willSet` 的实现代码中可以为这个参数指定一个名称，如果不指定则参数仍然可用，这时使用默认名称 `newValue` 表示。

同样，`didSet` 观察器会将旧的属性值作为参数传入，可以为该参数指定一个名称或者使用默认参数名 `oldValue`。如果在 `didSet` 方法中再次对该属性赋值，那么新值会覆盖旧的值。

> 在父类初始化方法调用之后，在子类构造器中给父类的属性赋值时，会调用父类属性的 `willSet` 和 `didSet` 观察器。而在父类初始化方法调用之前，给子类的属性赋值时不会调用子类属性的观察器。

```swift
class StepCounter {
    var totalSteps: Int = 0 {
        willSet(newTotalSteps) {
            print("将 totalSteps 的值设置为 \(newTotalSteps)")
        }
        didSet {
            if totalSteps > oldValue  {
                print("增加了 \(totalSteps - oldValue) 步")
            }
        }
    }
}
let stepCounter = StepCounter()
stepCounter.totalSteps = 200
// 将 totalSteps 的值设置为 200
// 增加了 200 步
stepCounter.totalSteps = 360
// 将 totalSteps 的值设置为 360
// 增加了 160 步
stepCounter.totalSteps = 896
// 将 totalSteps 的值设置为 896
// 增加了 536 步
```

## protocol

sort of a "stripped-down" struct/class

有函数和变量，但是没有具体实现，类似interface, 当实现一个协议时，必须实现协议中所有的函数和变量

使用protocol来限制entension:

```swift
extension Array where Element: Hashable {...}
```

使用protocol来限制函数:

```swift
init(data: Data) where Data: Collection, Data.Element: Identifiable
```

### protocol extension

可以通过extension给protocol的func或var添加默认的实现

```swift
struct Tesla: Vehicle {
  //...
}

extension Vehicle {
  fun registerWithDMV() { // actual implementation }
}
```

```swift
protocol View {
  var body: some View
}
```

```swift
extension View {
  func foregroundColor(_ color: Color) -> some View { /* implementation */ }
  func font(_ font: Font?) -> some View { /* implementation */ }
  ...
}
```

### generics + protocols

```swift
protocol Identifiable {
  associatedtype ID
  var id: ID { get }
}
```

