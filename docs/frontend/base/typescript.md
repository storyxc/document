# TypeScript

## 语法

### 原始类型

- 字符串
  - 支持模板字符串赋值
- 布尔
- 数字
  - 支持十进制、十六进制、二进制、八进制、NaN、Infinity
- Null和Undefined

### Any

在编程阶段还不清楚类型的变量指定的一个类型

### Void

某种程度上来说，`void`类型像是与`any`类型相反，它表示没有任何类型。

### Null和Undefined

TypeScript里，`undefined`和`null`两者各自有自己的类型分别叫做`undefined`和`null`。 和 `void`相似，它们的本身的类型用处不是很大。

默认情况下`null`和`undefined`是所有类型的子类型。 就是说你可以把 `null`和`undefined`赋值给`number`类型的变量。

然而，当指定了`--strictNullChecks`标记，`null`和`undefined`只能赋值给`void`和它们各自。 这能避免 *很多*常见的问题。 

### Object

- `Object`：包含所有类型
- `object`：表示非原始类型也就是除`number`，`string`，`boolean`，`symbol`，`null`或`undefined`之外的类型。
- `{}`：同`new Object()`，包含所有类型，但无法修改属性、赋值等

### 接口和对象

typescript中定义对象的方式是用`interface`，定义一种约束，让数据结构满足约束格式

```typescript
interface Man extends Person{
  age?:number
  [propName:string]:any
  readonly id:number
}

interface Person {
  name:string
}

let p:Man = {
  name: 'zs',
  id: 1,
  age: 18,
  a:1,
  b:2
}
  
  
interface Fn {
  (name:string):number[]
}

const fn:Fn = function(name:string) {
  return [1]
}
```

- 对象属性必须和`interface`完全一致
- 重名的`interface`会被合并
- 任意key（索引签名）
- 可选`?`
- 只读`readonly`
- 定义函数类型

### 数组

- 元素类型后加`[]`，例如：`number[]`、`string[]`
- 数组范型：`Array<number>`
- 定义对象数组用`interface`
- 二维数组:`let arr:number[][] = [[1], [2]]`
- 一把梭：`any[]`

### 函数

```typescript
//返回值
function add(a:number, b:number): number {
  return a+b
}
//箭头函数和定义返回值
const add = (a:number,b:number):number => a+b 

//默认参数
function add(a:number = 10, b:number = 20) {
  return a+b
}
//可选参数
function add(a:number = 10, b?:number): number{
  return a+b
}
//传对象
interface User {
  name:string
  age:nubmer
}

function add(user: User): User{
  return user
}
console.log(add({ name: "111", age: 18}))

//ts可以定义this的类型,在js中无法使用，必须是第一个参数定义this的类型(有点类似python里面的self？)
interface Obj {
  user:number[]
  add:(this:Obj,num:number)=>void
}

let obj:Obj = {
  user:[1,2,3],
  add(this:Obj,num:number) {
    this.user.push(num)
  }
}
obj.add(4)
console.log(obj)

//函数重载
let user:number[] = [1,2,3]


function findNum():number[]
function findNum(id:number):number[] 
function findNum(add:number[]):number[]

//跟据入参走不同逻辑
function findNum(ids?:number | number[]):number[] {
  if(typeof ids == 'number') {
    return user.filter(v=> v == ids)
  }else if (Array.isArray(ids)) {
    user.push(...ids)
    return user
  }else {
    return user
  }
}
console.log(findNum())




```

### 联合类型

```typescript
let phone:number | string = '123456'

//函数使用联合类型
let fn = function(type:number | boolean):boolean {
  return !!type
}
```

> TypeScript中的 !!是一个逻辑非（not）操作符的双重否定形式，它可以用于将一个值转换成对应的布尔值。基本上，!!可以将任何值强制转换为对应的布尔值类型。
>
> 例如，使用!!可以将下列值转换为布尔类型的值：
>
> !!true // true
>
> !!1 // true
>
> !!"hello" // true
>
> !!undefined // false
>
> !!null // false
>
> !!0 // false
>
> !!"" // false

### 交叉类型

```typescript
interface People {
  name:string,
  age:string
}

interface Man {
  sex:number
}

const p = (param:People & Man):void => {
  console.log(man)
}

p({
  name:"ikun",
  age:"两年半",
  sex:1
})
```

### 类型断言

`尖括号`写法

```typescript
let someValue: any = "this is a string";

let strLength: number = (<string>someValue).length;
```

`as`写法

```typescript
let someValue: any = "this is a string";

let strLength: number = (someValue as string).length;
```

> 使用JSX时只允许as写法

### 内置对象

- `Number(1)`
- `Date()`
- `RegExp(/\w/)`
- `Error('wrong')`
- `XMLHttpRequest`
- `HTML(元素名称)Element / HTMLElement / Element`
- `NodeList` / `NodeListOf<HTMLDivElement | HTMLElement>`
- `Storage`
- `Location`
- `Promise`
- ...

### Class

```typescript
//class的基本用法 继承 和类型约束 implements
interface Options {
  el: string | HTMLElement;
}
interface VueClass {
  options: Options;
  init(): void;
}
interface Vnode {
  tag: string;
  text: string;
  children?: Vnode[];
}
//虚拟dom
class Dom {
  //创建dom节点
  createElement(el: string) {
    return document.createElement(el);
  }
  //填充文本
  setText(el: HTMLElement, text: string | null) {
    el.textContent = text;
  }
  //渲染函数
  render(data: Vnode) {
    let root = this.createElement(data.tag);
    if (data.children && Array.isArray(data.children)) {
      data.children.forEach((item) => {
        let child = this.render(item);
        root.appendChild(child);
      });
    } else {
      this.setText(root, data.text === undefined ? "" : data.text);
    }
    return root;
  }
}

class Vue extends Dom implements VueClass {
  options: Options;
  constructor(options: Options) {
    super();
    this.options = options;
    this.init();
  }
  init(): void {
    let data: Vnode = {
      tag: "div",
      text: '111',
      children: [
        {
          tag: "section",
          text: "子节点1",
        },
        {
          tag: "section",
          text: "子节点2",
        },
        {
          tag: "section",
          text: "子节点3",
        }
      ],
    };
    let app =
      typeof this.options.el == "string"
        ? document.querySelector(this.options.el)
        : this.options.el;
    app?.appendChild(this.render(data));
  }
}

new Vue({
  el: "#app"
});
```

- readonly
- private
- protected
- public
- super()
- 静态方法 static
- get set

### 抽象类 & 抽象方法

- abstract className
- abstract functionName

### 元组Tuple

元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。

```typescript
// Declare a tuple type
let x: [string, number];
// Initialize it
x = ['hello', 10]; // OK
// Initialize it incorrectly
x = [10, 'hello']; // Error
```

当访问一个已知索引的元素，会得到正确的类型：

```ts
console.log(x[0].substr(1)); // OK
console.log(x[1].substr(1)); // Error, 'number' does not have 'substr'
```

当访问一个越界的元素，会使用联合类型替代：

```ts
x[3] = 'world'; // OK, 字符串可以赋值给(string | number)类型

console.log(x[5].toString()); // OK, 'string' 和 'number' 都有 toString

x[6] = true; // Error, 布尔不是(string | number)类型
```

### 枚举

`enum`类型是对JavaScript标准数据类型的一个补充。

```ts
enum Color {Red, Green, Blue}
let c: Color = Color.Green;
```

默认情况下，从`0`开始为元素编号。 你也可以手动的指定成员的数值。 例如，我们将上面的例子改成从 `1`开始编号：

```ts
enum Color {Red = 1, Green, Blue}
let c: Color = Color.Green;
```

或者，全部都采用手动赋值：

```ts
enum Color {Red = 1, Green = 2, Blue = 4}
let c: Color = Color.Green;
```

枚举类型提供的一个便利是你可以由枚举的值得到它的名字。 例如，我们知道数值为2，但是不确定它映射到Color里的哪个名字，我们可以查找相应的名字：

```ts
enum Color {Red = 1, Green, Blue}
let colorName: string = Color[2];

console.log(colorName);  // 显示'Green'因为上面代码里它的值是2
```

### 类型推断

TypeScript里，在有些没有明确指出类型的地方，类型推论会帮助提供类型。

如果没有指出类型 & 没赋值 会被推断成any类型。

### 类型别名

```typescript
type s = string | null

let str:s = 'test'

let str1 = '123'
type s1 = typeof str1


type num = 1 extends number ? 1 : 0
```

![image-20230419001413539](https://storyxc.com/images/blog/image-20230419001413539.png)

### Never

`never`类型表示的是那些永不存在的值的类型。 例如， `never`类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型； 变量也可能是 `never`类型，当它们被永不为真的类型保护所约束时。

`never`类型是任何类型的子类型，也可以赋值给任何类型；然而，*没有*类型是`never`的子类型或可以赋值给`never`类型（除了`never`本身之外）。 即使 `any`也不可以赋值给`never`。

```typescript
type A = string & number //never
type A = void | number | never //never会被忽略掉


type A = '唱' | '跳' | 'rap'

function kun(value: A) {
    switch (value) {
        case '唱':
            break;
        case '跳':
            break;
        case 'rap':
            break;
        default:
            const check: never = value;
            break;
    }
}
```

### Symbol

```typescript
let a1:symbol = Symbol(1)
let a2:symbol = Symbol(2)
console.log(a1 === a2) // false

//for Symbol 有没有注册过这个key 如果有直接用 没有就创建
console.log(Symbol.for('1') === Symbol.for('1')) // true
```

- 可以用来避免属性被覆盖

### 生成器 迭代器

```typescript
function* gen() {
  yield Promise.resovle('111')
  yield '1'
  yield '2'
}
const g = gen()
console.log(g.next())
console.log(g.next())
console.log(g.next())
console.log(g.next())
/*
{ value: Promise { '111' }, done: false }
{ value: '1', done: false }
{ value: '2', done: false }
{ value: undefined, done: true }
*/
```

```typescript
let Set:Set<number> = new Set([1,1,2,3,3,3]) // 1 2 3

let map:Map<any, any> = new Map()
let arr = [1,2,3]
map.set(arr, '123')

function args(){
  console.log(arguments) //伪数组 IArguments
}

const each = (value:any) => {
  let It: any = value[Symbol.iterator]()
  let next: any = { done: false }
  while (!next.done) {
    next = It.next()
    if (!next.done) {
      console.log(next.value)
    }
  }
}
each([1,2,3])
/*
1
2
3
*/


//迭代器语法糖 for of
//对象不能用 for of语法
for (let value of map) {
  console.log(value)
}

//数组解构 底层原理也是调用iterator
let a = [4,5,6]
let copy = [...a]
console.log(a)

let obj = {
  max:5,
  current:0,
  [Symbol.iterator]() {
    return {
      max: this.max,
      current: this.current,
      next() {
        if (this.current == this.max) {
          return {
            value: undefined,
            done:true
          }
        }else {
          return {
            value: this.current++,
            done:false
          }
        }
      }
    }
  }
}

for (let value of obj) {
  console.log(value)
}
/*
0
1
2
3
4
*/
```

### 泛型

```typescript
function fun<T>(a:T, b:T):Array<T> {
	return [a,b]
}

type A<T> = string | number | T
let a:A<boolean> = true

interface Date<T> {
  msg:T
}
let data:Date<number> = {
  msg:1
}

function add<T = number,K = number>(a:T,b:K):Array<T | K> {
  return [a,b]
}
add(false, '1')

const axios = {
  get<T>(url:string) {
    return new Promise<T>((resolve,reject)=>{
      let xhr:XMLHttpRequest = new XMLHttpRequest()
      xhr.open('GET',url)
      xhr.onreadystatechange = () => {
        if(xhr.readyState ==4 && xhr.status == 200) {
          resolve(JSON.parse(xhr.responseText))
        }
      }
      xhr.send(null)
    })
  }
}
```

### 泛型约束

```typescript
// extends
interface Len {
  length:number
}

function func<T extends Len)(a:T) {
  console.log(a.length)
}

let obj = {
  name: 'test',
  sex: 1
}

// 约束对象的key
type key = keyof typeof obj // "name" | "sex"

function ob<T extends object, K extends keyof T>(obj:T, key:K) {
  
}


interface Data {
  name:string
  age:number
  sex:string
}

type Options<T extends object> = {
  //readonly [Key in keyof T]?:T[Key]
  [Key in keyof T]?:T[Key]
}

type B = Options<Data>
/*
type B = {
    name?: string | undefined;
    age?: number | undefined;
    sex?: string | undefined;
}
type B = {
    name?: string | undefined;
    age?: number | undefined;
    sex?: string | undefined;
}
*/
```

### tsconfig.json

通过`tsc --init`生成

```json
"compilerOptions": {
  "incremental": true, // TS编译器在第一次编译之后会生成一个存储编译信息的文件，第二次编译会在第一次的基础上进行增量编译，可以提高编译的速度
  "tsBuildInfoFile": "./buildFile", // 增量编译文件的存储位置
  "diagnostics": true, // 打印诊断信息 
  "target": "ES5", // 目标语言的版本
  "module": "CommonJS", // 生成代码的模板标准
  "outFile": "./app.js", // 将多个相互依赖的文件生成一个文件，可以用在AMD模块中，即开启时应设置"module": "AMD",
  "lib": ["DOM", "ES2015", "ScriptHost", "ES2019.Array"], // TS需要引用的库，即声明文件，es5 默认引用dom、es5、scripthost,如需要使用es的高级版本特性，通常都需要配置，如es8的数组新特性需要引入"ES2019.Array",
  "allowJS": true, // 允许编译器编译JS，JSX文件
  "checkJs": true, // 允许在JS文件中报错，通常与allowJS一起使用
  "outDir": "./dist", // 指定输出目录
  "rootDir": "./", // 指定输出文件目录(用于输出)，用于控制输出目录结构
  "declaration": true, // 生成声明文件，开启后会自动生成声明文件
  "declarationDir": "./file", // 指定生成声明文件存放目录
  "emitDeclarationOnly": true, // 只生成声明文件，而不会生成js文件
  "sourceMap": true, // 生成目标文件的sourceMap文件
  "inlineSourceMap": true, // 生成目标文件的inline SourceMap，inline SourceMap会包含在生成的js文件中
  "declarationMap": true, // 为声明文件生成sourceMap
  "typeRoots": [], // 声明文件目录，默认时node_modules/@types
  "types": [], // 加载的声明文件包
  "removeComments":true, // 删除注释 
  "noEmit": true, // 不输出文件,即编译后不会生成任何js文件
  "noEmitOnError": true, // 发送错误时不输出任何文件
  "noEmitHelpers": true, // 不生成helper函数，减小体积，需要额外安装，常配合importHelpers一起使用
  "importHelpers": true, // 通过tslib引入helper函数，文件必须是模块
  "downlevelIteration": true, // 降级遍历器实现，如果目标源是es3/5，那么遍历器会有降级的实现
  "strict": true, // 开启所有严格的类型检查
  "alwaysStrict": true, // 在代码中注入'use strict'
  "noImplicitAny": true, // 不允许隐式的any类型
  "strictNullChecks": true, // 不允许把null、undefined赋值给其他类型的变量
  "strictFunctionTypes": true, // 不允许函数参数双向协变
  "strictPropertyInitialization": true, // 类的实例属性必须初始化
  "strictBindCallApply": true, // 严格的bind/call/apply检查
  "noImplicitThis": true, // 不允许this有隐式的any类型
  "noUnusedLocals": true, // 检查只声明、未使用的局部变量(只提示不报错)
  "noUnusedParameters": true, // 检查未使用的函数参数(只提示不报错)
  "noFallthroughCasesInSwitch": true, // 防止switch语句贯穿(即如果没有break语句后面不会执行)
  "noImplicitReturns": true, //每个分支都会有返回值
  "esModuleInterop": true, // 允许export=导出，由import from 导入
  "allowUmdGlobalAccess": true, // 允许在模块中全局变量的方式访问umd模块
  "moduleResolution": "node", // 模块解析策略，ts默认用node的解析策略，即相对的方式导入
  "baseUrl": "./", // 解析非相对模块的基地址，默认是当前目录
  "paths": { // 路径映射，相对于baseUrl
    // 如使用jq时不想使用默认版本，而需要手动指定版本，可进行如下配置
    "jquery": ["node_modules/jquery/dist/jquery.min.js"]
  },
  "rootDirs": ["src","out"], // 将多个目录放在一个虚拟目录下，用于运行时，即编译后引入文件的位置可能发生变化，这也设置可以虚拟src和out在同一个目录下，不用再去改变路径也不会报错
  "listEmittedFiles": true, // 打印输出文件
  "listFiles": true// 打印编译的文件(包括引用的声明文件)
}
 
// 指定一个匹配列表（属于自动指定该路径下的所有ts相关文件）
"include": [
   "src/**/*"
],
// 指定一个排除列表（include的反向操作）
 "exclude": [
   "demo.ts"
],
// 指定哪些文件使用该配置（属于手动一个个指定文件）
 "files": [
   "demo.ts"
]
```

### namespace

typescript提供了`namespace`避免全局变量污染的问题。

任何包含顶级import或export的文件都被当作一个模块。相反的，如果不带，那么它的内容被视为全局可见的。

- 命名空间在ts1.5之前叫`内部模块`，`外部模块`现在简称为模块。
- 命名空间内的类默认私有
- 通过export暴露
- 通过namespace关键字定义

```typescript
namespace A {
  export const a = 1
}
// 实现：
"use strict"
var A;
(function (A) {
  A.a = 1;
})(A || A = {});

// 嵌套命名空间
namespace A {
  export namespace C {
    export const D = 5;
  }
}

console.log(A.C.D)

//抽离命名空间
export namespace V {
  export const a = 1
}

import {V} from '../index'
console.log(V)// {a:1}


//简化命名空间
namespace A {
  export namespace C {
    export const D = 5;
  }
}

import a = A.C
console.log(a.D)

//命名空间合并
namespace A {
  export const b = 2
}
namespace A {
	export const a = 1
}
//等价于
namespace A {
  export const b = 2
  export const a = 1
}
```

### 三斜线指令

三斜线指令是包含单个XML标签的单行注释。 注释的内容会做为编译器指令使用。

```typescript
/// <reference path="..." />
/// <reference path="..." />指令是三斜线指令中最常见的一种。 它用于声明文件间的 依赖。
```

三斜线引用告诉编译器在编译过程中要引入的额外的文件。

```typescript
/// <reference types="..." />
与 /// <reference path="..." />指令相似，这个指令是用来声明 依赖的； 一个 /// <reference types="..." />指令则声明了对某个包的依赖。

对这些包的名字的解析与在 import语句里对模块名的解析类似。 可以简单地把三斜线类型引用指令当做 import声明的包。

例如，把 /// <reference types="node" />引入到声明文件，表明这个文件使用了 @types/node/index.d.ts里面声明的名字； 并且，这个包需要在编译阶段与声明文件一起被包含进来。

仅当在你需要写一个d.ts文件时才使用这个指令。

对于那些在编译阶段生成的声明文件，编译器会自动地添加/// <reference types="..." />； 当且仅当结果文件中使用了引用的包里的声明时才会在生成的声明文件里添加/// <reference types="..." />语句。

若要在.ts文件里声明一个对@types包的依赖，使用--types命令行选项或在tsconfig.json里指定。
```

### 声明文件

使用第三方库时需要引用它的声明文件`d.ts`才能获得对应的代码补全、接口提示等功能

```typescript
npm i @types/xxx
```

### Mixins混入

除了传统的面向对象继承方式，还流行一种通过可重用组件创建类的方式，就是联合另一个简单类的代码。

```typescript
// Disposable Mixin
class Disposable {
    isDisposed: boolean;
    dispose() {
        this.isDisposed = true;
    }

}

// Activatable Mixin
class Activatable {
    isActive: boolean;
    activate() {
        this.isActive = true;
    }
    deactivate() {
        this.isActive = false;
    }
}

class SmartObject implements Disposable, Activatable {
    constructor() {
        setInterval(() => console.log(this.isActive + " : " + this.isDisposed), 500);
    }

    interact() {
        this.activate();
    }

    // Disposable
    isDisposed: boolean = false;
    dispose: () => void;
    // Activatable
    isActive: boolean = false;
    activate: () => void;
    deactivate: () => void;
}
applyMixins(SmartObject, [Disposable, Activatable]);

let smartObj = new SmartObject();
setTimeout(() => smartObj.interact(), 1000);

////////////////////////////////////////
// In your runtime library somewhere
////////////////////////////////////////

function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}
```

### 装饰器Decorator

随着TypeScript和ES6里引入了类，在一些场景下我们需要额外的特性来支持标注或修改类及其成员。 装饰器（Decorators）为我们在类的声明及成员上通过元编程语法添加标注提供了一种方式。

若要启用实验性的装饰器特性，你必须在命令行或`tsconfig.json`里启用`experimentalDecorators`编译器选项：

**命令行**:

```shell
tsc --target ES5 --experimentalDecorators
```

**tsconfig.json**:

```json
{
    "compilerOptions": {
        "target": "ES5",
        "experimentalDecorators": true
    }
}
```

*装饰器*是一种特殊类型的声明，它能够被附加到[类声明](https://www.tslang.cn/docs/handbook/decorators.html#class-decorators)，[方法](https://www.tslang.cn/docs/handbook/decorators.html#method-decorators)， [访问符](https://www.tslang.cn/docs/handbook/decorators.html#accessor-decorators)，[属性](https://www.tslang.cn/docs/handbook/decorators.html#property-decorators)或[参数](https://www.tslang.cn/docs/handbook/decorators.html#parameter-decorators)上。 装饰器使用 `@expression`这种形式，`expression`求值后必须为一个函数，它会在运行时被调用，被装饰的声明信息做为参数传入。

#### 类装饰器

```typescript
const IKun: ClassDecorator = (target) => {
    console.log(target);
    target.prototype.name = 'ikun';
    target.prototype.slogan = () => {
        console.log('鸡你太美');
    }
}

@IKun
class Person {

}

const person = new Person() as any;
person.slogan(); // 鸡你太美
```

#### 装饰器工厂

```typescript
const IKun = (name: string) => {
    const decorator: ClassDecorator = (target) => {
        target.prototype.name = name;
        target.prototype.slogan = () => {
            console.log('鸡你太美');
        }
    }
    return decorator

}

@IKun('小黑子')
class Person {

}

const person = new Person() as any;
console.log(person.name); // 小黑子
person.slogan(); // 鸡你太美
```

#### 方法装饰器

*方法装饰器*声明在一个方法的声明之前（紧靠着方法声明）。 它会被应用到方法的 *属性描述符*上，可以用来监视，修改或者替换方法定义。 方法装饰器不能用在声明文件( `.d.ts`)，重载或者任何外部上下文（比如`declare`的类）中。

方法装饰器表达式会在运行时当作函数被调用，传入下列3个参数：

1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
2. 成员的名字。
3. 成员的*属性描述符*。

如果方法装饰器返回一个值，它会被用作方法的*属性描述符*。

```typescript
const logResult = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
  const fn = descriptor.value
  descriptor.value = function(...rest) {
    // 使用新的方法来替换原有方法，输出 方法名称 + 输入的参数 实现日志的增强功能
    const result = fn.apply(this, rest)
    console.log(propertyKey + '：' + result)
    return result
  }
}

class Person {
    name: string = ''
    age: number = 0

    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }

    @logResult
    getName() {
      return this.name
    }

    @logResult
    getAge() {
      return this.age
    }
}

const p = new Person('张三', 18)
p.getName() // getName：张三
p.getAge() // getAge：18

```

```typescript
import "reflect-metadata";

const formatMetadataKey = Symbol("format");

function format(formatString: string) {
    return Reflect.metadata(formatMetadataKey, formatString);
}

function getFormat(target: any, propertyKey: string) {
    return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}

class Greeter {
    @format("Hello, %s")
    greeting: string;

    constructor(message: string) {
        this.greeting = message;
    }

    greet() {
        let formatString = getFormat(this, "greeting");
        return formatString.replace("%s", this.greeting);
    }
}

console.log(new Greeter("world").greet()); // "Hello, world"
```



### 参数装饰器

参数装饰器用于装饰函数参数，参数装饰器接收3个参数：

- `target`: 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
- `propertyKey`: 方法名。
- `paramIndex`: 参数所在位置的索引。

```typescript
const paramDecorator = (target: any, propertyKey: string, paramIndex: number) => {
    console.log(target, propertyKey, paramIndex)
}

class Person {
    name: string = ''
    age: number = 0

    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }

    setName(@paramDecorator name: string) {
      this.name = name
    }
}

const p = new Person('张三', 18) // Person、setName、0
p.setName('李四')
```

