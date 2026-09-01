import type { PropType } from 'vue'

export type InputType = 'text' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url'
export type InputSize = 'small' | 'default' | 'large'

export const inputProps = {
  modelValue: {
    type: String,
    default: '',
  },
  type: {
    type: String as PropType<InputType>,
    default: 'text',
  },
  size: {
    type: String as PropType<InputSize>,
    default: 'default',
  },
  disabled: Boolean,
  readonly: Boolean,
  placeholder: String,
  clearable: Boolean,
  maxlength: Number,
  showWordLimit: Boolean,
} as const
