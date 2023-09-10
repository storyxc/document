# SwiftUI入门



## MVVM

MVVM是一种架构设计范式，把数据和视图分离开，Model和View必须通过ViewModel通信。

### Model

数据模型，负责数据和逻辑的处理，独立于UI界面，数据流（data flows）在映射到视图中的过程是**只读**的

### View

渲染UI界面，展示Model数据，声明式（为UI声明的方法，在任何时候做它们应做的事情）、无状态的（不需要关心任何状态变化）、响应式的（跟随Model数据变化重新渲染）。

### ViewModel

执行解释工作（interpreter），绑定View和Model。ViewModel关注Model中的变化（notices changes），然后把Model的数据变更发布出去（publishes  changed），订阅了（subsrcbes）某个发布（publication）的View会进行rebuild。

> ViewModel没有指向View的指针，不直接与View对话，如果View订阅了某个发布，就会询问ViewModel怎么适应变化，这个过程不会涉及Model，因为ViewModel的作用就是解释Model的变化。

## MVVM的Processes Intent

MVVM有一个对应的关联架构，是Model-View-Intent。如果用户意图（*intent*）做一些操作，那么这些Intent就要进行View到Model这个反向传递过程。而swiftUI还没有进行这个设计，所以我们用下面一系列操作来处理Intent：

- **View** *Calls Intent function*   视图调用方法
- **ViewModel** *modifies the Model* 视图模型修改模型
- **Model** *changes* 模型改动变化
- **ViewModel** *notices changes and publishes* 模型关注到变化并发布
- **View whitch subscribes** *Reflect the Model* 订阅变化的视图进行模型映射

对比MVVM的映射过程，多了ViewModel处理View操作，并且修改Model这两个操作。

> https://www.jianshu.com/p/c14c70c0c9f7





## Layout

### HStack and VStack

stacks划分提供给自身的空间，然后把空间分配给内部的视图。优先给`least flexible`的子视图分配空间。

- Example of inflexible view : Image,Image视图需要一个固定尺寸
- Another example(slightly more flexible): Text,需要一个完全适合内部文本的尺寸
- Example of a very flexible View: RoundedRectangle,总是使用所有可用的空间

在给一个视图它需要的空间后，这块空间从可用空间中被移除，然后stack继续给下一个`least flexible`的视图分配空间。`very flexible views`最后会平分空间。

在子视图选择了它们的尺寸后，stack会调整自己的size来适应它们，如果有`very flexible`的子视图，那么这个stack也会变得`very flexible`

#### .layoutPriority(Double)

可以使用`.layoutPriority(Double)`改变获取空间的优先级，默认值为0。`.layoutPriority(Double)`的优先级要比`least flexible`更高。

### alignment

why .leading instead of .left？Stacks会根据语言环境判断对齐方式，例如有些语言(阿拉伯语)的文本是从右向左的。

### LazyHStack and LazyVStack

不会build不可见的视图内容，通常用在ScrollView中

### ScrollView

占据所有可用空间，子视图大小根据滚动轴调整

### List、Form、OutlineGroup

really smart VStacks

### .backgroup 修饰符

`Text("hello").backgroup(Rectangle().foregroundColor(.red))`，效果类似ZStack(Text在上),但是区别是这个例子中最终的View大小是由Text决定的

### .overlay 修饰符

```swift
Image(systemName: "folder")
   .font(.system(size: 55, weight: .thin))
   .overlay(Text("❤️"), alignment: .bottom)
```

视图的大小由Image决定，Text会堆叠在Image上，底部对齐

### Modifiers

所有修饰符都会返回一个View

#### Example

```swift
HStack{
  ForEach(viewModel.cards) { card in
 		 CardView(card: card).aspectRatio(2/3, contentMode: .fit)                       
  }
}
.foregroundColor(.orange)
.padding(10)
```

- 首先被提供空间的是`.padding(10)`
- 然后内边距10的空间会提供给`.foregroudColor`
- 最后所有空间被提供给HStack
- 然后空间被平均分给`.aspectRatio`
- 每个`.aspectRatio`会设置宽度，然后遵循2/3的长宽比设置高度，或者在HStack高度不足时，占据所有高度，然后按2/3设置宽度。
- `.aspectRatio`把所有空间提供给CardView

### Spacer(minLength: CGFloat)

总是占据提供给他的所有空间，不绘制任何东西.

### Divider()

分割线，在HStack中绘制垂直的线，VStack中是水平线。

## @ViewBuilder

@ViewBuilder是一个参数属性，作用于构造视图的闭包参数上，允许闭包提供多个子视图。

```swift
@ViewBuilder
func front(of card: Card) -> some View {
  let shape = RoundedRectangle(cornerRadius: 20)
  shape
  shape.stroke()
  Text(card.content)
}
```



## Property Wrapper

```swift
@propertyWrapper
struct Converter1{
    let from:String
    let to:String
    let rate:Double
    
    var value:Double
    var wrappedValue:String{
        get{
            "\(from)\(value)"
        }
        set{
            value = Double(newValue) ?? -1
        }
    }
    
    var projectedValue:String{
        return "\(to)\(value * rate)"
    }
    
    init(initialValue:String,
         from:String,
         to:String,
         rate:Double
    ) {
        self.rate = rate
        self.value = 0
        self.from = from
        self.to = to
        self.wrappedValue = initialValue
    }
    
    
}

struct TestWraper {
    @State var myname = ""
    @Converter1(initialValue: "100", from: "USD", to: "CNY", rate: 6.88)
    var usd_cny
    
    @Converter1(initialValue: "100", from: "CNY", to: "EUR", rate: 0.13)
    var cny_eur
    
    func test1(){
        print("\(usd_cny)=\($usd_cny)")
        print("\(cny_eur)=\($cny_eur)")
    }
    /*
     USD100.0=CNY688.0
     CNY100.0=EUR13.0
     */
}
```

- 属性包装器必须有一个包装值，名为`wrappedValue`的计算属性
- 预计值为`projectedValue`，访问预计值的方式为`.$属性名`，`projectedValue`是只读的。



### Property Wrapper使用限制

- protocol中无法使用
- 通过wrapper包装的实例属性不能在extension中声明
- 不能在enum中声明
- class中通过wrapper包装的属性无法被另外一个属性通过override覆盖
- 通过wrapper包装的实例属性不能用`lazy`、`@NSCopying`、`@NSManaged`、`weak`或`unowned`修饰

### @State

- 视图是只读的

  所有视图的struct都是完全、彻底只读的，所以View中只有`let`和`computed`(常量和计算属性)才有意义。（被@ObservedObject装饰的属性除外，这种属性必须被标记为`var`）

- 为什么

  View一直在被创建、丢弃，只有`body`才会存在很久，所以View不太需要一些需要被修改的属性

don't worry，之所以这样是因为View应该是stateless的，只负责渲染model，不需要自身具有什么状态属性。但是极少数情况下View也是需要状态的(it turns out there are a few rare times when a View needs some state)，但这种状态存储总是暂时的(always temporary)，所有持久化的状态都存在Model中。

例如：进入编辑模式，需要提前收集数据来为用户修改数据的intent作准备，需要暂时展示其他的View（编辑页面）来收集数据，编辑完后需要一个动画效果来关闭这个编辑页面，所以需要一个"编辑模式状态"的属性来标记何时该关闭。

上述场景中可以使用`@State`来标记这个临时状态存储变量

```swift
@State private var somethingTemporary: SomeType //someType can be any struct
```

这个临时状态变量是private修饰的，是因为只有当前View能访问这个变量。`@State`变量的变化会导致这个View的body重新渲染。这和`@ObservedObject`类似，但是`@State`作用的是一个随机的数据(值语义)，而`@ObservedObject`作用在ViewModel上（对象语义）。



### @ObservedObject

多个视图数据共享和更新时，需要一个数据模型的概念，即多视图的状态可以根据`Data-Model`进行更新，这种场景下@State就不再适用了。

- `ObservableObject`协议定义了一个数据模型的数据发生变化时发布通知的能力

- `@ObservedObject`这个属性包装器包装的属性可以监听到数据的变化，也可以利用它去更新数据。

- `@Published`这个属性包装器包装的属性，都会被转化为一个publisher（Combine框架的概念），当值发生变化时，会通知系统，然后系统再去更新画面



### @StateObject

和@ObservedObject类似，也是修饰对象语义，和@ObservedObject的区别在于，实例是否被创建其的View所持有，其生命周期是否完全可控，@StateObject修饰的属性的生命周期由创建该对象的对象维护（这一点又类似@State）

```swift
class DataSource: ObservableObject {
  @Published var counter = 0
}

struct Counter: View {
  @ObservedObject var dataSource = DataSource()

  var body: some View {
    VStack {
      Button("Increment counter") {
        dataSource.counter += 1
      }

      Text("Count is \(dataSource.counter)")
    }
  }
}

struct ItemList: View {
  @State private var items = ["hello", "world"]

  var body: some View {
    VStack {
      Button("Append item to list") {
        items.append("test")
      }

      List(items, id: \.self) { name in
        Text(name)
      }

      Counter()
    }
  }
}
```

在这个例子中，每次点击`Append item to list`Button，counter都会被重置，这是因为每次重新渲染，DataSource()都会被重新创建。解决这个问题有两个方法：

1. 在ItemList中创建DataSource，并把DataSource传递给Counter
2. 把@ObservedObject替换为@StateObject

将DataSource标记为@StateObject意味着DataSource被实例化后会保存在Counter的外部，当Counter重新渲染时，会直接用这个值。



### @EnvironmentObject

使用`@ObservedObject`可以在视图间共享数据、刷新画面，但是必须为需要的视图进行引用的传递。如果视图的层级较多，且各个View和子View使用同一个数据模型，那么`@ObservedObject`的传递将会变得笨重且易出错。

SwiftUI提供了另一种选择,`@EnvironmentObject`就是把数据模型引用保存到了一个共同的环境变量中，`environment`是一个共通的存储区域，保存了app的信息和Views，当然也可以保存自定义数据，包括对observable object的引用。



### @Environment

和`@State`类似，App也可以响应iOS系统过来的state变化，例如语言环境、字体大小、暗黑模式切换等，为了及时响应这些变化，app可以使用`@Environment(KeyPath)`来进行获取实时的信息。





## Combine框架

`@Published`属性包装器和`ObservableObject`的实现定义在`Combine`框架中。Combine框架中定义了一些协议和数据类型，可以让我们处理数据，当一个代码数据发生变化，可以应用这个框架来通知另外一处代码有新数据可以使用。

这样就会出现两个类型的任务，一个是发布者(publisher)，一个是订阅者(subscriber)。发布者决定了数据和错误信息的产生并发给订阅者，订阅者会接受这些信息。

在SwiftUI中，被`@Published`修饰的属性，会被自动转化为Publisher，`ObservableObject`协议的实现中，定义了被`@Published`修饰的属性作为发布者，在属性的值发生变化的时候，发布者将通知订阅者。`@ObservedObject`和`@EnvironmentObject`修饰的属性，扮演订阅者的角色。

### Just发布者和Subscribers.Sink

```swift
import Combine
import Foundation

let myPublisher = Just("55")

let mySubscriber = Subscribers.Sink<String,Never> (receiveCompletion: { completion in
    if completion == .finished {
        print("111")
    }else {
        print("222")
    }
    
}, receiveValue: { value in
    print(value)
})

myPublisher.subscribe(mySubscriber)
```

### 数据的转换

中间发布者

Publishers.Map

Publishers.Filter

...

或Just().操作符

### Subjects

Combine还有一种发布者叫Subjects，实现了Subject协议，可以调用send方法发送数据

- PassthroughSubject()
- CurrentValueSubject(value)

```swift
import Combine
import Foundation

enum MyErrors: Error {
    case wrongValue
}

let myPublisher = PassthroughSubject<String, MyErrors>()
//let myPublisher = CurrentValueSubject<String, MyErrors>("100")

let mySubscriber = myPublisher.filter({
    return $0.count < 5
}).sink(receiveCompletion: {completion in
    if completion == .failure(MyErrors.wrongValue) {
        print("MyErrors.wrongValue")
    }else {
        print(completion)
    }
    
}, receiveValue: { value in
    print("value: \(value)")
})


myPublisher.send("h")
```

### .onReceive

SwiftUI中，View协议有一个修饰符`.onReceive(Publisher, perform: Closure)`把任何View转换成一个订阅者，来接受来自发布者的数据，SwiftUI使UI组件和Combine结合带来了扩展可能。

```swift
import SwiftUI

class ContentViewData: ObservableObject {
  @Published var counter: Int = 0
  let timePublisher = Timer.publish(every: 2, on: .main, in: .common).autoconnect()
}

struct ContentView: View {
  @ObservedObject var contentData = ContentViewData()
  
  var body: some View {
    Text("hello, world! \(self.contentData.counter)")
    .onReceive(contentData.timePublisher, perform: { value in
      self.contentData.counter += 1
      if self.contentData.counter > 20 {
        self.contentData.timePublisher.upstream.connect().cancel()
        print("stop")
      }
    })
  }
}

```

