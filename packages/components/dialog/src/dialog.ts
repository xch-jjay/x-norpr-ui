import type { PropType } from 'vue'

export const dialogProps = {
  modelValue: Boolean,
  title: String,
  width: {
    type: String,
    default: '520px',
  },
  top: {
    type: String,
    default: '15vh',
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
  fullscreen: Boolean,
  center: Boolean,
  destroyOnClose: Boolean,
  zIndex: Number,
  appendTo: {
    type: [String, Object] as PropType<string | HTMLElement>,
    default: 'body',
  },
} as const
