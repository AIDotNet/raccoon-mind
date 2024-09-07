import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve:{
    alias: {
      '@': resolve(__dirname, './src'),
    },
    extensions:['.js','.jsx','.ts','.tsx']
  },
  plugins: [react()],
  server:{
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path
      }
    }
  }
})
