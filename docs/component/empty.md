# Empty 空状态

Empty 用于列表、搜索或数据区域暂时没有内容时的占位提示。

```vue
<z-empty description="没有找到匹配的项目">
  <z-button type="primary">重新加载</z-button>
</z-empty>
```

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `description` | `string` | `'暂无数据'` | 描述文本 |
| `image` | `string` | — | 图片地址 |
| `image-size` | `number` | — | 图片区域尺寸，单位为 px |

也可以使用 `image`、`description` 和默认插槽自定义空状态内容。
