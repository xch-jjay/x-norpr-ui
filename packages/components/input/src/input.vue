<template>
  <div :class="inputClass">
    <span v-if="$slots.prefix" class="z-input__prefix">
      <slot name="prefix" />
    </span>

    <input
      ref="inputRef"
      v-bind="$attrs"
      class="z-input__inner"
      :value="props.modelValue"
      :type="props.type"
      :placeholder="props.placeholder"
      :maxlength="props.maxlength"
      :disabled="formControl.disabled.value"
      :readonly="props.readonly"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
    />

    <span v-if="$slots.suffix || showClear || showWordCount" class="z-input__suffix">
      <button
        v-if="showClear"
        type="button"
        class="z-input__clear"
        aria-label="清除内容"
        @mousedown.prevent
        @click.stop="handleClear"
      >
        ×
      </button>
      <span v-if="showWordCount" class="z-input__count">
        {{ props.modelValue.length }} / {{ props.maxlength }}
      </span>
      <slot name="suffix" />
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { createNamespace } from '@z-ui/utils/create'
import { useFormControl } from '../../form/src/control'
import { inputProps } from './input'

defineOptions({ name: 'ZInput', inheritAttrs: false })

const bem = createNamespace('input')
const props = defineProps(inputProps)
const formControl = useFormControl(props)
const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
  (event: 'input', value: string): void
  (event: 'change', value: string): void
  (event: 'focus', payload: FocusEvent): void
  (event: 'blur', payload: FocusEvent): void
  (event: 'clear'): void
}>()

const inputRef = ref<HTMLInputElement>()
const focused = ref(false)

const showClear = computed(() => (
  props.clearable
  && props.modelValue.length > 0
  && !formControl.disabled.value
  && !props.readonly
))

const showWordCount = computed(() => (
  props.showWordLimit && typeof props.maxlength === 'number'
))

const inputClass = computed(() => [
  bem.b(),
  bem.m(formControl.size.value),
  bem.is('disabled', formControl.disabled.value),
  bem.is('readonly', props.readonly),
  bem.is('focus', focused.value),
])

function getValue(event: Event) {
  return (event.target as HTMLInputElement).value
}

function handleInput(event: Event) {
  if (formControl.disabled.value || props.readonly) return

  const value = getValue(event)
  emit('update:modelValue', value)
  emit('input', value)
}

function handleChange(event: Event) {
  emit('change', getValue(event))
}

function handleFocus(event: FocusEvent) {
  focused.value = true
  emit('focus', event)
}

function handleBlur(event: FocusEvent) {
  focused.value = false
  emit('blur', event)
}

function handleClear() {
  if (!showClear.value) return

  emit('update:modelValue', '')
  emit('input', '')
  emit('clear')
  inputRef.value?.focus()
}

function focus() {
  inputRef.value?.focus()
}

function blur() {
  inputRef.value?.blur()
}

defineExpose({ focus, blur })
</script>
