<template>
  <form :class="formClass" :style="formStyle" @submit.prevent>
    <slot />
  </form>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue'
import { createNamespace } from '@z-ui/utils/create'
import { formKey, formProps, type FormItemContext } from './form'

defineOptions({ name: 'ZForm' })

const bem = createNamespace('form')
const props = defineProps(formProps)
const items = new Map<string, FormItemContext>()
const initialModel = { ...props.model }

const formClass = computed(() => [bem.b(), bem.m(props.size), bem.is('disabled', props.disabled)])
const formStyle = computed(() => ({ '--z-form-label-width': props.labelWidth }))

function registerItem(prop: string, item: FormItemContext) {
  items.set(prop, item)
}

function unregisterItem(prop: string) {
  items.delete(prop)
}

function resetField(prop: string) {
  if (Object.prototype.hasOwnProperty.call(initialModel, prop)) {
    // Form model is intentionally shared with the parent so resetFields restores v-model state.
    // eslint-disable-next-line vue/no-mutating-props
    props.model[prop] = initialModel[prop]
  }
}

async function validateField(prop: string) {
  return items.get(prop)?.validate() ?? true
}

async function validate() {
  const results = await Promise.all([...items.values()].map((item) => item.validate()))
  return results.every(Boolean)
}

function resetFields() {
  Object.keys(initialModel).forEach(resetField)
  items.forEach((item) => item.reset())
}

provide(formKey, {
  model: computed(() => props.model),
  rules: computed(() => props.rules),
  labelWidth: computed(() => props.labelWidth),
  size: computed(() => props.size),
  disabled: computed(() => props.disabled),
  registerItem,
  unregisterItem,
  resetField,
  validateField,
  validate,
  resetFields,
})

defineExpose({ validate, validateField, resetFields })
</script>
