# Table 表格

Table 用于展示结构化数据，首版支持列配置、空状态、边框、斑马纹和基础排序。

```vue
<script setup lang="ts">
import { ref } from 'vue'

const users = ref([
  { id: 1, name: '小明', role: '管理员', age: 18 },
  { id: 2, name: '小红', role: '编辑', age: 20 },
])
</script>

<template>
  <z-table :data="users" border stripe>
    <z-table-column prop="name" label="姓名" />
    <z-table-column prop="role" label="角色" />
    <z-table-column prop="age" label="年龄" sortable />
  </z-table>
</template>
```

## API

### Table Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `data` | `Record<string, unknown>[]` | `[]` | 表格数据 |
| `border` | `boolean` | `false` | 是否显示边框 |
| `stripe` | `boolean` | `false` | 是否显示斑马纹 |
| `show-header` | `boolean` | `true` | 是否显示表头 |
| `empty-text` | `string` | `'暂无数据'` | 空数据文本 |

### TableColumn Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `prop` | `string` | — | 数据字段名 |
| `label` | `string` | `''` | 表头文本 |
| `width` | `string \\| number` | — | 列宽，数字单位为 px |
| `align` | `'left' \\| 'center' \\| 'right'` | `'left'` | 对齐方式 |
| `sortable` | `boolean` | `false` | 是否允许点击排序 |

点击可排序表头会按升序、降序、取消排序循环，并触发 `sort-change`。
