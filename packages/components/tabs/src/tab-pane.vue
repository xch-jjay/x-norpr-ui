<template>
  <div
    v-show="isActive"
    :id="`z-tab-panel-${pane.uid}`"
    class="z-tabs__pane"
    role="tabpanel"
    :aria-hidden="!isActive"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onBeforeUnmount } from 'vue'
import { tabsKey, tabPaneProps } from './tabs'

defineOptions({ name: 'ZTabPane' })

const props = defineProps(tabPaneProps)
const context = inject(tabsKey)
const pane = {
  uid: Math.random(),
  name: props.name,
  label: props.label,
  disabled: props.disabled,
  closable: props.closable,
}
const unregister = context?.register(pane)
const isActive = computed(() => context?.activeName.value === pane.name)

onBeforeUnmount(() => unregister?.())
</script>
