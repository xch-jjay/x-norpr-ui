import _Pagination from './src/pagination.vue'
import { withInstall } from '@z-ui/utils/with-install'

const Pagination = withInstall(_Pagination)

export default Pagination
export { Pagination }
export * from './src/pagination'

declare module 'vue' {
  export interface GlobalComponents {
    ZPagination: typeof Pagination
  }
}
