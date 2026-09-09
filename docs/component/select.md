# Select 选择器

Select 用于从多个互斥选项中选择一个值，选项通过 Option 子组件定义。

## 基础用法

```vue
<script setup lang="ts">
import { ref } from 'vue'

const framework = ref('vue')
</script>

<template>
  <z-select v-model="framework" placeholder="选择框架">
    <z-option label="Vue 3" value="vue" />
    <z-option label="React" value="react" />
    <z-option label="Svelte" value="svelte" />
  </z-select>
</template>
```

## 禁用和清除

```vue
<template>
  <z-select v-model="framework" clearable>
    <z-option label="Vue 3" value="vue" />
    <z-option label="React" value="react" disabled />
  </z-select>
  <z-select disabled model-value="vue">
    <z-option label="Vue 3" value="vue" />
  </z-select>
</template>
```

## 可筛选

```vue
<template>
  <z-select v-model="framework" filterable placeholder="搜索框架">
    <z-option label="Vue 3" value="vue" />
    <z-option label="React" value="react" />
    <z-option label="Svelte" value="svelte" />
  </z-select>
</template>
```

## API

### Select Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | `boolean \| string \| number \| undefined` | — | 当前选中的值，支持 `v-model` |
| `size` | `'small' \| 'default' \| 'large'` | `'default'` | 选择器尺寸 |
| `placeholder` | `string` | `'请选择'` | 没有选中值时的提示 |
| `clearable` | `boolean` | `false` | 是否显示清除按钮 |
| `filterable` | `boolean` | `false` | 是否可以输入筛选选项 |
| `disabled` | `boolean` | `false` | 是否禁用 |

### Option Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` | `boolean \| string \| number` | — | 选项值，未传时使用 `label` |
| `label` | `string` | `''` | 选项显示文本 |
| `disabled` | `boolean` | `false` | 是否禁用当前选项 |

### Events

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| `update:modelValue` | `boolean \| string \| number \| undefined` | 选择或清除时触发 |
| `change` | `boolean \| string \| number \| undefined` | 选择或清除时触发 |

