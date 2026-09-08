<template>
  <label
    :class="checkboxClass"
    :aria-disabled="isDisabled ? 'true' : undefined"
  >
    <span class="z-checkbox__input">
      <input
        ref="inputRef"
        type="checkbox"
        :checked="checked"
        :disabled="isDisabled"
        @change="handleChange"
      />
      <span class="z-checkbox__inner" aria-hidden="true"></span>
    </span>
    <span v-if="$slots.default || props.label !== undefined" class="z-checkbox__label">
      <slot>{{ props.label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, inject, ref, watchEffect } from 'vue'
import { createNamespace } from '@z-ui/utils/create'
import { checkboxGroupKey, checkboxProps, type CheckboxValue } from './checkbox'

defineOptions({ name: 'ZCheckbox' })

const bem = createNamespace('checkbox')
const props = defineProps(checkboxProps)
const emit = defineEmits<{
  (event: 'update:modelValue', value: CheckboxValue): void
  (event: 'change', value: CheckboxValue): void
}>()

const group = inject(checkboxGroupKey, undefined)
const inputRef = ref<HTMLInputElement>()

const value = computed<CheckboxValue>(() => props.label ?? true)
const checked = computed(() => (
  group
    ? group.modelValue.value.includes(value.value)
    : props.modelValue === props.trueValue
))
const size = computed(() => props.size || group?.size.value || 'default')
const isDisabled = computed(() => (
  props.disabled
  || Boolean(group?.disabled.value)
  || Boolean(group?.isDisabled(value.value, checked.value))
))

const checkboxClass = computed(() => [
  bem.b(),
  bem.m(size.value),
  bem.is('checked', checked.value),
  bem.is('indeterminate', props.indeterminate),
  bem.is('disabled', isDisabled.value),
])

watchEffect(() => {
  if (inputRef.value) inputRef.value.indeterminate = props.indeterminate
})

function handleChange() {
  if (isDisabled.value) return

  const nextChecked = !checked.value
  if (group) {
    group.toggle(value.value, nextChecked)
    return
  }

  const nextValue = nextChecked ? props.trueValue : props.falseValue
  emit('update:modelValue', nextValue)
  emit('change', nextValue)
}
</script>
