<script setup lang="ts">
import { AirplaneSharp } from '@vicons/ionicons5'
import { Message } from '@xch-jjay/z-ui'
import { ref } from 'vue'

const loading = ref(false)
const keyword = ref('')
const preferences = ref(['vue'])
const layout = ref('comfortable')
const autoSave = ref(true)
const quantity = ref(2)
const framework = ref('vue')
const profile = ref({ nickname: '' })
const formRef = ref<{ validate: () => Promise<boolean> }>()
const formMessage = ref('')
const showAlert = ref(true)

async function validateProfile() {
  formMessage.value = (await formRef.value?.validate()) ? '校验通过' : '请完善表单'
}

function handleClick() {
  loading.value = true
  window.setTimeout(() => {
    loading.value = false
  }, 800)
}

function showMessage() {
  Message.success('操作成功，消息会自动关闭')
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
    <z-select v-model="framework" placeholder="选择框架">
      <z-option label="Vue 3" value="vue" />
      <z-option label="React" value="react" />
      <z-option label="Svelte" value="svelte" />
    </z-select>
    <z-form ref="formRef" :model="profile" :rules="{ nickname: { required: true, message: '请输入昵称' } }">
      <z-form-item prop="nickname" label="昵称">
        <z-input v-model="profile.nickname" placeholder="请输入昵称" />
      </z-form-item>
      <z-button type="primary" @click="validateProfile">校验表单</z-button>
      <span class="form-message">{{ formMessage }}</span>
    </z-form>
    <z-alert v-if="showAlert" title="保存成功" description="这是一个可关闭的提示。" type="success" show-icon @close="showAlert = false" />
    <z-button type="primary" @click="showMessage">显示 Message</z-button>
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

z-form {
  max-width: 480px;
  margin-top: 24px;
  text-align: left;
}

.form-message {
  margin-left: 12px;
  color: #606266;
}
</style>
