<template>
  <div :class="inputNumberClass">
    <button
      v-if="props.controls"
      type="button"
      class="z-input-number__button"
      aria-label="减少"
      :disabled="decreaseDisabled"
      @click="changeBy(-1)"
    >
      −
    </button>

    <input
      ref="inputRef"
      v-bind="$attrs"
      class="z-input-number__inner"
      type="number"
      :value="displayValue"
      :min="props.min"
      :max="props.max"
      :step="props.step"
      :disabled="formControl.disabled.value"
      :readonly="props.readonly"
      :aria-valuenow="props.modelValue"
      :aria-valuemin="props.min"
      :aria-valuemax="props.max"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown="handleKeydown"
    />

    <button
      v-if="props.controls"
      type="button"
      class="z-input-number__button"
      aria-label="增加"
      :disabled="increaseDisabled"
      @click="changeBy(1)"
    >
      +
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { createNamespace } from '@z-ui/utils/create'
import { useFormControl } from '../../form/src/control'
import { inputNumberProps, type InputNumberValue } from './input-number'

defineOptions({ name: 'ZInputNumber', inheritAttrs: false })

const bem = createNamespace('input-number')
const props = defineProps(inputNumberProps)
const formControl = useFormControl(props)
const emit = defineEmits<{
  (event: 'update:modelValue', value: InputNumberValue): void
  (event: 'input', value: InputNumberValue): void
  (event: 'change', value: InputNumberValue): void
  (event: 'focus', payload: FocusEvent): void
  (event: 'blur', payload: FocusEvent): void
}>()

const inputRef = ref<HTMLInputElement>()
const focused = ref(false)

const displayValue = computed(() => props.modelValue ?? '')
const currentValue = computed(() => props.modelValue ?? 0)
const isDisabled = computed(() => formControl.disabled.value || props.readonly)
const decreaseDisabled = computed(() => (
  isDisabled.value
  || (typeof props.min === 'number' && currentValue.value <= props.min)
))
const increaseDisabled = computed(() => (
  isDisabled.value
  || (typeof props.max === 'number' && currentValue.value >= props.max)
))

const inputNumberClass = computed(() => [
  bem.b(),
  bem.m(formControl.size.value),
  bem.is('disabled', formControl.disabled.value),
  bem.is('readonly', props.readonly),
  bem.is('focus', focused.value),
])

function normalize(value: number): number {
  if (typeof props.precision !== 'number') return value

  const factor = 10 ** props.precision
  return Math.round(value * factor) / factor
}

function clamp(value: number): number {
  let nextValue = value
  if (typeof props.min === 'number') nextValue = Math.max(nextValue, props.min)
  if (typeof props.max === 'number') nextValue = Math.min(nextValue, props.max)
  return normalize(nextValue)
}

function emitValue(value: InputNumberValue, emitChange = false) {
  emit('update:modelValue', value)
  emit('input', value)
  if (emitChange) emit('change', value)
}

function handleInput(event: Event) {
  if (isDisabled.value) return

  const rawValue = (event.target as HTMLInputElement).value
  if (rawValue === '') {
    emitValue(undefined)
    return
  }

  const value = Number(rawValue)
  if (Number.isFinite(value)) emitValue(normalize(value))
}

function commitValue(emitChange = false) {
  if (props.modelValue === undefined) return

  const value = clamp(props.modelValue)
  if (value !== props.modelValue) emitValue(value)
  if (emitChange) emit('change', value)
}

function handleChange() {
  commitValue(true)
}

function handleFocus(event: FocusEvent) {
  focused.value = true
  emit('focus', event)
}

function handleBlur(event: FocusEvent) {
  focused.value = false
  commitValue()
  emit('blur', event)
}

function changeBy(direction: 1 | -1) {
  if (isDisabled.value) return

  const step = typeof props.step === 'number' && props.step > 0 ? props.step : 1
  const value = clamp(currentValue.value + direction * step)
  emitValue(value, true)
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return
  if (isDisabled.value) return

  event.preventDefault()
  changeBy(event.key === 'ArrowUp' ? 1 : -1)
}

function focus() {
  inputRef.value?.focus()
}

function blur() {
  inputRef.value?.blur()
}

defineExpose({ focus, blur })
</script>

