# Loading 加载

Loading 用于表示异步操作正在进行，支持组件方式和服务方式。服务方式适合页面级或局部区域加载，调用后返回可手动关闭的实例。

## 组件方式

```vue
<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)
</script>

<template>
  <div class="panel">
    <z-loading v-model="loading" text="加载中" />
    内容区域
  </div>
</template>
```

## 服务方式

```ts
import { LoadingService } from '@xch-jjay/z-ui'

const loading = LoadingService({ text: '提交中' })

window.setTimeout(() => {
  loading.close()
}, 1000)
```

服务默认挂载到 `body` 并锁定页面滚动。传入 `target` 可以将遮罩限制在指定元素内：

```ts
const loading = LoadingService({
  target: '#table-panel',
  text: '刷新列表中',
})
```

## API

### Props / LoadingOptions

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | `boolean` | `true` | 组件方式是否显示 |
| `text` | `string` | — | 加载提示文本 |
| `fullscreen` | `boolean` | `false` | 是否覆盖整个视口 |
| `lockScroll` | `boolean` | `false` | 是否锁定页面滚动 |
| `background` | `string` | 半透明白色 | 遮罩背景色 |
| `target` | `string \\| HTMLElement` | `'body'` | 遮罩挂载目标 |

服务方式返回：

```ts
interface LoadingInstance {
  close: () => void
}
```

服务只能在浏览器环境中调用；SSR 场景请放在客户端生命周期或事件处理函数中执行。
