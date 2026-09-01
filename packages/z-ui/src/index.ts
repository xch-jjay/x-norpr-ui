import type { App } from 'vue'
import { Button, Icon, Input } from '@z-ui/components'
import packageJson from '../package.json'

export { Button, Icon, Input }
export * from '@z-ui/components'

const components = [Button, Icon, Input]

export const version = packageJson.version

export function install(app: App) {
  components.forEach((component) => app.use(component))
}

export default {
  version,
  install,
}
