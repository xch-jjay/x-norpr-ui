import type { InjectionKey, Ref } from 'vue'

export interface BreadcrumbContext {
  separator: Ref<string>
  register: () => number
}

export const breadcrumbKey: InjectionKey<BreadcrumbContext> = Symbol('z-breadcrumb')

export const breadcrumbProps = {
  separator: {
    type: String,
    default: '/',
  },
} as const

export const breadcrumbItemProps = {
  to: String,
  disabled: Boolean,
  current: Boolean,
} as const
