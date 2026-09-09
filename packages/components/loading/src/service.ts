import { createApp } from 'vue'
import LoadingItem from './loading.vue'
import type { LoadingInstance, LoadingOptions, LoadingService } from './loading'

export function createLoading(options: LoadingOptions = {}): LoadingInstance {
  if (typeof document === 'undefined') {
    throw new Error('Loading 只能在浏览器环境中调用')
  }

  const target = typeof options.target === 'string'
    ? document.querySelector<HTMLElement>(options.target)
    : options.target ?? document.body

  if (!target) throw new Error(`Loading 目标不存在：${String(options.target)}`)

  const root = document.createElement('div')
  target.appendChild(root)
  let closed = false
  const app = createApp(LoadingItem, {
    modelValue: true,
    text: options.text,
    fullscreen: options.fullscreen ?? target === document.body,
    lockScroll: options.lockScroll ?? target === document.body,
    background: options.background,
    target,
  })

  const instance: LoadingInstance = {
    close() {
      if (closed) return
      closed = true
      app?.unmount()
      root.remove()
    },
  }

  app.mount(root)

  return instance
}

function installLoading(app: { component: (name: string, component: typeof LoadingItem) => void }) {
  app.component(LoadingItem.name ?? 'ZLoading', LoadingItem)
}

export const Loading = Object.assign(createLoading, {
  service: createLoading,
  install: installLoading,
}) as LoadingService
