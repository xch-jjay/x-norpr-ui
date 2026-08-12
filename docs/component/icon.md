# Icon 图标

Icon 用于承载图标或其他简短的视觉内容。z-ui 不内置图标集合，你可以配合任意 Vue 图标组件使用。

## 基础用法

```vue
<template>
  <z-icon color="tomato" :size="24">
    ★
  </z-icon>
</template>
```

## 配合图标库

```bash
pnpm add @vicons/ionicons5
```

```vue
<script setup lang="ts">
import { AirplaneSharp } from '@vicons/ionicons5'
</script>

<template>
  <z-icon color="#409eff" :size="24">
    <AirplaneSharp />
  </z-icon>
</template>
```

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `color` | `string` | — | 图标颜色 |
| `size` | `number \| string` | — | 图标尺寸。数字会转换为像素值，字符串可传 `1em`、`24px` 等 |

### Slots

| 名称 | 说明 |
| --- | --- |
| `default` | 图标内容 |
