import _InputNumber from './src/input-number.vue'
import { withInstall } from '@z-ui/utils/with-install'

const InputNumber = withInstall(_InputNumber)

export default InputNumber
export { InputNumber }
export * from './src/input-number'

declare module 'vue' {
  export interface GlobalComponents {
    ZInputNumber: typeof InputNumber
  }
}

