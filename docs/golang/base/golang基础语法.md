# Golang基础语法

## 第一个Go程序

```go
package main

import "fmt"

func main() {
	fmt.Println("Hello, World!")
}
```

## 关键字

- `package`：定义当前源码文件所属的包。
- `import`：导入其他包。
- `func`：定义函数。
- `var`：声明变量。
- `const`：声明常量。
- `type`：定义类型。
- `struct`：定义结构体。
- `interface`：定义接口。
- `map`：定义映射类型。
- `range`：用于循环迭代。
- `select`：用于通道操作。
- `defer`：延迟执行。
- `go`：启动一个新的 goroutine。
- `chan`：定义通道类型。
- `default`：select 语句中的默认情况。
- `fallthrough`：在 switch 语句中贯穿到下一个 case。
- `if`：条件语句。
- `else`：if 语句中的默认情况。
- `switch`：多分支条件语句。
- `case`：switch 语句中的分支情况。
- `for`：循环语句。
- `break`：跳出循环或 switch 语句。
- `continue`：结束当前循环，开始下一次循环。
- `return`：返回函数结果。
- `panic`：抛出异常。

## 变量与常量

### 变量

#### 声明变量不赋值

```go
package main

import "fmt"

func main() {
	var a int
	fmt.Println("a = ", a)
	fmt.Printf("a的类型是%T\n", a)
}
// a = 0
// a的类型是int
```

- 整型、浮点型变量的默认值为0和0.0
- 字符串变量的默认值为空字符串
- 布尔类型变量默认为false
- 切片、函数、指针变量的默认为nil

#### 声明变量并初始化

```go
package main

import "fmt"

func main() {
	var a int = 10
	fmt.Println("a =", a)
	fmt.Printf("a的类型是%T\n", a)

	var b string = "hello"
	fmt.Println("b =", b)
	fmt.Printf("b的类型是%T\n", b)
}
// a = 10
// a的类型是int
// b = hello
// b的类型是string
```

#### 声明变量省略类型

```go
package main

import "fmt"

func main() {
	var a = 10
	fmt.Println("a =", a)
	fmt.Printf("a的类型是%T\n", a)

	var b = "hello"
	fmt.Println("b =", b)
	fmt.Printf("b的类型是%T\n", b)
}
// a = 10
// a的类型是int
// b = hello
// b的类型是string
```

#### 短声明（只能在函数内）

```go
package main

import "fmt"

func main() {
	c := "1"
	fmt.Printf("c = %s, c的类型是%T\n", c, c)
}
// c = 1, c的类型是string
```

#### 多变量声明

```go
package main

func main(){
    var xx, yy int = 100, 200
    var kk, wx = 300, "666
    var (
        nn int = 100
        mm bool = true
    )
}
```

#### 匿名变量

匿名变量：下划线`_`，本身就是一个特殊的标识符。可以像其他标识符那样用于变量的声明，任何类型都可以赋值给它，**但任何赋值给这个标识符的值都将被抛弃**，因此这些值不能在后续的代码中使用。

#### 变量交换

> 和其他静态类型语言不同，可以直接交换变量（python也有这个语法）

```go
package main

import "fmt"

func main() {
	var (
		a = 100
		b = 200
	)

	a, b = b, a

	fmt.Println(a, b)
}
// 200 100
```



### 常量

```go
package main

import "fmt"

func main(){
    // 常量(只读属性)
    const length int = 10
    // length = 100  // 常量是不允许被修改的
    fmt.Println("length = ", length)
}
```

#### 使用常量定义枚举类型

```go
package main

import "fmt"

// const来定义枚举类型
const (
    BEIJING = 0
    SHANGHAI = 1
    SHENZHEN = 2
)

func main() {
    fmt.Println("BEIJING = ", BEIJING)      // 0
    fmt.Println("SHANGHAI = ", SHANGHAI)    // 1
    fmt.Println("SHENZHEN = ", SHENZHEN)    // 2
}
```

#### iota常量计数器

`iota` 是一个常量生成器，用于生成一组相关的枚举值。`iota` 可以与 `const` 关键字一起使用，在定义一组枚举时，用来生成连续的值。const 中每新增一行常量声明将使 iota 计数一次(iota 可理解为 const 语句块中的行索引)

```go
// iota 初始值为 0，每当出现一个新的常量声明时，它的值就会自动加 1，因此 Monday 的值为 1，Tuesday 的值为 2，以此类推。
const (
    Sunday = iota // 0
    Monday        // 1
    Tuesday       // 2
    Wednesday     // 3
    Thursday      // 4
    Friday        // 5
    Saturday      // 6
)

// 在下面的例子中，B 被显式赋值为 3.14，因此接下来的 C 的值为 iota + 1，即 2，而 D 的值也是 iota + 1，所以它的值为 3。
const (
    A = iota // 0
    B = 3.14 // 3.14
    C = iota // 2
    D        // 3
)
```

```go
package main

import "fmt"

// 定义递增的步长
const (
    BEIJING = iota * 10
    SHANGHAI
    SHENZHEN
)

func main() {
    fmt.Println("BEIJING = ", BEIJING)      // 0
    fmt.Println("SHANGHAI = ", SHANGHAI)    // 10
    fmt.Println("SHENZHEN = ", SHENZHEN)    // 20
}
```

## 基本数据类型

### 整型

- int8：有符号 8 位整数类型，取值范围为 -128 到 127。
- uint8（或 byte）：无符号 8 位整数类型，取值范围为 0 到 255。
- int16：有符号 16 位整数类型，取值范围为 -32768 到 32767。
- uint16：无符号 16 位整数类型，取值范围为 0 到 65535。
- int32（或 rune）：有符号 32 位整数类型，取值范围为 -2147483648 到 2147483647。
- uint32：无符号 32 位整数类型，取值范围为 0 到 4294967295。
- int64：有符号 64 位整数类型，取值范围为 -9223372036854775808 到 9223372036854775807。
- uint64：无符号 64 位整数类型，取值范围为 0 到 18446744073709551615。

```go
package main

import (
	"fmt"
	"math"
	"unsafe"
)

// 有符号整型
func Integer() {
	var num8 int8 = 127
	var num16 int16 = 32767
	var num32 int32 = math.MaxInt32
	var num64 int64 = math.MaxInt64
	var num int = math.MaxInt
	fmt.Printf("num8的类型是 %T, num8的大小 %d, num8是 %d\n",
		num8, unsafe.Sizeof(num8), num8)
	fmt.Printf("num16的类型是 %T, num16的大小 %d, num16是 %d\n",
		num16, unsafe.Sizeof(num16), num16)
	fmt.Printf("num32的类型是 %T, num32的大小 %d, num32是 %d\n",
		num32, unsafe.Sizeof(num32), num32)
	fmt.Printf("num64的类型是 %T, num64的大小 %d, num64是 %d\n",
		num64, unsafe.Sizeof(num64), num64)
	fmt.Printf("num的类型是 %T, num的大小 %d, num是 %d\n",
		num, unsafe.Sizeof(num), num)
}

// 无符号整型
func unsignedInteger() {
	var num8 uint8 = 128
	var num16 uint16 = 32768
	var num32 uint32 = math.MaxUint32
	var num64 uint64 = math.MaxUint64
	var num uint = math.MaxUint
	fmt.Printf("num8的类型是 %T, num8的大小 %d, num8是 %d\n",
		num8, unsafe.Sizeof(num8), num8)
	fmt.Printf("num16的类型是 %T, num16的大小 %d, num16是 %d\n",
		num16, unsafe.Sizeof(num16), num16)
	fmt.Printf("num32的类型是 %T, num32的大小 %d, num32是 %d\n",
		num32, unsafe.Sizeof(num32), num32)
	fmt.Printf("num64的类型是 %T, num64的大小 %d, num64是 %d\n",
		num64, unsafe.Sizeof(num64), num64)
	fmt.Printf("num的类型是 %T, num的大小 %d, num是 %d\n",
		num, unsafe.Sizeof(num), num)
}

func main() {
	Integer()
	println("---------------------------------------")
	unsignedInteger()
}
```

:::tip

- 除非对整型的大小有特定的需求，否则你通常应该使用 `int` 表示整型宽度，在 `32` 位系统下是 `32` 位，而在 `64` 位系统下是 `64` 位。表示范围：在 `32` 位系统下是 `-2147483648` ~ `2147483647` ，而在 `64` 位系统是 `-9223372036854775808` ~ `9223372036854775807` 。
- 对于 `int8` ， `int16` 等这些类型后面有跟一个数值的类型来说，它们能表示的数值个数是固定的。所以，在有的时候：例如在二进制传输、读写文件的结构描述(为了保持文件的结构不会受到不同编译目标平台字节长度的影响)等情况下，使用更加精确的 `int32` 和 `int64` 是更好的。

:::

### 浮点型

- `float32` 类型的变量占用 4 个字节的内存，可以表示的数值范围为±1.401298464324817e-45 到±3.4028234663852886e+38，精度约为 7 个十进制位。

- `float64` 类型的变量占用 8 个字节的内存， 可以表示的数值范围为±4.9406564584124654e-324 到±1.7976931348623157e+308，精度约为 15 个十进制位。

Go 语言中的浮点数默认为 `float64` 类型，如果需要使用 `float32` 类型，需要显式声明。

```go
package main

import (
	"fmt"
	"math"
)

func showFloat() {
	var num1 float32 = math.MaxFloat32
	var num2 float64 = math.MaxFloat64
	fmt.Printf("num1的类型是%T,num1是%g\n", num1, num1)
	fmt.Printf("num2的类型是%T,num1是%g\n", num2, num2)
}

func main() {
	showFloat()
}
//num1的类型是float32,num1是3.4028235e+38
//num2的类型是float64,num1是1.7976931348623157e+308
```

### 字符

字符串中的每一个元素叫作“字符”，定义字符时使用单引号。Go 语言的字符有两种。

- `byte`类型，占用1个字节，表示 UTF-8 字符串的单个字节的值，表示的是 ASCII 码表中的一个字符，uint8 的别名类型
- `rune`类型，占用4个字节，表示单个 unicode 字符，int32 的别名类型

```go
package main

import (
	"fmt"
	"unsafe"
)

func showChar() {
	var x byte = 65
	var y uint8 = 65
	z := 'A'
	fmt.Printf("x = %c\n", x) // x = A
	fmt.Printf("y = %c\n", y) // y = A
	fmt.Printf("z = %c\n", z) // z = A

}

func sizeOfChar() {
	var x byte = 65
	fmt.Printf("x = %c\n", x)
	fmt.Printf("x 占用 %d 个字节\n", unsafe.Sizeof(x))

	var y rune = 'A'
	fmt.Printf("y = %c\n", y)
	fmt.Printf("y 占用 %d 个字节\n", unsafe.Sizeof(y))
}

func main() {
	showChar()
	sizeOfChar()
}
```

### 字符串

字符串在Go语言中是基本数据类型。

```go
var study string  	 		// 定义名为str的字符串类型变量
study = "《123》"		// 将变量赋值
study2 := "《789》"		// 以自动推断方式初始化
```

定义多行字符串的方法如下。

- 双引号书写字符串被称为字符串字面量（string literal），这种字面量不能跨行。
- 多行字符串需要使用反引号“`”，多用于内嵌源码和内嵌数据。
- 在反引号中的所有代码不会被编译器识别，而只是作为字符串的一部分。

```go
package main
import "fmt"

func main() {
  var s1 string
	s1 = `
    		study := 'Go语言'
    		fmt.Println(study)
			`
	fmt.Println(s1)
}
```

### 布尔

```go
func showBool(){
	a := true
	b := false
	fmt.Println("a=", a)
	fmt.Println("b=", b)
	fmt.Println("true && false = ", a && b)
	fmt.Println("true || false = ", a || b)
}

func main() {
    showBool()
}
```

### 复数

| 类 型      | 字 节 数 | 说 明                                               |
| ---------- | -------- | --------------------------------------------------- |
| complex64  | 8        | 64 位的复数型，由 float32 类型的实部和虚部联合表示  |
| complex128 | 16       | 128 位的复数型，由 float64 类型的实部和虚部联合表示 |

```go
func showComplex() {
	// 内置的 complex 函数用于构建复数
	var x complex64 = complex(1, 2)
	var y complex128 = complex(3, 4)
	var z complex128 = complex(5, 6)
	fmt.Println("x = ", x)
	fmt.Println("y = ", y)
	fmt.Println("z = ", z)

	// 内建的 real 和 imag 函数分别返回复数的实部和虚部
	fmt.Println("real(x) = ", real(x))
	fmt.Println("imag(x) = ", imag(x))
	fmt.Println("y * z = ", y*z)
}

func main() {
   showComplex()
}
```

:::tip

同样可以用自然方式表示复数

```go
x := 1 + 2i
y := 3 + 4i
z := 5 + 6i
```

:::

### fmt格式化输出

| **格式** | **含义**                                                     |
| -------- | ------------------------------------------------------------ |
| %%       | 一个%字面量                                                  |
| %b       | 一个二进制整数值(基数为 2)，或者是一个(高级的)用科学计数法表示的指数为 2 的浮点数 |
| %c       | 字符型。可以把输入的数字按照 ASCII 码相应转换为对应的字符    |
| %d       | 一个十进制数值(基数为 10)                                    |
| %f       | 以标准记数法表示的浮点数或者复数值                           |
| %o       | 一个以八进制表示的数字(基数为 8)                             |
| %p       | 以十六进制(基数为 16)表示的一个值的地址，前缀为 0x,字母使用小写的 a-f 表示 |
| %q       | 使用 Go 语法以及必须时使用转义，以双引号括起来的字符串或者字节切片[]byte，或者是以单引号括起来的数字 |
| %s       | 字符串。输出字符串中的字符直至字符串中的空字符（字符串以’\0‘结尾，这个’\0’即空字符） |
| %t       | 以 true 或者 false 输出的布尔值                              |
| %T       | 使用 Go 语法输出的值的类型                                   |
| %x       | 以十六进制表示的整型值(基数为十六)，数字 a-f 使用小写表示    |
| %X       | 以十六进制表示的整型值(基数为十六)，数字 A-F 使用小写表示    |

- fmt.Print: 将指定的内容打印到标准输出，不换行。

- fmt.Println: 将指定的内容打印到标准输出，并在末尾添加换行符。

- fmt.Printf: 根据格式字符串将指定的内容格式化后打印到标准输出。

- fmt.Sprintf: 根据格式字符串将指定的内容格式化后返回一个格式化的字符串。

- fmt.Scan: 从标准输入读取内容，并将其存储到指定的变量中。

- fmt.Scanln: 从标准输入按空格分隔读取内容，并将其存储到指定的变量中，遇到换行符停止。

- fmt.Scanf: 根据格式字符串从标准输入读取内容，并将其按指定的格式存储到指定的变量中。

- fmt.Errorf: 根据格式字符串创建一个新的错误。

## 运算符

### 算数运算符

`+`、`-`、`*`、`/`、`%`、`++`、`--`

### 关系运算符

`==`、`!=`、`>`、`<`、`>=`、`<=`

### 逻辑运算符

`&&`、`||`、`!`

### 位运算符

`&`、`|`、`^`、`<<`、`>>`

## 容器类型

### 数组

Go 中的数组是值类型而不是引用类型。当数组赋值给一个新的变量时，该变量会得到一个原始数组的一个副本。如果对新变量进行更改，不会影响原始数组。

```go
func arrByValue() {
	arr := [...]string{"123", "456", "789"}
	copy := arr
	copy[0] = "Golang"
	fmt.Println(arr)
	fmt.Println(copy)
}
```

#### 声明

`var variable_name [SIZE]variable_type`

#### 初始化

- `var balance = [5]float32{1000.0, 2.0, 3.4, 7.0, 50.0}`
- `balance := [5]float32{1000.0, 2.0, 3.4, 7.0, 50.0}`

如果数组长度不确定，可以使用 **...** 代替数组的长度，编译器会根据元素个数自行推断数组的长度：

```go
var balance = [...]float32{1000.0, 2.0, 3.4, 7.0, 50.0}
或
balance := [...]float32{1000.0, 2.0, 3.4, 7.0, 50.0}
```

如果设置了数组的长度，我们还可以通过指定下标来初始化元素：

```go
//  将索引为 1 和 3 的元素初始化
balance := [5]float32{1:2.0,3:7.0}
```

初始化数组中 **{}** 中的元素个数不能大于 **[]** 中的数字。

如果忽略 **[]** 中的数字不设置数组大小，Go 语言会根据元素的个数来设置数组的大小：

```go
 balance[4] = 50.0
```

#### 访问

数组元素可以通过索引（位置）来读取。格式为数组名后加中括号，中括号中为索引的值。例如：

```go
var salary float32 = balance[9]
```

#### 数组长度

`len(arr)`

#### 数组遍历

使用`for range循环`

```go
func showArr() {
	arr := [...]string{"123", "456", "789"}
	for index, value := range arr {
		fmt.Printf("arr[%d]=%s\n", index, value)
	}

	for _, value := range arr {
		fmt.Printf("value=%s\n", value)
	}
}
```

### 切片Slice

Go 语言切片是对数组的抽象。

Go 数组的长度不可改变，在特定场景中这样的集合就不太适用，Go 中提供了一种灵活，功能强悍的内置类型切片("动态数组")，与数组相比切片的长度是不固定的，可以追加元素，在追加时可能使切片的容量增大。

#### 定义切片

```go
var identifier []type
```

切片不需要说明长度。

或使用 **make()** 函数来创建切片:

```go
var slice1 []type = make([]type, len)

也可以简写为

slice1 := make([]type, len)
```

也可以指定容量，其中 **capacity** 为可选参数。

```go
make([]T, length, capacity)
```

这里 len 是数组的长度并且也是切片的初始长度。

#### 切片初始化

直接初始化切片，**[]** 表示是切片类型，**{1,2,3}** 初始化值依次是 **1,2,3**，其 **cap=len=3**。

```go
s :=[] int {1,2,3 } 
```

初始化切片 **s**，是数组 arr 的引用。

```go
s := arr[:] 
```

将 arr 中从下标 startIndex 到 endIndex-1 下的元素创建为一个新的切片。

```go
s := arr[startIndex:endIndex] 
```

默认 endIndex 时将表示一直到arr的最后一个元素。

```go
s := arr[startIndex:] 
```

默认 startIndex 时将表示从 arr 的第一个元素开始。

```go
s := arr[:endIndex] 
```

通过切片 s 初始化切片 s1。

```go
s1 := s[startIndex:endIndex] 
```

通过内置函数 **make()** 初始化切片**s**，**[]int** 标识为其元素类型为 int 的切片。

```go
s :=make([]int,len,cap) 
```

> `make([]T, length, capacity)` 用于创建一个指定类型 `T`、长度为 `length`、容量为 `capacity` 的切片。其中，`length` 表示切片的实际长度，而 `capacity` 则表示切片底层数组的容量。
>
> 切片的容量可以理解为底层数组能够容纳的元素数量。当切片的容量不足以容纳新添加的元素时，Go 会自动将底层数组扩展一倍，并将原有的元素复制到新的数组中。因此，在预先分配足够容量的情况下，可以避免频繁的内存分配和数据复制操作，提高代码的性能。
>
> 需要注意的是，`capacity` 参数不能小于 `length` 参数。如果 `capacity` 小于 `length`，则会抛出一个运行时异常。

- 由于 slice 是引用类型，所以你不对它进行赋值的话，它的默认值是 `nil`

```go
var numList []int
fmt.Println(numList == nil) // true
```

- 切片之间不能比较，因此我们不能使用 `==` 操作符来判断两个 slice 是否含有全部相等元素。特别注意，如果你需要测试一个 slice 是否是空的，使用 `len(s) == 0` 来判断，而不应该用 `s == nil` 来判断。

#### 切片的长度和容量

一个 slice 由三个部分构成：**指针** 、 **长度** 和 **容量** 。指针指向第一个 slice 元素对应的底层数组元素的地址，要注意的是 slice 的第一个元素并不一定就是数组的第一个元素。长度对应 slice 中元素的数目；长度不能超过容量，容量一般是从 slice 的开始位置到底层数据的结尾位置。简单的讲，容量就是从创建切片索引开始的底层数组中的元素个数，而长度是切片中的元素个数。

内置的 `len` 和 `cap` 函数分别返回 slice 的长度和容量。

```go
s := make([]string, 3, 5)
fmt.Println(len(s)) // 3
fmt.Println(cap(s)) // 5
```

#### 切片元素修改

切片自己不拥有任何数据。它只是底层数组的一种表示。对切片所做的任何修改都会反映在底层数组中。

```go
func modifySlice() {
	var arr = [...]string{"123", "456", "789"}
	s := arr[:] //[0:len(arr)]
	fmt.Println(arr) 
	fmt.Println(s)

	s[0] = "Go语言"
	fmt.Println(arr) 
	fmt.Println(s) 
}
```

这里的 `arr[:]` 没有填入起始值和结束值，默认就是 `0` 和 `len(arr)` 。

#### 追加切片元素

使用 `append` 可以将新元素追加到切片上。`append` 函数的定义是 `func append(slice []Type, elems ...Type) []Type` 。其中 `elems ...Type` 在函数定义中表示该函数接受参数 `elems` 的个数是可变的。这些类型的函数被称为可变参数。

```go
func appendSliceData() {
	s := []string{"123"}
	fmt.Println(s)
	fmt.Println(cap(s))

	s = append(s, "567")
	fmt.Println(s)
	fmt.Println(cap(s))

	s = append(s, "789", "0")
	fmt.Println(s)
	fmt.Println(cap(s))

	s = append(s, []string{"1", "2"}...)
	fmt.Println(s)
	fmt.Println(cap(s))
}
```

当新的元素被添加到切片时，如果容量不足，会创建一个新的数组。现有数组的元素被复制到这个新数组中，并返回新的引用。现在新切片的容量是旧切片的两倍。

#### 多维切片

类似于数组，切片也可以有多个维度。

```go
func mSlice() {
	numList := [][]string{
		{"1", "123"},
		{"2", "456"},
		{"3", "789"},
	}
	fmt.Println(numList)
}
```

### Map

在 Go 语言中，map 是散列表(哈希表)的引用。它是一个拥有键值对元素的**无序集合**，在这个集合中，键是唯一的，可以通过键来获取、更新或移除操作。无论这个散列表有多大，这些操作基本上是通过常量时间完成的。所有可比较的类型，如 `整型` ，`字符串` 等，都可以作为 `key` 。

#### 创建Map

使用 `make` 函数传入键和值的类型，可以创建 map 。具体语法为 `make(map[KeyType]ValueType)` 。

```go
// 创建一个键类型为 string 值类型为 int 名为 scores 的 map
scores := make(map[string]int)
steps := make(map[string]string)
```

字面量创建：

```go
var steps2 map[string]string = map[string]string{
		"第一步": "123",
		"第二步": "456",
		"第三步": "789",
}
fmt.Println(steps2)
```

```go
steps3 := map[string]string{
		"第一步": "123",
		"第二步": "456",
		"第三步": "789",
}
fmt.Println(steps3)
```

#### Map操作

- 添加元素

  ```GO
  // 可以使用 `map[key] = value` 向 map 添加元素。
  steps3["第四步"] = "总监"
  ```

- 更新元素

  ```GO
  // 若 key 已存在，使用 map[key] = value 可以直接更新对应 key 的 value 值。
  steps3["第四步"] = "CTO"
  ```

- 获取元素

  ```GO
  // 直接使用 map[key] 即可获取对应 key 的 value 值,如果 key不存在,会返回其 value 类型的零值。
  fmt.Println(steps3["第四步"] )
  ```

- 删除元素

  ```GO
  //使用 delete(map, key)可以删除 map 中的对应 key 键值对,如果 key 不存在,delete 函数会静默处理，不会报错。
  delete(steps3, "第四步")
  ```

- 判断 key 是否存在

  ```GO
  // 如果我们想知道 map 中的某个 key 是否存在，可以使用下面的语法：value, ok := map[key]
  v3, ok := steps3["第三步"]
  fmt.Println(ok)
  fmt.Println(v3)
  
  v4, ok := steps3["第四步"]
  fmt.Println(ok)
  fmt.Println(v4)
  ```

  这个语句说明 `map` 的下标读取可以返回两个值，第一个值为当前 `key` 的 `value` 值，第二个值表示对应的 `key` 是否存在，若存在 `ok` 为 `true` ，若不存在，则 `ok` 为 `false` 。

- 遍历 map

  ```GO
  // 遍历 map 中所有的元素需要用 for range 循环。
  for key, value := range steps3 {
      fmt.Printf("key: %s, value: %s\n", key, value)
  }
  ```

- 获取 map 长度

  ```GO
  // 使用 len 函数可以获取 map 长度
  func createMap() {
    	//...
       fmt.Println(len(steps3))    // 4
  }
  ```

#### map是引用类型

当 `map` 被赋值为一个新变量的时候，它们指向同一个内部数据结构。因此，改变其中一个变量，就会影响到另一变量。

```GO
func mapByReference() {
		steps4 := map[string]string{
		"第一步": "123",
		"第二步": "456",
		"第三步": "789",
	}
	fmt.Println("steps4: ", steps4)
	// steps4:  map[第一步:123 第三步:789 第二步:456]
	newSteps4 := steps4
	newSteps4["第一步"] = "123-222"
	newSteps4["第二步"] = "456-222"
	newSteps4["第三步"] = "789-222"
	fmt.Println("steps4: ", steps4)
  // steps4:  map[第一步:123-222 第三步:789-222 第二步:456-222]
	fmt.Println("newSteps4: ", newSteps4)
  // newSteps4:  map[第一步:123-222 第三步:789-222 第二步:456-222]
}
```

当 `map` 作为函数参数传递时也会发生同样的情况。

## 流程控制语句

### 条件语句

```go
if 条件1 {
  逻辑代码1
} else if  条件2 {
  逻辑代码2
} else if 条件 ... {
  逻辑代码 ...
} else {
  逻辑代码 else
}
```

```go
score := 88
if score >= 90 {
    fmt.Println("成绩等级为A")
} else if score >= 80 {
    fmt.Println("成绩等级为B")
} else if score >= 70 {
    fmt.Println("成绩等级为C")
} else if score >= 60 {
    fmt.Println("成绩等级为D")
} else {
    fmt.Println("成绩等级为E 成绩不及格")
}
```

`if` 还有另外一种写法，它包含一个 `statement` 可选语句部分，该可选语句在条件判断之前运行。它的语法是：

```go
if statement; condition {
}

if score := 88; score >= 60 {
    fmt.Println("成绩及格")
}
```

### switch case

```go
switch 表达式 {
    case 表达式值1:
        业务逻辑代码1
    case 表达式值2:
        业务逻辑代码2
    case 表达式值3:
        业务逻辑代码3
    case 表达式值 ...:
        业务逻辑代码 ...
    default:
        业务逻辑代码
}
```

```go
grade := "B"
switch grade {
case "A":
    fmt.Println("Your score is between 90 and 100.")
case "B":
    fmt.Println("Your score is between 80 and 90.")
case "C":
    fmt.Println("Your score is between 70 and 80.")
case "D":
    fmt.Println("Your score is between 60 and 70.")
default:
    fmt.Println("Your score is below 60.")
}
```

**一个 case 多个条件**

```go
month := 5
switch month {
case 1, 3, 5, 7, 8, 10, 12:
    fmt.Println("该月份有 31 天")
case 4, 6, 9, 11:
    fmt.Println("该月份有 30 天")
case 2:
    fmt.Println("该月份闰年为 29 天，非闰年为 28 天")
default:
    fmt.Println("输入有误！")
}
```

`switch` 还有另外一种写法，它包含一个 `statement` 可选语句部分，该可选语句在表达式之前运行。它的语法是：

```go
switch statement; expression {
}


switch month := 5; month {
case 1, 3, 5, 7, 8, 10, 12:
    fmt.Println("该月份有 31 天")
case 4, 6, 9, 11:
    fmt.Println("该月份有 30 天")
case 2:
    fmt.Println("该月份闰年为 29 天，非闰年为 28 天")
default:
    fmt.Println("输入有误！")
}
```

 这里 `month` 变量的作用域就仅限于这个 `switch` 内。

**switch 后可接函数**

`switch` 后面可以接一个函数，只要保证 `case` 后的值类型与函数的返回值一致即可。

```go
package main

import "fmt"

func getResult(args ...int) bool {
 for _, v := range args {
  if v < 60 {
   return false
  }
 }
 return true
}

func main() {
 chinese := 88
 math := 90
 english := 95

 switch getResult(chinese, math, english) {
 case true:
  fmt.Println("考试通过")
 case false:
  fmt.Println("考试未通过")
 }
}
```

**无表达式的 switch**

`switch` 后面的表达式是可选的。如果省略该表达式，则表示这个 `switch` 语句等同于 `switch true` ，并且每个 `case` 表达式都被认定为有效，相应的代码块也会被执行。

```go
score := 88
switch {
case score >= 90 && score <= 100:
    fmt.Println("grade A")
case score >= 80 && score < 90:
    fmt.Println("grade B")
case score >= 70 && score < 80:
    fmt.Println("grade C")
case score >= 60 && score < 70:
    fmt.Println("grade D")
case score < 60:
    fmt.Println("grade E")
}
```

该 `switch-case` 语句相当于 `if-elseif-else` 语句。

**fallthrough 语句**

正常情况下 `switch-case` 语句在执行时只要有一个 `case` 满足条件，就会直接退出 `switch-case` ，如果一个都没有满足，才会执行 `default` 的代码块。不同于其他语言需要在每个 `case` 中添加 `break` 语句才能退出。使用 `fallthrough` 语句可以在已经执行完成的 `case` 之后，把控制权转移到下一个 `case` 的执行代码中。`fallthrough` 只能穿透一层，不管你有没有匹配上，都要退出了。`fallthrough` 语句是 `case` 子句的最后一个语句。如果它出现在了 `case` 语句的中间，编译会不通过。

```go
s := "123"
switch {
case s == "123":
    fmt.Println("123")
    fallthrough
case s == "456":
    fmt.Println("456")
case s != "789":
    fmt.Println("789")
}
```

### 循环语句

**循环语句** 可以用来重复执行某一段代码。在 C 语言中，循环语句有 `for` 、 `while` 和 `do while` 三种循环。但在 Go 中只有 `for` 一种循环语句。下面是 `for` 循环语句的四种基本模型：

```go
// for 接三个表达式
for initialisation; condition; post {
   code
}

// for 接一个条件表达式
for condition {
   code
}

// for 接一个 range 表达式
for range_expression {
   code
}

// for 不接表达式
for {
   code
}
```

- **接一个条件表达式**

  ```go
  num := 0
  for num < 4 {
      fmt.Println(num)
      num++
  }
  ```

- **接三个表达式**

  `for` 后面接的这三个表达式，各有各的用途：

  - 第一个表达式(`initialisation`)：初始化控制变量，在整个循环生命周期内，只执行一次；
  - 第二个表达式(`condition`)：设置循环控制条件，该表达式值为 `true` 时循环，值为 `false` 时结束循环；
  - 第三个表达式(`post`)：每次循环完都会执行此表达式，可以利用其让控制变量增量或减量。

  这三个表达式，使用 `;` 分隔。

  ```go
  for num := 0; num < 4; num++ {
      fmt.Println(num)
  }
  ```

- **接一个 range 表达式**

  ```go
  str := "Golang"
  for index, value := range str{
      fmt.Printf("index %d, value %c\n", index, value)
  }
  ```

- **不接表达式**	

  `for` 后面不接表达式就相当于无限循环，当然，可以使用 `break` 语句退出循环

  ```go
  // 第一种写法
  for {
      code
  }
  // 第二种写法
  for ;; {
      code
  }
  ```

- **break 语句**

  `break` 语句用于终止 `for` 循环，之后程序将执行在 `for` 循环后的代码。上面的例子已经演示了 `break` 语句的使用。

- **continue 语句**

  `continue` 语句用来跳出 `for` 循环中的当前循环。在 `continue` 语句后的所有的 `for` 循环语句都不会在本次循环中执行，执行完 `continue` 语句后将会继续执行一下次循环。下面的程序会打印出 `10` 以内的奇数。

### defer延迟调用

含有 `defer` 语句的函数，会在该函数将要返回之前，调用另一个函数。简单点说就是 `defer` 语句后面跟着的函数会延迟到当前函数执行完后再执行。

```go
package main

import "fmt"

func bookPrint() {
	fmt.Println("123")
}

func main() {
	defer bookPrint()
	fmt.Println("main函数...")
}
```

首先，执行 `main` 函数，因为 `bookPrint()` 函数前有 `defer` 关键字，所以会在执行完 `main` 函数后再执行 `bookPrint()` 函数，所以先打印出 `main函数...` ，再执行 `bookPrint()` 函数打印 `123` 。



**即时求值的变量快照**

使用 `defer` 只是延时调用函数，传递给函数里的变量，不应该受到后续程序的影响。

```go
str := "123"
defer fmt.Println(str)
str = "456"
fmt.Println(str)
// 456
// 123
```

**延迟方法**

`defer` 不仅能够延迟函数的执行，也能延迟方法的执行。

```go
package main

import "fmt"

type Book struct {
	bookName, authorName string
}

func (b Book) printName() {
	fmt.Printf("%s %s", b.bookName, b.authorName)
}

func main() {
	book := Book{"123", "456"}
	defer book.printName()
	fmt.Printf("main... ")
}
// main... 123 456
```

**defer 栈**

当一个函数内多次调用 `defer` 时，Go 会把 `defer` 调用放入到一个栈中，随后按照 **后进先出** 的顺序执行。

```go
package main

import "fmt"

func main() {
	defer fmt.Printf("123")
	defer fmt.Printf("456")
	defer fmt.Printf("789")
	fmt.Printf("main...")
}
//main...789456123
```

**defer 在 return 后调用**

```go
package main

import "fmt"

var s string = "123"

func showLesson() string {
    defer func() {
        s = "456"
    }()
    fmt.Println("showLesson: s =", s)
    return s
}

func main() {
    lesson := showLesson()
    fmt.Println("main: s =", s)
    fmt.Println("main: lesson =", lesson)
}
//showLesson: s = 123
//main: s = 456
//main: lesson = 123
```

> ### Go 中 defer 和 return 执行的先后顺序
>
> 1. 多个defer的执行顺序为“后进先出”；
> 2. defer、return、返回值三者的执行逻辑应该是：return最先执行，return负责将结果写入返回值中；接着defer开始执行一些收尾工作；最后函数携带当前返回值退出。
>
> 如果函数的返回值是无名的（不带命名返回值），则go语言会在执行return的时候会执行一个类似创建一个临时变量作为保存return值的动作，而有名返回值的函数，由于返回值在函数定义的时候已经将该变量进行定义，在执行return的时候会先执行返回值保存操作，而后续的defer函数会改变这个返回值(虽然defer是在return之后执行的，但是由于使用的函数定义的变量，所以执行defer操作后对该变量的修改会影响到return的值

**defer 可以使代码更简洁**

如果没有使用 `defer` ，当在一个操作资源的函数里调用多个 `return` 时，每次都得释放资源，你可能这样写代码：

```go
func f() {
    r := getResource()  //0，获取资源
    ......
    if ... {
        r.release()  //1，释放资源
        return
    }
    ......
    if ... {
        r.release()  //2，释放资源
        return
    }
    ......
    if ... {
        r.release()  //3，释放资源
        return
    }
    ......
    r.release()     //4，释放资源
    return
}
```

有了 `defer` 之后，可以简洁地写成下面这样：

```go
func f() {
    r := getResource()  //0，获取资源

    defer r.release()  //1，释放资源
    ......
    if ... {
        ...
        return
    }
    ......
    if ... {
        ...
        return
    }
    ......
    if ... {
        ...
        return
    }
    ......
    return
}
```

### goto无条件跳转

在 Go 语言中保留 `goto` 。`goto` 后面接的是标签，表示下一步要执行哪里的代码。

```go
package main

import "fmt"

func main() {
	fmt.Println("123")
	goto label
	fmt.Println("456")
label:
    fmt.Println("789")
}
//123
//789
```

## 指针

一个指针变量指向了一个值的内存地址。

类似于变量和常量，在使用指针前你需要声明指针。指针声明格式如下：

```go
var var_name *var-type
```

var-type 为指针类型，var_name 为指针变量名，* 号用于指定变量是作为一个指针。以下是有效的指针声明：

```go
var ip *int        /* 指向整型*/
var fp *float32    /* 指向浮点型 */
```

### 操作符

- & 操作符可以从一个变量中取到其内存地址。

* 操作符如果在赋值操作值的左边，指该指针指向的变量；* 操作符如果在赋值操作符的右边，指从一个指针变量中取得变量值，又称指针的解引用。

### 如何使用指针

指针使用流程：

- 定义指针变量。
- 为指针变量赋值。
- 访问指针变量中指向地址的值。
- 在指针类型前面加上 * 号（前缀）来获取指针所指向的内容。

```go
package main

import "fmt"

func main() {
   var a int= 20   /* 声明实际变量 */
   var ip *int        /* 声明指针变量 */

   ip = &a  /* 指针变量的存储地址 */

   fmt.Printf("a 变量的地址是: %x\n", &a  )

   /* 指针变量的存储地址 */
   fmt.Printf("ip 变量储存的指针地址: %x\n", ip )

   /* 使用指针访问值 */
   fmt.Printf("*ip 变量的值: %d\n", *ip )
}
//a 变量的地址是: 20818a220
//ip 变量储存的指针地址: 20818a220
//*ip 变量的值: 20
```

### 空指针

当一个指针被定义后没有分配到任何变量时，它的值为 nil。

nil 指针也称为空指针。

nil在概念上和其它语言的null、None、nil、NULL一样，都指代零值或空值。

一个指针变量通常缩写为 ptr。

```go
package main

import "fmt"

func main() {
  var ptr *int

  fmt.Printf("ptr 的值为 : %x**\n**", ptr  )
}
//ptr 的值为 : 0
```

空指针判断

```go
if(ptr != nil)     /* ptr 不是空指针 */
if(ptr == nil)    /* ptr 是空指针 */
```

### 函数传递指针函数

在函数中对指针参数所做的修改，在函数返回后会保存相应的修改。

```go
package main

import (
	"fmt"
)

func changeByPointer(value *int) {
	*value = 200
}

func main() {
	x3 := 99
	p3 := &x3
	fmt.Println("执行changeByPointer函数之前p3是", *p3)
	changeByPointer(p3)
	fmt.Println("执行changeByPointer函数之后p3是", *p3)
}
//执行changeByPointer函数之前p3是 99
//执行changeByPointer函数之后p3是 200

```

### 指针与切片

切片与指针一样是引用类型，如果我们想通过一个函数改变一个数组的值，可以将该数组的切片当作参数传给函数，也可以将这个数组的指针当作参数传给函数。但 Go 中建议使用第一种方法，即将该数组的切片当作参数传给函数，因为这么写更加简洁易读。

```go
package main

import "fmt"

// 使用切片
func changeSlice(value []int) {
	value[0] = 200
}

// 使用数组指针
func changeArray(value *[3]int) {
	(*value)[0] = 200
}

func main() {
	x := [3]int{10, 20, 30}
	changeSlice(x[:])
	fmt.Println(x) // [200 20 30]

	y := [3]int{100, 200, 300}
	changeArray(&y)
	fmt.Println(y) // [200 200 300]
}
```

## 结构体

Go 语言中数组可以存储同一类型的数据，但在结构体中我们可以为不同项定义不同的数据类型。

结构体是由一系列具有相同类型或不同类型的数据构成的数据集合。Go中没有`class`的概念，只有`struct`结构体，所以也没有继承。

### 声明

```go
type struct_name struct {
    attribute_name1   attribute_type
    attribute_name2   attribute_type
    ...
}

type Lesson struct {
	name   string //名称
	target string //学习目标
	spend  int    //学习花费时间
}
//可以把相同类型的属性声明在同一行，这样可以使结构体变得更加紧凑
type Lesson2 struct {
    name, target    string
    spend             int
}
```

上面的结构体称为命名结构体`Named Structure`。声明结构体时也可以不用声明新类型，这种结构体类型称为匿名结构体`Anonymous Structure`

```go
var Lesson3 struct {
    name, target    string
    spend             int
}
```

### 创建命名结构体

```go
package main

import "fmt"

type Lesson struct {
	name, target    string
	spend             int
}

func main() {
	// 使用字段名创建结构体
	lesson1 := Lesson{
		name: "Golang",
		target: "学习Go语言，并完成一个单体服务",
		spend:  5,
	}
	// 不使用字段名创建结构体，按字段声明顺序初始化
	lesson2 := Lesson{"Golang", "学习Go语言，并完成一个单体服务", 5}

	fmt.Println("lesson1 ", lesson1)
	fmt.Println("lesson2 ", lesson2)
}
```

### 结构体标签

Tag是结构体的元信息，可以在运行的时候通过反射的机制读取出来。

Tag在结构体字段的后方定义，由一对反引号包裹起来，具体的格式如下：

```go
    `key1:"value1" key2:"value2"`
```

结构体标签由一个或多个键值对组成。键与值使用冒号分隔，值用双引号括起来。键值对之间使用一个空格分隔。 注意事项： 为结构体编写Tag时，必须严格遵守键值对的规则。结构体标签的解析代码的容错能力很差，一旦格式写错，编译和运行时都不会提示任何错误，通过反射也无法正确取值。例如不要在key和value之间添加空格。

例如我们为Student结构体的每个字段定义json序列化时使用的Tag：

```go
//Student 学生
type Student struct {
    ID     int    `json:"id"` //通过指定tag实现json序列化该字段时的key
    Gender string //json序列化是默认使用字段名作为key
    name   string //私有不能被json包访问
}

func main() {
    s1 := Student{
        ID:     1,
        Gender: "女",
        name:   "pprof",
    }
    data, err := json.Marshal(s1)
    if err != nil {
        fmt.Println("json marshal failed!")
        return
    }
    fmt.Printf("json str:%s\n", data) //json str:{"id":1,"Gender":"女"}
}
```



### 创建匿名结构体

```go
package main

import "fmt"

func main() {
	// 创建匿名结构体变量
	lesson3 := struct {
		name, target string
		spend          int
	}{
		name:   "Go语言",
		target: "掌握GO语言",
		spend:   3,
	}

	fmt.Println("lesson3 ", lesson3)
}
```

### 结构体的零值(Zero Value)

当定义好的结构体没有被显式初始化时，结构体的字段将会默认赋为相应类型的零值。

```go
package main

import "fmt"

type Lesson struct {
	name, target    string
	spend             int
}

func main() {
	// 不初始化结构体
	var lesson4 = Lesson{}

	fmt.Println("lesson4 ", lesson4)
}
//lesson4  {  0}
```

### 访问结构体字段

使用`.`点操作符访问：`lesson.name`

使用`.`也可用与给结构体字段赋值:`lesson.name = "test"`

### 指向结构体的指针

```go
package main

import "fmt"

type Lesson struct {
	name, target    string
	spend             int
}

func main() {
	lesson8 := &Lesson{"Go语言", "Go语言微服务", 50}
	fmt.Println("lesson8 name: ", (*lesson8).name)
	fmt.Println("lesson8 name: ", lesson8.name)
}
```

 `lesson8` 是一个指向结构体 `Lesson` 的指针，用 `(*lesson8).name` 访问 `lesson8` 的 `name` 字段， `lesson8.name` 代替 `(*lesson8).name` 的解引用访问。

### 匿名字段

在创建结构体时，字段可以只有类型没有字段名，这种字段称为 **匿名字段(Anonymous Field)** 。

```go
package main

import "fmt"

type Lesson4 struct {
	string
	int
}

func main() {
	lesson9 := Lesson4{"Golang", 50}
	fmt.Println("lesson9 ", lesson9)
	fmt.Println("lesson9 string: ", lesson9.string)
	fmt.Println("lesson9 int: ", lesson9.int)
}
```

上面的程序结构体定义了两个匿名字段，虽然这两个字段没有字段名，但匿名字段的名称默认就是它的类型。所以上面的结构体 `Lesoon4` 有两个名为 `string` 和 `int` 的字段。

### 嵌套结构体

结构体的字段也可能是另外一个结构体，这样的结构体称为 **嵌套结构体(Nested Structs)**

```go
package main

import "fmt"

type Author struct {
	name string
  	wx string
}

type Lesson5 struct {
	name,target string
	spend int
	author Author
}

func main() {
	lesson10 := Lesson5{
		name: "Go语言",
		spend: 50,
	}
	lesson10.author = Author{
		name: "golang",
		wx: "666",
	}
	fmt.Println("lesson10 name:", lesson10.name)
	fmt.Println("lesson10 spend:", lesson10.spend)
	fmt.Println("lesson10 author name:", lesson10.author.name)
	fmt.Println("lesson10 author wx:", lesson10.author.wx)
}
```

上面的程序 `Lesson5` 结构体有一个字段 `author` ，而且它的类型也是一个结构体 `Author` 。

### 提升字段

结构体中如果有匿名的结构体类型字段，则该匿名结构体里的字段就称为 **提升字段(Promoted Fields)** 。这是因为提升字段就像是属于外部结构体一样，可以用外部结构体直接访问。就像刚刚上面的程序，如果我们把 `Lesson` 结构体中的字段 `author` 直接用匿名字段 `Author` 代替， `Author` 结构体的字段例如 `name` 就不用像上面那样使用 `lesson10.author.wx` 访问，而是使用 `lesson10.wx` 就能访问 `Author` 结构体中的 `wx` 字段。现在结构体 `Author` 有 `name` 、 `wx` 两个字段，访问字段就像在 `Lesson` 里直接声明的一样，因此我们称之为提升字段。

```go
package main

import "fmt"

type Author struct {
	name string
  	wx string
}

type Lesson6 struct {
	name,target string
	spend int
	Author
}

func main() {
	lesson10 := Lesson6{
		name:   "Go语言",
		target: "掌握Go语言",
	}
	lesson10.Author = Author{
		name: "golang",
		wx:   "666",
	}
	fmt.Println("lesson10 name:", lesson10.name)
	fmt.Println("lesson10 target:", lesson10.target)
	fmt.Println("lesson10 author wx:", lesson10.wx)
}
//lesson10 name: Go语言
//lesson10 target: 掌握Go语言
//lesson10 author wx: 666
```

### 结构体比较

如果结构体的全部成员都是可以比较的，那么结构体也是可以比较的，那样的话两个结构体将可以使用 `==` 或 `!=` 运算符进行比较。可以通过==运算符或 DeeplyEqual()函数比较两个结构相同的类型并包含相同的字段值。因此下面两个比较的表达式是等价的：

```go
package main

import "fmt"

type  Lesson  struct{
	name,target string
	spend int
}

func main() {
	lesson11 := Lesson{
		name:   "Go语言",
		target: "掌握Go语言",
	}
	lesson12 := Lesson{
		name:   "Go语言",
		target: "掌握Go语言",
	}
	fmt.Println(lesson11.name == lesson12.name && lesson11.target == lesson12.target) // true
	fmt.Println(lesson11 == lesson12) // true
}
```

### 给结构体定义方法

在 Go 中无法在结构体内部定义方法

```go
package main

import "fmt"

// Lesson 定义一个名为 Lesson 的结构体
type Lesson struct {
	name, target string
	spend        int
}

// ShowLessonInfo 定义一个与 Lesson 的绑定的方法
func (l Lesson) ShowLessonInfo() {
	fmt.Println("name:", l.name)
	fmt.Println("target:", l.target)
}

func main() {
	lesson13 := Lesson{
		name:   "Go语言",
		target: "掌握Go语言",
	}
	lesson13.ShowLessonInfo()
}
```

上面的程序中定义了一个与结构体 `Lesson` 绑定的方法 `ShowLessonInfo()` ，其中 `ShowLessonInfo` 是方法名， `(l Lesson)` 表示将此方法与 `Lesson` 的实例绑定，这在 Go 语言中称为接收者，而 `l` 表示实例本身，相当于 Python 中的 `self` ，在方法内可以使用 `实例本身.属性名称` 来访问实例属性。

### 方法的参数传递方式

如果绑定结构体的方法中要改变实例的属性时，必须使用指针作为方法的接收者。

```go
package main

import "fmt"

// Lesson 定义一个名为 Lesson 的结构体
type Lesson struct {
	name,target string
	spend int
}

// ShowLessonInfo 定义一个与 Lesson 的绑定的方法
func (l Lesson) ShowLessonInfo() {
	fmt.Println("name:", l.name)
	fmt.Println("target:", l.target)
}

// AddTime 定义一个与 Lesson 的绑定的方法，使 spend 值加 n
func (l *Lesson) AddTime(n int) {
	l.spend = l.spend + n
}

func main() {
	lesson13 := Lesson{
		name:   "Go语言",
		target: "掌握Go语言",
        spend:50,
	}
	fmt.Println("添加add方法前")
	lesson13.ShowLessonInfo()
	lesson13.AddTime(5)
	fmt.Println("添加add方法后")
	lesson13.ShowLessonInfo()
}
```

## 函数

**函数** 是基于功能或逻辑进行封装的可复用的代码结构。将一段功能复杂、很长的一段代码封装成多个代码片段(即函数)，有助于提高代码可读性和可维护性。由于 Go 语言是编译型语言，所以函数编写的顺序是无关紧要的。

### 声明

```go
func function_name(parameter_list) (result_list) {
    //函数体
}
```

### 可变参数

#### 多个类型一致的参数

在参数类型前面加 `...` 表示一个切片，用来接收调用者传入的参数。注意，如果该函数下有其他类型的参数，这些其他参数必须放在参数列表的前面，切片必须放在最后。

```go
package main

import "fmt"

func show(args ...string) int {
	sum := 0
	for _, item := range args {
        fmt.Println(item)
		sum += 1
	}
	return sum
}

func main() {
	fmt.Println(show("1","2","3"))
}
```

#### 多个类型不一致的参数

如果传多个参数的类型都不一样，可以指定类型为 `...interface{}` ，然后再遍历。

```go
package main

import "fmt"

func PrintType(args ...interface{}) {
	for _, arg := range args {
		switch arg.(type) {
		case int:
			fmt.Println(arg, "type is int.")
		case string:
			fmt.Println(arg, "type is string.")
		case float64:
			fmt.Println(arg, "type is float64.")
		default:
			fmt.Println(arg, "is an unknown type.")
		}
	}
}

func main() {
	PrintType(57, 3.14, "123")
}
```

### 解序列

使用 `...` 可以用来解序列

### 函数的返回值

当函数没有返回值时，函数体可以使用 `return` 语句返回。在 Go 中一个函数可以返回多个值。

```go
package main

import "fmt"

func showBookInfo(bookName, authorName string) (string, error) {
	if bookName == "" {
		return "", errors.New("图书名称为空")
	}
	if authorName == "" {
		return "", errors.New("作者名称为空")
	}
	return bookName + ",作者:" + authorName, nil
}

func main() {
	bookInfo, err := showBookInfo("123", "45")
	fmt.Printf("bookInfo = %s, err = %v", bookInfo, err)
}
```

返回带有变量名的值

```go
func showBookInfo2(bookName, authorName string) (info string, err error) {
	info = ""
	if bookName == "" {
		err = errors.New("图书名称为空")
		return
	}
	if authorName == "" {
		err = errors.New("作者名称为空")
		return
	}
    // 不使用 := 因为已经在返回值那里声明了
	info = bookName + ",作者:" + authorName
  	// 直接返回即可
	return
}
```

### 匿名函数

```go
func (parameter_list) (result_list) {
	body
}
```

### 内部方法与外部方法

在 Go 语言中，函数名通过首字母大小写实现控制对方法的访问权限。

- 当方法的首字母为 **大写** 时，这个方法对于 **所有包** 都是 **Public** ，其他包可以随意调用。
- 当方法的首字母为 **小写** 时，这个方法是 **Private** ，其他包是无法访问的。

## 方法

**方法** 其实就是一个函数，在 `func` 这个关键字和方法名中间加入了一个特殊的接收器类型。接收器可以是结构体类型或者是非结构体类型。接收器是可以在方法的内部访问的。

```go
func (t Type) methodName(parameterList) returnList{
}
```

### 实例绑定

```go
package main

import "fmt"

// Lesson 定义一个名为 Lesson 的结构体
type Lesson struct {
    Name   string
    Target string
}

// PrintInfo 定义一个与 Lesson 的绑定的方法
func (lesson Lesson) PrintInfo() {
    fmt.Println("name:", lesson.Name)
    fmt.Println("target:", lesson.Target)
}


func main() {
    l := Lesson{
        Name: "Go语言",
        Target: "掌握Go语言",
    }
    l.PrintInfo()
}
```

也可以把上面程序的方法改成一个函数

```go
package main

import "fmt"

type Lesson struct {
    Name   string
    Target string
}

func PrintInfo(lesson Lesson) {
    fmt.Println("name:", lesson.Name)
    fmt.Println("target:", lesson.Target)
}

func main() {
    lesson := Lesson{
        Name: "Go语言",
        Target: "掌握Go语言",
    }
    PrintInfo(lesson)
}
```

运行这个程序，也同样会输出上面一样的答案，那么我们为什么还要用方法呢？因为在 Go 中，相同的名字的方法可以定义在不同的类型上，而相同名字的函数是不被允许的。如果你在上面这个程序添加一个同名函数，就会报错。但是在不同的结构体上面定义同名的方法就是可行的。

```go
package main

import "fmt"

type Lesson struct {
    Name   string
    Target string
}

func (lesson Lesson) PrintInfo() {
    fmt.Println("Lesson name:", lesson.Name)
    fmt.Println("Lesson target:", lesson.Target)
}

type Author struct {
    Name string
}

func (author Author) PrintInfo() {
    fmt.Println("author name:", author.Name)
}

func main() {
    lesson := Lesson{
        Name: "Go语言",
        Target: "掌握Go语言",
    }
    lesson.PrintInfo()
    author := Author{"Google"}
    author.PrintInfo()
}
```

### 指针接收器与值接收器

值接收器和指针接收器之间的区别在于，在指针接收器的方法内部的改变对于调用者是可见的，然而值接收器的方法内部的改变对于调用者是不可见的，所以若要改变实例的属性时，必须使用指针作为方法的接收者。

```go
package main

import "fmt"

// Lesson 定义一个名为 Lesson 的结构体
type Lesson struct {
	Name      string
	Target    string
	SpendTime int
}

// PrintInfo 定义一个与 Lesson 的绑定的方法
func (lesson Lesson) PrintInfo() {
	fmt.Println("name:", lesson.Name)
	fmt.Println("target:", lesson.Target)
	fmt.Println("spendTime:", lesson.SpendTime)
}

func (lesson Lesson) ChangeLessonName(name string) {
	lesson.Name = name
}

func (lesson *Lesson) AddSpendTime(n int) {
	lesson.SpendTime = lesson.SpendTime + n
}

func main() {
	lesson := Lesson{
		Name:      "Go语言",
		Target:    "掌握Go语言",
		SpendTime: 1,
	}
	fmt.Println("before change")
	lesson.PrintInfo()

	fmt.Println("after change")
	lesson.AddSpendTime(2)
	lesson.ChangeLessonName("Go语言123")
	lesson.PrintInfo()
}
```

在上面的程序中， `AddSpendTime` 使用指针接收器最终能改变实例的 `SpendTime` 值，然而使用值接收器的 `ChangeLessonName` 最终没有改变实例 `Name` 的值。

### 在方法中使用值接收器 与 在函数中使用值参数

当一个函数有一个值参数，它只能接受一个值参数。当一个方法有一个值接收器，它可以接受值接收器和指针接收器。

```go
package main

import "fmt"

type Lesson struct {
	Name string
}

func (lesson Lesson) PrintInfo() {
	fmt.Println(lesson.Name)
}

func PrintInfo(lesson Lesson) {
	fmt.Println(lesson.Name)
}

func main() {
	lesson := Lesson{"Go语言"}
	PrintInfo(lesson)
	lesson.PrintInfo()

	bPtr := &lesson
	//PrintInfo(bPtr) // error
	bPtr.PrintInfo()
}
```

在上面的程序中，使用值参数 `PrintInfo(lesson)` 来调用这个函数是合法的，使用值接收器来调用 `lesson.PrintInfo()` 也是合法的。

然后在程序中我们创建了一个指向 `Lesson` 的指针 `bPtr` ，通过使用指针接收器来调用 `bPtr.PrintInfo()` 是合法的，但使用值参数调用 `PrintInfo(bPtr)` 是非法的。

### 在非结构体上的方法

```go
package main

import "fmt"

type myInt int

func (a myInt) add(b myInt) myInt {
    return a + b
}

func main() {
    var x myInt = 50
    var y myInt = 7
    fmt.Println(x.add(y))   // 57
}
```

## 接口

在 Go 语言中， **接口** 就是方法签名(Method Signature)的集合。在面向对象的领域里，接口定义一个对象的行为，接口只指定了对象应该做什么，至于如何实现这个行为，则由对象本身去确定。当一个类型实现了接口中的所有方法，我们称它实现了该接口。接口指定了一个类型应该具有的方法，并由该类型决定如何实现这些方法。

### 定义

```go
type interface_name interface {
    method()
}
```

### 接口实现

```go
package main

import "fmt"

type Study interface {
    learn()
}

type Student struct {
    name string
    book string
}

func (s Student) learn() {
    fmt.Printf("%s 在读 %s", s.name, s.book)
}

func main() {
    student1 := Student{
        name: "张三",
        book: "《Go语言》",
    }
    student1.learn()
}
```

上面的程序定义了一个名为 `Study` 的接口，接口中有未实现的方法 `learn()` ，这里还定义了名为 `Student` 的结构体，其绑定了方法 `learn()` ，也就隐式实现了 `Study` 接口，实现的内容是打印语句。

### 接口实现多态

```go
package main

import "fmt"

type Study interface {
	learn()
}
type Student struct {
	name, book string
}

func (s Student) learn() {
	fmt.Printf("%s 在读 %s", s.name, s.book)
}

type Worker struct {
	name string
	book string
	by   string
}

func (w *Worker) learn() {
	fmt.Printf("%s 在读 %s,通过方式 %s", w.name, w.book, w.by)
}

func main() {
	var s1 Study
	var s2 Study

	student2 := Student{
		name: "李四",
		book: "《Go语言》",
	}
	s1 = student2
	s1.learn()

	student3 := Student{
		name: "王五",
		book: "Go语言1",
	}
	s1 = &student3
	s1.learn()

	worker1 := Worker{
		name: "老王",
		book: "Go语言2",
		by:   "视频",
	}
	// s2 = worker1 // error
	s2 = &worker1
	s2.learn()
}
```

### 接口的内部表示

可以把接口的内部看做 `(type, value)`。`type` 是接口底层的具体类型(Concrete Type)，而 `value` 是具体类型的值。

```go
package main

import "fmt"

type Study interface {
	learn()
}
type Student struct {
	name, book string
}

func (s Student) learn() {
	fmt.Printf("%s 在读 %s", s.name, s.book)
}
func ShowInterface(s Study) {
	fmt.Printf("接口类型: %T\n 接口值: %v\n", s, s)
}

func main() {
	var s Study
	student2 := Student{
		name: "李四",
		book: "《Go语言》",
	}
	s = student2
	ShowInterface(s)
	s.learn()
}
//接口类型: main.Student
//接口值: {李四 《Go语言》}
//李四 在读 《Go语言》
```

### 空接口

**空接口** 是特殊形式的接口类型，没有定义任何方法的接口就称为空接口，可以说所有类型都至少实现了空接口，空接口表示为 `interface{}` 。例如，我们之前的写过的空接口参数函数，可以接受任何类型的参数：

```go
package main

import "fmt"

func ShowType(i interface{}) {
    fmt.Printf("类型: %T, 值: %v\n", i, i)
}

func main() {
    str := "Go语言"
    ShowType(str)
    num := 3.14
    ShowType(num)
}
```

通过上面的例子不难发现接口都有两个属性，一个是值，而另一个是类型。对于空接口来说，这两个属性都为 `nil` 

```go
package main

import "fmt"

func main() {
    var i interface{}
    fmt.Printf("Type: %T, Value: %v", i, i)
    // Type: <nil>, Value: <nil>
}
```

除了上面讲到的使用空接口作为函数参数的用法，空接口还有以下两种用法。

直接使用 `interface{}` 作为类型声明一个实例，这个实例就能承载任何类型的值：

```go
package main

import "fmt"

func main() {
    var i interface{}

    i = "Go语言"
    fmt.Println(i) // Let's go

    i = 3.14
    fmt.Println(i) // 3.14
}
```

我们也可以定义一个接收任何类型的 `array` 、 `slice` 、 `map` 、 `strcut` 。例如：

```go
package main

import "fmt"

func main() {
    x := make([]interface{}, 3)
    x[0] = "Go"
    x[1] = 3.14
    x[2] = []int{1, 2, 3}
    for _, value := range x {
        fmt.Println(value)
    }
}
```

空接口可以承载任何值，但是空接口类型的对象是不能赋值给另一个固定类型对象的。

```go
package main

func main() {
    var num = 1
    var i interface{} = num
    var str string = i // error
}
```

当空接口承载数组和切片后，该对象无法再进行切片。

```go
package main

import "fmt"

func main() {
    var s = []int{1, 2, 3}

    var i interface{} = s

    var s2 = i[1:2] // error
    fmt.Println(s2)
}
```

### 类型断言

类型断言用于提取接口的底层值(Underlying Value)。使用 `interface.(Type)` 可以获取接口的底层值，其中接口 `interface` 的具体类型是 `Type` 

```go
package main

import "fmt"

func assert(i interface{}) {
    value, ok := i.(int)
    fmt.Println(value, ok)
}

func main() {
    var x interface{} = 3
    assert(x)
    var y interface{} = "Go语言"
    assert(y)
}
```

第一次调用 `assert(x)` 输出 `3 true`，表示将整数 3 转换为 `int` 类型成功。

第二次调用 `assert(y)` 输出 `0 false`，表示将字符串 "Go语言" 转换为 `int` 类型失败，因为该字符串无法转换为整数。

### 类型选择

```go
package main

import "fmt"

func getTypeValue(i interface{}) {
    switch i.(type) {
    case int:
        fmt.Printf("Type: int, Value: %d\n", i.(int))
    case string:
        fmt.Printf("Type: string, Value: %s\n", i.(string))
    default:
        fmt.Printf("Unknown type\n")
    }
}

func main() {
    getTypeValue(300)
    getTypeValue("Go语言")
    getTypeValue(true)
}
```

### 实现多个接口

类型或者结构体可以实现多个接口

### 接口的嵌套

虽然在 Go 中没有继承机制，但可以通过接口的嵌套实现类似功能。

```go
package main

import "fmt"

// 定义一个简单的读取器接口
type Reader interface {
    Read() string
}

// 定义一个简单的写入器接口
type Writer interface {
    Write(data string)
}

// 定义一个复合接口，嵌套了Reader和Writer接口
type ReadWriter interface {
    Reader
    Writer
}

// 实现Reader接口
type MyReader struct{}

func (r MyReader) Read() string {
    return "Data read from MyReader"
}

// 实现Writer接口
type MyWriter struct{}

func (w MyWriter) Write(data string) {
    fmt.Println("Writing data:", data)
}

// 实现ReadWriter接口
type MyReadWriter struct {
    MyReader
    MyWriter
}

// 使用ReadWriter接口作为参数进行函数调用
func ProcessData(rw ReadWriter) {
    data := rw.Read()
    rw.Write(data + " modified")
}

func main() {
    // 创建MyReadWriter实例
    myRW := MyReadWriter{}
    
    // 调用ProcessData函数，传入myRW作为参数
    ProcessData(myRW)
}
```

定义了三个接口：`Reader`、`Writer`和`ReadWriter`。然后，我们实现了这些接口的具体类型：`MyReader`、`MyWriter`和`MyReadWriter`。

`MyReadWriter`结构体通过嵌套`MyReader`和`MyWriter`，同时实现了`Reader`和`Writer`接口。这样，`MyReadWriter`可以以`ReadWriter`类型的方式使用。

在`main`函数中，我们创建了一个`MyReadWriter`实例`myRW`，然后将其作为参数传递给`ProcessData`函数。`ProcessData`函数接收一个`ReadWriter`类型的参数，并调用其中的方法。

通过接口嵌套，我们可以更灵活地组织和复用代码

## 包

**包(package)** 用于组织 Go 源代码，提供了更好的可重用性与可读性.可以用 `go list std`命令查看标准包,标准库为大多数的程序提供了必要的基础组件。

### 创建包

先创建一个 `book` 文件夹，位于该目录下创建一个 `book.go` 源文件，里面实现自定义的数学加法函数。函数名的首字母要大写。

```go
// Package book
package book

func ShowBookInfo(bookName, authorName string) (string, error) {
  if bookName == "" {
    return "", errors.New("图书名称为空")
  }
  if authorName == "" {
    return "", errors.New("作者名称为空")
  }
  return bookName + ",作者:" + authorName, nil
}
```

### 导入包

使用包之前我们需要导入包，在 GoLand 中会帮你自动导入所需要的包。导入包的语法为 `import path` ，其中 `path` 可以是相对于工作区文件夹的相对路径，也可以是绝对路径。

```go
package main

import (
	"fmt"
	"learn/book"
)

func main() {
	bookName := "《Go语言》"
	author := "Golang"
	bookInfo, _ := book.ShowBookInfo(bookName, author)
	fmt.Println("bookInfo = ", bookInfo)
}

```

### 使用别名

```go
import (
    "crypto/rand"
    mrand "math/rand" // 将名称替换为 mrand 避免冲突
)
```

### 使用点操作

```go
import . "fmt"

func main() {
    Println("hello, world")
}
```

对于一些使用高频的包，例如 `fmt` 包，每次调用打印函数时都要使用 `fmt.Println()` 进行调用，很不方便。可以在导入包的时，使用 `import . package_path` 语法。打印就不用加 `fmt` 了。

### 包的初始化

每个包都允许有一个或多个 `init` 函数， `init` 函数不应该有任何返回值类型和参数，在代码中也不能显式调用它，当这个包被导入时，就会执行这个包的 `init` 函数，做初始化任务， `init` 函数优先于 `main` 函数执行。该函数形式如下：

```go
func init() {
}
```

包的初始化顺序：首先初始化 **包级别(Package Level)** 的变量，紧接着调用 `init` 函数。包可以有多个 `init` 函数(在一个文件或分布于多个文件中)，它们按照编译器解析它们的顺序进行调用。如果一个包导入了另一个包，会先初始化被导入的包。尽管一个包可能会被导入多次，但是它只会被初始化一次。

### 包的匿名导入

导入一个没有使用的包编译会报错。但有时候我们只是想执行包里的 `init` 函数来执行一些初始化任务，可以使用匿名导入的方法，使用 **空白标识符(Blank Identifier)** ：

```go
import _ "fmt"
```

## 协程

**Go 语言的 协程(Groutine)** 是与其他函数或方法一起并发运行的工作方式。协程可以看作是轻量级线程。与线程相比，创建一个协程的成本很小。因此在 Go 应用中，常常会看到会有很多协程并发地运行。

### 启动一个 go 协程

调用函数或者方法时，如果在前面加上关键字 `go` ，就可以让一个新的 Go 协程并发地运行。

```go
// 定义一个函数
func functionName(parameterList) {
    code
}

// 执行一个函数
functionName(parameterList)

// 开启一个协程执行这个函数
go functionName(parameterList)
```

```go
package main

import (
 "fmt"
 "time"
)

func PrintInfo() {
 fmt.Println("Go语言")
}

func main() {
 // 开启一个协程执行 PrintInfo 函数
 go PrintInfo()
 // 使主协程休眠 1 秒
 time.Sleep(1 * time.Second)
 // 打印 main
 fmt.Println("main")
}
```

`PrintInfo()` 函数与 `main()` 函数会并发执行，主函数运行在一个特殊的协程上，这个协程称之为 **主协程(Main Goroutine)** 。

启动一个新的协程时，协程的调用会立即返回。与函数不同，程序控制不会去等待 Go 协程执行完毕。在调用 Go 协程之后，程序控制会立即返回到代码的下一行，忽略该协程的任何返回值。如果 Go 主协程终止，则程序终止，于是其他 Go 协程也会终止。为了让新的协程能继续运行，在 `main()` 函数添加了 `time.Sleep(1 * time.Second)` 使主协程休眠 1 秒

### 启动多个 Go 协程

```go
package main

import (
	"fmt"
	"time"
)

func PrintNum(num int) {
	for i := 0; i < 3; i++ {
		fmt.Println(num)
		// 避免观察不到并发效果 加个休眠
		time.Sleep(100 * time.Millisecond)
	}
}

func main() {
	// 开启 1 号协程
	go PrintNum(1)
	// 开启 2 号协程
	go PrintNum(2)
	// 使主协程休眠 1 秒
	time.Sleep(time.Second)
}
```

## 通道

**通道(channel)** ，就是一个管道，可以想像成 Go 协程之间通信的管道。它是一种队列式的数据结构，遵循先入先出的规则。

### 通道的声明

每个通道都只能传递一种数据类型的数据，在你声明的时候，我们要指定通道的类型。`chan Type` 表示 `Type` 类型的通道。通道的零值为 `nil` 。

```go
var channel_name chan channel_types

var ch chan string
```

### 通道的初始化

声明完通道后，通道的值为 `nil` ，我们不能直接使用，必须先使用 `make` 函数对通道进行初始化操作。

```go
ch = make(chan channel_type)

ch = make(chan string)
```

这样，我们就已经定义好了一个 `string` 类型的通道 `nameChan` 。当然，也可以使用简短声明语句一次性定义一个通道：

```go
ch := make(chan string)
```

### 使用通道发送和接收数据

发送数据：

```go
// 把 data 数据发送到 channel_name 通道中
// 即把 data 数据写入到 channel_name 通道中
channel_name <- data
```

接收数据：

```go
// 从 channel_name 通道中接收数据到 value
// 即从 channel_name 通道中读取数据到 value
value := <- channel_name
```

通道旁的箭头方向指定了是发送数据还是接收数据。箭头指向通道，代表数据写入到通道中；箭头往通道指向外，代表从通道读数据出去。

```go
package main

import (
	"fmt"
)

func PrintChan(c chan string) {
	// 往通道传入数据 
	c <- "学习Go语言"
}

func main() {
	// 创建一个通道
	ch := make(chan string)
	// 打印 "学习课程:"
	fmt.Println("学习课程:")
	// 开启协程
	go PrintChan(ch)
	// 从通道接收数据
	rec := <- ch
	// 打印从通道接收到的数据
	fmt.Println(rec)
}
```

**Tips**: **发送与接收默认是阻塞的**

- 从上面的例子我们知道，如果从通道接收数据没接收完主协程是不会继续执行下去的。当把数据发送到通道时，会在发送数据的语句处发生阻塞，直到有其它协程从通道读取到数据，才会解除阻塞。与此类似，当读取通道的数据时，如果没有其它的协程把数据写入到这个通道，那么读取过程就会一直阻塞着。

### 通道的关闭

```go
close(channel_name)
```

这里要注意，对于一个已经关闭的通道如果再次关闭会导致报错，我们可以在接收数据时，判断通道是否已经关闭，从通道读取数据返回的第二个值表示通道是否没被关闭，如果已经关闭，返回值为 `false` ；如果还未关闭，返回值为 `true` 。

```go
value, ok := <- channel_name
```

### 通道的容量与长度

 `make` 函数是可以接收两个参数的，同理，创建通道可以传入第二个参数——容量。

- 当容量为 `0` 时，说明通道中不能存放数据，在发送数据时，必须要求立马有人接收，否则会报错。此时的通道称之为无缓冲通道。
- 当容量为 `1` 时，说明通道只能缓存一个数据，若通道中已有一个数据，此时再往里发送数据，会造成程序阻塞。利用这点可以利用通道来做锁。
- 当容量大于 `1` 时，通道中可以存放多个数据，可以用于多个协程之间的通信管道，共享资源。

既然通道有容量和长度，那么我们可以通过 `cap` 函数和 `len` 函数获取通道的容量和长度。

```go
package main

import (
	"fmt"
)

func main() {
	// 创建一个通道
	c := make(chan int, 3)
	fmt.Println("初始化后：")
	fmt.Println("cap =", cap(c))
	fmt.Println("len =", len(c))
	c <- 1
	c <- 2
	fmt.Println("传入两个数后：")
	fmt.Println("cap =", cap(c))
	fmt.Println("len =", len(c))
	<- c
	fmt.Println("取出一个数后：")
	fmt.Println("cap =", cap(c))
	fmt.Println("len =", len(c))
}
```

### 缓冲通道与无缓冲通道

按照是否可缓冲数据可分为：**缓冲通道** 与 **无缓冲通道** 。

无缓冲通道在通道里无法存储数据，接收端必须先于发送端准备好，以确保你发送完数据后，有人立马接收数据，否则发送端就会造成阻塞，原因很简单，通道中无法存储数据。也就是说发送端和接收端是同步运行的。

```go
c := make(chan int)
// 或者
c := make(chan int, 0)
```

缓冲通道允许通道里存储一个或多个数据，设置缓冲区后，发送端和接收端可以处于异步的状态。

```go
c := make(chan int, 3)
```

### 双向通道

到目前为止，上面定义的都是双向通道，既可以发送数据也可以接收数据。例如：

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	// 创建一个通道
	c := make(chan int)

	// 发送数据
	go func() {
		fmt.Println("send: 1")
		c <- 1
	}()

	// 接收数据
	go func() {
		n := <- c
		fmt.Println("receive:", n)
	}()

	// 主协程休眠
	time.Sleep(time.Millisecond)
}
```

### 单向通道

单向通道只能发送或者接收数据。所以可以具体细分为只读通道和只写通道。

`<-chan` 表示只读通道：

`chan<-` 表示只写通道：

```go
package main

import (
	"fmt"
	"time"
)

// Sender 只写通道类型
type Sender = chan<- string

// Receiver 只读通道类型
type Receiver = <-chan string

func main() {
	// 创建一个双向通道
	var ch = make(chan string)

	// 开启一个协程
	go func() {
		// 只能写通道
		var sender Sender = ch
		fmt.Println("即将学习:")
		sender <- "Go语言"
	}()

	// 开启一个协程
	go func() {
		// 只能读通道
		var receiver Receiver = ch
		message := <-receiver
		fmt.Println("开始学习: ", message)
	}()

	time.Sleep(time.Millisecond)
}
```

### 遍历通道

使用 `for range` 循环可以遍历通道，但在遍历时要确保通道是处于关闭状态，否则循环会被阻塞。

```go
package main

import (
   "fmt"
)

func loopPrint(c chan int) {
   for i := 0; i < 10; i++ {
      c <- i
   }
   // 记得要关闭通道
   // 否则主协程遍历完不会结束，而会阻塞
   close(c)
}

func main() {
   // 创建一个通道
   var ch2 = make(chan int, 5)
   go loopPrint(ch2)
   for v := range ch2 {
      fmt.Println(v)
   }
}
```

### 用通道做锁

上面讲过，当通道容量为 `1` 时，说明通道只能缓存一个数据，若通道中已有一个数据，此时再往里发送数据，会造成程序阻塞。例如：

```go
package main

import (
	"fmt"
	"time"
)

// 由于 x = x+1 不是原子操作
// 所以应避免多个协程对 x 进行操作
// 使用容量为 1 的通道可以达到锁的效果
func increment(ch chan bool, x *int) {
	ch <- true
	*x = *x + 1
	<- ch
}

func main() {
	ch3 := make(chan bool, 1)
	var x int
	for i := 0; i < 10000; i++ {
		go increment(ch3, &x)
	}
	time.Sleep(time.Millisecond)
	fmt.Println("x =", x)
}
```

### 死锁

当协程给一个通道发送数据时，照理说会有其他 Go 协程来接收数据。如果没有的话，程序就会在运行时触发 `panic` ，形成死锁。同理，当有协程等着从一个通道接收数据时，我们期望其他的 Go 协程会向该通道写入数据，要不然程序也会触发 `panic` 。

```go
package main

func main() {
	ch := make(chan bool)
	ch <- true
}
//fatal error: all goroutines are asleep - deadlock!
```

```go
package main

import "fmt"

func main() {
	ch := make(chan bool)
	ch <- true
	fmt.Println(<-ch)
}
//fatal error: all goroutines are asleep - deadlock!
//使用 make 函数创建通道时默认不传递第二个参数，通道中不能存放数据，在发送数据时，必须要求立马有人接收，即该通道为无缓冲通道。所以在接收者没有准备好前，发送操作会被阻塞。
```

```go
package main

import (
	"fmt"
	"time"
)

func funcRecieve(c chan bool) {
	fmt.Println(<-c)
}
func main() {
	ch4 := make(chan bool)
	go funcRecieve(ch4)
	ch4 <- true
	time.Sleep(time.Millisecond)
}


// 或

package main

import "fmt"

func main() {
	ch6 := make(chan bool, 1)
	ch6 <- true
	ch6 <- false
	fmt.Println(<-ch6)
}
```

### WaitGroup

在实际开发中我们并不能保证每个协程执行的时间，如果需要等待多个协程，全部结束任务后，再执行某个业务逻辑。下面我们介绍处理这种情况的方式。

`WaitGroup` 有几个方法：

- `Add`：初始值为 `0` ，这里直接传入子协程的数量，你传入的值会往计数器上加。
- `Done`：当某个子协程完成后，可调用此方法，会从计数器上减一，即子协程的数量减一，通常使用 `defer` 来调用。
- `Wait`：阻塞当前协程，直到实例里的计数器归零。

#### 使用信道

信道可以实现多个协程间的通信，于是乎我们可以定义一个信道，在任务执行完成后，往信道中写入 `true` ，然后在主协程中获取到 `true` ，就可以认为子协程已经执行完毕。

```go
package main

import "fmt"

func main() {
	isDone := make(chan bool)
	go func() {
		for i := 0; i < 5; i++{
			fmt.Println(i)
		}
		isDone <- true
	}()
	<- isDone
}
```

运行上面的程序，主协程就会等待创建的协程执行完毕后退出。

#### 使用 WaitGroup

使用上面的信道方法，虽然可行，但在你程序中使用很多协程的话，你的代码就会看起来很复杂，这里就要介绍一种更好的方法，那就是使用 `sync` 包中提供的 **WaitGroup** 类型。`WaitGroup` 用于等待一批 Go 协程执行结束。程序控制会一直阻塞，直到这些协程全部执行完毕。当然 `WaitGroup` 也可以用于实现工作池。

`WaitGroup` 实例化后就能使用：

```go
var name sync.WaitGroup
```

```go
package main

import (
	"fmt"
	"sync"
)

func task(taskNum int, wg *sync.WaitGroup) {
	// 延迟调用 执行完子协程计数器减一
	defer wg.Done()
	// 输出任务号
	for i := 0; i < 3; i++ {
		fmt.Printf("task %d: %d\n", taskNum, i)
	}
}

func main() {
	// 实例化 sync.WaitGroup
	var waitGroup sync.WaitGroup
	// 传入子协程的数量
	waitGroup.Add(3)
	// 开启一个子协程 协程 1 以及 实例 waitGroup
	go task(1, &waitGroup)
	// 开启一个子协程 协程 2 以及 实例 waitGroup
	go task(2, &waitGroup)
	// 开启一个子协程 协程 3 以及 实例 waitGroup
	go task(3, &waitGroup)
	// 实例 waitGroup 阻塞当前协程 等待所有子协程执行完
	waitGroup.Wait()
}
```

## Select

**select** 语句用在多个发送/接收通道操作中进行选择。

- `select` 语句会一直阻塞，直到发送/接收操作准备就绪。
- 如果有多个通道操作准备完毕， `select` 会随机地选取其中之一执行。

`select` 语法如下：

```go
select {
    case expression1:
        code
    case expression2:
        code
    default:
        code
}
```

```go
package main

import "fmt"

func main() {
    // 创建3个通道
    ch1 := make(chan string, 1)
    ch2 := make(chan string, 1)
    ch3 := make(chan string, 1)
    // 往通道 1 发送数据 
    ch1 <- "Go语言1"
    // 往通道 2 发送数据 
    ch2 <- "Go语言2"
    // 往通道 3 发送数据 
    ch3 <- "Go语言3"

    select {
    // 如果从通道 1 收到数据
    case message1 := <-ch1:
        fmt.Println("ch1 received:", message1)
    // 如果从通道 2 收到数据
    case message2 := <-ch2:
        fmt.Println("ch2 received:", message2)
    // 如果从通道 3 收到数据
    case message3 := <-ch3:
        fmt.Println("ch3 received:", message3)
    // 默认输出
    default:
        fmt.Println("No data received.")
    }
}
```

在执行 `select` 语句时，如果有机会的话会运行所有表达式，只要其中一个通道接收到数据，那么就会执行对应的 `case` 代码，然后退出。

### select 的应用

每个任务执行的时间不同，使用 `select` 语句等待相应的通道发出响应。`select` 会选择首先响应先完成的 task，而忽略其它的响应。使用这种方法，我们可以做多个 task，并给用户返回最快的 task 结果。

```go
package main

import (
	"fmt"
	"time"
)

func task1(ch chan string) {
	time.Sleep(5 * time.Second)
	ch <- "Go语言1"
}

func task2(ch chan string) {
	time.Sleep(7 * time.Second)
	ch <- "Go语言2"
}

func task3(ch chan string) {
	time.Sleep(2 * time.Second)
	ch <- "Go语言3"
}

func main() {
	// 创建三个通道
	ch1 := make(chan string)
	ch2 := make(chan string)
	ch3 := make(chan string)
	go task1(ch1)
	go task2(ch2)
	go task3(ch3)

	select {
	// 如果从通道 1 收到数据
	case message1 := <-ch1:
		fmt.Println("ch1 received:", message1)
	// 如果从通道 2 收到数据
	case message2 := <-ch2:
		fmt.Println("ch2 received:", message2)
	// 如果从通道 3 收到数据
	case message3 := <-ch3:
		fmt.Println("ch3 received:", message3)
	}
}
```

上面的程序会发现，没有 `default` 分支，因为如果加了该默认分支，如果还没从通道接收到数据， `select` 语句就会直接执行 `default` 分支然后退出，而不是被阻塞。

### 造成死锁

如果没有 `default` 分支， `select` 就会阻塞，如果一直没有命中其中的某个 `case` 最后会造成死锁。

```go
package main

import (
    "fmt"
)

func main() {
    // 创建两个通道
    ch1 := make(chan string, 1)
    ch2 := make(chan string, 1)
    ch3 := make(chan string, 1)

    select {
    // 如果从通道 1 收到数据
    case message1 := <-ch1:
        fmt.Println("ch1 received:", message1)
    // 如果从通道 2 收到数据
    case message2 := <-ch2:
        fmt.Println("ch2 received:", message2)
	// 如果从通道 3 收到数据
    case message3 := <-ch3:
        fmt.Println("ch3 received:", message3)
    }
}
//fatal error: all goroutines are asleep - deadlock!
```

运行上面的程序会造成死锁。解决该问题的方法是写好 `default` 分支。

还有另一种情况会导致死锁的发生，那就是使用空 `select` ：

```go
package main

func main() {
    select {}
}
```

运行上面的程序会抛出 `panic` 。

**Tips：**

- `switch-case` 里面的 `case` 是顺序执行的，但在 `select` 里并不是顺序执行的。在上面的第一个例子就可以看出，当 `select` 由多个 `case` 准备就绪时，将会随机地选取其中之一去执行。

### select超时处理

当 `case` 里的通道始终没有接收到数据时，而且也没有 `default` 语句时， `select` 整体就会阻塞，但是有时我们并不希望 `select` 一直阻塞下去，这时候就可以手动设置一个超时时间。

```go
package main

import (
    "fmt"
    "time"
)

func makeTimeout(ch chan bool, t int) {
    time.Sleep(time.Second * time.Duration(t))
    ch <- true
}

func main() {
    c1 := make(chan string, 1)
    c2 := make(chan string, 1)
    c3 := make(chan string, 1)
    timeout := make(chan bool, 1)

    go makeTimeout(timeout, 2)

    select {
    case msg1 := <-c1:
        fmt.Println("c1 received: ", msg1)
    case msg2 := <-c2:
        fmt.Println("c2 received: ", msg2)
    case msg3 := <-c3:
        fmt.Println("c3 received: ", msg3)
    case <-timeout:
        fmt.Println("Timeout, exit.")
    }
}
```

### 读取/写入数据

`select` 里的 `case` 表达式只能对通道进行操作，不管你是往通道写入数据，还是从通道读出数据。

```go
package main

import (
    "fmt"
)

func main() {
    c1 := make(chan string, 2)

    c1 <- "Go语言1"
    select {
    case c1 <- "Go语言2":
        fmt.Println("c1 received: ", <-c1)
        fmt.Println("c1 received: ", <-c1)
    default:
        fmt.Println("channel blocking")
    }
}
//c1 received:  Go语言1
//c1 received:  Go语言2
```

## 线程同步

Go 语言中，经常会遇到并发的问题，当然我们会优先考虑使用通道，同时 Go 语言也给出了传统的解决方式 **Mutex(互斥锁)** 和 **RWMutex(读写锁)** 来处理竞争条件。

```go
type Bank struct {
    balance int
}

func (b *Bank) Deposit(amount int) {
    b.balance += amount
}

func (b *Bank) Balance() int {
    return b.balance
}

func main() {
    b := &Bank{}

    b.Deposit(1000)
    b.Deposit(1000)
    b.Deposit(1000)

    fmt.Println(b.Balance())  //3000
}
```

### 临界区

当程序并发地运行时，多个 Go 协程不应该同时访问那些修改共享资源的代码。这些修改共享资源的代码称为**临界区** 。

```go
package main

import (
	"fmt"
	"sync"
)

type Bank struct {
	balance int
}

func (b *Bank) Deposit(amount int) {
	b.balance += amount
}

func (b *Bank) Balance() int {
	return b.balance
}
func main() {
	var wg sync.WaitGroup
	b := &Bank{}

	n := 1000
	wg.Add(n)
	for i := 1; i <= n; i++ {
		go func() {
			b.Deposit(1000)
			wg.Done()
		}()
	}
	wg.Wait()
	fmt.Println(b.Balance()) //972000,962000,941000
}
```

举一个简单的例子，当前变量的值增加 `b.balance += amount`

当然，对于只有一个协程的程序来说，上面的代码没有任何问题。但是，如果有多个协程并发运行时，就会发生错误，这种情况就称之为数据竞争(data race)。使用下面的互斥锁 `Mutex` 就能避免这种情况的发生。

### 互斥锁 Mutex

**互斥锁(Mutex，mutual exclusion)** 用于提供一种 **加锁机制(Locking Mechanism)** ，可确保在某时刻只有一个协程在临界区运行，以防止出现竞争。也是为了来保护一个资源不会因为并发操作而引起冲突导致数据不准确。

`Mutex` 有两个方法，分别是 `Lock()` 和 `Unlock()` ，即对应的加锁和解锁。在 `Lock()` 和 `Unlock()` 之间的代码，都只能由一个协程执行，就能避免竞争条件。

如果有一个协程已经持有了**锁(Lock)**，当其他协程试图获得该锁时，这些协程会被阻塞，直到`Mutex`解除锁定。

```go
package main

import (
    "fmt"
    "sync"
)

type BankV2 struct {
    balance int
    m       sync.Mutex
}

func (b *BankV2) Deposit(amount int) {
    b.m.Lock()
    b.balance += amount
    b.m.Unlock()
}

func (b *BankV2) Balance() int {
    return b.balance
}

func main() {
    var wg sync.WaitGroup
    b := &BankV2{}

    n := 1000
    wg.Add(n)
    for i := 1; i <= n; i++ {
        go func() {
            b.Deposit(1000)
            wg.Done()
        }()
    }
    wg.Wait()
    fmt.Println(b.Balance()) //1000000
}
```

要注意同一协程里不要在尚未解锁时再次加锁，也不要对已经解锁的锁再次解锁。

### 读写锁 RWMutex

`sync.RWMutex` 类型实现读写互斥锁，适用于读多写少的场景，它规定了当有人还在读取数据（即读锁占用）时，不允许有人更新这个数据（即写锁会阻塞）；为了保证程序的效率，多个人（协程）读取数据（拥有读锁）时，互不影响不会造成阻塞，它不会像 `Mutex` 那样只允许有一个人（协程）读取同一个数据。读锁与读锁兼容，读锁与写锁互斥，写锁与写锁互斥。

- 可以同时申请多个读锁；
- 有读锁时申请写锁将阻塞，有写锁时申请读锁将阻塞；
- 只要有写锁，后续申请读锁和写锁都将阻塞。

定义一个 `RWMuteux` 读写锁：

```go
var rwMutex sync.RWMutex
```

`RWMutex` 里提供了两种锁，每种锁分别对应两个方法，为了避免死锁，两个方法应成对出现，必要时请使用 `defer` 。

- 读锁：调用 `RLock` 方法开启锁，调用 `RUnlock` 释放锁；
- 写锁：调用 `Lock` 方法开启锁，调用 `Unlock` 释放锁。

```go
package main

import (
    "fmt"
    "sync"
    "time"
)

type BankV3 struct {
    balance int
    rwMutex sync.RWMutex // read write lock
}

func (b *BankV3) Deposit(amount int) {
    b.rwMutex.Lock() // write lock
    b.balance += amount
    b.rwMutex.Unlock() // wirte unlock
}

func (b *BankV3) Balance() (balance int) {
    b.rwMutex.RLock() // read lock
    balance = b.balance
    b.rwMutex.RUnlock() // read unlock
    return
}

func main() {
    var wg sync.WaitGroup
    b := &BankV3{}

    n := 1000
    wg.Add(n)
    for i := 1; i <= n; i++ {
        go func() {
            b.Deposit(1000)
            wg.Done()
        }()
    }
    wg.Wait()
    fmt.Println(b.Balance())
}
```

### 条件变量 sync.Cond

Cond 实现了一个条件变量，在 Locker 的基础上增加的一个消息通知的功能，保存了一个通知列表，用来唤醒一个或所有因等待条件变量而阻塞的 Go 程，以此来实现多个 Go 程间的同步。

## 错误与异常

### 错误

#### 内建错误

在 Go 中， **错误** 使用内建的 `error` 类型表示。`error` 类型是一个接口类型，它的定义如下：

```go
type error interface {
    Error() string
}
```

`error` 有了一个签名为 `Error() string` 的方法。所有实现该接口的类型都可以当作一个错误类型。`Error()` 方法给出了错误的描述。`fmt.Println` 在打印错误时，会在内部调用 `Error() string` 方法来得到该错误的描述。

```go
package main

import (
    "fmt"
    "os"
)

func main() {
    // 尝试打开文件
    file, err := os.Open("/a.txt")
    // 如果打开文件时发生错误 返回一个不等于 nil 的错误
    if err != nil {
        fmt.Println(err)
        return
    }
    // 如果打开文件成功 返回一个文件句柄 和 一个值为 nil 的错误
    fmt.Println(file.Name(), "opened successfully")
}
// open /a.txt: no such file or directory
```

#### 自定义错误

使用 `errors` 包中的 `New` 函数可以创建自定义错误。下面是 `errors` 包中 `New` 函数的实现代码：

```go
package errors

func New(text string) error {
    return &errorString{text}
}

type errorString struct {
    s string
}

func (e *errorString) Error() string {
    return e.s
}
```

`errorString` 是一个结构体类型，只有一个字符串字段 `s` 。它使用了 `errorString` 指针接受者，来实现 `error` 接口的 `Error() string` 方法。`New` 函数有一个字符串参数，通过这个参数创建了 `errorString` 类型的变量，并返回了它的地址。于是它就创建并返回了一个新的错误。

下面是一个简单的自定义错误例子，该例子创建了一个计算矩形面积的函数，当矩形的长和宽两者有一个为负数时，就会返回一个错误：

```go
package main

import (
    "errors"
    "fmt"
)

func area(a, b int) (int, error) {
    if a < 0 || b < 0 {
        return 0, errors.New("计算错误, 长度或宽度，不能小于0.")
    }
    return a * b, nil
}
func main() {
    a := 100
    b := -10
    r, err := area(a, b)
    if err != nil {
        fmt.Println(err)
        return
    }
    fmt.Println("Area =", r)
}
```

#### 给错误添加更多信息

上面的程序能报出我们自定义的错误，但是没有具体说明是哪个数据出了问题，所以下面就来改进一下这个程序，我们使用 `fmt` 包中的 `Errorf` 函数，规定错误格式，并返回一个符合该错误的字符串。

```go
package main

import (
    "fmt"
)

func area(a, b int) (int, error) {
    if a < 0 || b < 0 {
        return 0, fmt.Errorf("计算错误, 长度%d或宽度%d，不能小于0", a, b)
    }
    return a * b, nil
}
func main() {
    a := 100
    b := -10
    area, err := area(a, b)
    if err != nil {
        fmt.Println(err)
        return
    }
    fmt.Println("Area =", area)
}
```

给错误添加更多信息还可以 **使用结构体类型和字段** 实现。下面还是通过改进上面的程序来讲解这种方法的实现：

首先创建一个表示错误的结构体类型，一般错误类型名称都是以 `Error` 结尾，上面的错误是由于面积计算中长度或宽度错误导致的，所以这里把结构体命名为 `areaError` ：

```go
package main

import (
    "fmt"
)

type areaError struct {
    // 错误信息
    err string
    // 错误有关的长度
    length int
    // 错误有关的宽度
    width int
}

// 使用指针接收者 *areaError 实现了 error 接口的 Error() string 方法
func (e *areaError) Error() string {
    // 打印长度和宽度以及错误的描述
    return fmt.Sprintf("length %d, width %d : %s", e.length, e.width, e.err)
}

func rectangleArea(a, b int) (int, error) {
    if a < 0 || b < 0 {
        return 0, &areaError{"length or width is negative", a, b}
    }
    return a * b, nil
}
func main() {
    a := 100
    b := -10
    area, err := rectangleArea(a, b)
    // 检查了错误是否为 nil
    if err != nil {
        // 断言 *areaError 类型
        if err, ok := err.(*areaError); ok {
            // 如果错误是 *areaError 类型
            // 用 err.length 和 err.width 来获取错误的长度和宽度 打印出自定义错误的消息
            fmt.Printf("length %d or width %d is less than zero", err.length, err.width)
            return
        }
        fmt.Println(err)
        return
    }
    fmt.Println("Area =", area)
}
```

还可以使用 **结构体类型的方法** 来给错误添加更多信息。下面我们继续完善上面的程序，让程序更加精确的定位是长度引发的错误还是宽度引发的错误。

```go
package main

import (
    "fmt"
)

type areaError struct {
    // 错误信息
    err string
    // 长度
    length int
    // 宽度
    width int
}

// 使用指针接收者 *areaError 实现了 error 接口的 Error() string 方法
func (e *areaError) Error() string {
    return e.err
}

// 长度为负数返回 true
func (e *areaError) lengthNegative() bool {
    return e.length < 0
}

// 宽度为负数返回 true
func (e *areaError) widthNegative() bool {
    return e.width < 0
}

func area(length, width int) (int, error) {
    err := ""
    if length < 0 {
        err += "length is less than zero"
    }
    if width < 0 {
        if err == "" {
            err = "width is less than zero"
        } else {
            err += " and width is less than zero"
        }
    }
    if err != "" {
        return 0, &areaError{err, length, width}
    }
    return length * width, nil
}

func main() {
    length := 100
    width := -10
    area, err := area(length, width)
    // 检查了错误是否为 nil
    if err != nil {
        // 断言 *areaError 类型
        if err, ok := err.(*areaError); ok {
            // 如果错误是 *areaError 类型
            // 如果长度为负数 打印错误长度具体值
            if err.lengthNegative() {
                fmt.Printf("error: 长度 %d 小于0\n", err.length)
            }
            // 如果宽度为负数 打印错误宽度具体值
            if err.widthNegative() {
                fmt.Printf("error: 宽度 %d 小于0\n", err.width)
            }
            return
        }
        fmt.Println(err)
        return
    }
    fmt.Println("Area =", area)
}
```

### 异常

错误和异常是两个不同的概念，非常容易混淆。错误指的是可能出现问题的地方出现了问题；而异常指的是不应该出现问题的地方出现了问题。

### panic

在有些情况，当程序发生异常时，无法继续运行。在这种情况下，我们会使用 `panic` 来终止程序。当函数发生 `panic` 时，它会终止运行，在执行完所有的延迟函数后，程序返回到该函数的调用方。这样的过程会一直持续下去，直到当前协程的所有函数都返回退出，然后程序会打印出 `panic` 信息，接着打印出堆栈跟踪，最后程序终止。

我们应该尽可能地使用错误，而不是使用 `panic` 和 `recover` 。只有当程序不能继续运行的时候，才应该使用 `panic` 和 `recover` 机制。

`panic` 有两个合理的用例：

- 发生了一个不能恢复的错误，此时程序不能继续运行。一个例子就是 web 服务器无法绑定所要求的端口。在这种情况下，就应该使用 `panic` ，因为如果不能绑定端口，啥也做不了。
- 发生了一个编程上的错误。假如我们有一个接收指针参数的方法，而其他人使用 `nil` 作为参数调用了它。在这种情况下，我们可以使用 `panic` ，因为这是一个编程错误：用 `nil` 参数调用了一个只能接收合法指针的方法。

```go
func panic(v interface{})
```

```go
package main

func main() {
    panic("panic error")
}
```

#### 发生 panic 时的 defer

上面已经提到了，当函数发生 `panic` 时，它会终止运行，在执行完所有的延迟函数后，程序返回到该函数的调用方。这样的过程会一直持续下去，直到当前协程的所有函数都返回退出，然后程序会打印出 `panic` 信息，接着打印出堆栈跟踪，最后程序终止。

```go
package main

import "fmt"

func myTest() {
    defer fmt.Println("defer myTest")
    panic("panic myTest")
}
func main() {
    defer fmt.Println("defer main")
    myTest()
}
// defer myTest
// defer main
// panic: panic myTest
```

#### recover

`recover` 是一个内建函数，用于重新获得 `panic` 协程的控制。下面是内建函数 `recover` 的签名：

```go
func recover() interface{}
```

`recover` 必须在 `defer` 函数中才能生效，在其他作用域下，它是不工作的。在延迟函数内调用 `recover` ，可以取到 `panic` 的错误信息，并且停止 `panic` 续发事件，程序运行恢复正常。

```go
package main

import "fmt"

func outOfArray(x int) {
    defer func() {
        // recover() 可以将捕获到的 panic 信息打印
        if err := recover(); err != nil {
            fmt.Println(err)
        }
    }()
    var array [5]int
    array[x] = 1
}
func main() {
    // 故意制造数组越界 触发 panic
    outOfArray(20)
    // 如果能执行到这句 说明 panic 被捕获了
    // 后续的程序能继续运行
    fmt.Println("main...")
}
// runtime error: index out of range [20] with length 5
// main...
```

虽然该程序触发了 `panic` ，但由于我们使用了 `recover()` 捕获了 `panic` 异常，并输出 `panic` 信息，即使 `panic` 会导致整个程序退出，但在退出前，有 `defer` 延迟函数，还是得执行完 `defer` 。然后程序还会继续执行下去

只有在相同的协程中调用 `recover` 才管用， `recover` 不能恢复一个不同协程的 `panic`。

## make 和 new

### new函数

内置函数 `new` 分配内存。该函数只接受一个参数，该参数是一个任意类型(包括自定义类型)，而不是值，返回指向该类型新分配零值的指针。

```go
// The new built-in function allocates memory. The first argument is a type,
// not a value, and the value returned is a pointer to a newly
// allocated zero value of that type.
func new(Type) *Type
```

使用 `new` 函数首先会分配内存，并设置类型零值，最后返回指向该类型新分配零值的指针。

```go
package main

import (
	"fmt"
)

func main() {
	num := new(int)
	// 打印出类型的值
	fmt.Println(*num)  // 0
}
```

### make函数

内置函数 `make` 只能分配和初始化类型为 `slice` 、 `map` 或 `chan` 的对象。与 `new` 一样，第一个参数是类型，而不是值。与 `new` 不同， `make` 的返回类型与其参数的类型相同，而不是指向它的指针。结果取决于类型：

- `slice`：size 指定长度。切片的容量等于其长度。可提供第三个参数以指定不同的容量；它不能小于长度。
- `map`：为空映射分配足够的空间来容纳指定数量的元素。可以省略大小，在这种情况下，分配一个小的起始大小。
- `chan`：使用指定的缓冲区容量初始化通道的缓冲区。如果为零，或者忽略了大小，则通道是无缓冲的。

```go
func make(t Type, size ...IntegerType) Type
```

使用make函数必须初始化

```go
// slice
a := make([]int, 2, 10)

// map
b := make(map[string]int)

// chan
c := make(chan int, 10)
```

### new 和 make 的区别

`new`：为所有的类型分配内存，并初始化为零值，返回指针。

`make`：只能为 `slice` 、 `map` 、 `chan` 分配内存，并初始化，返回的是类型。

## 反射

### reflect 包

Go 语言提供了一种机制，能够在运行时更新变量和检查它们的值、调用它们的方法，而不需要在编译时就知道这些变量的具体类型。这种机制被称为 **反射** 。

在 Go 中 `reflect` 包实现了运行时反射。`reflect` 包会帮助识别 `interface{}` 变量的底层具体类型和具体值。

#### reflect.Type

`reflect.Type` 表示 `interface{}` 的具体类型。`reflect.TypeOf()` 方法返回 `reflect.Type`

```go
package main

import (
    "fmt"
    "reflect"
)

func reflectType(x interface{}) {
    obj := reflect.TypeOf(x)
    fmt.Println(obj)
}

func main() {
    var a int64 = 123
    reflectType(a)
    var b string = "Go语言"
    reflectType(b)
}
```

#### reflect.Value

`reflect.Value` 表示 `interface{}` 的具体值。`reflect.ValueOf()` 方法返回 `reflect.Value`

```go
package main

import (
    "fmt"
    "reflect"
)

func reflectType(x interface{}) {
    typeX := reflect.TypeOf(x)
    valueX := reflect.ValueOf(x)
    fmt.Println(typeX)
    fmt.Println(valueX)
}

func main() {
    var a int64 = 123
    reflectType(a)
    var b string = "Go语言"
    reflectType(b)
}
```

#### relfect.Kind

`relfect.Kind` 表示的是种类。在使用反射时，需要理解类型（Type）和种类（Kind）的区别。编程中，使用最多的是类型，但在反射中，当需要区分一个大品种的类型时，就会用到种类（Kind）。

Go 语言程序中的类型（Type）指的是系统原生数据类型，如 `int` 、 `string` 、 `bool` 、 `float32` 等类型，以及使用 `type` 关键字定义的类型，这些类型的名称就是其类型本身的名称。例如使用 `type A struct{}` 定义结构体时，`A` 就是 `struct{}` 的类型。

种类（Kind）指的是对象归属的品种，在 `reflect` 包中有如下定义：

```go
// A Kind represents the specific kind of type that a Type represents.
// The zero Kind is not a valid kind.
type Kind uint

const (
    Invalid Kind = iota
    Bool
    Int
    Int8
    Int16
    Int32
    Int64
    Uint
    Uint8
    Uint16
    Uint32
    Uint64
    Uintptr
    Float32
    Float64
    Complex64
    Complex128
    Array
    Chan
    Func
    Interface
    Map
    Ptr
    Slice
    String
    Struct
    UnsafePointer
)
```

```go
package main

import (
    "fmt"
    "reflect"
)

func reflectType(x interface{}) {
    typeX := reflect.TypeOf(x)
    fmt.Println(typeX.Kind()) // struct
    fmt.Println(typeX)        // main.book
}

type book struct {
}

func main() {
    var b book
    reflectType(b)
}
```

#### relfect.NumField()

`relfect.NumField()` 方法返回结构体中字段的数量。

```go
package main

import (
    "fmt"
    "reflect"
)

func reflectNumField(x interface{}) {
    // 检查 x 的类别是 struct
    if reflect.ValueOf(x).Kind() == reflect.Struct {
        v := reflect.ValueOf(x)
        fmt.Println("Number of fields", v.NumField())
    }
}

type book struct {
    name string
    spend  int
}

func main() {
    var b book
    reflectNumField(b)
}
```

#### relfect.Field()

`relfect.Field(i int)` 方法返回字段 `i` 的 `reflect.Value`

```go
package main

import (
    "fmt"
    "reflect"
)

func reflectNumField(x interface{}) {
    // 检查 x 的类别是 struct
    if reflect.ValueOf(x).Kind() == reflect.Struct {
        v := reflect.ValueOf(x)
        fmt.Println("Number of fields", v.NumField())
        for i := 0; i < v.NumField(); i++ {
            fmt.Printf("Field:%d type:%T value:%v\n", i, v.Field(i), v.Field(i))
        }
    }
}

type book struct {
    name string
    spend  int
}

func main() {
    var b = book{"Go语言", 8}
    reflectNumField(a)
}
// Number of fields 2
// Field:0 type:reflect.Value value:Go语言
// Field:1 type:reflect.Value value:8
```

### 反射的三大定律

一个接口变量，实际上都是由一 `pair` 对（type 和 data）组合而成，pair 对中记录着实际变量的值和类型。也就是说在真实世界（反射前环境）里，type 和 value 是合并在一起组成接口变量的。

而在反射的世界（反射后的环境）里，type 和 data 却是分开的，他们分别由 `reflect.Type` 和 `reflect.Value` 来表现。

Go语言反射三定律：

1. Reflection goes from interface value to reflection object.
2. Reflection goes from reflection object to interface value.
3. To modify a reflection object, the value must be settable.

```go
package main

import (
    "fmt"
    "reflect"
)

func main() {
    var a interface{} = 3.14

    fmt.Printf("接口变量的类型为 %T ，值为 %v\n", a, a)

    t := reflect.TypeOf(a)
    v := reflect.ValueOf(a)

    // 反射第一定律
    fmt.Printf("从接口变量到反射对象：Type对象类型为 %T\n", t)
    fmt.Printf("从接口变量到反射对象：Value对象类型为 %T\n", v)

    // 反射第二定律
    i := v.Interface()
    fmt.Printf("从反射对象到接口变量：对象类型为 %T，值为 %v\n", i, i)
    // 使用类型断言进行转换
    x := v.Interface().(float64)
    fmt.Printf("x 类型为 %T，值为 %v\n", x, x)
}
```

```go
package main

import (
    "fmt"
    "reflect"
)

func main() {
    var a float64 = 3.14
    v := reflect.ValueOf(a)
    fmt.Println("是否可写:", v.CanSet())
}
---
package main

import (
    "fmt"
    "reflect"
)

func main() {
    var a float64 = 3.14
    v := reflect.ValueOf(&a)
    fmt.Println("是否可写:", v.CanSet())
}
---
package main

import (
    "fmt"
    "reflect"
)

func main() {
    var a float64 = 3.14
    v := reflect.ValueOf(&a).Elem()
    fmt.Println("是否可写:", v.CanSet())

    v.SetFloat(2)
    fmt.Println(v)
}
```
