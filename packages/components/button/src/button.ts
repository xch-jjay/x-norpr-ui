import type { PropType } from 'vue'

export type ButtonType = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
export type ButtonSize = 'small' | 'default' | 'large'
export type ButtonNativeType = 'button' | 'submit' | 'reset'

export const buttonProps = {
  type: {
    type: String as PropType<ButtonType>,
    default: 'default',
  },
  size: {
    type: String as PropType<ButtonSize>,
    default: 'default',
  },
  nativeType: {
    type: String as PropType<ButtonNativeType>,
    default: 'button',
  },
  loading: Boolean,
  disabled: Boolean,
  plain: Boolean,
  round: Boolean,
  circle: Boolean,
  block: Boolean,
} as const

export type ButtonProps = typeof buttonProps
