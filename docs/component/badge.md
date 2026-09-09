# Badge 徽标

Badge 用于在头像、图标或按钮上展示数量和状态点。

```vue
<z-badge :value="8">
  <z-button>通知</z-button>
</z-badge>
<z-badge is-dot><span>在线</span></z-badge>
```

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` | `string \\| number` | — | 徽标值 |
| `max` | `number` | — | 超过后显示为 `max+` |
| `is-dot` | `boolean` | `false` | 是否显示小圆点 |
| `hidden` | `boolean` | `false` | 是否隐藏 |
| `show-zero` | `boolean` | `false` | 是否显示数字 0 |
| `type` | `'primary' \\| 'success' \\| 'warning' \\| 'danger' \\| 'info'` | `'danger'` | 颜色类型 |
| `color` | `string` | — | 自定义颜色 |
| `offset` | `[number, number]` | — | 相对默认位置的偏移量 |
