import { createApp } from 'vue'
import type { App as VueApp } from 'vue'
import MessageItem from './message.vue'
import type { MessageHandler, MessageInput, MessageMethod, MessageOptions, MessageService, MessageType } from './message'

let seed = 0
const instances = new Map<string, MessageHandler>()
let container: HTMLDivElement | undefined

function getContainer() {
  if (!container) {
    container = document.createElement('div')
    container.className = 'z-message-container'
    container.setAttribute('aria-live', 'polite')
    document.body.appendChild(container)
  }
  return container
}

function normalizeInput(input: MessageInput, type?: MessageType): MessageOptions {
  const options = typeof input === 'string' ? { message: input } : input
  return {
    duration: 3000,
    closable: false,
    ...options,
    type: type ?? options.type ?? 'info',
  }
}

export function createMessage(input: MessageInput): MessageHandler {
  if (typeof document === 'undefined') {
    throw new Error('Message 只能在浏览器环境中调用')
  }

  const options = normalizeInput(input)
  const id = options.id ?? `z-message-${++seed}`
  const root = document.createElement('div')
  const app = createApp(MessageItem, {
    message: options.message,
    type: options.type,
    closable: options.closable,
    onClose: () => handler.close(),
  })
  let timer: number | undefined
  let closed = false

  const handler: MessageHandler = {
    id,
    close() {
      if (closed) return
      closed = true
      if (timer !== undefined) window.clearTimeout(timer)
      app.unmount()
      root.remove()
      instances.delete(id)
      if (container && container.childElementCount === 0) {
        container.remove()
        container = undefined
      }
    },
  }

  getContainer().appendChild(root)
  app.mount(root)
  instances.set(id, handler)

  if (options.duration && options.duration > 0) {
    timer = window.setTimeout(handler.close, options.duration)
  }

  return handler
}

function createTypedMessage(type: MessageType): MessageMethod {
  return (input) => createMessage(normalizeInput(input, type))
}

export function closeAllMessages() {
  Array.from(instances.values()).forEach((instance) => instance.close())
}

function installMessage(app: VueApp) {
  app.component(MessageItem.name ?? 'ZMessage', MessageItem)
}

export const Message = Object.assign(createMessage, {
  success: createTypedMessage('success'),
  warning: createTypedMessage('warning'),
  info: createTypedMessage('info'),
  danger: createTypedMessage('danger'),
  closeAll: closeAllMessages,
  install: installMessage,
}) as MessageService
