import type { PropType } from 'vue'

export type SwitchValue = boolean | string | number
export type SwitchSize = 'small' | 'default' | 'large'

export const switchProps = {
  modelValue: {
    type: [Boolean, String, Number] as PropType<SwitchValue>,
    default: false,
  },
  activeValue: {
    type: [Boolean, String, Number] as PropType<SwitchValue>,
    default: true,
  },
  inactiveValue: {
    type: [Boolean, String, Number] as PropType<SwitchValue>,
    default: false,
  },
  size: {
    type: String as PropType<SwitchSize>,
    default: 'default',
  },
  activeText: String,
  inactiveText: String,
  ariaLabel: String,
  activeColor: String,
  inactiveColor: String,
  disabled: Boolean,
  loading: Boolean,
} as const

