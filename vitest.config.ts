import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['packages/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json-summary'],
      reportsDirectory: './coverage',
      include: [
        'packages/components/**/src/**/*.{ts,vue}',
        'packages/utils/**/*.ts',
        'packages/z-ui/src/**/*.ts',
      ],
      exclude: ['**/*.test.ts'],
      thresholds: {
        lines: 85,
        functions: 75,
        branches: 65,
        statements: 85,
      },
    },
  },
})
