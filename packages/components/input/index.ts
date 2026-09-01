import _Input from './src/input.vue'
import { withInstall } from '@z-ui/utils/with-install'

const Input = withInstall(_Input)

export default Input
export * from './src/input'

declare module 'vue' {
  export interface GlobalComponents {
    ZInput: typeof Input
  }
}
