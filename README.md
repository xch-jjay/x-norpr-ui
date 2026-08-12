# z-ui

一个面向 Vue 3 的轻量级、TypeScript 优先的组件库，适合个人项目和中小型后台系统。

> 当前项目处于早期开发阶段，API 可能发生变化。

## 特性

- 基于 Vue 3 Composition API
- 使用 TypeScript 编写
- 支持全量注册和按需引入
- 组件、样式、文档和 playground 使用 pnpm workspace 管理
- MIT License

## 安装

```bash
npm install z-ui
```

```bash
yarn add z-ui
```

```bash
pnpm add z-ui
```

## 快速使用

```ts
import { createApp } from 'vue'
import ZUI from 'z-ui'
import 'z-ui/style.css'
import App from './App.vue'

createApp(App).use(ZUI).mount('#app')
```

```vue
<template>
  <z-icon color="tomato" :size="20">★</z-icon>
</template>
```

## 当前组件

- Icon

首个稳定版本将围绕基础交互、表单、反馈、布局和展示场景逐步完善。

## 本地开发

```bash
pnpm install
pnpm dev
pnpm test
pnpm build
pnpm docs:dev
```

本地开发需要 Node.js 22.13 或更高版本。

提交代码前建议运行完整检查：

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm docs:build
pnpm pack:check
```

项目通过 GitHub Actions 自动检查 Pull Request。npm 发布只在推送版本标签后执行，具体流程见 [RELEASE.md](./RELEASE.md)。

## 许可证

[MIT](./LICENSE)
