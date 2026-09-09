<template>
  <div
    class="z-radio-group"
    role="radiogroup"
    :aria-disabled="isDisabled ? 'true' : undefined"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useRadioGroup, radioGroupProps } from './radio-group'
import type { RadioValue } from './radio'

defineOptions({ name: 'ZRadioGroup' })

const props = defineProps(radioGroupProps)
const emit = defineEmits<{
  (event: 'update:modelValue', value: RadioValue): void
  (event: 'change', value: RadioValue): void
}>()

const { disabled: isDisabled } = useRadioGroup(props, emit)
</script>

