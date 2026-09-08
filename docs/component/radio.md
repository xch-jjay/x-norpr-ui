# Radio 单选框

Radio 用于在多个互斥选项中选择一个值，RadioGroup 负责维护同一组单选项的值。

## 基础用法

```vue
<script setup lang="ts">
import { ref } from 'vue'

const layout = ref('comfortable')
</script>

<template>
  <z-radio-group v-model="layout">
    <z-radio label="comfortable">舒适</z-radio>
    <z-radio label="compact">紧凑</z-radio>
  </z-radio-group>
</template>
```

## 单独使用

单独使用时，`label` 是选中后写入 `modelValue` 的值：

```vue
<z-radio v-model="theme" label="dark">深色主题</z-radio>
```

## 尺寸和禁用

```vue
<template>
  <z-radio size="small" label="small">小尺寸</z-radio>
  <z-radio size="large" label="large">大尺寸</z-radio>
  <z-radio disabled label="disabled">不可选</z-radio>
</template>
```

## API

### Radio Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | `boolean \| string \| number` | `''` | 当前选中的值，支持 `v-model` |
| `label` | `boolean \| string \| number` | — | 当前单选项代表的值 |
| `name` | `string` | — | 原生 radio 的 name，分组内会自动生成 |
| `size` | `'small' \| 'default' \| 'large'` | — | 组件尺寸，优先于分组尺寸 |
| `disabled` | `boolean` | `false` | 是否禁用 |

### RadioGroup Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | `boolean \| string \| number` | `''` | 当前选中项的值 |
| `name` | `string` | — | 原生 radio 分组名称 |
| `size` | `'small' \| 'default' \| 'large'` | `'default'` | 子单选框默认尺寸 |
| `disabled` | `boolean` | `false` | 是否禁用整个分组 |

### Events

| 组件 | 事件名 | 参数 | 说明 |
| --- | --- | --- | --- |
| Radio | `update:modelValue` | `boolean \| string \| number` | 选项变化时触发 |
| Radio | `change` | `boolean \| string \| number` | 选项变化时触发 |
| RadioGroup | `update:modelValue` | `boolean \| string \| number` | 分组选项变化时触发 |
| RadioGroup | `change` | `boolean \| string \| number` | 分组选项变化时触发 |

