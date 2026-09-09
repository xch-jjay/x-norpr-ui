<template>
  <div :class="spaceClass" :style="spaceStyle">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { createNamespace } from '@z-ui/utils/create'
import { spaceProps } from './space'

defineOptions({ name: 'ZSpace' })

const props = defineProps(spaceProps)
const bem = createNamespace('space')

const spaceClass = computed(() => [
  bem.b(),
  bem.m(props.direction),
  bem.is('wrap', props.wrap),
  bem.is('fill', props.fill),
])

const spaceStyle = computed(() => ({
  '--z-space-align': props.align,
  '--z-space-gap': getGap(props.size),
}))

function getGap(size: string | number) {
  if (typeof size === 'number') return `${size}px`
  if (size === 'small') return 'var(--z-spacing-1)'
  if (size === 'large') return 'var(--z-spacing-4)'
  if (size === 'default') return 'var(--z-spacing-2)'
  return size
}
</script>
