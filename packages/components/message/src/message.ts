import type { App, PropType } from 'vue'

export type MessageType = 'success' | 'warning' | 'info' | 'danger'

export interface MessageOptions {
  id?: string
  message: string
  type?: MessageType
  duration?: number
  closable?: boolean
}

export const messageProps = {
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String as PropType<MessageType>,
    default: 'info',
  },
  closable: Boolean,
} as const

export interface MessageHandler {
  id: string
  close: () => void
}

export type MessageInput = string | Omit<MessageOptions, 'id' | 'type'> & { type?: MessageType }
export type MessageMethod = (input: MessageInput) => MessageHandler

export interface MessageService extends MessageMethod {
  success: MessageMethod
  warning: MessageMethod
  info: MessageMethod
  danger: MessageMethod
  closeAll: () => void
  install: (app: App) => void
}
