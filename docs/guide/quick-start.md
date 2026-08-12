# 快速开始

## 全局注册

```ts
import { createApp } from 'vue'
import ZUI from 'z-ui'
import 'z-ui/style.css'
import App from './App.vue'

createApp(App).use(ZUI).mount('#app')
```

然后可以直接使用组件：

```vue
<template>
  <z-icon color="var(--z-color-primary)" :size="20">
    <span aria-hidden="true">★</span>
  </z-icon>
</template>
```

## 按需使用

```ts
import { Icon } from 'z-ui'
import 'z-ui/style.css'
```
