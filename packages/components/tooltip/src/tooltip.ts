import type { PropType } from 'vue'

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right'
export type TooltipTrigger = 'hover' | 'focus' | 'click'

export const tooltipProps = {
  content: String,
  placement: {
    type: String as PropType<TooltipPlacement>,
    default: 'top',
  },
  trigger: {
    type: String as PropType<TooltipTrigger>,
    default: 'hover',
  },
  disabled: Boolean,
  showAfter: {
    type: Number,
    default: 0,
  },
  hideAfter: {
    type: Number,
    default: 0,
  },
} as const
