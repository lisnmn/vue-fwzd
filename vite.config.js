import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/vue-fwzd/' : '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: 'vue-fwzd',
    assetsDir: 'static',
    sourcemap: false,
  },
  server: {
    host: '0.0.0.0',
    port: 11454,
    // 注意：原 vue.config.js 配了 proxy '/' 指向后端，但 axios baseURL 用的是
    // 绝对地址 http://localhost:11455，请求是跨域直连后端、并不走 dev proxy。
    // Vite 下若代理 '/' 会拦截开发服务器自身的模块请求导致白屏，故不再配置。
  },
}))
