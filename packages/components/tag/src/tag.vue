<template>
  <span :class="tagClass" :style="tagStyle">
    <slot />
    <button
      v-if="props.closable"
      type="button"
      class="z-tag__close"
      aria-label="关闭标签"
      @click="handleClose"
    >
      ×
    </button>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { createNamespace } from '@z-ui/utils/create'
import { tagProps } from './tag'

defineOptions({ name: 'ZTag' })

const props = defineProps(tagProps)
const emit = defineEmits<{
  (event: 'close', payload: MouseEvent): void
}>()
const bem = createNamespace('tag')

const tagClass = computed(() => [
  bem.b(),
  props.type && bem.m(props.type),
  props.size && bem.m(props.size),
  bem.m(props.effect),
  bem.is('round', props.round),
  bem.is('hit', props.hit),
])
const tagStyle = computed(() => props.color ? { '--z-tag-custom-color': props.color } : undefined)

function handleClose(event: MouseEvent) {
  emit('close', event)
}
</script>
