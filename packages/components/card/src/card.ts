import type { PropType } from 'vue'

export type CardShadow = 'always' | 'hover' | 'never'

export const cardProps = {
  header: String,
  footer: String,
  shadow: {
    type: String as PropType<CardShadow>,
    default: 'always',
  },
  bodyPadding: {
    type: String,
    default: '20px',
  },
} as const
