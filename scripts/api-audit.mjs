import { access, readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = fileURLToPath(new URL('..', import.meta.url))
const componentsDir = resolve(rootDir, 'packages/components')
const componentIndexPath = resolve(componentsDir, 'index.ts')
const zuiIndexPath = resolve(rootDir, 'packages/z-ui/src/index.ts')

const entries = [
  ['icon', ['Icon'], ['Icon']],
  ['button', ['Button'], ['Button']],
  ['input', ['Input'], ['Input']],
  ['checkbox', ['Checkbox', 'CheckboxGroup'], ['Checkbox', 'CheckboxGroup']],
  ['radio', ['Radio', 'RadioGroup'], ['Radio', 'RadioGroup']],
  ['switch', ['Switch'], ['Switch']],
  ['input-number', ['InputNumber'], ['InputNumber']],
  ['select', ['Select', 'Option'], ['Select', 'Option']],
  ['form', ['Form', 'FormItem'], ['Form', 'FormItem']],
  ['alert', ['Alert'], ['Alert']],
  ['message', ['Message'], []],
  ['dialog', ['Dialog'], ['Dialog']],
  ['loading', ['Loading', 'LoadingService'], ['Loading']],
  ['space', ['Space'], ['Space']],
  ['divider', ['Divider'], ['Divider']],
  ['card', ['Card'], ['Card']],
  ['tag', ['Tag'], ['Tag']],
  ['badge', ['Badge'], ['Badge']],
  ['empty', ['Empty'], ['Empty']],
  ['pagination', ['Pagination'], ['Pagination']],
  ['breadcrumb', ['Breadcrumb', 'BreadcrumbItem'], ['Breadcrumb', 'BreadcrumbItem']],
  ['tabs', ['Tabs', 'TabPane'], ['Tabs', 'TabPane']],
  ['table', ['Table', 'TableColumn'], ['Table', 'TableColumn']],
  ['drawer', ['Drawer'], ['Drawer']],
  ['tooltip', ['Tooltip'], ['Tooltip']],
]

async function exists(filePath) {
  try {
    await access(filePath)
    return true
  } catch {
    return false
  }
}

const [componentIndex, zuiIndex] = await Promise.all([
  readFile(componentIndexPath, 'utf8'),
  readFile(zuiIndexPath, 'utf8'),
])
const errors = []

for (const [directory, exports, installExports] of entries) {
  const componentRoot = resolve(componentsDir, directory)
  const checks = [
    [resolve(componentRoot, 'index.ts'), '组件入口'],
    [resolve(componentRoot, `${directory}.test.ts`), '组件测试'],
    [resolve(rootDir, 'docs/component', `${directory}.md`), '组件文档'],
    [resolve(rootDir, 'packages/theme-chalk/src', `${directory}.scss`), '组件样式'],
  ]

  for (const [filePath, label] of checks) {
    if (!(await exists(filePath))) errors.push(`${directory} 缺少${label}`)
  }

  if (!(await exists(resolve(componentRoot, 'src')))) {
    errors.push(`${directory} 缺少源码目录`)
  }

  if (!componentIndex.includes(`from './${directory}'`)) {
    errors.push(`${directory} 未加入 packages/components/index.ts`)
  }

  for (const exportName of exports) {
    if (!componentIndex.includes(exportName)) errors.push(`${directory} 未从组件包导出 ${exportName}`)
    if (!zuiIndex.includes(exportName)) errors.push(`${directory} 未从 z-ui 入口导出 ${exportName}`)
  }

  for (const installName of installExports) {
    const installPattern = new RegExp(`\\b${installName}\\b`)
    if (!installPattern.test(zuiIndex.match(/const components = \[[^\]]*\]/s)?.[0] ?? '')) {
      errors.push(`${directory} 未加入默认插件注册列表：${installName}`)
    }
  }
}

if (errors.length > 0) {
  throw new Error(`API 清单审计失败：\n- ${errors.join('\n- ')}`)
}

console.log(`API 清单审计通过：${entries.length} 个公开入口，${entries.reduce((total, [, exports]) => total + exports.length, 0)} 个导出已核对`)
