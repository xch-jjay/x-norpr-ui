<template>
  <button
    type="button"
    :class="switchClass"
    role="switch"
    :aria-checked="checked ? 'true' : 'false'"
    :aria-label="props.ariaLabel"
    :disabled="isDisabled"
    :style="switchStyle"
    @click="handleClick"
  >
    <span class="z-switch__core">
      <span class="z-switch__thumb">
        <span v-if="props.loading" class="z-switch__loading" aria-hidden="true"></span>
      </span>
    </span>
    <span v-if="checked && props.activeText" class="z-switch__text">
      {{ props.activeText }}
    </span>
    <span v-else-if="!checked && props.inactiveText" class="z-switch__text">
      {{ props.inactiveText }}
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { createNamespace } from '@z-ui/utils/create'
import { useFormControl } from '../../form/src/control'
import { switchProps, type SwitchValue } from './switch'

defineOptions({ name: 'ZSwitch' })

const bem = createNamespace('switch')
const props = defineProps(switchProps)
const formControl = useFormControl(props)
const emit = defineEmits<{
  (event: 'update:modelValue', value: SwitchValue): void
  (event: 'change', value: SwitchValue): void
}>()

const checked = computed(() => props.modelValue === props.activeValue)
const isDisabled = computed(() => formControl.disabled.value || props.loading)

const switchClass = computed(() => [
  bem.b(),
  bem.m(formControl.size.value),
  bem.is('checked', checked.value),
  bem.is('disabled', isDisabled.value),
  bem.is('loading', props.loading),
])

const switchStyle = computed(() => ({
  '--z-switch-on-color': props.activeColor || 'var(--z-color-primary)',
  '--z-switch-off-color': props.inactiveColor || 'var(--z-color-border)',
}))

function handleClick() {
  if (isDisabled.value) return

  const value = checked.value ? props.inactiveValue : props.activeValue
  emit('update:modelValue', value)
  emit('change', value)
}
</script>

