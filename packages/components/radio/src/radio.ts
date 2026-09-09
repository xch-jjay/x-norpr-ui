import type { ComputedRef, InjectionKey, PropType } from 'vue'

export type RadioValue = string | number | boolean
export type RadioSize = 'small' | 'default' | 'large'

export const radioProps = {
  modelValue: {
    type: [Boolean, String, Number] as PropType<RadioValue>,
    default: '',
  },
  label: {
    type: [Boolean, String, Number] as PropType<RadioValue>,
    default: undefined,
  },
  name: String,
  size: {
    type: String as PropType<RadioSize>,
    default: undefined,
  },
  disabled: Boolean,
} as const

export interface RadioGroupContext {
  modelValue: ComputedRef<RadioValue>
  disabled: ComputedRef<boolean>
  size: ComputedRef<RadioSize | undefined>
  name: ComputedRef<string>
  isDisabled: (value: RadioValue) => boolean
  select: (value: RadioValue) => boolean
}

export const radioGroupKey: InjectionKey<RadioGroupContext> = Symbol('z-radio-group')

