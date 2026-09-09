import { computed, inject, type ComputedRef } from 'vue'
import { formKey, type FormSize } from './form'

export interface FormControlProps {
  size?: FormSize
  disabled?: boolean
}

export interface FormControlContext {
  size: ComputedRef<FormSize>
  disabled: ComputedRef<boolean>
}

export function useFormControl(props: FormControlProps): FormControlContext {
  const form = inject(formKey, undefined)
  const size = computed<FormSize>(() => {
    if (props.size && props.size !== 'default') return props.size
    return form?.size.value ?? props.size ?? 'default'
  })
  const disabled = computed(() => Boolean(props.disabled || form?.disabled.value))

  return { size, disabled }
}
