import type { App, DefineComponent } from 'vue'

export interface IconProps {
  color?: string
  size?: number | string
}

export declare const Icon: DefineComponent<IconProps>
export declare const version: string
export declare function install(app: App): void

declare const _default: {
  version: string
  install: typeof install
}

export default _default
