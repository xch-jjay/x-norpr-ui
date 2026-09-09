# Alert 提示

Alert 用于展示需要用户注意的状态、结果或说明信息，支持成功、警告、信息和危险四种类型。

## 基础用法

```vue
<z-alert title="保存成功" description="数据已经保存。" type="success" />
```

## 类型和图标

```vue
<template>
  <z-alert title="提示信息" type="info" />
  <z-alert title="请注意" type="warning" show-icon />
  <z-alert title="操作失败" type="danger" show-icon />
</template>
```

## 可关闭

```vue
<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(true)
</script>

<template>
  <z-alert v-model:visible="visible" closable title="可以关闭的提示" />
</template>
```

也可以使用默认插槽和标题插槽自定义内容：

```vue
<z-alert type="info">
  <template #title>自定义标题</template>
  这里是详细说明。
</z-alert>
```

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `title` | `string` | — | 标题文本 |
| `description` | `string` | — | 说明文本 |
| `type` | `'success' \| 'warning' \| 'info' \| 'danger'` | `'info'` | 提示类型 |
| `visible` | `boolean` | `true` | 是否显示 |
| `closable` | `boolean` | `true` | 是否显示关闭按钮 |
| `showIcon` | `boolean` | `false` | 是否显示类型图标 |
| `center` | `boolean` | `false` | 是否居中显示 |

### Events

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| `update:visible` | `boolean` | 关闭时触发 |
| `close` | `MouseEvent` | 点击关闭按钮时触发 |

