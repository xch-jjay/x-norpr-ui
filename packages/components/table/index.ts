import _Table from './src/table.vue'
import _TableColumn from './src/table-column.vue'
import { withInstall } from '@z-ui/utils/with-install'

const Table = withInstall(_Table)
const TableColumn = withInstall(_TableColumn)

export default Table
export { Table, TableColumn }
export * from './src/table'

declare module 'vue' {
  export interface GlobalComponents {
    ZTable: typeof Table
    ZTableColumn: typeof TableColumn
  }
}
