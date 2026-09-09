<template>
  <div
    :class="bem.b()"
    role="group"
    :aria-disabled="isDisabled ? 'true' : undefined"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useCheckboxGroup, checkboxGroupProps } from './checkbox-group'
import type { CheckboxValue } from './checkbox'

defineOptions({ name: 'ZCheckboxGroup' })

const props = defineProps(checkboxGroupProps)
const emit = defineEmits<{
  (event: 'update:modelValue', value: CheckboxValue[]): void
  (event: 'change', value: CheckboxValue[]): void
}>()

const { bem, disabled: isDisabled } = useCheckboxGroup(props, emit)
</script>
