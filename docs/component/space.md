# Space 间距

Space 用于统一管理多个元素之间的间距，支持横向、纵向、换行和填充布局。

## 基础用法

```vue
<z-space size="small">
  <z-button>取消</z-button>
  <z-button type="primary">确定</z-button>
</z-space>
```

## 纵向与换行

```vue
<z-space direction="vertical" :size="16" wrap>
  <z-input placeholder="姓名" />
  <z-input placeholder="邮箱" />
</z-space>
```

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `direction` | `'horizontal' \\| 'vertical'` | `'horizontal'` | 排列方向 |
| `size` | `'small' \\| 'default' \\| 'large' \\| number \\| string` | `'default'` | 间距大小，数字单位为 px |
| `align` | `'start' \\| 'end' \\| 'center' \\| 'baseline' \\| 'stretch'` | `'center'` | 交叉轴对齐方式 |
| `wrap` | `boolean` | `false` | 是否允许换行 |
| `fill` | `boolean` | `false` | 是否让子元素填充可用宽度 |
