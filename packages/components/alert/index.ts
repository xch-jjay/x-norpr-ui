import _Alert from './src/alert.vue'
import { withInstall } from '@z-ui/utils/with-install'

const Alert = withInstall(_Alert)

export default Alert
export { Alert }
export * from './src/alert'

declare module 'vue' {
  export interface GlobalComponents {
    ZAlert: typeof Alert
  }
}

