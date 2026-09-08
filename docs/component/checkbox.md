# Checkbox 复选框

Checkbox 用于表示一个布尔选择，也可以通过 CheckboxGroup 管理多个选项。

## 基础用法

```vue
<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(false)
</script>

<template>
  <z-checkbox v-model="checked">同意服务条款</z-checkbox>
</template>
```

## 复选框组

```vue
<script setup lang="ts">
import { ref } from 'vue'

const languages = ref(['vue'])
</script>

<template>
  <z-checkbox-group v-model="languages">
    <z-checkbox label="vue">Vue 3</z-checkbox>
    <z-checkbox label="react">React</z-checkbox>
    <z-checkbox label="ts">TypeScript</z-checkbox>
  </z-checkbox-group>
</template>
```

## 尺寸、禁用和半选

```vue
<template>
  <z-checkbox size="small">小尺寸</z-checkbox>
  <z-checkbox size="large">大尺寸</z-checkbox>
  <z-checkbox disabled>不可选</z-checkbox>
  <z-checkbox indeterminate>部分选择</z-checkbox>
</template>
```

CheckboxGroup 支持 `min` 和 `max` 限制最少、最多选择数量。

## API

### Checkbox Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | `boolean \| string \| number` | `false` | 单个复选框的值，支持 `v-model` |
| `label` | `boolean \| string \| number` | — | 在 CheckboxGroup 中代表当前选项的值 |
| `trueValue` | `boolean \| string \| number` | `true` | 选中时写入的值 |
| `falseValue` | `boolean \| string \| number` | `false` | 未选中时写入的值 |
| `size` | `'small' \| 'default' \| 'large'` | — | 组件尺寸，优先于分组尺寸 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `indeterminate` | `boolean` | `false` | 是否显示半选状态 |

### CheckboxGroup Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | `Array<boolean \| string \| number>` | `[]` | 当前选中项的值 |
| `size` | `'small' \| 'default' \| 'large'` | `'default'` | 子复选框默认尺寸 |
| `disabled` | `boolean` | `false` | 是否禁用整个分组 |
| `min` | `number` | — | 最少选择数量 |
| `max` | `number` | — | 最多选择数量 |

### Events

| 组件 | 事件名 | 参数 | 说明 |
| --- | --- | --- | --- |
| Checkbox | `update:modelValue` | `boolean \| string \| number` | 单个值变化时触发 |
| Checkbox | `change` | `boolean \| string \| number` | 单个值变化时触发 |
| CheckboxGroup | `update:modelValue` | `Array<boolean \| string \| number>` | 分组选项变化时触发 |
| CheckboxGroup | `change` | `Array<boolean \| string \| number>` | 分组选项变化时触发 |

