import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/hossamshawaqfeh2/',

  plugins: [react()],

  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
