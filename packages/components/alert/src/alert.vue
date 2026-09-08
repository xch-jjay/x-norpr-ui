<template>
  <div
    v-if="isVisible"
    :class="alertClass"
    role="alert"
    aria-live="polite"
  >
    <span v-if="props.showIcon" class="z-alert__icon" aria-hidden="true">{{ icon }}</span>
    <div class="z-alert__content">
      <div v-if="$slots.title || props.title" class="z-alert__title">
        <slot name="title">{{ props.title }}</slot>
      </div>
      <div v-if="$slots.default || props.description" class="z-alert__description">
        <slot>{{ props.description }}</slot>
      </div>
    </div>
    <button
      v-if="props.closable"
      type="button"
      class="z-alert__close"
      aria-label="关闭提示"
      @click="handleClose"
    >
      ×
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { createNamespace } from '@z-ui/utils/create'
import { alertProps } from './alert'

defineOptions({ name: 'ZAlert' })

const bem = createNamespace('alert')
const props = defineProps(alertProps)
const emit = defineEmits<{
  (event: 'update:visible', value: boolean): void
  (event: 'close', payload: MouseEvent): void
}>()

const closed = ref(false)
const isVisible = computed(() => props.visible && !closed.value)
const icon = computed(() => ({
  success: '✓',
  warning: '!',
  info: 'i',
  danger: '×',
}[props.type]))
const alertClass = computed(() => [
  bem.b(),
  bem.m(props.type),
  bem.is('center', props.center),
])

watch(() => props.visible, (visible) => {
  if (visible) closed.value = false
})

function handleClose(event: MouseEvent) {
  closed.value = true
  emit('update:visible', false)
  emit('close', event)
}
</script>

