import type { App } from 'vue'
import { Alert, Badge, Breadcrumb, BreadcrumbItem, Button, Card, Checkbox, CheckboxGroup, Dialog, Divider, Empty, Form, FormItem, Icon, Input, InputNumber, Loading, LoadingService, Message, Option, Pagination, Radio, RadioGroup, Select, Space, Switch, TabPane, Tabs, Tag } from '@z-ui/components'
import packageJson from '../package.json'

export { Alert, Badge, Breadcrumb, BreadcrumbItem, Button, Card, Checkbox, CheckboxGroup, Dialog, Divider, Empty, Form, FormItem, Icon, Input, InputNumber, Loading, LoadingService, Message, Option, Pagination, Radio, RadioGroup, Select, Space, Switch, TabPane, Tabs, Tag }
export * from '@z-ui/components'

const components = [Alert, Badge, Breadcrumb, BreadcrumbItem, Button, Card, Checkbox, CheckboxGroup, Dialog, Divider, Empty, Form, FormItem, Icon, Input, InputNumber, Loading, Message, Option, Pagination, Radio, RadioGroup, Select, Space, Switch, TabPane, Tabs, Tag]

export const version = packageJson.version

export function install(app: App) {
  components.forEach((component) => app.use(component))
}

export default {
  version,
  install,
}
