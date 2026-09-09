<template>
  <div ref="rootRef" :class="selectClass">
    <div
      ref="triggerRef"
      class="z-select__trigger"
      role="combobox"
      :tabindex="formControl.disabled.value ? -1 : 0"
      :aria-expanded="visible ? 'true' : 'false'"
      :aria-disabled="formControl.disabled.value ? 'true' : undefined"
      aria-haspopup="listbox"
      @click="handleTriggerClick"
      @keydown="handleKeydown"
    >
      <input
        v-if="props.filterable"
        ref="inputRef"
        class="z-select__input"
        :value="query"
        :placeholder="selectedLabel || props.placeholder"
        :disabled="formControl.disabled.value"
        aria-autocomplete="list"
        @input="handleInput"
        @click.stop="open"
      />
      <span v-else :class="selectedLabel ? 'z-select__selected' : 'z-select__placeholder'">
        {{ selectedLabel || props.placeholder }}
      </span>

      <button
        v-if="showClear"
        type="button"
        class="z-select__clear"
        aria-label="清除选择"
        @click.stop="clear"
      >
        ×
      </button>
      <span class="z-select__arrow" :class="{ 'is-open': visible }" aria-hidden="true">⌄</span>
    </div>

    <div v-if="visible" class="z-select__dropdown" role="listbox">
      <slot />
      <div v-if="!visibleOptions.length" class="z-select__empty">无匹配选项</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, provide, ref } from 'vue'
import { createNamespace } from '@z-ui/utils/create'
import { useFormControl } from '../../form/src/control'
import { selectKey, selectProps, type SelectOptionRecord, type SelectValue } from './select'

defineOptions({ name: 'ZSelect' })

const bem = createNamespace('select')
const props = defineProps(selectProps)
const formControl = useFormControl(props)
const emit = defineEmits<{
  (event: 'update:modelValue', value: SelectValue | undefined): void
  (event: 'change', value: SelectValue | undefined): void
}>()

const rootRef = ref<HTMLElement>()
const triggerRef = ref<HTMLElement>()
const inputRef = ref<HTMLInputElement>()
const visible = ref(false)
const query = ref('')
const options = ref<SelectOptionRecord[]>([])

const selectedOption = computed(() => options.value.find((option) => option.value === props.modelValue))
const selectedLabel = computed(() => selectedOption.value?.label || '')
const visibleOptions = computed(() => options.value.filter((option) => isOptionVisible(option.label)))
const showClear = computed(() => props.clearable && props.modelValue !== undefined && !formControl.disabled.value)

const selectClass = computed(() => [
  bem.b(),
  bem.m(formControl.size.value),
  bem.is('disabled', formControl.disabled.value),
  bem.is('open', visible.value),
])

function isOptionVisible(label: string) {
  if (!props.filterable || !query.value) return true
  return label.toLowerCase().includes(query.value.toLowerCase())
}

function registerOption(option: SelectOptionRecord) {
  if (!options.value.some((item) => item.value === option.value)) options.value.push(option)
}

function unregisterOption(value: SelectValue) {
  options.value = options.value.filter((option) => option.value !== value)
}

function focusTrigger() {
  nextTick(() => {
    if (props.filterable) inputRef.value?.focus()
    else triggerRef.value?.focus()
  })
}

function open() {
  if (formControl.disabled.value) return
  visible.value = true
  focusTrigger()
}

function close() {
  visible.value = false
  query.value = ''
}

function select(value: SelectValue) {
  if (formControl.disabled.value) return
  const option = options.value.find((item) => item.value === value)
  if (option?.disabled) return

  emit('update:modelValue', value)
  emit('change', value)
  close()
  focusTrigger()
}

function clear() {
  emit('update:modelValue', undefined)
  emit('change', undefined)
  query.value = ''
  focusTrigger()
}

function handleTriggerClick() {
  if (visible.value) close()
  else open()
}

function handleInput(event: Event) {
  query.value = (event.target as HTMLInputElement).value
  visible.value = true
}

function handleKeydown(event: KeyboardEvent) {
  if (formControl.disabled.value) return

  if (event.key === 'ArrowDown' || event.key === 'Enter') {
    event.preventDefault()
    open()
  } else if (event.key === 'Escape') {
    close()
  }
}

function handleOutsideClick(event: MouseEvent) {
  if (rootRef.value && !rootRef.value.contains(event.target as Node)) close()
}

provide(selectKey, {
  modelValue: computed(() => props.modelValue),
  disabled: formControl.disabled,
  size: formControl.size,
  filterable: computed(() => props.filterable),
  query,
  options,
  isOptionVisible,
  registerOption,
  unregisterOption,
  select,
})

onMounted(() => document.addEventListener('click', handleOutsideClick))
onUnmounted(() => document.removeEventListener('click', handleOutsideClick))
</script>
