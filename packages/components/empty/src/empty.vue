<template>
  <div class="z-empty" role="status">
    <div class="z-empty__image" :style="imageStyle">
      <slot name="image">
        <img v-if="props.image" :src="props.image" alt="" />
        <span v-else aria-hidden="true">∅</span>
      </slot>
    </div>
    <p class="z-empty__description">
      <slot name="description">{{ props.description }}</slot>
    </p>
    <div v-if="$slots.default" class="z-empty__bottom">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { emptyProps } from './empty'

defineOptions({ name: 'ZEmpty' })

const props = defineProps(emptyProps)
const imageStyle = computed(() => props.imageSize ? {
  width: `${props.imageSize}px`,
  height: `${props.imageSize}px`,
} : undefined)
</script>
