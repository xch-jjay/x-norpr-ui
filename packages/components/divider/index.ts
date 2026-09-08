import _Divider from './src/divider.vue'
import { withInstall } from '@z-ui/utils/with-install'

const Divider = withInstall(_Divider)

export default Divider
export { Divider }
export * from './src/divider'

declare module 'vue' {
  export interface GlobalComponents {
    ZDivider: typeof Divider
  }
}
