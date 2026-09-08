<template>
  <label
    :class="radioClass"
    :aria-disabled="isDisabled ? 'true' : undefined"
  >
    <span class="z-radio__input">
      <input
        type="radio"
        :name="radioName"
        :checked="checked"
        :disabled="isDisabled"
        @change="handleChange"
      />
      <span class="z-radio__inner" aria-hidden="true"></span>
    </span>
    <span v-if="$slots.default || props.label !== undefined" class="z-radio__label">
      <slot>{{ props.label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { createNamespace } from '@z-ui/utils/create'
import { radioGroupKey, radioProps, type RadioValue } from './radio'

defineOptions({ name: 'ZRadio' })

const bem = createNamespace('radio')
const props = defineProps(radioProps)
const emit = defineEmits<{
  (event: 'update:modelValue', value: RadioValue): void
  (event: 'change', value: RadioValue): void
}>()

const group = inject(radioGroupKey, undefined)
const value = computed<RadioValue>(() => props.label ?? true)
const checked = computed(() => (
  group ? group.modelValue.value === value.value : props.modelValue === value.value
))
const size = computed(() => props.size || group?.size.value || 'default')
const isDisabled = computed(() => (
  props.disabled
  || Boolean(group?.disabled.value)
  || Boolean(group?.isDisabled(value.value))
))
const radioName = computed(() => group?.name.value || props.name)

const radioClass = computed(() => [
  bem.b(),
  bem.m(size.value),
  bem.is('checked', checked.value),
  bem.is('disabled', isDisabled.value),
])

function handleChange() {
  if (isDisabled.value || checked.value) return

  if (group) {
    group.select(value.value)
    return
  }

  emit('update:modelValue', value.value)
  emit('change', value.value)
}
</script>

