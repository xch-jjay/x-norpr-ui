import _Space from './src/space.vue'
import { withInstall } from '@z-ui/utils/with-install'

const Space = withInstall(_Space)

export default Space
export { Space }
export * from './src/space'

declare module 'vue' {
  export interface GlobalComponents {
    ZSpace: typeof Space
  }
}
