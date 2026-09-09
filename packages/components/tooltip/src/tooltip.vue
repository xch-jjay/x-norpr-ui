<template>
  <span
    :class="triggerClass"
    :aria-describedby="visible ? tooltipId : undefined"
    @mouseenter="handleEnter"
    @mouseleave="handleLeave"
    @focusin="handleFocus"
    @focusout="handleBlur"
    @click="handleClick"
  >
    <slot />
    <span v-if="visible" :id="tooltipId" :class="tooltipClass" role="tooltip">
      <slot name="content">{{ props.content }}</slot>
    </span>
  </span>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import { createNamespace } from '@z-ui/utils/create'
import { tooltipProps } from './tooltip'

defineOptions({ name: 'ZTooltip' })

const props = defineProps(tooltipProps)
const bem = createNamespace('tooltip')
const visible = ref(false)
const tooltipId = `z-tooltip-${Math.random().toString(36).slice(2, 9)}`
let showTimer: number | undefined
let hideTimer: number | undefined

const triggerClass = bem.b()
const tooltipClass = computed(() => [bem.e('content'), bem.m(props.placement)])

function clearTimers() {
  if (showTimer !== undefined) window.clearTimeout(showTimer)
  if (hideTimer !== undefined) window.clearTimeout(hideTimer)
  showTimer = undefined
  hideTimer = undefined
}

function show() {
  if (props.disabled || visible.value) return
  clearTimers()
  if (props.showAfter > 0) showTimer = window.setTimeout(() => { visible.value = true }, props.showAfter)
  else visible.value = true
}

function hide() {
  clearTimers()
  if (!visible.value) return
  if (props.hideAfter > 0) hideTimer = window.setTimeout(() => { visible.value = false }, props.hideAfter)
  else visible.value = false
}

function handleEnter() { if (props.trigger === 'hover') show() }
function handleLeave() { if (props.trigger === 'hover') hide() }
function handleFocus() { if (props.trigger === 'focus') show() }
function handleBlur() { if (props.trigger === 'focus') hide() }
function handleClick() {
  if (props.trigger !== 'click') return
  if (visible.value) hide()
  else show()
}

onBeforeUnmount(() => clearTimers())
</script>
