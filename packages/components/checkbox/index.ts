import _Checkbox from './src/checkbox.vue'
import _CheckboxGroup from './src/checkbox-group.vue'
import { withInstall } from '@z-ui/utils/with-install'

const Checkbox = withInstall(_Checkbox)
const CheckboxGroup = withInstall(_CheckboxGroup)

export default Checkbox
export { Checkbox, CheckboxGroup }
export * from './src/checkbox'
export * from './src/checkbox-group'

declare module 'vue' {
  export interface GlobalComponents {
    ZCheckbox: typeof Checkbox
    ZCheckboxGroup: typeof CheckboxGroup
  }
}

