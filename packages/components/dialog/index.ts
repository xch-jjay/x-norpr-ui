import _Dialog from './src/dialog.vue'
import { withInstall } from '@z-ui/utils/with-install'

const Dialog = withInstall(_Dialog)

export default Dialog
export { Dialog }
export * from './src/dialog'

declare module 'vue' {
  export interface GlobalComponents {
    ZDialog: typeof Dialog
  }
}
