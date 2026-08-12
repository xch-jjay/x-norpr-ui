import type { App, DefineComponent } from 'vue'

export interface IconProps {
  color?: string
  size?: number | string
}

export declare const Icon: DefineComponent<IconProps>

export type ButtonType = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
export type ButtonSize = 'small' | 'default' | 'large'
export type ButtonNativeType = 'button' | 'submit' | 'reset'

export interface ButtonProps {
  type?: ButtonType
  size?: ButtonSize
  nativeType?: ButtonNativeType
  loading?: boolean
  disabled?: boolean
  plain?: boolean
  round?: boolean
  circle?: boolean
  block?: boolean
}

export declare const Button: DefineComponent<ButtonProps>
export declare const version: string
export declare function install(app: App): void

declare const _default: {
  version: string
  install: typeof install
}

export default _default
