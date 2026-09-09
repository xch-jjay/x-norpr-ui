<template>
  <div :class="messageClass" role="status" aria-live="polite">
    <span class="z-message__icon" aria-hidden="true">{{ icon }}</span>
    <span class="z-message__content">{{ props.message }}</span>
    <button
      v-if="props.closable"
      type="button"
      class="z-message__close"
      aria-label="关闭消息"
      @click="$emit('close')"
    >
      ×
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { createNamespace } from '@z-ui/utils/create'
import { messageProps } from './message'

defineOptions({ name: 'ZMessage' })

const props = defineProps(messageProps)
defineEmits<{
  (event: 'close'): void
}>()

const bem = createNamespace('message')
const icon = computed(() => ({
  success: '✓',
  warning: '!',
  info: 'i',
  danger: '×',
}[props.type]))
const messageClass = computed(() => [bem.b(), bem.m(props.type)])
</script>
