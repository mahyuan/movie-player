import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  logLevel: 'info',
  server: {
    // https: true,
    host: '0.0.0.0',
    port: 3399,
    hrm: true,
    cors: true,
    proxy: {
      '/api': {
        target: 'https://mediachain.info',
        changeOrigin: true,
        rewrite: path => path
      }
    }
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src')
    },
    extensions: ['.js', '.vue', '.json'] // default: : ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  },
  // css: {
  //   postcss: {

  //   },
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: '$injectedColor: orange;'
  //     }

  //   }
  // },
  plugins: [
    vue()
  ]
  // build: {

  // }
})
