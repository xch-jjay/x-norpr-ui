import packageJson from './package.json'
import { describe, expect, it } from 'vitest'
import { version } from './src'

describe('z-ui package metadata', () => {
  it('exports the version declared by package.json', () => {
    expect(version).toBe(packageJson.version)
  })
})
