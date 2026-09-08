import _Switch from './src/switch.vue'
import { withInstall } from '@z-ui/utils/with-install'

const Switch = withInstall(_Switch)

export default Switch
export { Switch }
export * from './src/switch'

declare module 'vue' {
  export interface GlobalComponents {
    ZSwitch: typeof Switch
  }
}

