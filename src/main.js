import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
// import ElementPlus from 'element-plus'
// app.use(ElementPlus)
import {
  ElBacktop,
  ElSpace,
  ElCard,
  ElPagination,
  ElImage,
  ElInput,
  ElButton,
  ElSelect,
  ElTable,
  ElTableColumn,
  ElForm,
  ElFormItem,

  ElInfiniteScroll,
  ElLoading,
  ElMessage,
  ElMessageBox,
  ElNotification
} from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import '@/assets/style/video.css'

const elCompontents = [
  ElBacktop,
  ElSpace,
  ElCard,
  ElPagination,
  ElImage,
  ElInput,
  ElButton,
  ElSelect,
  ElTable,
  ElTableColumn,
  ElForm,
  ElFormItem
]
const plugins = [
  ElInfiniteScroll,
  ElLoading,
  ElMessage,
  ElMessageBox,
  ElNotification
]

const app = createApp(App)

elCompontents.forEach(component => {
  app.component(component.name, component)
})
plugins.forEach(plugin => {
  app.use(plugin)
})
// if (process.env.NODE_ENV === 'development') {
//   if ('__VUE_DEVTOOLS_GLOBAL_HOOK__' in window) {
//     // 这里__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue赋值一个createApp实例
//     window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app
//   }
//   app.config.devtools = true
// }

app.use(router)
app.mount('#app')
