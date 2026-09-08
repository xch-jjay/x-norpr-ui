# InputNumber 数字输入框

InputNumber 用于输入数值，支持步长、范围、精度、键盘方向键和增减按钮。

## 基础用法

```vue
<script setup lang="ts">
import { ref } from 'vue'

const quantity = ref(2)
</script>

<template>
  <z-input-number v-model="quantity" />
</template>
```

## 范围、步长和精度

```vue
<template>
  <z-input-number
    v-model="quantity"
    :min="0"
    :max="10"
    :step="0.5"
    :precision="1"
  />
</template>
```

达到 `min` 或 `max` 后，对应的增减按钮会自动禁用。聚焦输入框后，也可以使用键盘的上、下方向键调整数值。

## 尺寸和状态

```vue
<template>
  <z-input-number size="small" />
  <z-input-number size="large" />
  <z-input-number controls="false" />
  <z-input-number readonly :model-value="10" />
  <z-input-number disabled :model-value="10" />
</template>
```

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | `number \| undefined` | — | 当前数值，支持 `v-model` |
| `min` | `number` | — | 最小值 |
| `max` | `number` | — | 最大值 |
| `step` | `number` | `1` | 每次增减的步长 |
| `precision` | `number` | — | 保留的小数位数 |
| `size` | `'small' \| 'default' \| 'large'` | `'default'` | 输入框尺寸 |
| `controls` | `boolean` | `true` | 是否显示增减按钮 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `readonly` | `boolean` | `false` | 是否只读 |

### Events

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| `update:modelValue` | `number \| undefined` | 输入值变化时触发 |
| `input` | `number \| undefined` | 输入值变化时触发 |
| `change` | `number \| undefined` | 提交或通过按钮调整后触发 |
| `focus` | `FocusEvent` | 获得焦点时触发 |
| `blur` | `FocusEvent` | 失去焦点时触发 |

### Exposes

| 方法 | 说明 |
| --- | --- |
| `focus()` | 让输入框获得焦点 |
| `blur()` | 让输入框失去焦点 |

