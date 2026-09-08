import type { App, PropType } from 'vue'

export interface LoadingOptions {
  text?: string
  fullscreen?: boolean
  lockScroll?: boolean
  background?: string
  target?: string | HTMLElement
}

export const loadingProps = {
  modelValue: {
    type: Boolean,
    default: true,
  },
  text: String,
  fullscreen: Boolean,
  lockScroll: Boolean,
  background: String,
  target: {
    type: [String, Object] as PropType<string | HTMLElement>,
    default: 'body',
  },
} as const

export interface LoadingInstance {
  close: () => void
}

export interface LoadingService {
  (options?: LoadingOptions): LoadingInstance
  service: (options?: LoadingOptions) => LoadingInstance
  install: (app: App) => void
}
