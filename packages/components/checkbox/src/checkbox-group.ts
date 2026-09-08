import { computed, provide, type ExtractPropTypes, type PropType } from 'vue'
import { createNamespace } from '@z-ui/utils/create'
import { checkboxGroupKey, type CheckboxSize, type CheckboxValue } from './checkbox'

export const checkboxGroupProps = {
  modelValue: {
    type: Array as PropType<CheckboxValue[]>,
    default: () => [],
  },
  size: {
    type: String as PropType<CheckboxSize>,
    default: 'default',
  },
  disabled: Boolean,
  min: Number,
  max: Number,
} as const

export type CheckboxGroupProps = ExtractPropTypes<typeof checkboxGroupProps>

export function useCheckboxGroup(props: CheckboxGroupProps, emit: {
  (event: 'update:modelValue', value: CheckboxValue[]): void
  (event: 'change', value: CheckboxValue[]): void
}) {
  const bem = createNamespace('checkbox-group')
  const modelValue = computed(() => props.modelValue)
  const size = computed(() => props.size)
  const disabled = computed(() => props.disabled)

  function isDisabled(value: CheckboxValue, checked: boolean) {
    if (props.disabled) return true
    if (!checked && typeof props.max === 'number' && modelValue.value.length >= props.max) return true
    if (checked && typeof props.min === 'number' && modelValue.value.length <= props.min) return true
    return false
  }

  function toggle(value: CheckboxValue, checked: boolean) {
    if (isDisabled(value, checked)) return false

    const values = modelValue.value.filter((item) => item !== value)
    if (checked) values.push(value)
    emit('update:modelValue', values)
    emit('change', values)
    return true
  }

  provide(checkboxGroupKey, {
    modelValue,
    disabled,
    size,
    isDisabled,
    toggle,
  })

  return { bem }
}
