<template>
  <div :class="tableClass">
    <table>
      <thead v-if="props.showHeader">
        <tr>
          <th
            v-for="column in columns"
            :key="column.uid"
            :style="columnStyle(column)"
            :class="cellClass(column.align)"
            :aria-sort="column.sortable && sortState.prop === column.prop ? ariaSort : undefined"
            @click="column.sortable && changeSort(column)"
          >
            <span>{{ column.label }}</span>
            <span v-if="column.sortable" class="z-table__sort-icon" aria-hidden="true">{{ sortIcon(column) }}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in sortedData" :key="rowKey(row, rowIndex)">
          <td v-for="column in columns" :key="column.uid" :class="cellClass(column.align)">
            {{ cellValue(row, column) }}
          </td>
        </tr>
        <tr v-if="sortedData.length === 0">
          <td class="z-table__empty" :colspan="Math.max(columns.length, 1)">{{ props.emptyText }}</td>
        </tr>
      </tbody>
    </table>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, provide, reactive, ref } from 'vue'
import { createNamespace } from '@z-ui/utils/create'
import { tableKey, tableProps, type TableColumnRecord, type TableData, type TableSortOrder } from './table'

defineOptions({ name: 'ZTable' })

const props = defineProps(tableProps)
const emit = defineEmits<{
  (event: 'sort-change', payload: { prop?: string; order: TableSortOrder }): void
}>()
const bem = createNamespace('table')
const columns = ref<TableColumnRecord[]>([])
const sortState = reactive<{ prop?: string; order: TableSortOrder }>({ order: undefined })

const tableClass = computed(() => [bem.b(), bem.is('border', props.border), bem.is('stripe', props.stripe)])
const ariaSort = computed(() => sortState.order === 'ascending' ? 'ascending' : 'descending')
const sortedData = computed(() => {
  if (!sortState.prop || !sortState.order) return props.data
  const direction = sortState.order === 'ascending' ? 1 : -1
  return [...props.data].sort((left, right) => compareValues(left[sortState.prop!], right[sortState.prop!]) * direction)
})

provide(tableKey, {
  register(column) {
    columns.value.push(column)
    return () => { columns.value = columns.value.filter((item) => item.uid !== column.uid) }
  },
})

function compareValues(left: unknown, right: unknown) {
  if (left === right) return 0
  if (left === undefined || left === null) return -1
  if (right === undefined || right === null) return 1
  if (typeof left === 'number' && typeof right === 'number') return left - right
  return String(left).localeCompare(String(right), 'zh-CN')
}

function rowKey(row: TableData, index: number) {
  return typeof row.id === 'string' || typeof row.id === 'number' ? row.id : index
}

function cellValue(row: TableData, column: TableColumnRecord) {
  if (!column.prop) return ''
  const value = row[column.prop]
  return value === undefined || value === null ? '' : String(value)
}

function columnStyle(column: TableColumnRecord) {
  return column.width ? { width: typeof column.width === 'number' ? `${column.width}px` : column.width } : undefined
}

function cellClass(align: string) {
  return `${bem.e('cell')} ${bem.m(align)}`
}

function sortIcon(column: TableColumnRecord) {
  if (sortState.prop !== column.prop || !sortState.order) return '↕'
  return sortState.order === 'ascending' ? '↑' : '↓'
}

function changeSort(column: TableColumnRecord) {
  if (!column.sortable) return
  if (sortState.prop !== column.prop) {
    sortState.prop = column.prop
    sortState.order = 'ascending'
  } else if (sortState.order === 'ascending') {
    sortState.order = 'descending'
  } else if (sortState.order === 'descending') {
    sortState.prop = undefined
    sortState.order = undefined
  } else {
    sortState.order = 'ascending'
  }
  emit('sort-change', { prop: sortState.prop, order: sortState.order })
}
</script>
