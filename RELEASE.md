# 发布流程

z-ui 使用 npm 作用域包 `@xch-jjay/z-ui`，发布前必须确保 CI 通过。

发布环境使用 Node.js 22.13 及以上版本，以满足 pnpm 11 的运行要求。

## 发布前检查

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck
pnpm test
pnpm test:coverage
pnpm build
pnpm docs:build
pnpm package:check
```

`package:check` 会依次执行 npm 压缩包检查、`publint` 包元数据检查、`attw` 类型入口检查、临时消费者项目安装验证、SSR 导入检查和构建产物体积检查。

确认 `packages/z-ui/package.json` 中的版本号已经更新，并在根目录 `CHANGELOG.md` 记录变更。

## 创建版本标签

```bash
git tag v0.2.0
git push origin v0.2.0
```

`0.1.0` 已经完成首次手动发布；当前仓库待发布版本为 `0.2.0`。推送 `v0.2.0` 标签后，GitHub Actions 会构建并发布 npm 包。

发布工作流使用 npm Trusted Publishing，不需要配置长期 `NPM_TOKEN`。请在 npm 包设置中配置 GitHub Actions Trusted Publisher：

```text
Organization or user: xch-jjay
Repository: x-norpr-ui
Workflow filename: release.yml
Allowed action: npm publish
```

同时确认 GitHub Actions 工作流拥有 `id-token: write` 权限。

文档站部署不需要额外的 token，使用 GitHub Actions 的 Pages 权限完成发布。

## 版本规则

- 补丁版本：修复问题，不改变 API，例如 `0.1.1`
- 次版本：新增向后兼容功能，例如 `0.2.0`
- 主版本：存在破坏性 API 变更，例如 `1.0.0`

当前项目在 `1.0.0` 前允许对 API 做必要调整，但必须记录在 changelog 中。
