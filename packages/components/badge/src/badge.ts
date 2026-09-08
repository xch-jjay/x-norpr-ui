import type { PropType } from 'vue'

export type BadgeType = 'primary' | 'success' | 'warning' | 'danger' | 'info'

export const badgeProps = {
  value: [String, Number] as PropType<string | number>,
  max: Number,
  isDot: Boolean,
  hidden: Boolean,
  showZero: Boolean,
  type: {
    type: String as PropType<BadgeType>,
    default: 'danger',
  },
  color: String,
  offset: Array as unknown as PropType<[number, number]>,
} as const
