import type { PropType } from 'vue'

export type AlertType = 'success' | 'warning' | 'info' | 'danger'

export const alertProps = {
  title: String,
  description: String,
  type: {
    type: String as PropType<AlertType>,
    default: 'info',
  },
  visible: {
    type: Boolean,
    default: true,
  },
  closable: {
    type: Boolean,
    default: true,
  },
  showIcon: Boolean,
  center: Boolean,
} as const

