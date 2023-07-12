import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@configs': '/src/configs',
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@services': '/src/services',
      '@typings': '/src/typings',
      '@utils': '/src/utils',
      '@redux': '/src/redux',
      '@assets': '/src/assets'
    }
  }
})
