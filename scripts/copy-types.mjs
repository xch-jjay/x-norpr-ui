import { mkdir, copyFile } from 'node:fs/promises'

await mkdir('packages/z-ui/dist/types', { recursive: true })
await copyFile('packages/z-ui/types/index.d.ts', 'packages/z-ui/dist/types/index.d.ts')
