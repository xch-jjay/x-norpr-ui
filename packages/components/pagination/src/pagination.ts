import type { PropType } from 'vue'

export type PaginationSize = 'small' | 'default' | 'large'
export type PaginationItem = number | 'more-prev' | 'more-next'

export const paginationProps = {
  total: {
    type: Number,
    default: 0,
  },
  pageSize: {
    type: Number,
    default: 10,
  },
  currentPage: {
    type: Number,
    default: 1,
  },
  pageCount: Number,
  pagerCount: {
    type: Number,
    default: 7,
  },
  size: String as PropType<PaginationSize>,
  disabled: Boolean,
  hideOnSinglePage: Boolean,
  background: Boolean,
} as const
