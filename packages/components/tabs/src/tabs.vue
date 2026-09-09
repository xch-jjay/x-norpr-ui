<template>
  <div :class="tabsClass">
    <div class="z-tabs__nav" role="tablist">
      <div
        v-for="pane in panes"
        :key="pane.uid"
        :class="tabClass(pane)"
        role="tab"
        :aria-selected="pane.name === activeName"
        :aria-controls="`z-tab-panel-${pane.uid}`"
        :tabindex="pane.disabled ? -1 : 0"
        @click="selectPane(pane)"
        @keydown.enter="selectPane(pane)"
        @keydown.space.prevent="selectPane(pane)"
      >
        <span>{{ pane.label }}</span>
        <button
          v-if="(props.closable || pane.closable) && !pane.disabled"
          type="button"
          class="z-tabs__close"
          aria-label="关闭标签页"
          @click.stop="removePane(pane)"
        >
          ×
        </button>
      </div>
    </div>
    <div class="z-tabs__content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, provide, ref } from 'vue'
import { createNamespace } from '@z-ui/utils/create'
import { tabsKey, tabsProps, type TabPaneRecord } from './tabs'

defineOptions({ name: 'ZTabs' })

const props = defineProps(tabsProps)
const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
  (event: 'change', value: string): void
  (event: 'tabClick', value: string): void
  (event: 'tabRemove', value: string): void
}>()
const bem = createNamespace('tabs')
const panes = ref<TabPaneRecord[]>([])

const activeName = computed(() => props.modelValue ?? props.defaultValue ?? panes.value[0]?.name)
const tabsClass = computed(() => [bem.b(), bem.m(props.type), bem.is('stretch', props.stretch)])

provide(tabsKey, {
  activeName,
  register(pane) {
    panes.value.push(pane)
    return () => {
      panes.value = panes.value.filter((item) => item.uid !== pane.uid)
    }
  },
})

function tabClass(pane: TabPaneRecord) {
  return [bem.e('tab'), bem.is('active', pane.name === activeName.value), bem.is('disabled', pane.disabled)]
}

function selectPane(pane: TabPaneRecord) {
  if (pane.disabled || pane.name === activeName.value) return
  emit('update:modelValue', pane.name)
  emit('change', pane.name)
  emit('tabClick', pane.name)
}

function removePane(pane: TabPaneRecord) {
  const wasActive = pane.name === activeName.value
  emit('tabRemove', pane.name)
  if (!wasActive) return
  const index = panes.value.findIndex((item) => item.uid === pane.uid)
  const nextPane = panes.value[index + 1] ?? panes.value[index - 1]
  if (nextPane) {
    emit('update:modelValue', nextPane.name)
    emit('change', nextPane.name)
  }
}
</script>
