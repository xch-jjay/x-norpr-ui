<script setup lang="ts">
import { AirplaneSharp } from '@vicons/ionicons5'
import { ref } from 'vue'

const loading = ref(false)

function handleClick() {
  loading.value = true
  window.setTimeout(() => {
    loading.value = false
  }, 800)
}
</script>

<template>
  <div>
    <z-button type="primary" @click="handleClick">保存</z-button>
    <z-button type="success">成功</z-button>
    <z-button type="danger" :loading="loading">删除</z-button>
    <z-icon color="red" :size="20">
      <AirplaneSharp />
    </z-icon>
  </div>
</template>

<style scoped>
z-button + z-button {
  margin-left: 8px;
}
</style>
