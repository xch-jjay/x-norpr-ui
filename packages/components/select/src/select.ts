import type { ComputedRef, InjectionKey, PropType, Ref } from 'vue'

export type SelectValue = string | number | boolean
export type SelectSize = 'small' | 'default' | 'large'

export interface SelectOptionRecord {
  value: SelectValue
  label: string
  disabled: boolean
}

export interface SelectContext {
  modelValue: ComputedRef<SelectValue | undefined>
  disabled: ComputedRef<boolean>
  size: ComputedRef<SelectSize>
  filterable: ComputedRef<boolean>
  query: Ref<string>
  options: Ref<SelectOptionRecord[]>
  isOptionVisible: (label: string) => boolean
  registerOption: (option: SelectOptionRecord) => void
  unregisterOption: (value: SelectValue) => void
  select: (value: SelectValue) => void
}

export const selectKey: InjectionKey<SelectContext> = Symbol('z-select')

export const selectProps = {
  modelValue: {
    type: [Boolean, String, Number] as PropType<SelectValue | undefined>,
    default: undefined,
  },
  size: {
    type: String as PropType<SelectSize>,
    default: 'default',
  },
  placeholder: {
    type: String,
    default: '请选择',
  },
  clearable: Boolean,
  filterable: Boolean,
  disabled: Boolean,
} as const

export const optionProps = {
  value: {
    type: [Boolean, String, Number] as PropType<SelectValue | undefined>,
    default: undefined,
  },
  label: {
    type: String,
    default: '',
  },
  disabled: Boolean,
} as const

