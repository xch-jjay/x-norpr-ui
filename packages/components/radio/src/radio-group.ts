import { computed, provide, type ExtractPropTypes, type PropType } from 'vue'
import { radioGroupKey, type RadioSize, type RadioValue } from './radio'

let radioGroupId = 0

export const radioGroupProps = {
  modelValue: {
    type: [Boolean, String, Number] as PropType<RadioValue>,
    default: '',
  },
  name: String,
  size: {
    type: String as PropType<RadioSize>,
    default: 'default',
  },
  disabled: Boolean,
} as const

export type RadioGroupProps = ExtractPropTypes<typeof radioGroupProps>

export function useRadioGroup(props: RadioGroupProps, emit: {
  (event: 'update:modelValue', value: RadioValue): void
  (event: 'change', value: RadioValue): void
}) {
  const modelValue = computed(() => props.modelValue)
  const disabled = computed(() => props.disabled)
  const size = computed(() => props.size)
  const groupId = radioGroupId
  radioGroupId += 1
  const name = computed(() => props.name || `z-radio-group-${groupId}`)

  function isDisabled() {
    return props.disabled
  }

  function select(value: RadioValue) {
    if (props.disabled || modelValue.value === value) return false

    emit('update:modelValue', value)
    emit('change', value)
    return true
  }

  provide(radioGroupKey, {
    modelValue,
    disabled,
    size,
    name,
    isDisabled,
    select,
  })
}
