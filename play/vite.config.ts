import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'

const rootDir = fileURLToPath(new URL('..', import.meta.url))

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@z-ui/components': resolve(rootDir, 'packages/components'),
      '@z-ui/theme-chalk': resolve(rootDir, 'packages/theme-chalk'),
      '@z-ui/utils': resolve(rootDir, 'packages/utils'),
    },
  },
})
