import { stat } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = fileURLToPath(new URL('..', import.meta.url))
const distDir = resolve(rootDir, 'packages/z-ui/dist')
const limits = {
  'z-ui.js': 90_000,
  'z-ui.cjs': 75_000,
  'style.css': 60_000,
}

const sizes = await Promise.all(Object.entries(limits).map(async ([fileName, limit]) => {
  const filePath = resolve(distDir, fileName)
  const { size } = await stat(filePath)

  if (size > limit) {
    throw new Error(`包体积检查失败：${fileName} 为 ${size} B，超过上限 ${limit} B`)
  }

  return { fileName, size, limit }
}))

console.log('包体积检查通过：')
for (const { fileName, size, limit } of sizes) {
  console.log(`- ${fileName}: ${size} B / ${limit} B`)
}
