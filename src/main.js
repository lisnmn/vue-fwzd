import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from './App.vue'
import router from './router'
import { useAppStore } from './store'
import axiosPlugin, { axios } from './plugins/axios'

const app = createApp(App)
const pinia = createPinia()

const base = import.meta.env.PROD ? 'http://114.55.107.5:11455' : 'http://localhost:11455'
axios.defaults.baseURL = base
app.config.globalProperties.baseURL = base

app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.use(axiosPlugin)

// 全局注册所有 Element Plus 图标，模板里可直接用 <el-icon><Search/></el-icon>
// 或 prefix-icon="Search" / icon="Edit" 这类字符串名引用
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

router.beforeEach((to, from, next) => {
  const store = useAppStore()
  const getFlag = localStorage.getItem('Flag')

  if (getFlag === 'isLogin') {
    store.isLogin = true
    next()
  } else {
    if (to.meta.isLogin) {
      next({
        path: '/login',
      })
    } else {
      next()
    }
  }
})

router.afterEach(() => {
  window.scroll(0, 0)
})

app.mount('#app')
