import type { App } from 'vue'
import { Button, Icon } from '@z-ui/components'
import packageJson from '../package.json'

export { Button, Icon }
export * from '@z-ui/components'

const components = [Button, Icon]

export const version = packageJson.version

export function install(app: App) {
  components.forEach((component) => app.use(component))
}

export default {
  version,
  install,
}
