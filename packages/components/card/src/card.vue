<template>
  <div :class="cardClass">
    <div v-if="$slots.header || props.header" class="z-card__header">
      <slot name="header">{{ props.header }}</slot>
    </div>
    <div class="z-card__body" :style="{ padding: props.bodyPadding }">
      <slot />
    </div>
    <div v-if="$slots.footer || props.footer" class="z-card__footer">
      <slot name="footer">{{ props.footer }}</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { createNamespace } from '@z-ui/utils/create'
import { cardProps } from './card'

defineOptions({ name: 'ZCard' })

const props = defineProps(cardProps)
const bem = createNamespace('card')
const cardClass = computed(() => [bem.b(), bem.m(props.shadow)])
</script>
