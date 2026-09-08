import type { InjectionKey, PropType } from 'vue'

export type TableAlign = 'left' | 'center' | 'right'
export type TableSortOrder = 'ascending' | 'descending' | undefined
export type TableData = Record<string, unknown>

export interface TableColumnRecord {
  uid: number
  prop?: string
  label: string
  width?: string | number
  align: TableAlign
  sortable: boolean
}

export interface TableContext {
  register: (column: TableColumnRecord) => () => void
}

export const tableKey: InjectionKey<TableContext> = Symbol('z-table')

export const tableProps = {
  data: {
    type: Array as PropType<TableData[]>,
    default: () => [],
  },
  border: Boolean,
  stripe: Boolean,
  showHeader: {
    type: Boolean,
    default: true,
  },
  emptyText: {
    type: String,
    default: '暂无数据',
  },
} as const

export const tableColumnProps = {
  prop: String,
  label: {
    type: String,
    default: '',
  },
  width: [String, Number] as PropType<string | number>,
  align: {
    type: String as PropType<TableAlign>,
    default: 'left',
  },
  sortable: Boolean,
} as const
