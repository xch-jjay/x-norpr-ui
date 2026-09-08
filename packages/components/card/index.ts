import _Card from './src/card.vue'
import { withInstall } from '@z-ui/utils/with-install'

const Card = withInstall(_Card)

export default Card
export { Card }
export * from './src/card'

declare module 'vue' {
  export interface GlobalComponents {
    ZCard: typeof Card
  }
}
