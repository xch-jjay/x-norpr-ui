# 主题定制

z-ui 使用 CSS 自定义属性作为设计变量。引入组件库样式后，可以在业务项目中覆盖变量，从而统一调整颜色、尺寸、圆角和交互效果。

## 基础用法

先引入组件库样式，再在业务样式中覆盖变量：

```ts
import '@xch-jjay/z-ui/style.css'
import './theme.css'
```

```css
:root {
  --z-color-primary: #7c3aed;
  --z-color-primary-light-3: #9f67ef;
  --z-color-primary-light-7: #d8c2fa;
  --z-color-primary-light-9: #f1ebfc;
  --z-border-radius-base: 8px;
}
```

覆盖变量时，建议同时覆盖同一色彩状态的浅色变量，确保按钮悬停和输入框聚焦状态保持一致。

## 颜色变量

| 变量 | 默认值 | 用途 |
| --- | --- | --- |
| `--z-color-primary` | `#409eff` | 品牌色和主要交互状态 |
| `--z-color-success` | `#67c23a` | 成功状态 |
| `--z-color-warning` | `#e6a23c` | 警告状态 |
| `--z-color-danger` | `#f56c6c` | 危险状态 |
| `--z-color-info` | `#909399` | 信息状态 |
| `--z-color-text-primary` | `#303133` | 主要文本 |
| `--z-color-text-regular` | `#606266` | 常规文本 |
| `--z-color-text-secondary` | `#909399` | 次要文本 |
| `--z-color-text-placeholder` | `#a8abb2` | 占位文本 |
| `--z-color-border` | `#dcdfe6` | 常规边框 |
| `--z-color-fill` | `#f5f7fa` | 禁用和辅助背景 |

主色还提供 `light-3`、`light-7` 和 `light-9` 三个浅色变量，分别用于悬停、边框和浅色背景场景。

## 尺寸和基础变量

| 变量 | 默认值 | 用途 |
| --- | --- | --- |
| `--z-component-size-small` | `24px` | 小尺寸组件高度 |
| `--z-component-size-default` | `32px` | 默认组件高度 |
| `--z-component-size-large` | `40px` | 大尺寸组件高度 |
| `--z-font-size-small` | `12px` | 辅助文本 |
| `--z-font-size-base` | `14px` | 默认文本 |
| `--z-font-size-large` | `16px` | 大号文本 |
| `--z-border-radius-base` | `4px` | 默认圆角 |
| `--z-border-radius-round` | `999px` | 胶囊和圆形圆角 |
| `--z-transition-duration` | `0.2s` | 交互过渡时长 |

## 局部覆盖

如果只想改变一个区域，可以在容器上覆盖变量，不影响其他页面：

```vue
<template>
  <section class="settings-panel">
    <z-button type="primary">保存设置</z-button>
    <z-input placeholder="搜索设置" />
  </section>
</template>

<style>
.settings-panel {
  --z-color-primary: #0f766e;
  --z-color-primary-light-3: #3d9a92;
  --z-color-primary-light-7: #a8d4d0;
  --z-color-primary-light-9: #e7f4f2;
}
</style>
```

组件会从自身或祖先元素读取 CSS 变量，因此局部主题不需要复制组件样式，也不需要重新构建 npm 包。
