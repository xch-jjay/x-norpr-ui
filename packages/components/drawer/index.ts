import _Drawer from './src/drawer.vue'
import { withInstall } from '@z-ui/utils/with-install'

const Drawer = withInstall(_Drawer)

export default Drawer
export { Drawer }
export * from './src/drawer'

declare module 'vue' {
  export interface GlobalComponents {
    ZDrawer: typeof Drawer
  }
}
