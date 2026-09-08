<script setup lang="ts">
import { AirplaneSharp } from '@vicons/ionicons5'
import { LoadingService, Message } from '@xch-jjay/z-ui'
import { ref } from 'vue'

const loading = ref(false)
const keyword = ref('')
const preferences = ref(['vue'])
const layout = ref('comfortable')
const autoSave = ref(true)
const quantity = ref(2)
const framework = ref('vue')
const profile = ref({ nickname: '' })
const users = ref([
  { id: 1, name: '小明', role: '管理员', age: 18 },
  { id: 2, name: '小红', role: '编辑', age: 20 },
])
const formRef = ref<{ validate: () => Promise<boolean> }>()
const formMessage = ref('')
const showAlert = ref(true)
const showDialog = ref(false)
const currentPage = ref(1)

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

function showLoading() {
  const loading = LoadingService({ text: '处理中' })
  window.setTimeout(loading.close, 800)
}
</script>

<template>
  <div>
    <z-button type="primary" @click="handleClick">保存</z-button>
    <z-button type="success">成功</z-button>
    <z-button type="danger" :loading="loading">删除</z-button>
    <z-space size="small">
      <z-button>批量操作</z-button>
      <z-button type="primary">导出</z-button>
    </z-space>
    <z-divider content="表单演示" content-position="left" />
    <z-card header="展示组件" shadow="hover">
      <z-space size="small">
        <z-tag type="success">已完成</z-tag>
        <z-badge :value="8"><z-button>通知</z-button></z-badge>
      </z-space>
      <template #footer>Card、Tag 和 Badge</template>
    </z-card>
    <z-empty description="暂无更多数据">
      <z-button type="primary">重新加载</z-button>
    </z-empty>
    <z-pagination v-model:current-page="currentPage" :total="128" :page-size="10" background />
    <z-breadcrumb separator=">">
      <z-breadcrumb-item to="/">首页</z-breadcrumb-item>
      <z-breadcrumb-item to="/demo">组件</z-breadcrumb-item>
      <z-breadcrumb-item current>演示</z-breadcrumb-item>
    </z-breadcrumb>
    <z-tabs v-model="framework" type="card">
      <z-tab-pane name="vue" label="Vue 3">Vue 3 组件示例</z-tab-pane>
      <z-tab-pane name="react" label="React">当前项目仅支持 Vue 3</z-tab-pane>
    </z-tabs>
    <z-table :data="users" border stripe>
      <z-table-column prop="name" label="姓名" />
      <z-table-column prop="role" label="角色" />
      <z-table-column prop="age" label="年龄" sortable />
    </z-table>
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
    <z-button @click="showLoading">显示 Loading</z-button>
    <z-button @click="showDialog = true">打开 Dialog</z-button>
    <z-dialog v-model="showDialog" title="编辑资料">
      <p>Dialog 支持遮罩、Escape、焦点回收和滚动锁定。</p>
      <template #footer>
        <z-button @click="showDialog = false">取消</z-button>
        <z-button type="primary" @click="showDialog = false">保存</z-button>
      </template>
    </z-dialog>
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
