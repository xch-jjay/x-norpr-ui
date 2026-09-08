# Switch 开关

Switch 用于在两个互斥状态之间切换，适合设置项、启用状态和即时生效的开关场景。

## 基础用法

```vue
<script setup lang="ts">
import { ref } from 'vue'

const autoSave = ref(true)
</script>

<template>
  <z-switch v-model="autoSave" />
</template>
```

## 状态文本和尺寸

```vue
<template>
  <z-switch
    v-model="autoSave"
    active-text="自动保存"
    inactive-text="手动保存"
  />
  <z-switch v-model="autoSave" size="small" />
  <z-switch v-model="autoSave" size="large" />
</template>
```

## 自定义值、颜色和加载状态

```vue
<template>
  <z-switch
    v-model="status"
    active-value="enabled"
    inactive-value="disabled"
    active-color="#7c3aed"
    inactive-color="#cbd5e1"
    aria-label="服务状态"
  />
  <z-switch v-model="saving" loading />
  <z-switch v-model="locked" disabled />
</template>
```

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | `boolean \| string \| number` | `false` | 当前值，支持 `v-model` |
| `activeValue` | `boolean \| string \| number` | `true` | 开启状态对应的值 |
| `inactiveValue` | `boolean \| string \| number` | `false` | 关闭状态对应的值 |
| `size` | `'small' \| 'default' \| 'large'` | `'default'` | 开关尺寸 |
| `activeText` | `string` | — | 开启状态文本 |
| `inactiveText` | `string` | — | 关闭状态文本 |
| `ariaLabel` | `string` | — | 没有状态文本时的无障碍名称 |
| `activeColor` | `string` | 主题色 | 开启状态颜色 |
| `inactiveColor` | `string` | 边框色 | 关闭状态颜色 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `loading` | `boolean` | `false` | 显示加载状态并阻止切换 |

### Events

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| `update:modelValue` | `boolean \| string \| number` | 状态变化时触发 |
| `change` | `boolean \| string \| number` | 状态变化时触发 |

