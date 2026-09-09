# Divider 分割线

Divider 用于分隔内容区域，支持横向、纵向、不同边框样式和文字内容。

## 基础用法

```vue
<z-divider />
<z-divider content="用户信息" />
<z-divider content-position="left">筛选条件</z-divider>
```

## 垂直分割线

```vue
<span>已完成</span>
<z-divider direction="vertical" />
<span>共 10 条</span>
```

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `direction` | `'horizontal' \\| 'vertical'` | `'horizontal'` | 分割线方向 |
| `border-style` | `'solid' \\| 'dashed' \\| 'dotted'` | `'solid'` | 边框样式 |
| `content-position` | `'left' \\| 'center' \\| 'right'` | `'center'` | 文字位置，仅横向有效 |
| `content` | `string` | — | 分割线文字，也可使用默认插槽 |
