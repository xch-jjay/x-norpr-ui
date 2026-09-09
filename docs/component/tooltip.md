# Tooltip 文字提示

Tooltip 在用户悬浮、聚焦或点击目标时显示补充说明。首版使用轻量 CSS 定位，适合短文本提示。

```vue
<z-tooltip content="保存当前配置">
  <z-button>保存</z-button>
</z-tooltip>
```

## 触发方式和延迟

```vue
<z-tooltip content="点击查看详情" trigger="click" :show-after="200">
  <z-button>详情</z-button>
</z-tooltip>
```

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `content` | `string` | — | 提示文本 |
| `placement` | `'top' \\| 'bottom' \\| 'left' \\| 'right'` | `'top'` | 显示方向 |
| `trigger` | `'hover' \\| 'focus' \\| 'click'` | `'hover'` | 触发方式 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `show-after` | `number` | `0` | 显示延迟，单位毫秒 |
| `hide-after` | `number` | `0` | 隐藏延迟，单位毫秒 |

复杂的边界避让和箭头定位暂不属于首个稳定版的承诺范围。
