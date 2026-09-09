import _Form from './src/form.vue'
import _FormItem from './src/form-item.vue'
import { withInstall } from '@z-ui/utils/with-install'

const Form = withInstall(_Form)
const FormItem = withInstall(_FormItem)

export default Form
export { Form, FormItem }
export * from './src/form'

declare module 'vue' {
  export interface GlobalComponents {
    ZForm: typeof Form
    ZFormItem: typeof FormItem
  }
}

