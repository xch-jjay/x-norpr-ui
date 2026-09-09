import type { PropType } from 'vue'

export type DividerDirection = 'horizontal' | 'vertical'
export type DividerStyle = 'solid' | 'dashed' | 'dotted'
export type DividerContentPosition = 'left' | 'center' | 'right'

export const dividerProps = {
  direction: {
    type: String as PropType<DividerDirection>,
    default: 'horizontal',
  },
  borderStyle: {
    type: String as PropType<DividerStyle>,
    default: 'solid',
  },
  contentPosition: {
    type: String as PropType<DividerContentPosition>,
    default: 'center',
  },
  content: String,
} as const
