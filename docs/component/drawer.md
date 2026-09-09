# Drawer 抽屉

Drawer 从屏幕边缘滑出，用于承载筛选条件、详情或辅助编辑内容。

```vue
<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>

<template>
  <z-button @click="visible = true">打开抽屉</z-button>
  <z-drawer v-model="visible" title="筛选条件" size="360px">
    <p>这里放置筛选表单。</p>
    <template #footer>
      <z-button @click="visible = false">取消</z-button>
      <z-button type="primary" @click="visible = false">应用</z-button>
    </template>
  </z-drawer>
</template>
```

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | `boolean` | `false` | 是否显示 |
| `title` | `string` | — | 标题文本 |
| `direction` | `'left' \\| 'right' \\| 'top' \\| 'bottom'` | `'right'` | 打开方向 |
| `size` | `string` | `'30%'` | 抽屉宽度或高度 |
| `modal` | `boolean` | `true` | 是否显示遮罩 |
| `closeOnClickModal` | `boolean` | `true` | 点击遮罩是否关闭 |
| `closeOnPressEscape` | `boolean` | `true` | 按 Escape 是否关闭 |
| `showClose` | `boolean` | `true` | 是否显示关闭按钮 |
| `lockScroll` | `boolean` | `true` | 是否锁定页面滚动 |
| `destroyOnClose` | `boolean` | `false` | 关闭后是否卸载内容 |
