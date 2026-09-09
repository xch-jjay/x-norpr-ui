<template>
  <span v-if="false" />
</template>

<script setup lang="ts">
import { inject, onBeforeUnmount } from 'vue'
import { tableColumnProps, tableKey } from './table'

defineOptions({ name: 'ZTableColumn' })

const props = defineProps(tableColumnProps)
const context = inject(tableKey)
const column = {
  uid: Math.random(),
  prop: props.prop,
  label: props.label,
  width: props.width,
  align: props.align,
  sortable: props.sortable,
}
const unregister = context?.register(column)

onBeforeUnmount(() => unregister?.())
</script>
