# Button 按钮

Button 用于触发操作，是后台系统中最常用的基础组件。

## 基础用法

```vue
<template>
  <z-button type="primary">保存</z-button>
  <z-button>取消</z-button>
</template>
```

## 类型与尺寸

```vue
<template>
  <z-button type="success">成功</z-button>
  <z-button type="warning">警告</z-button>
  <z-button type="danger">删除</z-button>
  <z-button type="primary" size="large">大号按钮</z-button>
  <z-button size="small">小号按钮</z-button>
</template>
```

## 状态与形状

```vue
<template>
  <z-button plain>朴素按钮</z-button>
  <z-button round>圆角按钮</z-button>
  <z-button :loading="loading">提交中</z-button>
  <z-button disabled>不可用</z-button>
  <z-button block>撑满容器</z-button>
</template>
```

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `type` | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'default'` | 按钮类型 |
| `size` | `'small' \| 'default' \| 'large'` | `'default'` | 按钮尺寸 |
| `nativeType` | `'button' \| 'submit' \| 'reset'` | `'button'` | 原生 button 类型 |
| `loading` | `boolean` | `false` | 显示加载状态并阻止点击 |
| `disabled` | `boolean` | `false` | 禁用按钮 |
| `plain` | `boolean` | `false` | 使用浅色背景 |
| `round` | `boolean` | `false` | 使用圆角 |
| `circle` | `boolean` | `false` | 使用圆形按钮 |
| `block` | `boolean` | `false` | 宽度撑满父容器 |

### Events

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| `click` | `MouseEvent` | 按钮可用时触发 |

### Slots

| 名称 | 说明 |
| --- | --- |
| `default` | 按钮内容 |
