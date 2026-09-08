# Dialog 对话框

Dialog 用于承载需要用户确认或填写的内容，支持受控显示、遮罩、Esc 关闭、焦点管理和滚动锁定。

## 基础用法

```vue
<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>

<template>
  <z-button @click="visible = true">打开对话框</z-button>
  <z-dialog v-model="visible" title="编辑资料">
    <p>这里放置表单或确认内容。</p>
  </z-dialog>
</template>
```

## 底部操作区

```vue
<z-dialog v-model="visible" title="删除记录">
  确定删除这条记录吗？
  <template #footer>
    <z-button @click="visible = false">取消</z-button>
    <z-button type="danger" @click="confirmDelete">确定</z-button>
  </template>
</z-dialog>
```

关闭按钮、遮罩和 Escape 默认都会触发 `update:modelValue`。如果需要强制用户完成操作，可以关闭 `closeOnClickModal`、`closeOnPressEscape` 和 `showClose`。

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | `boolean` | `false` | 是否显示 |
| `title` | `string` | — | 标题文本 |
| `width` | `string` | `'520px'` | 内容宽度 |
| `top` | `string` | `'15vh'` | 非居中模式下距离顶部的距离 |
| `modal` | `boolean` | `true` | 是否显示遮罩 |
| `closeOnClickModal` | `boolean` | `true` | 点击遮罩是否关闭 |
| `closeOnPressEscape` | `boolean` | `true` | 按 Escape 是否关闭 |
| `showClose` | `boolean` | `true` | 是否显示关闭按钮 |
| `lockScroll` | `boolean` | `true` | 打开时是否锁定页面滚动 |
| `fullscreen` | `boolean` | `false` | 是否全屏显示 |
| `center` | `boolean` | `false` | 是否垂直水平居中 |
| `destroyOnClose` | `boolean` | `false` | 关闭后是否卸载内容 |

### Slots

| 插槽 | 说明 |
| --- | --- |
| `default` | 对话框主体内容 |
| `header` | 自定义头部 |
| `footer` | 底部操作区 |

### Events

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| `update:modelValue` | `boolean` | 关闭时触发，可用于 `v-model` |
| `open` / `opened` | — | 打开开始 / 完成时触发 |
| `close` / `closed` | — | 关闭开始 / 完成时触发 |
