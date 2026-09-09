import type { ComputedRef, InjectionKey, PropType } from 'vue'

export type CheckboxValue = string | number | boolean
export type CheckboxSize = 'small' | 'default' | 'large'

export const checkboxProps = {
  modelValue: {
    type: [Boolean, String, Number] as PropType<CheckboxValue>,
    default: false,
  },
  label: {
    type: [Boolean, String, Number] as PropType<CheckboxValue>,
    default: undefined,
  },
  trueValue: {
    type: [Boolean, String, Number] as PropType<CheckboxValue>,
    default: true,
  },
  falseValue: {
    type: [Boolean, String, Number] as PropType<CheckboxValue>,
    default: false,
  },
  size: {
    type: String as PropType<CheckboxSize>,
    default: undefined,
  },
  disabled: Boolean,
  indeterminate: Boolean,
} as const

export interface CheckboxGroupContext {
  modelValue: ComputedRef<CheckboxValue[]>
  disabled: ComputedRef<boolean>
  size: ComputedRef<CheckboxSize | undefined>
  isDisabled: (value: CheckboxValue, checked: boolean) => boolean
  toggle: (value: CheckboxValue, checked: boolean) => boolean
}

export const checkboxGroupKey: InjectionKey<CheckboxGroupContext> = Symbol('z-checkbox-group')

