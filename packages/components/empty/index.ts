import _Empty from './src/empty.vue'
import { withInstall } from '@z-ui/utils/with-install'

const Empty = withInstall(_Empty)

export default Empty
export { Empty }
export * from './src/empty'

declare module 'vue' {
  export interface GlobalComponents {
    ZEmpty: typeof Empty
  }
}
