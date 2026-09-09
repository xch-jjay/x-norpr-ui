import _Select from './src/select.vue'
import _Option from './src/option.vue'
import { withInstall } from '@z-ui/utils/with-install'

const Select = withInstall(_Select)
const Option = withInstall(_Option)

export default Select
export { Select, Option }
export * from './src/select'

declare module 'vue' {
  export interface GlobalComponents {
    ZSelect: typeof Select
    ZOption: typeof Option
  }
}

