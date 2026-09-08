import _Badge from './src/badge.vue'
import { withInstall } from '@z-ui/utils/with-install'

const Badge = withInstall(_Badge)

export default Badge
export { Badge }
export * from './src/badge'

declare module 'vue' {
  export interface GlobalComponents {
    ZBadge: typeof Badge
  }
}
