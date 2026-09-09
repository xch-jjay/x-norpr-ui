<template>
  <span :class="badgeClass">
    <slot />
    <sup v-if="shouldShow" class="z-badge__content" :style="badgeStyle">
      {{ displayValue }}
    </sup>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { createNamespace } from '@z-ui/utils/create'
import { badgeProps } from './badge'

defineOptions({ name: 'ZBadge' })

const props = defineProps(badgeProps)
const bem = createNamespace('badge')
const hasValue = computed(() => props.value !== undefined && props.value !== null && props.value !== '')
const numericValue = computed(() => typeof props.value === 'number' ? props.value : Number(props.value))
const shouldShow = computed(() => !props.hidden && (props.isDot || (hasValue.value && (props.showZero || numericValue.value !== 0))))
const displayValue = computed(() => (
  props.isDot ? '' : props.max !== undefined && numericValue.value > props.max ? `${props.max}+` : props.value
))
const badgeClass = computed(() => [
  bem.b(),
  bem.m(props.type),
  bem.is('dot', props.isDot),
])
const badgeStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.color) style['--z-badge-custom-color'] = props.color
  if (props.offset) {
    style.transform = `translate(${props.offset[0]}px, ${props.offset[1]}px)`
  }
  return style
})
</script>
