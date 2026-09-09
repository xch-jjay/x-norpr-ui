# Tag 标签

Tag 用于标记分类、状态或属性，支持类型、尺寸、颜色、圆角和关闭操作。

```vue
<z-tag type="success">已完成</z-tag>
<z-tag type="warning" effect="plain">待处理</z-tag>
<z-tag closable @close="removeTag">可关闭</z-tag>
```

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `type` | `'success' \\| 'info' \\| 'warning' \\| 'danger'` | — | 语义类型 |
| `size` | `'small' \\| 'default' \\| 'large'` | — | 标签尺寸 |
| `effect` | `'light' \\| 'dark' \\| 'plain'` | `'light'` | 显示效果 |
| `closable` | `boolean` | `false` | 是否显示关闭按钮 |
| `round` | `boolean` | `false` | 是否使用圆角 |
| `hit` | `boolean` | `false` | 是否显示强调边框 |
| `color` | `string` | — | 自定义颜色 |
