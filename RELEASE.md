# 发布流程

z-ui 使用 npm 包 `z-ui`，发布前必须确保 CI 通过。

发布环境使用 Node.js 22.13 及以上版本，以满足 pnpm 11 的运行要求。

## 发布前检查

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm docs:build
pnpm pack:check
```

确认 `packages/z-ui/package.json` 中的版本号已经更新，并在根目录 `CHANGELOG.md` 记录变更。

## 创建版本标签

```bash
git tag v0.1.0
git push origin v0.1.0
```

推送 `v*.*.*` 标签后，GitHub Actions 会构建并发布 npm 包。

发布工作流需要仓库 Secrets 中存在：

```text
NPM_TOKEN
```

## 版本规则

- 补丁版本：修复问题，不改变 API，例如 `0.1.1`
- 次版本：新增向后兼容功能，例如 `0.2.0`
- 主版本：存在破坏性 API 变更，例如 `1.0.0`

当前项目在 `1.0.0` 前允许对 API 做必要调整，但必须记录在 changelog 中。
