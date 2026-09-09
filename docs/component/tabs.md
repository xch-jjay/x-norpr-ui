# Tabs 标签页

Tabs 用于在同一区域切换多个相关内容面板，支持线型、卡片型、禁用和关闭标签。

```vue
<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('overview')
</script>

<template>
  <z-tabs v-model="activeTab">
    <z-tab-pane name="overview" label="概览">概览内容</z-tab-pane>
    <z-tab-pane name="logs" label="日志">日志内容</z-tab-pane>
  </z-tabs>
</template>
```

## 卡片型标签

```vue
<z-tabs type="card" stretch>
  <z-tab-pane name="one" label="待处理">待处理列表</z-tab-pane>
  <z-tab-pane name="two" label="已完成">已完成列表</z-tab-pane>
</z-tabs>
```

### Tabs Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | `string` | 第一个面板 | 当前面板名称 |
| `defaultValue` | `string` | — | 非受控初始面板名称 |
| `type` | `'line' \\| 'card'` | `'line'` | 标签样式 |
| `stretch` | `boolean` | `false` | 是否平分导航宽度 |
| `closable` | `boolean` | `false` | 是否允许关闭标签 |

### TabPane Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `name` | `string` | — | 面板唯一名称 |
| `label` | `string` | — | 标签标题 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `closable` | `boolean` | `false` | 是否允许关闭当前标签 |
