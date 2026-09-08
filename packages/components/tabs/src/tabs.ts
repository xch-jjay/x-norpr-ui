import type { ComputedRef, InjectionKey, PropType } from 'vue'

export type TabsType = 'line' | 'card'

export interface TabPaneRecord {
  uid: number
  name: string
  label: string
  disabled: boolean
  closable: boolean
}

export interface TabsContext {
  activeName: ComputedRef<string | undefined>
  register: (pane: TabPaneRecord) => () => void
}

export const tabsKey: InjectionKey<TabsContext> = Symbol('z-tabs')

export const tabsProps = {
  modelValue: String,
  defaultValue: String,
  type: {
    type: String as PropType<TabsType>,
    default: 'line',
  },
  stretch: Boolean,
  closable: Boolean,
} as const

export const tabPaneProps = {
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  disabled: Boolean,
  closable: Boolean,
} as const
