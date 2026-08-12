import type { App } from 'vue'
import { Button, Icon } from '@z-ui/components'

export { Button, Icon }
export * from '@z-ui/components'

const components = [Button, Icon]

export const version = '0.1.0'

export function install(app: App) {
  components.forEach((component) => app.use(component))
}

export default {
  version,
  install,
}
