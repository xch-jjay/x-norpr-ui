import type { App } from 'vue'
import { Button, Checkbox, CheckboxGroup, Icon, Input, Radio, RadioGroup } from '@z-ui/components'
import packageJson from '../package.json'

export { Button, Checkbox, CheckboxGroup, Icon, Input, Radio, RadioGroup }
export * from '@z-ui/components'

const components = [Button, Checkbox, CheckboxGroup, Icon, Input, Radio, RadioGroup]

export const version = packageJson.version

export function install(app: App) {
  components.forEach((component) => app.use(component))
}

export default {
  version,
  install,
}
