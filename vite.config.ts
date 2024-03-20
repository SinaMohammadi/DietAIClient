import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api/': {
        target: 'https://dietserver.mehdimohammadi.info/',
        secure: false,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api/')
      },
      '/socket.io/': {
        target: 'https://dietserver.mehdimohammadi.info/',
        changeOrigin: true,
        ws: true
      }
    },
    cors: false
  },
  plugins: [vue()],
  resolve: {
    alias: { 
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
