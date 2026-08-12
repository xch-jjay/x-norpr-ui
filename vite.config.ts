import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'

const rootDir = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@z-ui/components': resolve(rootDir, 'packages/components'),
      '@z-ui/utils': resolve(rootDir, 'packages/utils'),
      '@z-ui/theme-chalk': resolve(rootDir, 'packages/theme-chalk'),
    },
  },
  build: {
    outDir: 'packages/z-ui/dist',
    lib: {
      entry: 'packages/z-ui/src/index.ts',
      name: 'ZUI',
      fileName: (format) => `z-ui${format === 'es' ? '.js' : '.cjs'}`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
        },
      },
    },
    emptyOutDir: false,
  },
})
