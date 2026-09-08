<template>
  <nav class="z-breadcrumb" aria-label="面包屑导航">
    <slot />
  </nav>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue'
import { breadcrumbKey, breadcrumbProps } from './breadcrumb'

defineOptions({ name: 'ZBreadcrumb' })

const props = defineProps(breadcrumbProps)
const separator = computed(() => props.separator)
let itemCount = 0

provide(breadcrumbKey, {
  separator,
  register: () => itemCount++,
})
</script>
