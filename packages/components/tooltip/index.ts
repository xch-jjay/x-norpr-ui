import _Tooltip from './src/tooltip.vue'
import { withInstall } from '@z-ui/utils/with-install'

const Tooltip = withInstall(_Tooltip)

export default Tooltip
export { Tooltip }
export * from './src/tooltip'

declare module 'vue' {
  export interface GlobalComponents {
    ZTooltip: typeof Tooltip
  }
}
