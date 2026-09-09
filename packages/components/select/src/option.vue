<template>
  <button
    v-show="isVisible"
    type="button"
    class="z-select-option"
    role="option"
    :aria-selected="selected ? 'true' : 'false'"
    :disabled="isDisabled"
    @click="handleClick"
  >
    <slot>{{ props.label }}</slot>
  </button>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted } from 'vue'
import { selectKey, optionProps } from './select'

defineOptions({ name: 'ZOption' })

const props = defineProps(optionProps)
const select = inject(selectKey, undefined)
const value = computed(() => props.value ?? props.label)
const selected = computed(() => select?.modelValue.value === value.value)
const isDisabled = computed(() => Boolean(props.disabled || select?.disabled.value))
const isVisible = computed(() => select?.isOptionVisible(props.label) ?? true)

function handleClick() {
  if (isDisabled.value) return
  select?.select(value.value)
}

onMounted(() => {
  select?.registerOption({
    value: value.value,
    label: props.label,
    disabled: props.disabled,
  })
})

onUnmounted(() => select?.unregisterOption(value.value))
</script>

