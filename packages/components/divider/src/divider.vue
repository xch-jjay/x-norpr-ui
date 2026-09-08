<template>
  <div
    :class="dividerClass"
    role="separator"
    :aria-orientation="props.direction"
  >
    <template v-if="hasContent">
      <span class="z-divider__line z-divider__line--before" />
      <span class="z-divider__content"><slot>{{ props.content }}</slot></span>
      <span class="z-divider__line z-divider__line--after" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { createNamespace } from '@z-ui/utils/create'
import { dividerProps } from './divider'

defineOptions({ name: 'ZDivider' })

const props = defineProps(dividerProps)
const slots = useSlots()
const bem = createNamespace('divider')

const hasContent = computed(() => Boolean(props.content || slots.default))
const dividerClass = computed(() => [
  bem.b(),
  bem.m(props.direction),
  bem.m(props.borderStyle),
  bem.is('with-content', hasContent.value),
  bem.is(props.contentPosition, hasContent.value && props.direction === 'horizontal'),
])
</script>
