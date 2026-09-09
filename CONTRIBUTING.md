# 参与贡献

感谢你关注 z-ui。当前项目处于早期建设阶段，欢迎提交问题、建议和代码。

## 开发环境

- Node.js 22.13 或更高版本
- pnpm 11
- Vue 3
- TypeScript

安装依赖：

```bash
pnpm install
```

## 开发流程

1. 先创建或认领一个 Issue，说明要解决的问题。
2. 从最新的 `master` 创建功能分支，例如 `feature/button` 或 `fix/icon-size`。
3. 修改组件实现、测试、文档和 playground 示例。
4. 在提交前运行：

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm docs:build
pnpm package:check
```

`package:check` 用于确认组件库打包后的内容、导出入口、类型声明和真实安装场景都可用。涉及组件导出、构建配置或依赖变更时必须通过该检查。

5. 提交 Pull Request，并填写变更说明和验证结果。

## 提交信息

提交信息使用中文描述，类型使用约定式前缀：

```text
feat: 新增按钮组件
fix: 修复图标尺寸处理
docs: 完善安装文档
test: 增加按钮测试
refactor: 调整组件导出结构
chore: 更新构建配置
```

## 组件要求

新增组件至少需要包含：

- Vue 组件实现
- TypeScript 类型
- 样式
- 单元测试
- 文档示例和 API 表格
- playground 示例

## 发布流程

发布流程由维护者执行，详细步骤见 [RELEASE.md](./RELEASE.md)。普通贡献者不需要发布 npm 包。
