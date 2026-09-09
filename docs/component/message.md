# Message 消息

Message 用于以命令式方式展示短暂的操作结果或状态提示。它会自动挂载到页面顶部，并在持续时间结束后移除。

## 基础用法

```ts
import { Message } from '@xch-jjay/z-ui'

Message('这是一条消息')
Message.success('保存成功')
Message.warning('请检查输入内容')
Message.danger('操作失败')
```

## 配置消息

```ts
const message = Message({
  message: '这条消息不会自动关闭',
  type: 'info',
  duration: 0,
  closable: true,
})

message.close()
```

`duration` 单位为毫秒，设置为 `0` 表示不自动关闭。每次调用都会返回一个包含 `id` 和 `close` 方法的句柄。

## 关闭全部消息

```ts
Message.closeAll()
```

## API

### Message 方法

| 方法 | 参数 | 说明 |
| --- | --- | --- |
| `Message` | `string \\| MessageOptions` | 创建普通消息 |
| `Message.success` | `string \\| MessageOptions` | 创建成功消息 |
| `Message.warning` | `string \\| MessageOptions` | 创建警告消息 |
| `Message.info` | `string \\| MessageOptions` | 创建信息消息 |
| `Message.danger` | `string \\| MessageOptions` | 创建危险消息 |
| `Message.closeAll` | — | 关闭当前页面的全部消息 |

### MessageOptions

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `message` | `string` | — | 消息文本 |
| `type` | `'success' \\| 'warning' \\| 'info' \\| 'danger'` | `'info'` | 消息类型 |
| `duration` | `number` | `3000` | 自动关闭时间，`0` 表示不关闭 |
| `closable` | `boolean` | `false` | 是否显示手动关闭按钮 |

服务只应在浏览器环境中调用；SSR 场景请放在客户端生命周期或事件处理函数中执行。
