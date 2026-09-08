import _Loading from './src/loading.vue'
import { withInstall } from '@z-ui/utils/with-install'
import { Loading as LoadingService, createLoading } from './src/service'

const Loading = withInstall(_Loading)

export default Loading
export { Loading, LoadingService, createLoading }
export type { LoadingInstance, LoadingOptions, LoadingService as LoadingServiceType } from './src/loading'

declare module 'vue' {
  export interface GlobalComponents {
    ZLoading: typeof Loading
  }
}
