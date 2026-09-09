# Pagination 分页

Pagination 用于在后台列表或搜索结果中切换数据页，支持总数、页码窗口、禁用和受控 `v-model`。

```vue
<script setup lang="ts">
import { ref } from 'vue'

const currentPage = ref(1)
</script>

<template>
  <z-pagination v-model:current-page="currentPage" :total="256" :page-size="20" />
</template>
```

## 大量页码

当页数超过 `pager-count` 时，组件会用省略号折叠中间页码：

```vue
<z-pagination :total="1000" :page-size="10" :pager-count="7" background />
```

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `total` | `number` | `0` | 数据总条数 |
| `page-size` | `number` | `10` | 每页条数 |
| `current-page` | `number` | `1` | 当前页码 |
| `page-count` | `number` | 根据 total 计算 | 直接指定总页数 |
| `pager-count` | `number` | `7` | 页码按钮数量，自动调整为奇数 |
| `size` | `'small' \\| 'default' \\| 'large'` | — | 尺寸 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `hide-on-single-page` | `boolean` | `false` | 只有一页时是否隐藏 |
| `background` | `boolean` | `false` | 是否显示按钮背景 |

### Events

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| `update:currentPage` | `number` | 当前页变化时触发 |
| `change` | `number` | 当前页变化时触发 |
