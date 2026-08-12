<template>
  <i :class="bem.b()" :style="style">
    <slot></slot>
  </i>
</template>

<script setup lang="ts">
import { createNamespace } from '@z-ui/utils/create'
import { iconProps } from './icon';
import { computed } from 'vue';

defineOptions({
  name: 'ZIcon'
})

const bem = createNamespace('icon')

const props = defineProps(iconProps)

const style = computed(() => {

  if (!props.size && !props.color) return {}

  return {
    ...(props.size ? { 'font-size': typeof props.size === 'number' ? `${props.size}px` : props.size } : {}),
    ...(props.color ? { color: props.color } : {})
  }
})

</script>
