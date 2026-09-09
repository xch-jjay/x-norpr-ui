<template>
  <div :class="formItemClass">
    <label v-if="props.label" class="z-form-item__label" :style="labelStyle">
      {{ props.label }}
      <span v-if="isRequired" class="z-form-item__required" aria-hidden="true">*</span>
    </label>
    <div class="z-form-item__content">
      <slot />
      <div v-if="props.showMessage && errorMessage" class="z-form-item__error" role="alert">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted, ref, watch } from 'vue'
import { createNamespace } from '@z-ui/utils/create'
import { formKey, formItemProps, normalizeRules, validateValue } from './form'

defineOptions({ name: 'ZFormItem' })

const bem = createNamespace('form-item')
const props = defineProps(formItemProps)
const form = inject(formKey, undefined)
const errorMessage = ref('')
const state = ref<'success' | 'error' | ''>('')

const fieldRules = computed(() => {
  const rules = normalizeRules(form?.rules.value[props.prop])
  if (props.required && !rules.some((rule) => rule.required)) return [{ required: true }, ...rules]
  return rules
})
const isRequired = computed(() => fieldRules.value.some((rule) => rule.required))
const labelStyle = computed(() => ({ width: form?.labelWidth.value || '100px' }))
const formItemClass = computed(() => [
  bem.b(),
  bem.is('error', state.value === 'error'),
  bem.is('success', state.value === 'success'),
])

async function validate() {
  if (!form) return true

  const message = await validateValue(form.model.value[props.prop], fieldRules.value, form.model.value)
  errorMessage.value = message || ''
  state.value = message ? 'error' : 'success'
  return !message
}

function reset() {
  form?.resetField(props.prop)
  errorMessage.value = ''
  state.value = ''
}

watch(() => form?.model.value[props.prop], () => {
  if (state.value === 'error') void validate()
})

onMounted(() => form?.registerItem(props.prop, { validate, reset }))
onUnmounted(() => form?.unregisterItem(props.prop))
</script>

