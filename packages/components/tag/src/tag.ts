import type { PropType } from 'vue'

export type TagType = 'success' | 'info' | 'warning' | 'danger'
export type TagSize = 'small' | 'default' | 'large'
export type TagEffect = 'light' | 'dark' | 'plain'

export const tagProps = {
  type: String as PropType<TagType>,
  size: String as PropType<TagSize>,
  effect: {
    type: String as PropType<TagEffect>,
    default: 'light',
  },
  closable: Boolean,
  round: Boolean,
  hit: Boolean,
  color: String,
} as const
