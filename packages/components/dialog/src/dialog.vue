<template>
  <Teleport v-if="!props.destroyOnClose || props.modelValue" :to="props.appendTo">
    <div
      v-if="props.modelValue || !props.destroyOnClose"
      v-show="props.modelValue"
      :class="wrapperClass"
      :style="wrapperStyle"
      @keydown="handleKeydown"
    >
      <div
        v-if="props.modal"
        class="z-dialog__overlay"
        aria-hidden="true"
        @click="handleOverlayClick"
      />
      <div
        ref="dialogRef"
        :class="dialogClass"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="title ? titleId : undefined"
        tabindex="-1"
        @click.stop
      >
        <header v-if="$slots.header || props.title || props.showClose" class="z-dialog__header">
          <slot name="header">
            <span v-if="props.title" :id="titleId" class="z-dialog__title">{{ props.title }}</span>
          </slot>
          <button
            v-if="props.showClose"
            type="button"
            class="z-dialog__close"
            aria-label="关闭对话框"
            @click="handleClose"
          >
            ×
          </button>
        </header>
        <div class="z-dialog__body">
          <slot />
        </div>
        <footer v-if="$slots.footer" class="z-dialog__footer">
          <slot name="footer" />
        </footer>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { createNamespace } from '@z-ui/utils/create'
import { dialogProps } from './dialog'
import { lockBodyScroll, unlockBodyScroll } from './lock'

defineOptions({ name: 'ZDialog' })

const props = defineProps(dialogProps)
const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void
  (event: 'open'): void
  (event: 'opened'): void
  (event: 'close'): void
  (event: 'closed'): void
}>()

const bem = createNamespace('dialog')
const dialogRef = ref<HTMLElement>()
const titleId = `z-dialog-title-${Math.random().toString(36).slice(2, 9)}`
const previousActiveElement = ref<HTMLElement>()

const wrapperClass = computed(() => [bem.b(), bem.is('center', props.center)])
const dialogClass = computed(() => [bem.e('content'), bem.is('fullscreen', props.fullscreen)])
const wrapperStyle = computed(() => ({
  '--z-dialog-width': props.fullscreen ? '100%' : props.width,
  '--z-dialog-top': props.fullscreen ? '0' : props.top,
  zIndex: props.zIndex,
}))

function handleOpen() {
  previousActiveElement.value = document.activeElement instanceof HTMLElement
    ? document.activeElement
    : undefined
  if (props.lockScroll) lockBodyScroll()
  emit('open')
  void nextTick(() => {
    dialogRef.value?.focus()
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
  if (props.lockScroll) unlockBodyScroll()
  previousActiveElement.value?.focus()
  previousActiveElement.value = undefined
  emit('closed')
}

watch(() => props.modelValue, (visible, wasVisible) => {
  if (visible && !wasVisible) handleOpen()
  if (!visible && wasVisible) handleClosed()
}, { immediate: true })

onBeforeUnmount(() => {
  if (props.modelValue && props.lockScroll) unlockBodyScroll()
  previousActiveElement.value = undefined
})
</script>
