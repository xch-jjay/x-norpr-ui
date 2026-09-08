# Card 卡片

Card 是通用内容容器，提供标题、主体和底部插槽，并支持常驻、悬浮和无阴影三种阴影模式。

```vue
<z-card header="订单概览" shadow="hover">
  这里是卡片内容。
  <template #footer>更新时间：刚刚</template>
</z-card>
```

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `header` | `string` | — | 标题文本，也可使用 `header` 插槽 |
| `footer` | `string` | — | 底部文本，也可使用 `footer` 插槽 |
| `shadow` | `'always' \\| 'hover' \\| 'never'` | `'always'` | 阴影显示方式 |
| `body-padding` | `string` | `'20px'` | 主体内边距 |
