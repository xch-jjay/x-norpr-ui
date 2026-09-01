# Input 输入框

Input 用于接收用户输入，支持双向绑定、原生输入类型、清除内容和前后缀插槽。

## 基础用法

```vue
<script setup lang="ts">
import { ref } from 'vue'

const keyword = ref('')
</script>

<template>
  <z-input v-model="keyword" placeholder="请输入关键字" />
</template>
```

## 尺寸和状态

```vue
<template>
  <z-input size="small" placeholder="小尺寸" />
  <z-input placeholder="默认尺寸" />
  <z-input size="large" placeholder="大尺寸" />
  <z-input model-value="只读内容" readonly />
  <z-input model-value="不可编辑" disabled />
</template>
```

## 清除和字数限制

```vue
<template>
  <z-input
    v-model="keyword"
    clearable
    maxlength="30"
    show-word-limit
    placeholder="输入后可以清除"
  />
</template>
```

## 前缀和后缀

```vue
<template>
  <z-input placeholder="搜索内容">
    <template #prefix>⌕</template>
    <template #suffix>.com</template>
  </z-input>
</template>
```

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | `string` | `''` | 输入框的值，支持 `v-model` |
| `type` | `'text' \| 'password' \| 'email' \| 'number' \| 'search' \| 'tel' \| 'url'` | `'text'` | 原生输入类型 |
| `size` | `'small' \| 'default' \| 'large'` | `'default'` | 输入框尺寸 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `readonly` | `boolean` | `false` | 是否只读 |
| `placeholder` | `string` | — | 占位文本 |
| `clearable` | `boolean` | `false` | 有内容时显示清除按钮 |
| `maxlength` | `number` | — | 最大输入长度 |
| `showWordLimit` | `boolean` | `false` | 显示当前字数和最大字数 |

### Events

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| `update:modelValue` | `string` | 输入内容变化时触发 |
| `input` | `string` | 输入内容变化时触发 |
| `change` | `string` | 原生 change 事件触发 |
| `focus` | `FocusEvent` | 获得焦点时触发 |
| `blur` | `FocusEvent` | 失去焦点时触发 |
| `clear` | — | 点击清除按钮时触发 |

### Slots

| 名称 | 说明 |
| --- | --- |
| `prefix` | 输入框前缀内容 |
| `suffix` | 输入框后缀内容 |

### Exposes

| 方法 | 说明 |
| --- | --- |
| `focus()` | 让输入框获得焦点 |
| `blur()` | 让输入框失去焦点 |
