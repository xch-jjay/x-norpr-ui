<template>
  <button
    :class="buttonClass"
    :type="props.nativeType"
    :disabled="props.disabled || props.loading"
    :aria-disabled="props.disabled || props.loading ? 'true' : undefined"
    :aria-busy="props.loading ? 'true' : undefined"
    @click="handleClick"
  >
    <span v-if="props.loading" class="z-button__loading" aria-hidden="true"></span>
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { createNamespace } from '@z-ui/utils/create'
import { buttonProps } from './button'

defineOptions({ name: 'ZButton' })

const bem = createNamespace('button')
const props = defineProps(buttonProps)
const emit = defineEmits<{
  (event: 'click', payload: MouseEvent): void
}>()

const buttonClass = computed(() => [
  bem.b(),
  bem.m(props.type),
  bem.m(props.size),
  bem.is('plain', props.plain),
  bem.is('round', props.round),
  bem.is('circle', props.circle),
  bem.is('block', props.block),
  bem.is('disabled', props.disabled || props.loading),
])

function handleClick(event: MouseEvent) {
  if (props.disabled || props.loading) return
  emit('click', event)
}
</script>
