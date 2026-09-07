import { execFileSync } from 'node:child_process'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const tempDir = mkdtempSync(join(tmpdir(), 'z-ui-consumer-'))
const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm'

function run(command, args, options = {}) {
  execFileSync(command, args, {
    cwd: tempDir,
    stdio: 'inherit',
    shell: process.platform === 'win32' && command.toLowerCase().endsWith('.cmd'),
    ...options,
  })
}

try {
  const packageDir = join(rootDir, 'packages/z-ui')
  const packResult = execFileSync(npmCommand, [
    'pack',
    '--json',
    '--pack-destination',
    tempDir,
  ], {
    cwd: packageDir,
    encoding: 'utf8',
    shell: process.platform === 'win32',
  })
  const tarballName = JSON.parse(packResult)[0].filename
  const tarballPath = join(tempDir, tarballName)

  writeFileSync(join(tempDir, 'package.json'), JSON.stringify({
    name: 'z-ui-consumer-smoke',
    private: true,
    type: 'module',
  }, null, 2))

  run(npmCommand, [
    'install',
    '--ignore-scripts',
    '--no-package-lock',
    '--registry=https://registry.npmjs.org/',
    tarballPath,
    'vue@^3.4.0',
    'typescript@^5.5.3',
  ])

  writeFileSync(join(tempDir, 'consumer.mjs'), `
import ZUI, { Button, Input, version } from '@xch-jjay/z-ui'

if (!ZUI.install || !Button || !Input || typeof version !== 'string') {
  throw new Error('ESM 导入结果不完整')
}
`)

  writeFileSync(join(tempDir, 'consumer.cjs'), `
const ZUI = require('@xch-jjay/z-ui')

if (!ZUI.install || !ZUI.Button || !ZUI.Input || typeof ZUI.version !== 'string') {
  throw new Error('CJS 导入结果不完整')
}
`)

  writeFileSync(join(tempDir, 'consumer.ts'), `
import { Button, Input, version } from '@xch-jjay/z-ui'

const componentVersion: string = version
const buttonComponent = Button
const inputComponent = Input

void componentVersion
void buttonComponent
void inputComponent
`)

  writeFileSync(join(tempDir, 'consumer.cts'), `
import ZUI = require('@xch-jjay/z-ui')

const componentVersion: string = ZUI.version
const buttonComponent = ZUI.Button
const inputComponent = ZUI.Input

void componentVersion
void buttonComponent
void inputComponent
`)

  run(process.execPath, [join(tempDir, 'consumer.mjs')])
  run(process.execPath, [join(tempDir, 'consumer.cjs')])

  const tscBin = join(tempDir, 'node_modules/typescript/bin/tsc')

  run(process.execPath, [tscBin,
    '--noEmit',
    '--strict',
    '--skipLibCheck',
    '--target',
    'ES2020',
    '--module',
    'Node16',
    '--moduleResolution',
    'Node16',
    'consumer.ts',
    'consumer.cts',
  ])

  console.log('消费者 smoke test 通过')
} finally {
  rmSync(tempDir, { recursive: true, force: true })
}
