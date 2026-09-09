import type { PropType } from 'vue'

export type InputNumberValue = number | undefined
export type InputNumberSize = 'small' | 'default' | 'large'

export const inputNumberProps = {
  modelValue: {
    type: Number as PropType<InputNumberValue>,
    default: undefined,
  },
  min: Number,
  max: Number,
  step: {
    type: Number,
    default: 1,
  },
  precision: Number,
  size: {
    type: String as PropType<InputNumberSize>,
    default: 'default',
  },
  controls: {
    type: Boolean,
    default: true,
  },
  disabled: Boolean,
  readonly: Boolean,
} as const

