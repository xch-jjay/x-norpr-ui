import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'unplugin-dts/vite'
import { access, copyFile, readdir, readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join, resolve } from 'node:path'

const rootDir = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: resolve(rootDir, 'tsconfig.build.json'),
      outDirs: [resolve(rootDir, 'packages/z-ui/dist/types')],
      entryRoot: resolve(rootDir, 'packages/z-ui/src'),
      include: [
        'packages/components/**/*.ts',
        'packages/components/**/*.vue',
        'packages/utils/**/*.ts',
        'packages/z-ui/src/**/*.ts',
      ],
      exclude: ['**/*.test.ts'],
      insertTypesEntry: true,
      async afterBuild() {
        const typesDir = resolve(rootDir, 'packages/z-ui/dist/types')
        const publicTypes = `import type { App } from 'vue'

export * from './packages/components/index.d.ts'

export declare const version: string
export declare function install(app: App): void

declare const _default: {
  version: string
  install: typeof install
}

export default _default
`

        async function collectDeclarationFiles(directory: string): Promise<string[]> {
          const entries = await readdir(directory, { withFileTypes: true })
          const files = await Promise.all(entries.map(async (entry) => {
            const entryPath = join(directory, entry.name)
            if (entry.isDirectory()) return collectDeclarationFiles(entryPath)
            return entry.name.endsWith('.d.ts') ? [entryPath] : []
          }))
          return files.flat()
        }

        function addDeclarationExtensions(content: string) {
          return content.replace(
            /((?:from\s+|import\(\s*)['"])(\.\.?\/[^'"]+)(['"])/g,
            (match, prefix, specifier, quote) => (
              /\.(?:js|json|css|d\.ts|d\.cts|d\.mts)$/.test(specifier)
                ? match
                : `${prefix}${specifier}.d.ts${quote}`
            ),
          )
        }

        async function normalizeDeclarationImports(filePath: string, content: string) {
          const pattern = /((?:from\s+|import\(\s*)['"])(\.\.?\/[^'"]+)(['"])/g
          let result = ''
          let lastIndex = 0

          for (const match of content.matchAll(pattern)) {
            const matchIndex = match.index ?? 0
            const specifier = match[2]
            let normalizedSpecifier = specifier

            if (specifier.endsWith('.d.ts')) {
              const declarationPath = resolve(dirname(filePath), specifier)
              try {
                await access(declarationPath)
              } catch {
                const indexSpecifier = `${specifier.slice(0, -'.d.ts'.length)}/index.d.ts`
                try {
                  await access(resolve(dirname(filePath), indexSpecifier))
                  normalizedSpecifier = indexSpecifier
                } catch {
                  // Keep the original path so the normal type checker reports it.
                }
              }
            }

            result += content.slice(lastIndex, matchIndex)
            result += `${match[1]}${normalizedSpecifier}${match[3]}`
            lastIndex = matchIndex + match[0].length
          }

          return result + content.slice(lastIndex)
        }

        const declarationFiles = await collectDeclarationFiles(typesDir)
        await Promise.all(declarationFiles.map(async (filePath) => {
          const content = await readFile(filePath, 'utf8')
          const withExtensions = addDeclarationExtensions(content)
          await writeFile(filePath, await normalizeDeclarationImports(filePath, withExtensions))
        }))
        const publicTypesPath = join(typesDir, 'index.d.ts')
        const publicTypesContent = addDeclarationExtensions(publicTypes)
        await writeFile(publicTypesPath, await normalizeDeclarationImports(publicTypesPath, publicTypesContent))
        await copyFile(publicTypesPath, join(typesDir, 'index.d.cts'))
      },
    }),
  ],
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
