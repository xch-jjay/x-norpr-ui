<template>
  <Teleport v-if="!props.destroyOnClose || props.modelValue" :to="props.appendTo">
    <div
      v-if="props.modelValue || !props.destroyOnClose"
      v-show="props.modelValue"
      class="z-drawer"
      @keydown="handleKeydown"
    >
      <div v-if="props.modal" class="z-drawer__overlay" aria-hidden="true" @click="handleOverlayClick" />
      <aside
        ref="drawerRef"
        :class="drawerClass"
        :style="drawerStyle"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="props.title ? titleId : undefined"
        tabindex="-1"
        @click.stop
      >
        <header v-if="$slots.header || props.title || props.showClose" class="z-drawer__header">
          <slot name="header">
            <span v-if="props.title" :id="titleId" class="z-drawer__title">{{ props.title }}</span>
          </slot>
          <button v-if="props.showClose" type="button" class="z-drawer__close" aria-label="关闭抽屉" @click="handleClose">×</button>
        </header>
        <div class="z-drawer__body"><slot /></div>
        <footer v-if="$slots.footer" class="z-drawer__footer"><slot name="footer" /></footer>
      </aside>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { createNamespace } from '@z-ui/utils/create'
import { drawerProps } from './drawer'
import { lockDrawerScroll, unlockDrawerScroll } from './drawer-lock'

defineOptions({ name: 'ZDrawer' })

const props = defineProps(drawerProps)
const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void
  (event: 'open'): void
  (event: 'opened'): void
  (event: 'close'): void
  (event: 'closed'): void
}>()
const bem = createNamespace('drawer')
const drawerRef = ref<HTMLElement>()
const titleId = `z-drawer-title-${Math.random().toString(36).slice(2, 9)}`
const previousActiveElement = ref<HTMLElement>()

const drawerClass = computed(() => [bem.e('content'), bem.m(props.direction)])
const drawerStyle = computed(() => ({ '--z-drawer-size': props.size }))

function handleOpen() {
  previousActiveElement.value = document.activeElement instanceof HTMLElement ? document.activeElement : undefined
  if (props.lockScroll) lockDrawerScroll()
  emit('open')
  void nextTick(() => {
    drawerRef.value?.focus()
    emit('opened')
  })
}

function handleClose() {
  emit('update:modelValue', false)
  emit('close')
}

function handleOverlayClick(event: MouseEvent) {
  if (event.target === event.currentTarget && props.closeOnClickModal) handleClose()
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && props.closeOnPressEscape) {
    event.stopPropagation()
    handleClose()
  }
}

function handleClosed() {
  if (props.lockScroll) unlockDrawerScroll()
  previousActiveElement.value?.focus()
  previousActiveElement.value = undefined
  emit('closed')
}

watch(() => props.modelValue, (visible, wasVisible) => {
  if (visible && !wasVisible) handleOpen()
  if (!visible && wasVisible) handleClosed()
}, { immediate: true })

onBeforeUnmount(() => {
  if (props.modelValue && props.lockScroll) unlockDrawerScroll()
})
</script>
