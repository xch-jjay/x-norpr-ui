import type { App } from 'vue'
import { Icon } from '@z-ui/components'

export { Icon }
export * from '@z-ui/components'

const components = [Icon]

export const version = '0.1.0'

export function install(app: App) {
  components.forEach((component) => app.use(component))
}

export default {
  version,
  install,
}
