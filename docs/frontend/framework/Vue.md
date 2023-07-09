# Vue

> Vue (读音 /vjuː/，类似于 **view**) 是一套用于构建用户界面的**渐进式框架**。

## 特性

- 数据驱动视图：在数据变化时页面会重新渲染
- 双向数据绑定：DOM元素中的数据和Vue实例中的data保持一致，无论谁被改变，另一方都会更新为相同的数据

### MVVM

MVVM是Vue实现数据驱动视图和双向数据绑定的原理。MVVM指的是Model、View和ViewModel。

- Model：当前页面渲染时依赖的数据源
- View：当前页面渲染的DOM结构
- ViewModel：Vue的实例，MVVM的核心

ViewModel把Model和View连接在一起，同时监听DOM变化和数据源的变化。

## 起步

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<div id="app">
    {{ msg }}
</div>
<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
<script>
    const vm = new Vue({
        el: '#app',
        data: {
            msg: 'hello world'
        }
    })
</script>
</body>
</html>
```

## 指令和过滤器

### 内容渲染

- v-test
  - `<p v-test=username></p>`：把username值渲染到p标签中
  - `<p v-test=gender>性别</p>`:把gender值渲染到p标签中，原有的值会被覆盖
- {{ }}
  - 插值表达式(Mustache),专门用来解决v-text会覆盖默认文本内容的问题，不能用在属性上
  - `<p>性别 {{ gender }}</p>`
  - 支持javascript表达式
- v-html
  - 把包含HTML标签的字符串渲染为页面的HTML元素

### 属性绑定

- v-bind：单向绑定
  - `v-bind:属性名`
  - 简写为`:属性名`
  - 支持javascript表达式

### 事件绑定

#### v-on

- `v-on:事件名="函数(param)"`：v-on:click="add"

- 简写为：`@`,例如`@click="add"`

- 函数定义在vue实例的methods中

- ```js
  methods: {
    add: function(param) {
    	console.log(1)
  	}
  }
  ---
  ES6写法： 
  methods: {
    add(param) {
    	console.log(1)
  	}
  }  
  ```

- 不传参数默认参数列表有事件对象e,如果传参可以用`$event`传递事件对象

- 事件修饰符

  - `@click.prevent=show()`：绑定事件并阻止默认行为
  - stop：阻止事件冒泡
  - capture：以捕获模式触发当前事件处理函数
  - once：绑定事件只触发一次
  - self：只有在even.target时当前元素自身时触发事件处理函数

- 按键修饰符

  - 判断详细的案件
    - @keyup.enter=submit
    - esc

### 双向绑定

- v-model：不操作DOM情况下，快速获取表单数据
- 修饰符
  - .nubmer：自动将输入转为数值
  - .trim：自动过滤输入的首尾空白字符
  - .lazy：在change时更新，input时不更新

### 条件渲染

控制DOM的显示与隐藏

- v-if
  - 通过添加、移除元素实现
  - 如果刚进入页面不需要被展示，而且后期可能也不需要展示此时v-if性能更好
  - 配套指令：v-else、v-else-if
- v-show
  - display控制元素显示、隐藏
  - 如果频繁切换显示状态用v-show更好

### 列表渲染

#### v-for渲染数组

基于一个数组来循环渲染一个列表结构。v-for指令需要用item in items形式的特殊语法

```html
<li v-for="item in items">姓名是： {{ item.name }}</li>

<li v-for="(item,index) in items">姓名是： {{ item.name }}</li>
```

- items：待循环数组
- item：被循环的每一项
- index：索引号，从0开始

建议用到v-for指令，要绑定一个`:key`属性，而且尽量把id作为key

- key的值要是字符串/数字类型
- index作为key没有任何意义，因为index没有唯一性（和数据没有绑定关系）
- 指定key可以提升性能、防止列表状态紊乱

#### v-for渲染对象

完整语法

```html
<li v-for="(value, key, index) in myObject"> 
{{ value }} {{ kye }} {{ index }}
</li>
```

### 过滤器（vue3已移除）

常用于文本格式化，过滤器可以用在两个地方：插值表达式和v-bind属性绑定，过滤器本质是函数，被定义在vue实例的filters节点下

- `<p> {{ message | capitalize }}</p>`：调用captitalize过滤器，对message进行格式化
- `<div v-bind:id="rawId | formatId"></div`：调用formatId过滤器，对rawId进行格式化

```js
filters: {
  capitalize(val) {
    return val.charAt(0).toUppercase() + var.slice(1)
  }
}
```

#### 私有过滤器和全局过滤器

- 私有过滤器：定义在vue实例的filters节点下
- 全局过滤器：使用Vue.filter(filter, (str) => {return xxx})定义

#### 连续调用&传参

```js
{{ msg | filterA | filterB(arg1, arg2)}}
```

## 侦听器

watch侦听器语序开发者监视数据的变化，从而针对数据的变化做特定的操作。

### 侦听器格式

watch定义在vue实例的watch节点下

- 方法格式的侦听器
  
  - ```js
    watch: {
      username(newVal, oldVal) {
        console.log(newVal, oldVal)
      }
    }
    ```
  
  - 缺点
  
    - 无法在刚进入页面时自动触发
    - 如果侦听的是一个对象，对象属性发生变化不会触发侦听器
  
- 对象格式的侦听器
  - ```js
    watch: {
      username: {
        handler(newVal, oldVal) {
        console.log(newVal, oldVal)
      },
      immediate: true,
      deep: true,
      'info.age'(newVal) {
        console.log(newVal)
      }
    }
    ```

  - 可以通过**immediate**选项让侦听器立即触发

  - 可以通过`deep`选项开启深度监听，可以监听到对象的任何一个属性变化

  - 如果要侦听的是对象的子属性变化，则必须包裹一层单引号

## 计算属性

通过运算得到的属性值，可以被模版结构或methods方法使用。

计算属性放在vue实例的`computed`节点中

```js
var vm = new Vue({
  el: '#app',
  data: {
    r: 0, g: 0, b: 0
  },
  computed: {
    //计算属性rgb
    rgb() { return `rgb(${this.r}, ${this.g}, ${this.b})`}
    //计算属性 allChecked
    allChecked: {
    	get() {
      	return this.goodsList.every(item => item.goods_state)
    	},
    	set(newVal) {
      	this.goodsList.forEach(item => item.goods_state = newVal)
    	}
		}
  },
  methods: {
    show() { console.log(this.rgb) }
  }
})
```

```js
computed: {
  allChecked: {
    get() {
      return this.goodsList.every(item => item.goods_state)
    },
    set(newVal) {
      this.goodsList.forEach(item => item.goods_state = newVal)
    }
  }
}
```



## axios

> axios一个专注于网络请求的库

基本语法：

```js
axios({
  method: '请求类型',
  // URL中的query参数
  params: {
    
  },
  // body参数
  data: {
  
}
  url: '请求的URL地址',
}).then((result) => {
  //.then用来指定成功的回调，result是请求成功后的结果
})
```

结合async和await使用axios

```js
document.querySelector('#btn').addEventListener('click', async function(){
  // 如果调用方法返回值是Promise实例，则可以在前面添加await，await只能用在被async“修饰”的方法中
  // 解构赋值的时候使用：进行重命名
  const { data: res } = await axios({
    method: 'POST',
    url: 'xxx',
    data: {
      name: '111'
    }
  })
  console.log(res.data)
})
```

- axios.get()
- axios.post()
- axios.delete()
- axios.put()

### vue工程中使用

```js
// main.js

import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

Vue.config.productionTip = false

// 缺点：不利于api接口复用
// 组件实例中直接用`this.$http`使用
// axios.defaults.baseURL = '请求根路径'
// Vue.prototype.$http = axios

new Vue({
  reder: h => h(App)
}).$mount(#app)
```

## vue-cli

> 单页面应用程序（Single Page Application）简称SPA，指的是一个Web网站中只有唯一的一个HTML页面，所有的功能与交互都在这唯一的一个页面内完成。

vue-cli是Vue.js开发的标准工具。简化了基于webpack创建工程化的Vue项目的过程。

### 安装

`npm install -g @vue/cli`

### 创建项目

`vue create projectName`

## vue组件

### 组件组成

组件后缀名是`.vue`，vue组件包括三个组成部分

#### template

```vue
<!--template是一个虚拟标签，只起到包裹作用，不会被渲染成任何实质性HTML-->
<template>
	<div>
    <!--template中只能有一个根元素-->
  </div>
</template>
```

#### script

```vue
<script>
export default {
  name: 'xxx',// <keep-alive>实现组件缓存功能，调整工具中看到的标签名称
  // data必须是一个函数
  data() {
    return {
      xx: xx
    }
  },
  methods: {
    fun() {
      // 组件中的this代表当前组件的实例对象
      console.log(this)
      this.xx = yy
    }
  },
  watch: {},
  computed: {}
  ...
}
</script>
```

#### style

```vue
<style lang="less">/* 默认lang="css" */

</style>
```

### 组件之间的父子关系

组件被封装好后，彼此之间是相互独立的，不存在父子关系。

在**使用组件**时，根据彼此的嵌套关系，形成了父子关系，兄弟关系。

### 组件使用步骤

#### 注册私有子组件

1. import语法导入需要的组件

```js
import A from '@/components/A.vue
```

2. 使用components节点注册组件

```js
export default {
	components: {
		A //注册名称主要用于 以标签形式把注册的组件 渲染和使用到页面结构之中
  }
}
```

3. 以标签形式使用注册的组件

```vue
<div class="box">
  <A></A>
</div>
```

#### 注册全局组件

```js
// main.js

import Test from '@/components/Test.vue'

Vue.component('MyTest', Test)
```

### 组件的props

props是组件的**自定义属性**，在封装通用组件的时候，合理的使用props可以极大提高组件的复用性。

- props中的数据，可以直接在模板结构中使用
- props是只读的

```vue
<script>
export default {
  props: {
    initCount: {
      default: 0,//默认值
      type: Number, //规定属性的值类型，如果传递的值不符合，则会报错
      required: true //必填项
    }
  },
  data() {
    return {
      count: this.initCount
    }
  }
}
</script>
```

### 组件之间样式冲突

默认情况下，写在组件中的样式会全局生效，原因是：

1. 单页面应用程序中所有的DOM结构都是基于唯一的index.hmtl页面进行呈现的
2. 每个组件中的样式都会影响整个index.html的DOM元素

#### 解决方案

- 使用自定义属性:DOM元素增加自定义属性`data-v-xxx`，使用属性选择器设置样式`div[data-v-xxx]`

- **style标签增加`scoped`属性**,会自动为每个标签生成`data-v`属性

### deep样式穿透

`/deep/ 选择器`

当使用第三方组件库，如果有修改第三方组件库的默认样式需求，需要用到deep

### 组件的生命周期

生命周期是指一个组件从创建->运行->销毁的整个阶段。

#### 分类

- 组件创建阶段
  - beforeCreate：组件的props/data/methods尚未被创建，都处于不可用状态
  - created：组件的props/data/methods被创建，都处于可用状态，但是组件的模板结构尚未生成
  - beforeMount：将要把内存中编译好的HTML结果渲染到浏览器中，此时浏览器中还没有当前组件的DOM结构
  - mounted：已经把内存中编译好的HTML结果渲染到浏览器中，此时浏览器已经包含当前组件DOM结构
- 组件运行阶段
  - beforeUpdate：将要根据变化过后、最新的数据重新渲染组件的模版结构
  - updated：已经根据最新的数据，完成了组件DOM结构的重新渲染
- 组件销毁阶段
  - beforeDestroy：将要销毁此组件但还未销毁，组件还处于正常工作状态
  - destroyed：组件已被销毁，此组件在浏览器中对应的DOM结构已被完全移除

#### 组件数据共享

#### 父组件向子组件共享数据需要使用自定义属性

#### 子向父传值需要使用自定义事件

```js
//子组件
methods: {
  add() {
    this.count += 1
	  this.$emit('numchange', this.count)
  }
}
```

```js
//父组件
<Son @numchange="getNewCount"></Son>

---

methods: {
	getNewCount(val) {
		this.countFromSon = val
	}
}
```

#### 兄弟组件之间数据共享需要使用EventBus

```js
//A组件
import bus from './eventBus.js'

methods: {
	sendMsg() {
		bus.$emit('share', this.msg)
	}
}

//eventBus.js
import Vue from 'vue'

export default new Vue()

//兄弟组件B
import bus from './eventBus.js'

created() {
	bus.$on('share', val => {
		this.msgFromSibling = val
	})
}
```

### ref引用

ref用来辅助开发者在不依赖jQuery的情况下，获取DOM元素或组件的引用

每个vue组件的实例上，都包含一个`$refs`对象，里面存储着对应的DOM元素或组件的引用，默认情况下组件的`$refs`指向一个空对象

#### 使用ref引用页面上的DOM元素

```vue
<div ref="myDiv"></div>

// methods中访问
this.$refs.myDiv
```

#### 使用ref引用组件

```vue
<Son ref="compSon"></Son>

// methods中访问
this.$refs.compSon.方法
this.$refs.compSon.属性
```

#### $nextTick(callback)

组件的$nextTick(callback)方法，会把callback函数会推迟到下一个DOM更新之后执行。



## 动态组件

动态组件指的是动态切换组件的显示与隐藏。

### **component标签**的`is`属性

```vue
<template>
	<component :is="componentName"></component>
</template>
<script>
import Left from '@/components/Left.vue'  
import Right from '@/components/Right.vue'
export default {
  data() {
    return {
      componentName: "Left"
    }
  },
  components: {
    Left,
    Right
  }
}
</script>
```

### keep-alive

`keep-alive`标签能把内部的组件进行缓存，而不是销毁组件

```vue
<template>
	<keep-alive>
    <component :is="componentName"></component>
  </keep-alive>
</template>
```

#### 对应的生命周期函数

- 被缓存：deactivated生命周期函数
- 被激活：activated生命周期函数，当组件第一次被创建也会执行

#### include/exclude属性

- include可以指定哪些组件被缓存，只有名称匹配的组件会被缓存，多个用`,`分隔

- exclude相反
- 两个属性不能同时使用

```vue
<template>
	<keep-alive include="Left">
    <component :is="componentName"></component>
  </keep-alive>
</template>
```

## 插槽

插槽（Slot）是vue为组件的封装者提供的能力。允许开发者在封装组件时，把不确定的、希望由用户指定的部份定义为插槽。

```vue
<!--Left.vue-->
<template>
	<slot name="default">
    这里可以指定默认内容，会被覆盖
  </slot>
</template>
```

渲染Left组件时

```vue
<template>
	<Left>
    <!--此区域必须在组件中声明插槽才会渲染-->
    <!--默认情况下 会被填充到名为default的插槽内-->
    <p>
      自定义内容
  </p>
  </Left>
</template>

---
<template>
	<Left>
		<template v-slot:default> 
      <p>
      自定义内容
  		</p>
		</template>
  </Left>
</template>
---
<template>
	<Left>
		<template #default> 
      <p>
      自定义内容
  		</p>
		</template>
  </Left>
</template>
```

### slot

- 声明一个插槽区域

- 每个插槽都要有一个name属性，如果省略，则使用默认名称default

- 作用域插槽：封装组件时，为预留的slot提供属性对应的值

  - ```html
    定义：
    <slot name="content" msg="hello world"></slot>
    -- 
    使用：
    <template #content="scope">
    	<p>
        {{ scope.msg }}
      </p>
    </template>
    ```

  - 作用域插槽解构赋值

    - ```html
      <slot name="content" msg="hello world" :user="user"></slot>
      
      ---
      
      <template #content="{msg, user}">
      	<p>
          {{msg}}
        </p>
        <p>
          {{user}}
        </p>
      </template>
      ```

    - 

### v-slot

- 只能用在template标签上
- 使用具名插槽简写形式`#default`

## 自定义指令

### 私有自定义指令

在每个vue组件中，可以在directives节点下声明私有自定义指令

#### bind函数

- 当指令第一次被绑定到元素上的时候，会立刻触发bind函数，且只会触发一次

- 形参el:绑定了此指令的原生的DOM对象
- 形参binding：传递过来的参数是binding中的value

```js
directives: {
  color: {
    bind(el, binding) {
      el.style.color = binding.value
    }
  }
}
```

#### update函数

- 第一次不会触发

- 在DOM更新的时候就会触发update函数

```js
directives: {
  color: {
    update(el, binding) {
      el.style.color = binding.value
    }
  }
}
```

#### 函数简写

如果bind和update函数的逻辑完全相同，则对象格式的自定义指令可以简写为

```js
directives: {
  color(el, binding) {
    el.style.color = binding.value
  }
}
```

### 全局自定义指令

使用`Vue.directive`声明

```js
Vue.directive('color', function(el, binding){
  el.style.color = binding.value
})
---
Vue.directive('color', {
  binding(el, binding) {
      el.style.color = binding.value
  },
  update(el, binding) {
      el.style.color = binding.value
  }
})
```

## 路由（Router）

### 模式

- hash模式

- history模式

  - publicPath/baseUrl

    ```js
    //vue.config.js
    module.exports = {
      publicPath: process.env.NODE_ENV === 'production'
        ? '/production-sub-path/'
        : '/'
    }
    ```

  -  createWebHistory(`base?`)

### 工作方式

1. 用户点击路由链接
2. 导致了URL地址栏中Hash值发生变化
3. 前端路由监听到了Hash地址变化
4. 前端路由把当前Hash地址对应的组件渲染到浏览器中

### vue-router

#### 安装

`npm i vue-router@version`

#### 创建路由模块

在src目录下，新建`router/index.js`模块

```js
import Vue from 'vue'
import VueRouter from 'vue-router'

// 调用Vue.use()函数，把VueRouter安装为Vue的插件
Vue.use(VueRouter)

const router = new VueRouter()

export default router
```

#### 导入并挂载路由模块

main.js中挂载路由模块

```js
//main.js
import ...
//import router from '@/router/index.js'
//简写
import router from '@/router'

new Vue({
  render: h => h(App),
  //router: router
  //属性名 属性值一致 可以简写
  router
})
```

#### 声明路由链接和占位符

- 路由链接：`router-link`
- 占位符`router-view`，组件在这里展示

```vue
<template>
	<div class="container">
    <a href="#/home">首页</a>
    <a href="#/movie">电影</a>
    <a href="#/about">关于</a>
    <hr/>
    可以用router-link标签代替普通a标签，可以省略#
    <router-link to="#/home">首页</router-link>
    <router-link to="#/movie">电影</router-link>
    <router-link to="#/about">关于</router-link>
    
    <router-view></router-view>
  </div>
</template>
```

修改`router/index.js`

```js
import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/Home.vue'
import Movie from '@/components/Movie.vue'
import About from '@/components/About.vue'

// 调用Vue.use()函数，把VueRouter安装为Vue的插件
Vue.use(VueRouter)

const router = new VueRouter({
  // routes是一个数组：定义hash地址和组件之间的对应关系
  routes: [
    // 路由规则
    { path: '/', redirect: '/home' }, // 重定向
    { path: '/home', component: Home },
    { path: '/movie', component: Movie },
    { path: '/about', component: About }
  ]
})

export default router
```

### 嵌套路由

通过路由实现组件的嵌套展示，叫做嵌套路由

- 模板内容中又有子级路由链接
- 点击子级路由链接显示子级模板内容

#### 通过children属性声明子路由规则

```js
import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/Home.vue'
import Movie from '@/components/Movie.vue'
import About from '@/components/About.vue'
import Tab1 from '@/components/tabs/Tab1.vue'
import Tab2 from '@/components/tabs/Tab2.vue'

// 调用Vue.use()函数，把VueRouter安装为Vue的插件
Vue.use(VueRouter)

const router = new VueRouter({
  // routes是一个数组：定义hash地址和组件之间的对应关系
  routes: [
    // 路由规则
    { path: '/', redirect: '/home' }, // 重定向
    { path: '/home', component: Home },
    { path: '/movie', component: Movie },
    { 
      path: '/about',
      component: About,
      children: [
        { path: 'tab1', component: Tab1 },
        { path: 'tab2', component: Tab2 }
      ]
    }
  ]
})

export default router
```

```js
const routes = [
  {
    path: '/',
    component: Home,
    meta: {
      keepAlive: true,
      isRecord: true,
      top: 0
    }
  },
  {
    path: '/user',
    component: User
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return {
      x: 0,
      y: to.meta.top || 0
    }
  }
})
```



### 动态路由匹配

把Hash地址中可变的部分定义为参数项，可以提高路由规则的复用性。

使用`:`来定义路由的参数项

```js
{ path: '/movie/:id', component: Movie, props: true}
```

- 组件中可以通过`$route.params.id`获取路径参数（Path Variable）

> `$route.params.query`获取查询参数
>
> `$route.params.fullPath`：包含路径和参数
>
> `$route.params.path`：只有路径没有参数

- 可以在路由规则中添加`props`传餐，在组件中定义props直接获取

### 导航

#### 声明式导航

- a标签
- route-link标签

#### 编程式导航

- location.href跳转
- vue-router的编程式导航api
  - `this.$router.push('hash地址')`：跳转到hash地址，增加一条历史记录
  - `this.$router.replace('hash地址')`：跳转到hash地址，并替换掉当前的历史记录
  - `this.$router.go(数值n)`：可以在浏览历史中前进或后退
    - `this.$router.back()`
    - `this.$router.forward()`

### 导航守卫

可以控制路由的访问权限

#### 全局前置守卫

每次发生路由导航跳转时，都会触发前置守卫，在前置守卫中，可以对每个路由进行访问权限控制。

```js
const router = new VueRouter({})
// 每次路由跳转都会触发回调函数                              
router.beforeEach((to, from, next) => {
  // to:将要访问的路由信息对象
  // from:将要离开的路由信息对象
  // next:一个函数，调用next()表示放行，允许这次路由导航
})
```

##### next的三种调用方式

- next()：直接放行
- next('/path')：强制跳转到指定页面
- next(false)：不允许跳转，强制保留在当前页面

## Vue3.0

### 创建项目

### vite

使用：`npm init vite-app projectName`

### create-vue

`create-vue`创建的项目也是基于vite的构建设置

使用：`npm create vue@3` 或者`npm init vue@latest`

crete-vue同样支持vue2：`npm create vue@2`  / `npm init vue@2`



> Vite和Webpack的区别（内容来自ChatGPT）：
>
> Vite和Webpack是两种常用的前端构建工具。
>
> 1. 底层实现不同
>
> Vite使用ES modules（ESM）作为模块系统管理，而Webpack使用CommonJS来管理模块。这意味着，在使用Webpack打包项目时，所有模块都将被打包到一个或多个bundle.js文件中，而Vite将原始文件作为模块提取和处理，并将其以一种非常高效的方式提供给浏览器。
>
> 2. 开发环境下的性能
>
> Vite在开发环境下启动非常快，不需要等待代码打包时间，并且在修改代码时，也可以直接进行热更新，非常适合在开发阶段使用。而Webpack在开发模式下代码打包速度较慢，启动速度也相对较慢，修改代码后也需要较长的时间来重新打包。
>
> 3. 生产环境下的性能
>
> 在生产环境下，Webpack可以通过代码分割（Code Splitting）和 Tree Shaking来优化代码，减小打包后的文件大小。而Vite在生产环境下目前还不支持代码分割。因此，如果项目需要大量使用Code Splitting和Tree Shaking等技术，使用Webpack可能会更加合适。
>
> 4. 生态和可定制性
>
> Webpack具有强大的社区和众多的插件和Loader来处理各种文件和场景，可以根据不同的需求进行高度的定制。而Vite的生态和可定制性方面要弱于Webpack，它的插件数量还比较少。
>
> 总的来说，Vite是一种专门为现代浏览器设计的前端构建工具，它在开发环境下性能卓越，但在生产环境方面还有一些局限。而Webpack则是一种更加稳健和灵活的构建工具，它可以用于各种复杂的场景和需求，并且有着更强大的生态和定制能力，但需要进行更多的配置。选择使用哪种工具，应该根据具体项目需求和使用场景来进行选择。

> create-vue和vue-cli的区别：
>
> - vue-cli基于webpack，而create-vue基于vite

### 构建一个vue实例

```js
import { createApp } from 'vue'

createApp({
  data() {
    return {
      count: 0
    }
  }
}).mount('#app')
```

### feature

- vue3的模板中可以有多个根节点

- api类型不同，vue2使用选项式api，vue3使用组合式api

- 定义变量和方法方式不同：vue2定义在data和methods节点中，vue3使用setup()方法，此方法在组件初始化构造的时候触发

  - 从vue引入reactive

  - 使用`reactive()`方法声明数据为响应式数据`const state = reactive({ count: 0 })`

  - ```<script setup>```：顶层的导入和变量声明可在同一组件的模板中直接使用。可以理解为模板中的表达式和 `script setup`中的代码处在同一个作用域中。

  - 使用`ref()`定义响应式变量,`ref()` 将传入参数的值包装为一个带 `.value` 属性的 ref 对象：

    ```js
    import { ref } from 'vue'
    
    const count = ref(0)
    ```

    和响应式对象的属性类似，ref 的 `.value` 属性也是响应式的。同时，当值为对象类型时，会用 `reactive()` 自动转换它的 `.value`。

    一个包含对象类型值的 ref 可以响应式地替换整个对象：

    js

    ```
    const objectRef = ref({ count: 0 })
    
    // 这是响应式的替换
    objectRef.value = { count: 1 }
    ```

    

  > 响应式
  >
  > https://cn.vuejs.org/guide/essentials/reactivity-fundamentals.html

- 类和样式绑定

- 生命周期变化

### 响应式对象

- ref()

  - 标注类型

    - ```typescript
      import type { Ref } from 'vue'
      
      const count: Ref<number> = ref(0)
      ```

  - **当 ref 在模板中作为顶层属性被访问时，它们会被自动“解包”，所以不需要使用 `.value`**。

  - 当一个 `ref` 被嵌套在一个深层响应式对象中，作为属性被访问或更改时，它会自动解包
