import _Breadcrumb from './src/breadcrumb.vue'
import _BreadcrumbItem from './src/breadcrumb-item.vue'
import { withInstall } from '@z-ui/utils/with-install'

const Breadcrumb = withInstall(_Breadcrumb)
const BreadcrumbItem = withInstall(_BreadcrumbItem)

export default Breadcrumb
export { Breadcrumb, BreadcrumbItem }
export * from './src/breadcrumb'

declare module 'vue' {
  export interface GlobalComponents {
    ZBreadcrumb: typeof Breadcrumb
    ZBreadcrumbItem: typeof BreadcrumbItem
  }
}
