# Go Template
Go Template是一种用于生成文本输出的模板引擎，它是Go语言标准库中内置的一部分。Go Template使用简单而强大的语法来描述要生成的最终文本的结构和内容。

Go Template的语法是基于文本插值的思想，通过在模板文件中插入占位符和控制指令来控制输出的结果。模板可以包含静态文本和动态值，并且可以使用控制指令来迭代、条件判断和执行其他逻辑操作。

## 示例

```html
<!--test.html-->
<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<title>Go Web</title>
	</head>
	<body>
		{{ . }}
	</body>
</html>
```

```go
package main

import (
	"html/template"
	"net/http"
)

func tmpl(w http.ResponseWriter, r *http.Request) {
	t1, err := template.ParseFiles("test.html")
	if err != nil {
		panic(err)
	}
	t1.Execute(w, "hello world")
}

func main() {
	server := http.Server{
		Addr: "127.0.0.1:8080",
	}
	http.HandleFunc("/", tmpl)
	server.ListenAndServe()
}
```

## `.`和作用域

在写template的时候，会经常用到"."。

在template中，点"."代表**当前作用域的当前对象**。它类似于java/c++的this关键字，类似于perl/python的self。
```go
type Person struct {
	Name string
	Age  int
}

func main(){
	p := Person{"leo",23}
	tmpl, _ := template.New("test").Parse("Name: {{.Name}}, Age: {{.Age}}")
	_ = tmpl.Execute(os.Stdout, p)
}
// Name: leo, Age: 23
```


但是并非只有一个顶级作用域，range、with、if等内置action都有自己的本地作用域。
```go
package main

import (
	"os"
	"text/template"
)

type Friend struct {
	Fname string
}
type Person struct {
	UserName string
	Emails   []string
	Friends  []*Friend
}

func main() {
	f1 := Friend{Fname: "xiaofang"}
	f2 := Friend{Fname: "wugui"}
	t := template.New("test")
	t = template.Must(t.Parse(
		`hello {{.UserName}}!
{{ range .Emails }}
an email {{ . }}
{{- end }}
{{ with .Friends }}
{{- range . }}
my friend name is {{.Fname}}
{{- end }}
{{ end }}`))
	p := Person{UserName: "test",
		Emails:  []string{"a1@qq.com", "a2@gmail.com"},
		Friends: []*Friend{&f1, &f2}}
	t.Execute(os.Stdout, p)
}
```
输出：
```
hello test!

an email a1@qq.com
an email a2@gmail.com

my friend name is xiaofang
my friend name is wugui
```


## 去除空白

template引擎在进行替换的时候，是完全按照文本格式进行替换的。除了需要评估和替换的地方，所有的行分隔符、空格等等空白都原样保留。所以，**对于要解析的内容，不要随意缩进、随意换行**。

可以在`{{`符号的后面加上短横线并保留一个或多个空格"- "来去除它前面的空白(包括换行符、制表符、空格等)，即`{{- xxxx`。

在`}}`的前面加上一个或多个空格以及一个短横线"-"来去除它后面的空白，即`xxxx -}}`。
```
{{23}} < {{45}}        -> 23 < 45
{{23}} < {{- 45}}      ->  23 <45
{{23 -}} < {{45}}      ->  23< 45
{{23 -}} < {{- 45}}    ->  23<45
```

上面的例子
```go
t.Parse(
`hello {{.UserName}}!
{{ range .Emails }}
an email {{ . }}
{{- end }}
{{ with .Friends }}
{{- range . }}
my friend name is {{.Fname}}
{{- end }}
{{ end }}`)
```

注意，上面没有进行缩进。因为缩进的制表符或空格在替换的时候会保留。


## 注释

注释方式：`{{/* a comment */}}`。

注释后的内容不会被引擎进行替换。但需要注意，注释行在替换的时候也会占用行，所以应该去除前缀和后缀空白，否则会多一空行。
```go
{{- /* a comment without prefix/suffix space */}}
{{/* a comment without prefix/suffix space */ -}}
{{- /* a comment without prefix/suffix space */ -}}
```
注意，应该只去除前缀或后缀空白，不要同时都去除，否则会破坏原有的格式。

## 管道pipeline

pipeline是指产生数据的操作。

可以使用管道符号`|`链接多个命令，用法和unix下的管道类似：`|`前面的命令将运算结果(或返回值)传递给后一个命令的最后一个位置。

例如：
```go
{{.}} | printf "%s\n" "abcd"
```


命令可以有超过1个的返回值，这时第二个返回值必须为err类型。

需要注意的是，并非只有使用了`|`才是pipeline。Go template中，pipeline的概念是传递数据，只要能产生数据的，都是pipeline。这使得某些操作可以作为另一些操作内部的表达式先运行得到结果，就像是Unix下的命令替换一样。

例如，下面的`(len "output")`是pipeline，它整体先运行。
```go
{{println (len "output")}}
```

下面是Pipeline的几种示例，它们都输出`"output"`：
```go
{{`"output"`}}
{{printf "%q" "output"}}
{{"output" | printf "%q"}}
{{printf "%q" (print "out" "put")}}
{{"put" | printf "%s%s" "out" | printf "%q"}}
{{"output" | printf "%s" | printf "%q"}}
```

## 变量

可以在template中定义变量：
```go
// 未定义过的变量
$var := pipeline

// 已定义过的变量
$var = pipeline
```
```go
{{- $how_long :=(len "output")}}
{{- println $how_long}}   // 输出6
```
```go
tx := template.Must(template.New("hh").Parse(
`{{range $x := . -}}
{{$y := 333}}
{{- if (gt $x 33)}}{{println $x $y ($z := 444)}}{{- end}}
{{- end}}
`))
s := []int{11, 22, 33, 44, 55}
_ = tx.Execute(os.Stdout, s)
//44 333 444
//55 333 444
```
上面的示例中，使用range迭代slice，每个元素都被赋值给变量`$x`，每次迭代过程中，都新设置一个变量`$y`，在内层嵌套的if结构中，可以使用这个两个外层的变量。在if的条件表达式中，使用了一个内置的比较函数gt，如果`$x`大于33，则为true。在println的参数中还定义了一个`$z`，之所以能定义，是因为`($z := 444)`的过程是一个Pipeline，可以先运行。

需要注意三点：

1. **变量有作用域，只要出现end，则当前层次的作用域结束。内层可以访问外层变量，但外层不能访问内层变量**。
2. **有一个特殊变量`$`，它代表模板的最顶级作用域对象(通俗地理解，是以模板为全局作用域的全局变量)，在Execute()执行的时候进行赋值，且一直不变**。例如上面的示例中，`$ = [11 22 33 44 55]`。再例如，define定义了一个模板t1，则t1中的`$`作用域只属于这个t1。
3. **变量不可在模板之间继承**。普通变量可能比较容易理解，但对于特殊变量"."和"$"，比较容易搞混。见下面的例子。

## 条件判断
```go
{{if pipeline}} T1 {{end}}
{{if pipeline}} T1 {{else}} T0 {{end}}
{{if pipeline}} T1 {{else if pipeline}} T0 {{end}}
{{if pipeline}} T1 {{else}}{{if pipeline}} T0 {{end}}{{end}}
```
需要注意的是，pipeline为false的情况是各种数据对象的0值：数值0，指针或接口是nil，数组、slice、map或string则是len为0。

## range...end迭代

有两种迭代表达式
```go
{{range pipeline}} T1 {{end}}
{{range pipeline}} T1 {{else}} T0 {{end}}
```
range可以迭代slice、数组、map或channel。迭代的时候，会设置"."为当前正在迭代的元素。

对于第一个表达式，当迭代对象的值为0值时，则range直接跳过，就像if一样。对于第二个表达式，则在迭代到0值时执行else语句。
```go
tx := template.Must(template.New("hh").Parse(
`{{range $x := . -}}
{{println $x}}
{{- end}}
`))
s := []int{11, 22, 33, 44, 55}
_ = tx.Execute(os.Stdout, s)
```
需注意的是，range的参数部分是pipeline，所以在迭代的过程中是可以进行赋值的。但有两种赋值情况：
```go
{{range $value := .}}
{{range $key,$value := .}}
```
如果range中只赋值给一个变量，则这个变量是当前正在迭代元素的值。如果赋值给两个变量，则第一个变量是索引值(map/slice是数值，map是key)，第二个变量是当前正在迭代元素的值。

## with...end

**with用来设置"."的值**。两种格式：
```go
{{with pipeline}} T1 {{end}}
{{with pipeline}} T1 {{else}} T0 {{end}}
```
对于第一种格式，当pipeline不为0值的时候，点"."设置为pipeline运算的值，否则跳过。对于第二种格式，当pipeline为0值时，执行else语句块，否则"."设置为pipeline运算的值，并执行T1。
```go
{{with "xx"}}{{println .}}{{end}}
```

上面将输出`xx`，因为"."已经设置为"xx"。

## 内置函数和自定义函数

template定义了一些内置函数，也支持自定义函数

```go
and
    返回第一个为空的参数或最后一个参数。可以有任意多个参数。
    and x y等价于if x then y else x

not
    布尔取反。只能一个参数。

or
    返回第一个不为空的参数或最后一个参数。可以有任意多个参数。
    "or x y"等价于"if x then x else y"。

print
printf
println
    分别等价于fmt包中的Sprint、Sprintf、Sprintln

len
    返回参数的length。

index
    对可索引对象进行索引取值。第一个参数是索引对象，后面的参数是索引位。
    "index x 1 2 3"代表的是x[1][2][3]。
    可索引对象包括map、slice、array。

call
    显式调用函数。第一个参数必须是函数类型，且不是template中的函数，而是外部函数。
    例如一个struct中的某个字段是func类型的。
    "call .X.Y 1 2"表示调用dot.X.Y(1, 2)，Y必须是func类型，函数参数是1和2。
    函数必须只能有一个或2个返回值，如果有第二个返回值，则必须为error类型。
```
```go
eq arg1 arg2：
    arg1 == arg2时为true
ne arg1 arg2：
    arg1 != arg2时为true
lt arg1 arg2：
    arg1 < arg2时为true
le arg1 arg2：
    arg1 <= arg2时为true
gt arg1 arg2：
    arg1 > arg2时为true
ge arg1 arg2：
    arg1 >= arg2时为true
```

对于eq函数，支持多个参数,它们都和第一个参数arg1进行比较。它等价于：
```go
eq arg1 arg2 arg3 arg4...
arg1==arg2 || arg1==arg3 || arg1==arg4 
```

## 嵌套template：define和template

define可以直接在待解析内容中定义一个模板，这个模板会加入到common结构组中，并关联到关联名称上。

定义了模板之后，可以使用template这个action来执行模板。template有两种格式：
```go
{{template "name"}}
{{template "name" pipeline}}
```

第一种是直接执行名为name的template，点设置为nil。第二种是点"."设置为pipeline的值，并执行名为name的template。可以将template看作是函数：

```go
template("name)
template("name",pipeline)
```

```go
func main() {
	t1 := template.New("test1")
	tmpl, _ := t1.Parse(
`{{- define "T1"}}ONE {{println .}}{{end}}
{{- define "T2"}}TWO {{println .}}{{end}}
{{- define "T3"}}{{template "T1"}}{{template "T2" "haha"}}{{end}}
{{- template "T3" -}}
`)
	_ = tmpl.Execute(os.Stdout, "hello world")
}
//ONE <nil>
//TWO haha
```

## block块

```go
{{block "name" pipeline}} T1 {{end}}
	A block is shorthand for defining a template
		{{define "name"}} T1 {{end}}
	and then executing it in place
		{{template "name" pipeline}}
	The typical use is to define a set of root templates that are
	then customized by redefining the block templates within.
```
根据官方文档的解释：block等价于define定义一个名为name的模板，并在"有需要"的地方执行这个模板，执行时将"."设置为pipeline的值。

但应该注意，**block的第一个动作是执行名为name的模板，如果不存在，则在此处自动定义这个模板，并执行这个临时定义的模板。换句话说，block可以认为是设置一个默认模板**。

例如：
```go
{{block "T1" .}} one {{end}}
```
它首先找到T1模板，如果T1存在，则执行找到的T1，如果没找到T1，则临时定义一个，并执行它。


## 不转义

上下文感知的自动转义能让程序更加安全，比如防止XSS攻击(例如在表单中输入带有`<script>...</script>`的内容并提交，会使得用户提交的这部分script被执行)。

如果确实不想转义，可以进行类型转换。
```go
type CSS
type HTML
type JS
type URL
```

```go
func process(w http.ResponseWriter, r *http.Request) {
	t, _ := template.ParseFiles("tmpl.html")
	t.Execute(w, template.HTML(r.FormValue("comment")))
}
```

