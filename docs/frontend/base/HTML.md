# HTML



## 标签

### 排版标签

标题：h1-h6

段落：p

换行：br

水平分割线：hr

### 文本格式化标签

加粗：strong/b

下划线：ins/u

倾斜：em/i

删除线：del/s

### 媒体标签

图片：img

音频：audio [src|controls|autoplay|loop]

视频：video [src|controls|autoplay|loop]

### 链接

超链接：a

### 列表

有序列表：ol > li

无序列表：ul > li

自定义列表：dl > dt > dd

### 表格

table > tr > td

th：表头

caption：标题

结构标签：thead/tbody/tfoot

合并单元格：rowspan-跨行合并 colspan-跨列合并（不能跨结构标签合并）

### 表单

input系列：text/password/radio/checkbox/file/submit/reset/button

button

select

textarea

label

### 语义化标签

没有语义的布局标签：div/span

语义化标签：header/nav/footer/aside/section/article(显示特点和div一致，多了语义)

### 字符实体

空格：`&nbsp`



### 骨架结构标签

- `<!DOCTYPE html>`：声明网页HTML版本
- `<html lang="en"`：标识网页使用的语言，作用：搜索引擎归类+浏览器翻译， `zh-CN`/`en`
- `<meta>`：元数据标签，元数据是关于文档的数据，例如文档的作者、字符集、关键字和描述等信息，这些信息对于搜索引擎的抓取和用户的浏览很有帮助。
  - charset：指定文档的字符编码。
  - name：定义元数据的名称。
  - content：定义元数据的内容。
  - http-equiv：提供有关如何处理文档的其他信息。
  - viewport：指定当前网页的视口（viewport）尺寸和缩放比例，以便浏览器正确渲染页面。

### SEO（Search Engine Optimization）标签

- `<title>`:网页标题
- `<meta name="description">`：网页描述标签
- `<meta name="keywords"`：网页关键词

### ico图标

`<link rel="icon" href="favicon.ico">`
