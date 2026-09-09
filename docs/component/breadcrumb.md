# Breadcrumb 面包屑

Breadcrumb 用于展示当前页面在系统中的层级位置。

```vue
<z-breadcrumb separator=">">
  <z-breadcrumb-item to="/">首页</z-breadcrumb-item>
  <z-breadcrumb-item to="/users">用户管理</z-breadcrumb-item>
  <z-breadcrumb-item current>详情</z-breadcrumb-item>
</z-breadcrumb>
```

### Breadcrumb Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `separator` | `string` | `'/'` | 项目之间的分隔符 |

### BreadcrumbItem Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `to` | `string` | — | 链接地址 |
| `disabled` | `boolean` | `false` | 是否禁用链接 |
| `current` | `boolean` | `false` | 是否为当前页面 |
