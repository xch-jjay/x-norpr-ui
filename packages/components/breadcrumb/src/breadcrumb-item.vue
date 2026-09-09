<template>
  <span :class="itemClass">
    <span v-if="!isFirst" class="z-breadcrumb__separator" aria-hidden="true">{{ separator }}</span>
    <a v-if="props.to && !props.disabled" class="z-breadcrumb__link" :href="props.to">
      <slot />
    </a>
    <span v-else class="z-breadcrumb__text" :aria-current="props.current ? 'page' : undefined">
      <slot />
    </span>
  </span>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { createNamespace } from '@z-ui/utils/create'
import { breadcrumbItemProps, breadcrumbKey } from './breadcrumb'

defineOptions({ name: 'ZBreadcrumbItem' })

const props = defineProps(breadcrumbItemProps)
const context = inject(breadcrumbKey)
const index = context?.register() ?? 0
const bem = createNamespace('breadcrumb')
const isFirst = index === 0
const separator = computed(() => context?.separator.value ?? '/')
const itemClass = computed(() => [bem.e('item'), bem.is('disabled', props.disabled), bem.is('current', props.current)])
</script>
