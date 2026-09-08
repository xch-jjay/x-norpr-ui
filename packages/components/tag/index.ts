import _Tag from './src/tag.vue'
import { withInstall } from '@z-ui/utils/with-install'

const Tag = withInstall(_Tag)

export default Tag
export { Tag }
export * from './src/tag'

declare module 'vue' {
  export interface GlobalComponents {
    ZTag: typeof Tag
  }
}
