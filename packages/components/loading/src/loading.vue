<template>
  <Teleport :to="props.target">
    <div
      v-if="props.modelValue"
      :class="loadingClass"
      :style="loadingStyle"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span class="z-loading__spinner" aria-hidden="true" />
      <span v-if="props.text" class="z-loading__text">{{ props.text }}</span>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, watch } from 'vue'
import { createNamespace } from '@z-ui/utils/create'
import { lockLoadingScroll, unlockLoadingScroll } from './loading-lock'
import { loadingProps } from './loading'

defineOptions({ name: 'ZLoading' })

const props = defineProps(loadingProps)
const bem = createNamespace('loading')
const isLocked = () => props.modelValue && props.lockScroll

const loadingClass = computed(() => [
  bem.b(),
  bem.is('fullscreen', props.fullscreen),
])
const loadingStyle = computed(() => ({
  background: props.background,
}))

watch(() => props.modelValue, (visible, wasVisible) => {
  if (visible && !wasVisible && props.lockScroll) lockLoadingScroll()
  if (!visible && wasVisible && props.lockScroll) unlockLoadingScroll()
}, { immediate: true })

onBeforeUnmount(() => {
  if (isLocked()) unlockLoadingScroll()
})
</script>
