'use strict'

import axios from 'axios'

// Full config:  https://github.com/axios/axios#request-config
let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
}

const _axios = axios.create(config)

_axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response
  },
  function (error) {
    // Do something with response error
    if (error.response) {
      switch (error.response.status) {
        case 401:
      }
    }
    return Promise.reject(error)
  }
)

// Vue 3 插件：暴露到组件实例（模板可用 this.axios / this.$axios，
// 模板表达式可直接写 axios.defaults.baseURL），并保留 window.axios
// 以兼容 <script> 中裸 axios.xxx 的旧用法。
const plugin = {
  install(app) {
    app.config.globalProperties.axios = _axios
    app.config.globalProperties.$axios = _axios
    window.axios = _axios
  },
}

export default plugin
export { _axios as axios }
