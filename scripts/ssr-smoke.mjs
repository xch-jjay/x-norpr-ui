import { access, readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const rootDir = fileURLToPath(new URL('..', import.meta.url))
const packageJsonPath = resolve(rootDir, 'packages/z-ui/package.json')
const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf8'))
const entryPath = resolve(rootDir, 'packages/z-ui', packageJson.module)

await access(entryPath)

const api = await import(pathToFileURL(entryPath).href)

for (const exportName of ['Button', 'Input', 'Dialog', 'Table', 'install', 'version']) {
  if (!(exportName in api)) {
    throw new Error(`SSR 导入检查失败：缺少公开导出 ${exportName}`)
  }
}

if (typeof api.install !== 'function' || typeof api.version !== 'string') {
  throw new Error('SSR 导入检查失败：入口导出类型不正确')
}

console.log(`SSR 导入检查通过：${packageJson.name}@${packageJson.version}`)
