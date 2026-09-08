<script setup lang="ts">
import { AirplaneSharp } from '@vicons/ionicons5'
import { ref } from 'vue'

const loading = ref(false)
const keyword = ref('')
const preferences = ref(['vue'])
const layout = ref('comfortable')
const autoSave = ref(true)
const quantity = ref(2)

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
    <z-input v-model="keyword" clearable placeholder="请输入关键字" />
    <z-checkbox v-model="loading">启用自动保存</z-checkbox>
    <z-checkbox-group v-model="preferences">
      <z-checkbox label="vue">Vue 3</z-checkbox>
      <z-checkbox label="ts">TypeScript</z-checkbox>
    </z-checkbox-group>
    <z-radio-group v-model="layout">
      <z-radio label="comfortable">舒适</z-radio>
      <z-radio label="compact">紧凑</z-radio>
    </z-radio-group>
    <z-switch v-model="autoSave" active-text="自动保存" inactive-text="手动保存" />
    <z-input-number v-model="quantity" :min="0" :max="10" />
  </div>
</template>

<style scoped>
z-button + z-button {
  margin-left: 8px;
}

z-input {
  display: block;
  max-width: 320px;
  margin-top: 16px;
}

z-checkbox,
z-checkbox-group,
z-radio-group {
  display: flex;
  margin-top: 16px;
}
</style>
