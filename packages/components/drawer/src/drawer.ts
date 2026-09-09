import type { PropType } from 'vue'

export type DrawerDirection = 'left' | 'right' | 'top' | 'bottom'

export const drawerProps = {
  modelValue: Boolean,
  title: String,
  direction: {
    type: String as PropType<DrawerDirection>,
    default: 'right',
  },
  size: {
    type: String,
    default: '30%',
  },
  modal: {
    type: Boolean,
    default: true,
  },
  closeOnClickModal: {
    type: Boolean,
    default: true,
  },
  closeOnPressEscape: {
    type: Boolean,
    default: true,
  },
  showClose: {
    type: Boolean,
    default: true,
  },
  lockScroll: {
    type: Boolean,
    default: true,
  },
  destroyOnClose: Boolean,
  appendTo: {
    type: [String, Object] as PropType<string | HTMLElement>,
    default: 'body',
  },
} as const
