<template>
  <nav v-if="!hidden" :class="paginationClass" aria-label="分页">
    <span v-if="props.total > 0" class="z-pagination__total">共 {{ props.total }} 条</span>
    <button
      type="button"
      class="z-pagination__button"
      aria-label="上一页"
      :disabled="props.disabled || props.currentPage <= 1"
      @click="changePage(props.currentPage - 1)"
    >
      ‹
    </button>
    <button
      v-for="item in items"
      :key="item"
      type="button"
      :class="itemClass(item)"
      :disabled="props.disabled || typeof item !== 'number'"
      :aria-current="item === props.currentPage ? 'page' : undefined"
      :aria-label="typeof item === 'number' ? `第 ${item} 页` : '更多页码'"
      @click="typeof item === 'number' && changePage(item)"
    >
      {{ typeof item === 'number' ? item : '…' }}
    </button>
    <button
      type="button"
      class="z-pagination__button"
      aria-label="下一页"
      :disabled="props.disabled || props.currentPage >= pageCount"
      @click="changePage(props.currentPage + 1)"
    >
      ›
    </button>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { createNamespace } from '@z-ui/utils/create'
import { paginationProps, type PaginationItem } from './pagination'

defineOptions({ name: 'ZPagination' })

const props = defineProps(paginationProps)
const emit = defineEmits<{
  (event: 'update:currentPage', value: number): void
  (event: 'change', value: number): void
}>()
const bem = createNamespace('pagination')

const pageCount = computed(() => Math.max(1, props.pageCount ?? Math.ceil(Math.max(0, props.total) / Math.max(1, props.pageSize))))
const pagerCount = computed(() => Math.max(5, props.pagerCount % 2 === 0 ? props.pagerCount + 1 : props.pagerCount))
const hidden = computed(() => props.hideOnSinglePage && pageCount.value <= 1)
const paginationClass = computed(() => [
  bem.b(),
  props.size && bem.m(props.size),
  bem.is('background', props.background),
])
const items = computed<PaginationItem[]>(() => {
  const count = pageCount.value
  const current = Math.min(Math.max(props.currentPage, 1), count)
  const visible = pagerCount.value
  if (count <= visible) return Array.from({ length: count }, (_, index) => index + 1)

  const side = Math.floor((visible - 1) / 2)
  let start = current - side
  let end = current + side
  if (start <= 1) {
    start = 1
    end = visible
  }
  if (end >= count) {
    end = count
    start = count - visible + 1
  }

  const result: PaginationItem[] = [1]
  if (start > 2) result.push('more-prev')
  for (let page = Math.max(2, start); page <= Math.min(count - 1, end); page += 1) result.push(page)
  if (end < count - 1) result.push('more-next')
  result.push(count)
  return result
})

function itemClass(item: PaginationItem) {
  return [
    bem.e('item'),
    typeof item !== 'number' && bem.is('more', true),
    item === props.currentPage && bem.is('active', true),
  ]
}

function changePage(page: number) {
  if (props.disabled) return
  const nextPage = Math.min(Math.max(page, 1), pageCount.value)
  if (nextPage === props.currentPage) return
  emit('update:currentPage', nextPage)
  emit('change', nextPage)
}
</script>
