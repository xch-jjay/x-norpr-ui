import type { App } from 'vue'
import { Alert, Button, Checkbox, CheckboxGroup, Form, FormItem, Icon, Input, InputNumber, Message, Option, Radio, RadioGroup, Select, Switch } from '@z-ui/components'
import packageJson from '../package.json'

export { Alert, Button, Checkbox, CheckboxGroup, Form, FormItem, Icon, Input, InputNumber, Message, Option, Radio, RadioGroup, Select, Switch }
export * from '@z-ui/components'

const components = [Alert, Button, Checkbox, CheckboxGroup, Form, FormItem, Icon, Input, InputNumber, Message, Option, Radio, RadioGroup, Select, Switch]

export const version = packageJson.version

export function install(app: App) {
  components.forEach((component) => app.use(component))
}

export default {
  version,
  install,
}
