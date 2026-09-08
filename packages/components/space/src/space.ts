import type { PropType } from 'vue'

export type SpaceDirection = 'horizontal' | 'vertical'
export type SpaceAlign = 'start' | 'end' | 'center' | 'baseline' | 'stretch'
export type SpaceSize = 'small' | 'default' | 'large' | number | string

export const spaceProps = {
  direction: {
    type: String as PropType<SpaceDirection>,
    default: 'horizontal',
  },
  size: {
    type: [String, Number] as PropType<SpaceSize>,
    default: 'default',
  },
  align: String as PropType<SpaceAlign>,
  wrap: Boolean,
  fill: Boolean,
} as const
