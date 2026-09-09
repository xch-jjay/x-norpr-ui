# 稳定性检查

z-ui 的 Pull Request 和版本发布都需要经过同一套基础质量检查，确保组件、类型和 npm 包在发布前保持可用。

## 本地检查顺序

在项目根目录执行：

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm test:coverage
pnpm build
pnpm docs:build
pnpm package:check
```

其中：

- `pnpm test:coverage` 使用 Vitest 和 V8 统计组件源码覆盖率，并检查最低阈值。
- `pnpm package:check` 会检查 npm 压缩包内容、包元数据、类型入口、消费者安装、SSR 导入和构建产物体积。
- `pnpm package:ssr` 在没有浏览器 `window`、`document` 的 Node.js 环境中导入 ESM 入口，避免发布包在 SSR 项目中初始化失败。
- `pnpm package:size` 检查 ESM、CommonJS 和 CSS 构建产物的体积上限，防止无意中引入过大的依赖。

## CI 与发布的区别

Pull Request 会运行完整的 lint、类型、单元测试、覆盖率、组件构建、文档构建和 npm 包检查。推送版本标签时，发布工作流会再次构建并检查，然后才执行 npm 发布。

发布工作流不会跳过本地已经通过的检查，因为发布包必须以标签对应的提交重新生成，避免构建产物与源码不一致。

## 当前门禁阈值

覆盖率阈值是稳定候选阶段的起点，不代表每个组件都必须达到相同数字：

| 指标 | 最低值 |
| --- | ---: |
| Statements | 85% |
| Lines | 85% |
| Functions | 75% |
| Branches | 65% |

新增组件应同时补充行为测试；如果功能包含服务、传送门、键盘交互或多分支状态，测试重点应覆盖用户可观察行为，而不是只追求行数。
