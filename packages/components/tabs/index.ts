import _Tabs from './src/tabs.vue'
import _TabPane from './src/tab-pane.vue'
import { withInstall } from '@z-ui/utils/with-install'

const Tabs = withInstall(_Tabs)
const TabPane = withInstall(_TabPane)

export default Tabs
export { Tabs, TabPane }
export * from './src/tabs'

declare module 'vue' {
  export interface GlobalComponents {
    ZTabs: typeof Tabs
    ZTabPane: typeof TabPane
  }
}
