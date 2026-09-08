<template>
  <div
    :class="bem.b()"
    role="group"
    :aria-disabled="props.disabled ? 'true' : undefined"
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

const { bem } = useCheckboxGroup(props, emit)
</script>
