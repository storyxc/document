# Vue gists

## setup和动态组件结合使用

```vue
<template>
  <div class="demo">
    <button
       v-for="(_, tab) in tabs" 
       :key="tab"
       :class="['tab-button', { active: currentTab === tab }]"
       @click="currentTab = tab"
     >
      {{ tab }}
    </button>
	  <component :is="tabs[currentTab]" class="tab"></component>
  </div>
</template>

<script setup>
import Home from './Home.vue'
import Posts from './Posts.vue'
import Archive from './Archive.vue'
import { ref } from 'vue'
 
const currentTab = ref('Home')

const tabs = {
  Home,
  Posts,
  Archive
}
</script>

<style>
.demo {
  font-family: sans-serif;
  border: 1px solid #eee;
  border-radius: 2px;
  padding: 20px 30px;
  margin-top: 1em;
  margin-bottom: 40px;
  user-select: none;
  overflow-x: auto;
}

.tab-button {
  padding: 6px 10px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 1px solid #ccc;
  cursor: pointer;
  background: #f0f0f0;
  margin-bottom: -1px;
  margin-right: -1px;
}
.tab-button:hover {
  background: #e0e0e0;
}
.tab-button.active {
  background: #e0e0e0;
}
.tab {
  border: 1px solid #ccc;
  padding: 10px;
}
</style>
```

## 卡片点击弹窗

```vue
<template>
    <div class="wrapper">
        <div class="container">
            <div class="cards">
                <div v-for="(card, index) in cards"
                     :key="index"
                     :class="['card', { darkMode: card.dark }]"
                >
                    <div class="app-icon">
                        <img :src="card.icon">
                    </div>
                    <div class="app-name">{{ card.name }}</div>
                    <div class="mask" @click="showDialog(index)">
                        <svg class="svg-inline--fa fa-arrow-alt-to-right fa-w-14" aria-hidden="true" data-prefix="fas"
                             data-icon="arrow-alt-to-right" role="img" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 448 512" data-fa-i2svg="">
                            <path fill="currentColor"
                                  d="M448 88v336c0 13.3-10.7 24-24 24h-24c-13.3 0-24-10.7-24-24V88c0-13.3 10.7-24 24-24h24c13.3 0 24 10.7 24 24zM24 320h136v87.7c0 17.8 21.5 26.7 34.1 14.1l152.2-152.2c7.5-7.5 7.5-19.8 0-27.3L194.1 90.1c-12.6-12.6-34.1-3.7-34.1 14.1V192H24c-13.3 0-24 10.7-24 24v80c0 13.3 10.7 24 24 24z"></path>
                        </svg>
                    </div>
                    <div class="desc"></div>
                </div>

                <div
                        v-if="showOverlay"
                        class="overlay" @click="closeDialog"
                >
                </div>
                <div
                        v-if="showDialogIndex !== null"
                        class="dialog"
                >
                    <Component :is="cards[showDialogIndex].component"/>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineComponent } from 'vue'
import type { Ref } from 'vue'
import RandomGeneratorView from '@/views/RandomGeneratorView.vue'

// 是否显示遮罩层
const showOverlay = ref(false)
// 展示弹框的卡片索引
const showDialogIndex: Ref<number | null> = ref(null)

// 定义卡片数据结构
interface Card {
    name: string,
    icon: string,
    dark: boolean,
    component: ReturnType<typeof defineComponent>
}

const cards: Card[] = [
    {
        name: 'Random',
        icon: '/img/icon/Random.svg',
        dark: false,
        component: RandomGeneratorView
    }
]

/**
 * 卡片点击事件，弹出对应的组件和遮罩层
 * @param index
 */
const showDialog = (index: number) => {
    showDialogIndex.value = index
    showOverlay.value = true
}

/**
 * 遮罩层点击事件，关闭对应的组件和遮罩层
 */
const closeDialog = () => {
    showDialogIndex.value = null
    showOverlay.value = false
}

</script>

<style scoped lang="less">
.wrapper {
  width: 75%;
  margin: 25px auto 0;
  min-height: 500px;
  border-radius: 10px;
  background-color: var(--color-background);

  .container {

    width: 100%;
    padding: 15px;
    border: 1px solid #E5E5E5;
    border-radius: 10px;
    box-shadow: 3px 5px 15px 2px rgba(0, 0, 0, 0.2);

    .cards {
      position: relative;
      display: flex;
      justify-content: space-around;
      flex-flow: row wrap;

      .card {
        position: relative;
        display: flex;
        align-items: center;
        align-self: flex-start;
        flex: 0 0 200px;
        overflow: hidden;
        width: 200px;
        height: 80px;
        margin: 10px;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid rgba(76, 76, 76, 0.4);
        background-image: var(--color-background-image-card);
        background-color: #FAFBFC;
        color: #18191C;
        line-height: 80px;

        &.darkMode {
          background-color: #161B1F;
          color: #FFF;
        }

        &::after {
          content: '';
          display: inline-block;
          position: absolute;
          top: 0;
          right: -40px;
          height: 78px;
          width: 78px;
          background-color: rgba(255, 255, 255, 0.1);
          // border: 1px solid #18191C;
          box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.2);
          border-radius: 50%;


        }

        .app-icon {
          justify-content: center;
          flex: 0 0 60px;
          width: 60px;
          height: 60px;

          img {
            max-width: 100%;
            max-height: 100%;

          }
        }

        .app-name {
          width: 100%;
        }

        .mask {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          color: inherit;
          text-align: right;
          padding-right: 5px;
          z-index: 1;

          &:hover {
            cursor: pointer;
          }

          .svg-inline--fa {
            height: 1.5em;
            vertical-align: -0.25em;
            color: inherit;
          }
        }
      }

      .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 100;
      }

      .dialog {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50%;
        height: 50%;
        background-color: #FFF;
        border-radius: 10px;
        z-index: 101;
      }
    }

  }
}
</style>
```

## 表单&复制剪贴板&模态框

```vue
<template>
    <div class="container">
        <h2>随机字符串生成器</h2>
        <div class="form">
            <div class="form-item">
                <label for="length">生成的字符串长度：</label>
                <select v-model="generateLength">
                    <option v-for="n in 15" :key="n" :value="n"> {{ n }}</option>
                    <option value="16" selected>16</option>
                    <option value="32">32</option>
                    <option value="64">64</option>
                    <option value="128">128</option>
                </select>
            </div>
            <div class="form-item">
                <label for="includeNumber">是否包含数字：</label>
                <input v-model="includeNumber" type="checkbox" checked id="includeNumber" name="includeNumber"
                       value="includeNumber">
            </div>
            <div class="form-item">
                <label for="includeLowercase">是否包含小写字母：</label>
                <input v-model="includeLowercase" type="checkbox" checked id="includeLowercase" name="includeLowercase"
                       value="includeLowercase">
            </div>
            <div class="form-item">
                <label for="includeUppercase">是否包含大写字母：</label>
                <input v-model="includeUppercase" type="checkbox" checked id="includeUppercase" name="includeUppercase"
                       value="includeUppercase">
            </div>
            <div class="form-item">
                <label for="includeSpecial">是否包含特殊字符：（!@#$%^&*_+-=）</label>
                <input v-model="includeSpecial" type="checkbox" checked id="includeSpecial" name="includeSpecial"
                       value="includeSpecial">
            </div>
            <div class="form-button">
                <button @click="generate">生成</button>
            </div>

            <div class="form-button">
                <button @click="copy">复制到剪贴板</button>
            </div>
        </div>
        <div class="result">
            <input v-model="result" type="text" id="result" name="result">
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'

const generateLength: Ref<number> = ref(16)
const includeNumber: Ref<boolean> = ref(true)
const includeLowercase: Ref<boolean> = ref(true)
const includeUppercase: Ref<boolean> = ref(true)
const includeSpecial: Ref<boolean> = ref(true)
const result: Ref<string> = ref('')

/**
 * 基于表单上的选择情况生成随机字符串
 */
function generate() {

    // 生成随机字符串的字符集
    let charSet = ''
    if (includeNumber.value) {
        charSet += '0123456789'
    }
    if (includeLowercase.value) {
        charSet += 'abcdefghijklmnopqrstuvwxyz'
    }
    if (includeUppercase.value) {
        charSet += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    }
    if (includeSpecial.value) {
        charSet += '!@#$%^&*_+-='
    }

    // 生成随机字符串
    let randomString = ''
    for (let i = 0; i < generateLength.value; i++) {
        const randomPoz = Math.floor(Math.random() * charSet.length)
        randomString += charSet.substring(randomPoz, randomPoz + 1)
    }

    result.value = randomString
}

/**
 * 将生成的随机字符串复制到剪贴板
 */
function copy() {
    //deprecated
    const input = document.getElementById('result') as HTMLInputElement
    input.select()
    document.execCommand('copy')

    //navigator.clipboard.writeText(result.value)

    /**
     * 弹出一个复制成功的模态框 0.2s后消失
     */
    function popModal() {
        const modal = document.createElement('div')
        modal.style.position = 'fixed'
        modal.style.top = '0'
        modal.style.left = '0'
        modal.style.width = '100%'
        modal.style.height = '100%'
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
        modal.style.zIndex = '9999'
        modal.style.display = 'flex'
        modal.style.justifyContent = 'center'
        modal.style.alignItems = 'center'

        const modalContent = document.createElement('div')
        modalContent.style.width = '200px'
        modalContent.style.height = '100px'
        modalContent.style.backgroundColor = '#FFF'
        modalContent.style.borderRadius = '5px'
        modalContent.style.display = 'flex'
        modalContent.style.justifyContent = 'center'
        modalContent.style.alignItems = 'center'
        modalContent.style.fontSize = '16px'
        modalContent.style.fontWeight = '500'
        modalContent.innerText = '复制成功'

        modal.appendChild(modalContent)
        document.body.appendChild(modal)

        setTimeout(() => {
            document.body.removeChild(modal)
        }, 200)
    }

    popModal()
}


</script>

<style scoped lang="less">
.container {
  width: 100%;
  height: 100%;

  h2 {
    text-align: center;
    margin: 0 auto 40px;
  }

  .form {
    margin: 0 auto;

    .form-item {
      width: 80%;
      margin: 20px auto;
      display: flex;
      justify-content: space-between;
    }

    .form-button {
      width: 80%;
      margin: 10px auto;
      display: flex;
      justify-content: center;

      button {
        width: 100%;
        height: 30px;
        border-radius: 1px;
        background-color: #419545;
        color: #FFF;
        font-size: 16px;
        cursor: pointer;
      }
    }
  }


  .result {
    margin: 30px auto 0;
    text-align: center;

    #result {
      width: 80%;
      height: 50px;
      border: 1px solid #CCC;
      border-radius: 1px;
      padding: 0 10px;
      font-size: 16px;
      font-weight: 500;
      text-align: center;
    }
  }
}
</style>
```

## 时间戳日期互转

```vue
<template>
    <div class="container">
        <h2>时间戳转换器</h2>

        <div class="form">
            <div class="form-item">
                <label for="currentTimestamp">当前时间戳：</label>
                <input v-model="currentTimestamp" type="text" id="currentTimestamp" name="currentTimestamp">
                <div class="form-button">
                    <button @click="startCurrent">开始</button>
                    <button @click="pauseCurrent(timer)">暂停</button>
                </div>
            </div>
            <div class="form-item">
                <label for="todoTimestamp">转换时间戳：</label>
                <input v-model="todoTimestamp" type="text" id="todoTimestamp" name="todoTimestamp">
                <div class="form-button">
                    <button @click="convert">转换>></button>
                </div>
                <div class="convertResult">
                    <input v-model="convertedResult" type="text" id="convertResult">
                </div>
            </div>
            <div class="form-item">
                <label for="todoDateTime">反转时间戳：</label>
                <input v-model="todoDateTime" type="text" id="todoDateTime" name="todoDateTime">
                <div class="form-button">
                    <button @click="reverseConvert">转换>></button>
                </div>
                <div class="reverseConvertResult">
                    <input v-model="reverseConvertResult" type="text" id="reverseConvertResult">
                </div>
                <select v-model="convertType" name="convertTypeSelector" id="convertTypeSelector">
                    <option value="0" selected>毫秒</option>
                    <option value="1">秒</option>
                </select>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import { onMounted, ref } from "vue";

const currentTimestamp: Ref<string> = ref("");
const todoTimestamp: Ref<string> = ref("");
const todoDateTime: Ref<string> = ref("");
const convertedResult: Ref<string> = ref("");
const reverseConvertResult: Ref<string> = ref("");
const convertType: Ref<string> = ref("0");

let timer: any = null;

onMounted(() => {
    startCurrent();
});

const startCurrent = () => {
    if (timer) return;
    currentTimestamp.value = Math.floor(Date.now() / 1000).toString();
    timer = setInterval(() => {
        //获取秒级时间戳
        currentTimestamp.value = Math.floor(Date.now() / 1000).toString();
    }, 1000);
};

const pauseCurrent = (timer: any) => {
    if (timer) clearInterval(timer);
};

const convert = () => {
    let date;
    if (todoTimestamp.value.length === 10) {
        //秒级时间戳
        date = new Date(parseInt(todoTimestamp.value) * 1000);

    } else if (todoTimestamp.value.length === 13) {
        date = new Date(parseInt(todoTimestamp.value));
    } else {
        alert("时间戳格式不正确");
        return;
    }
    const Y = date.getFullYear() + "-";
    const M =
        (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) + "-";
    const D = date.getDate() + " ";
    const h = (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
    const m = (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + ":";
    const s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    convertedResult.value = Y + M + D + h + m + s;
};

const reverseConvert = () => {
    const timestamp = Date.parse(todoDateTime.value);
    if (convertType.value === "0") {
        //毫秒级时间戳
        reverseConvertResult.value = timestamp.toString();
    } else if (convertType.value === "1") {
        //秒级时间戳
        reverseConvertResult.value = (timestamp / 1000).toString();
    }
};


</script>

<style scoped lang="less">
.container {
  width: 100%;
  height: 100%;

  h2 {
    text-align: center;
    margin: 0 auto 40px;
  }

  .form {
    margin: 0 auto;

    .form-item {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      margin: 20px auto;


      input {
        width: 120px;
        height: 2.8em;
        border: 1px solid #CCC;
        text-indent: 0.5em;
        outline: none;

        &#convertResult {
          width: 140px;
        }
      }

      button {
        width: 80px;
        height: 2.8em;
        border-radius: 5px;
        background-color: #4775D8;
        color: #FFF;
        margin: 0 5px 0;
        font-size: 16px;
        cursor: pointer;
        outline: none;
      }

      select {
        width: 50px;
        height: 2.8em;
        margin-left: 5px;
        border: 1px solid #CCC;
      }
    }
  }
}
</style>
```

## 图片预览&键盘/鼠标事件

```vue
<template>
    <div class="container">
        <div class="wrapper">
            <div class="cards">
                <div class="card" v-for="(item,index) in result.data.records" :key="item.id" @click="preview(index)">
                    <div class="info">
                        <h3>{{ item.copyright }}</h3>
                        <div class="date">{{ item.syncDate }}</div>
                    </div>
                    <img :src="item.completeUrl" :alt="item.title" :title="item.title"
                         style="transform: scale(1) rotate(0deg) translate(0px, 0px); max-height: 100%; max-width: 100%;">
                    <a class="mask"></a>
                </div>
            </div>
            <div class="pagination">
                <el-pagination
                        small
                        layout="prev, pager, next"
                        :total="result.data.total"
                        :current-page="result.data.current"
                        @current-change="handleCurrentChange"
                />
            </div>
            <div class="img-preview-wrapper" v-if="showPreview">

                <div class="img-preview-mask"></div>
                <span @click="exitPreview" class="el-image-viewer__btn el-image-viewer__close"><i class="el-icon"><svg
                        viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor"
                                                                                         d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"></path></svg></i></span>
                <span @click="handlePrevClick" class="el-image-viewer__btn el-image-viewer__prev"><i class="el-icon"><svg
                        viewBox="0 0 1024 1024"
                        xmlns="http://www.w3.org/2000/svg"><path
                        fill="currentColor"
                        d="M609.408 149.376 277.76 489.6a32 32 0 0 0 0 44.672l331.648 340.352a29.12 29.12 0 0 0 41.728 0 30.592 30.592 0 0 0 0-42.752L339.264 511.936l311.872-319.872a30.592 30.592 0 0 0 0-42.688 29.12 29.12 0 0 0-41.728 0z"></path></svg></i></span>
                <span @click="handleNextClick" class="el-image-viewer__btn el-image-viewer__next"><i class="el-icon"><svg
                        viewBox="0 0 1024 1024"
                        xmlns="http://www.w3.org/2000/svg"><path
                        fill="currentColor"
                        d="M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"></path></svg></i></span>
                <div class="el-image-viewer__btn el-image-viewer__actions">

                    <div class="el-image-viewer__actions__inner">
                        <i @click="imageScale" class="el-icon">
                            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                                <path fill="currentColor"
                                      d="m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704zM352 448h256a32 32 0 0 1 0 64H352a32 32 0 0 1 0-64z"></path>
                            </svg>
                        </i>
                        <i @click="imageZoom" class="el-icon">
                            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                                <path fill="currentColor"
                                      d="m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704zm-32-384v-96a32 32 0 0 1 64 0v96h96a32 32 0 0 1 0 64h-96v96a32 32 0 0 1-64 0v-96h-96a32 32 0 0 1 0-64h96z"></path>
                            </svg>
                        </i>
                        <i class="el-image-viewer__actions__divider"></i>
                        <i @click="imageReset" class="el-icon">
                            <svg v-if="isReset" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                                <path fill="currentColor"
                                      d="m160 96.064 192 .192a32 32 0 0 1 0 64l-192-.192V352a32 32 0 0 1-64 0V96h64v.064zm0 831.872V928H96V672a32 32 0 1 1 64 0v191.936l192-.192a32 32 0 1 1 0 64l-192 .192zM864 96.064V96h64v256a32 32 0 1 1-64 0V160.064l-192 .192a32 32 0 1 1 0-64l192-.192zm0 831.872-192-.192a32 32 0 0 1 0-64l192 .192V672a32 32 0 1 1 64 0v256h-64v-.064z"></path>
                            </svg>
                            <svg v-else viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                                <path fill="currentColor"
                                      d="M813.176 180.706a60.235 60.235 0 0 1 60.236 60.235v481.883a60.235 60.235 0 0 1-60.236 60.235H210.824a60.235 60.235 0 0 1-60.236-60.235V240.94a60.235 60.235 0 0 1 60.236-60.235h602.352zm0-60.235H210.824A120.47 120.47 0 0 0 90.353 240.94v481.883a120.47 120.47 0 0 0 120.47 120.47h602.353a120.47 120.47 0 0 0 120.471-120.47V240.94a120.47 120.47 0 0 0-120.47-120.47zm-120.47 180.705a30.118 30.118 0 0 0-30.118 30.118v301.177a30.118 30.118 0 0 0 60.236 0V331.294a30.118 30.118 0 0 0-30.118-30.118zm-361.412 0a30.118 30.118 0 0 0-30.118 30.118v301.177a30.118 30.118 0 1 0 60.236 0V331.294a30.118 30.118 0 0 0-30.118-30.118zM512 361.412a30.118 30.118 0 0 0-30.118 30.117v30.118a30.118 30.118 0 0 0 60.236 0V391.53A30.118 30.118 0 0 0 512 361.412zM512 512a30.118 30.118 0 0 0-30.118 30.118v30.117a30.118 30.118 0 0 0 60.236 0v-30.117A30.118 30.118 0 0 0 512 512z"></path>
                            </svg>
                        </i>
                        <i class="el-image-viewer__actions__divider"></i>
                        <i @click="imageContrarotate" class="el-icon">
                            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                                <path fill="currentColor"
                                      d="M289.088 296.704h92.992a32 32 0 0 1 0 64H232.96a32 32 0 0 1-32-32V179.712a32 32 0 0 1 64 0v50.56a384 384 0 0 1 643.84 282.88 384 384 0 0 1-383.936 384 384 384 0 0 1-384-384h64a320 320 0 1 0 640 0 320 320 0 0 0-555.712-216.448z"></path>
                            </svg>
                        </i>
                        <i @click="imageClockwiseRotate" class="el-icon">
                            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                                <path fill="currentColor"
                                      d="M784.512 230.272v-50.56a32 32 0 1 1 64 0v149.056a32 32 0 0 1-32 32H667.52a32 32 0 1 1 0-64h92.992A320 320 0 1 0 524.8 833.152a320 320 0 0 0 320-320h64a384 384 0 0 1-384 384 384 384 0 0 1-384-384 384 384 0 0 1 643.712-282.88z"></path>
                            </svg>
                        </i>
                    </div>
                </div>
                <div class="el-image-viewer__canvas">
                    <img ref="previewImage" class="el-image-viewer__img" :src="currentPreview" alt="">
                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, Ref } from 'vue'
import { Wallpaper, QueryParam, getWallpaperList } from '@/api/wallpaper';
import { PageData } from '@/api/page';

const queryParam = reactive<QueryParam>({
  pageNo: 1,
  pageSize: 12
})

const result = reactive<PageData<Wallpaper>>({
  code: 0,
  msg: '',
  data: {
    records: [],
    total: 0,
    size: 0,
    current: 0,
    pages: 0
  }
})

const showPreview = ref(false)
const isReset: Ref<boolean> = ref(false)

const currentIndex: Ref<number | null> = ref(null)
const currentPreview = ref('')
const previewImage: Ref<HTMLImageElement | null> = ref(null)
const currentRotate = ref(0)
const currentScale = ref(1)
const controlDown = ref(false)

const getList = async (queryParam: QueryParam): Promise<void> => {
  const res = await getWallpaperList<PageData<Wallpaper>>(queryParam)
  if (res.code === 200) {
    result.data = res.data
  }
}

onMounted(() => {
  getList(queryParam)

  // 注册事件

  //当预览模式时，按下esc键退出预览
  document.addEventListener('keydown', (e) => {
    if (showPreview.value && e.key === 'Escape') {
      exitPreview()
    }
  })
  //当预览模式时，按下左右键切换图片
  document.addEventListener('keydown', (e) => {
    if (showPreview.value && e.key === 'ArrowLeft') {
      handlePrevClick()
    }
  })
  document.addEventListener('keydown', (e) => {
    if (showPreview.value && e.key === 'ArrowRight') {
      handleNextClick()
    }
  })
  //当预览模式时，按下ctrl+鼠标滚轮控制图片放大缩小，松开ctrl不再控制
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Control') {
      controlDown.value = true
    }
  })
  document.addEventListener('keyup', (e) => {
    if (e.key === 'Control') {
      controlDown.value = false
    }
  })
  document.addEventListener('wheel', (e) => {
    if (showPreview.value && controlDown.value) {
      if (e.deltaY > 0) {
        imageZoom()
      } else {
        imageScale()
      }
    }
  })

})

const handleCurrentChange = (val: number): void => {
  console.log("currentChange", val)
  queryParam.pageNo = val
  getList(queryParam)
}

const preview = (index: number): void => {
  currentIndex.value = index
  currentPreview.value = result.data.records[index].completeUrl
  showPreview.value = true
}

const handlePrevClick = (): void => {
  if (currentIndex.value === 0) {
    return
  } else {
    currentIndex.value = currentIndex.value! - 1
  }
  currentPreview.value = result.data.records[currentIndex.value].completeUrl
}

const handleNextClick = (): void => {
  if (currentIndex.value === result.data.records.length - 1) {
    return
  } else {
    currentIndex.value = currentIndex.value! + 1
  }
  currentPreview.value = result.data.records[currentIndex.value].completeUrl
}

const exitPreview = (): void => {
  showPreview.value = false
}

const imageScale = () => {
  const img: HTMLImageElement | null = previewImage.value
  if (!img) return
  currentScale.value = currentScale.value * 0.8 < 0.2 ? 0.2 : currentScale.value * 0.8
  img.style.transform = `scale(${ currentScale.value })`
}

const imageZoom = () => {
  const img: HTMLImageElement | null = previewImage.value
  if (!img) return
  currentScale.value = currentScale.value * 1.2 > 8 ? 8 : currentScale.value * 1.2
  img.style.transform = `scale(${ currentScale.value })`
}

const imageReset = () => {
  const img: HTMLImageElement | null = previewImage.value
  if (!img) return
  currentScale.value = 1
  currentRotate.value = 0
  img.style.transform = `scale(${ currentScale.value }) rotate(${ currentRotate.value }deg)`
  isReset.value = !isReset.value
}

const imageContrarotate = () => {
  const img: HTMLImageElement | null = previewImage.value
  if (!img) return
  currentRotate.value = currentRotate.value - 90
  img.style.transform = `scale(${ currentScale.value }) rotate(${ currentRotate.value }deg)`
}

const imageClockwiseRotate = () => {
  const img: HTMLImageElement | null = previewImage.value
  if (!img) return
  currentRotate.value = currentRotate.value + 90
  img.style.transform = `scale(${ currentScale.value }) rotate(${ currentRotate.value }deg)`
}
</script>

<style scoped lang="less">
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;

  .wrapper {
    width: 100%;
    padding: 30px 10px;
    margin: 30px auto 50px;

    .cards {
      display: flex;
      flex-flow: row wrap;
      justify-content: flex-start;
      border-radius: 10px;
      box-shadow: 3px 5px 15px 2px rgba(0, 0, 0, 0.2);
      margin: 10px auto 10px;
      padding: 10px;


      .card {
        position: relative;
        width: calc(100% / 3 - 10px);
        margin: 5px;
        border-radius: 10px;
        transition: all .3s ease-in-out;

        &:hover {
          transform: scale(1.01);

          .info {
            opacity: 1;
          }

          .mask {
            opacity: 1;
          }
        }


        img {
          border-radius: 10px;
        }

        .info {
          position: absolute;
          display: flex;
          flex-flow: column wrap;
          align-items: flex-start;
          top: 3px;
          left: 5px;
          opacity: 0;
          width: 100%;
          color: #FFF;
          z-index: 1;
          transition: all .3s ease-in-out;

          h3 {
            font-size: 12px;
            letter-spacing: 1px;
            font-weight: 400;
            color: #FFF;
            padding: 2px;
            font-family: "PingFang SC", "Helvetica Neue", "Microsoft YaHei", sans-serif;
          }

          .date {
            color: #F5F4F4;
            font-size: 10px;
          }
        }

        a {
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;
          width: 100%;
          height: 100%;
          filter: blur(30px);
          background-image: linear-gradient(180deg, rgba(0, 0, 0, .4), transparent 40%, transparent 60%, rgba(0, 0, 0, .6));
          z-index: 1;
          transition: all .3s ease-in-out;

        }
      }
    }


    .pagination {
      display: flex;
      justify-content: center;
      margin-top: 30px;
    }

    .img-preview-wrapper {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;

      .img-preview-mask {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        opacity: .5;
        background: #000;
        z-index: 5;
      }

      .el-image-viewer__btn {
        z-index: 7;
      }

      .el-image-viewer__canvas {
        position: static;
        width: 100%;
        height: 100%;


        img {
          z-index: 6;
          overflow-clip-margin: content-box;
          overflow: clip;
        }
      }
    }
  }
}
</style>
```

## v-click-outside
```js

const vClickOutside = {
  beforeMount(el: HTMLElement, binding: DirectiveBinding) {
    const handler = (e: MouseEvent) => {
      if (!el.contains(e.target as Node)) {
        binding.value();
      }
    };
    (el as any).__vueClickOutside__ = handler;
    document.addEventListener('click', handler);
  },
  unmounted(el: HTMLElement) {
    document.removeEventListener('click', (el as any).__vueClickOutside__);
    delete (el as any).__vueClickOutside__;
  },
};
```