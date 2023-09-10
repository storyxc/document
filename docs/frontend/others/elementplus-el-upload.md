# ElementPlus el-upload源码分析

## 背景

使用el-upload实现限制上传文件个数、超出数量后后者覆盖前者、自动上传且自行实现上传文件请求，文档写的不清不楚，试了半天都不行，还是看了源码才明白el-upload组件的整个流程。

> https://github.com/ElemeFE/element/blob/dev/packages/upload/src/index.vue
>
> https://github.com/ElemeFE/element/blob/dev/packages/upload/src/upload.vue

## 分析

- 入口：index.vue的render函数
- uploadData定义了参数结构，用于向子组件传参数，props中的几个属性就是el-upload标签的钩子

```js
// index.vue
render(h) {
    let uploadList;

    if (this.showFileList) {
      uploadList = (
        <UploadList
          disabled={this.uploadDisabled}
          listType={this.listType}
          files={this.uploadFiles}
          on-remove={this.handleRemove}
          handlePreview={this.onPreview}>
          {
            (props) => {
              if (this.$scopedSlots.file) {
                return this.$scopedSlots.file({
                  file: props.file
                });
              }
            }
          }
        </UploadList>
      );
    }

    const uploadData = {
      props: {
        type: this.type,
        drag: this.drag,
        action: this.action,
        multiple: this.multiple,
        'before-upload': this.beforeUpload,
        'with-credentials': this.withCredentials,
        headers: this.headers,
        name: this.name,
        data: this.data,
        accept: this.accept,
        fileList: this.uploadFiles,
        autoUpload: this.autoUpload,
        listType: this.listType,
        disabled: this.uploadDisabled,
        limit: this.limit,
        'on-exceed': this.onExceed,
        'on-start': this.handleStart,
        'on-progress': this.handleProgress,
        'on-success': this.handleSuccess,
        'on-error': this.handleError,
        'on-preview': this.onPreview,
        'on-remove': this.handleRemove,
        'http-request': this.httpRequest
      },
      ref: 'upload-inner'
    };

    const trigger = this.$slots.trigger || this.$slots.default;
    const uploadComponent = <upload {...uploadData}>{trigger}</upload>;

    return (
      <div>
        { this.listType === 'picture-card' ? uploadList : ''}
        {
          this.$slots.trigger
            ? [uploadComponent, this.$slots.default]
            : uploadComponent
        }
        {this.$slots.tip}
        { this.listType !== 'picture-card' ? uploadList : ''}
      </div>
    );
  }
```

- 渲染upload子组件，下面是upload组件的render函数

```js
// upload.vue
render(h) {
    let {
      handleClick,
      drag,
      name,
      handleChange,
      multiple,
      accept,
      listType,
      uploadFiles,
      disabled,
      handleKeydown
    } = this;
    const data = {
      class: {
        'el-upload': true
      },
      on: {
        click: handleClick,
        keydown: handleKeydown
      }
    };
    data.class[`el-upload--${listType}`] = true;
    return (
      <div {...data} tabindex="0" >
        {
          drag
            ? <upload-dragger disabled={disabled} on-file={uploadFiles}>{this.$slots.default}</upload-dragger>
            : this.$slots.default
        }
        <input class="el-upload__input" type="file" ref="input" name={name} on-change={handleChange} multiple={multiple} accept={accept}></input>
      </div>
    );
  }
```

- 主要关注`<input class="el-upload__input" type="file" ref="input" name={name} on-change={handleChange} multiple={multiple} accept={accept}></input>`这个jsx代码中绑定了onChange时间，调用函数是`handleChange`

- ```
  // upload.vue
  handleChange(ev) {
        const files = ev.target.files;
  
        if (!files) return;
        this.uploadFiles(files);
  }
  ```

- 可以看到handleChange直接调用了uploadFiles函数，而uploadFiles函数就是我们要追溯的内容了

```js
uploadFiles(files) {
  if (this.limit && this.fileList.length + files.length > this.limit) {
    this.onExceed && this.onExceed(files, this.fileList);
    return;
  }

  let postFiles = Array.prototype.slice.call(files);
  if (!this.multiple) { postFiles = postFiles.slice(0, 1); }

  if (postFiles.length === 0) { return; }

  postFiles.forEach(rawFile => {
    this.onStart(rawFile);
    if (this.autoUpload) this.upload(rawFile);
  });
},
upload(rawFile) {
  this.$refs.input.value = null;

  if (!this.beforeUpload) {
    return this.post(rawFile);
  }

  const before = this.beforeUpload(rawFile);
  if (before && before.then) {
    before.then(processedFile => {
      const fileType = Object.prototype.toString.call(processedFile);

      if (fileType === '[object File]' || fileType === '[object Blob]') {
        if (fileType === '[object Blob]') {
          processedFile = new File([processedFile], rawFile.name, {
            type: rawFile.type
          });
        }
        for (const p in rawFile) {
          if (rawFile.hasOwnProperty(p)) {
            processedFile[p] = rawFile[p];
          }
        }
        this.post(processedFile);
      } else {
        this.post(rawFile);
      }
    }, () => {
      this.onRemove(null, rawFile);
    });
  } else if (before !== false) {
    this.post(rawFile);
  } else {
    this.onRemove(null, rawFile);
  }
}
```

- 首先判断是否超过限制，如果没有则会遍历files调用onStart函数,onStart函数是在index.vue中定义的，做了三件事
  - 基于原始file构建新的file对象，基于当前时间增加uid，如果是图片展示模式，还会创建一个url做展示
  - 将新的file对象push进上传文件的数组uploadFiles中
  - 将处理过的uploadFiles传递给on-change钩子函数（文件状态改变，添加文件、上传成功和上传失败时都会被调用）

```js
handleStart(rawFile) {
  rawFile.uid = Date.now() + this.tempIndex++;
  let file = {
    status: 'ready',
    name: rawFile.name,
    size: rawFile.size,
    percentage: 0,
    uid: rawFile.uid,
    raw: rawFile
  };

  if (this.listType === 'picture-card' || this.listType === 'picture') {
    try {
      file.url = URL.createObjectURL(rawFile);
    } catch (err) {
      console.error('[Element Error][Upload]', err);
      return;
    }
  }

  this.uploadFiles.push(file);
  this.onChange(file, this.uploadFiles);
}
```

- onStart执行后会判断是否开启了自动上传，如果开启则会调用upload函数
  - upload中会调用判断是否定义了beforeUpload事件，如果没有直接调用post函数上传
  - 如果定义了beforeUpload则会执行该函数，并根据该方法返回的结果决定如何处理文件
    - 如果 beforeUpload 返回一个 Promise，则等待 Promise 执行完毕，并获取其返回值 processedFile。如果 processedFile 是一个 File 或 Blob 类型，则使用它来替换原始的文件并保留原始文件的属性，最后调用 post 方法上传替换后的文件；否则，仍然使用原始的文件上传。
    - 如果 beforeUpload返回 false，则直接调用 onRemove 方法移除文件。
    - 如果 beforeUpload返回其他非 false 的值，则直接上传原始文件。

```js
upload(rawFile) {
  this.$refs.input.value = null;

  if (!this.beforeUpload) {
    return this.post(rawFile);
  }

  const before = this.beforeUpload(rawFile);
  if (before && before.then) {
    before.then(processedFile => {
      const fileType = Object.prototype.toString.call(processedFile);

      if (fileType === '[object File]' || fileType === '[object Blob]') {
        if (fileType === '[object Blob]') {
          processedFile = new File([processedFile], rawFile.name, {
            type: rawFile.type
          });
        }
        for (const p in rawFile) {
          if (rawFile.hasOwnProperty(p)) {
            processedFile[p] = rawFile[p];
          }
        }
        this.post(processedFile);
      } else {
        this.post(rawFile);
      }
    }, () => {
      this.onRemove(null, rawFile);
    });
  } else if (before !== false) {
    this.post(rawFile);
  } else {
    this.onRemove(null, rawFile);
  }
}
```

- post函数中的上传方法是httpRequest(options)，我们可以使用el-upload标签的http-request替换成自己的实现

```js
post(rawFile) {
  const { uid } = rawFile;
  const options = {
    headers: this.headers,
    withCredentials: this.withCredentials,
    file: rawFile,
    data: this.data,
    filename: this.name,
    action: this.action,
    onProgress: e => {
      this.onProgress(e, rawFile);
    },
    onSuccess: res => {
      this.onSuccess(res, rawFile);
      delete this.reqs[uid];
    },
    onError: err => {
      this.onError(err, rawFile);
      delete this.reqs[uid];
    }
  };
  const req = this.httpRequest(options);
  this.reqs[uid] = req;
  if (req && req.then) {
    req.then(options.onSuccess, options.onError);
  }
},
handleClick() {
  if (!this.disabled) {
    this.$refs.input.value = null;
    this.$refs.input.click();
  }
},
handleKeydown(e) {
  if (e.target !== e.currentTarget) return;
  if (e.keyCode === 13 || e.keyCode === 32) {
    this.handleClick();
  }
}
```

## 结果

上面分析的是如果没有超过limit限制的情况，而我要实现的就是在超过限制之后依然能够自动上传。

回归到代码,uploadFiles函数在执行了onExceed钩子之后直接就return了，所以下面一直到上传的流程都需要我们自己去调用

```js
uploadFiles(files) {
  if (this.limit && this.fileList.length + files.length > this.limit) {
    this.onExceed && this.onExceed(files, this.fileList);
    return;
  }
  //...
}
```

在回顾下我的目标：限制上传文件个数为一个、超出数量后后者覆盖前者、自动上传且自行实现上传文件请求

所以：终极目标是执行完onExceed后能调用上传的函数，el-upload暴露给我们的函数是`submit()`

```js
// index.vue
submit() {
  this.uploadFiles
    .filter(file => file.status === 'ready')
    .forEach(file => {
      this.$refs['upload-inner'].upload(file.raw);
    });
}
```

可以看到这个函数是将uploadFiles中的文件都调用了一次upload，所以我们要在onExceed函数中要做的事：

1. 在函数中把原有文件清除掉，然后替换为最新的文件
2. el-upload暴露的清除文件的方法: clearFiles

```js
clearFiles() {
  this.uploadFiles = [];
}
```

3. 把最新的文件push到uploadFiles中，这里就要用到上面分析到的handleStart方法，而且这个方法中还会调用onChange钩子
4. 文件已经push到uploadFiles中，所以只需要调用submit()函数即可

## 大致代码

```vue
<template>
	<el-upload 
      action="#" 
      ref="upload" 
      v-model:file-list="fileList"
      :limit="Number(1)" 
      :on-exceed="handleExceed" 
      :http-request="handleUpload" 
      list-type="picture-card"
    	:auto-upload="true" >
  </el-upload>
</template>

<script setup lang="ts">
import type { UploadProps, UploadInstance, UploadRawFile } from 'element-plus'
const upload = ref<UploadInstance>()
/**
 * 超过限制后调用的方法
 * @param files
 */
const handleExceed: UploadProps['onExceed'] = (files) => {
   // 清除所有文件
    upload.value!.clearFiles()
    const file = files[0] as UploadRawFile
    file.uid = genFileId()
    /**
     * 调用handleStart把file push到uploadFiles中 -> handleStart会调用onChange方法
     */
    upload.value!.handleStart(file)
    upload.value!.submit()
}
</script>
```

