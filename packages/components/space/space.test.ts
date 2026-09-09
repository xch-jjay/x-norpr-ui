import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Space from './index'

describe('ZSpace', () => {
  it('renders horizontal content with a token-based gap', () => {
    const wrapper = mount(Space, {
      props: { size: 'large', align: 'center', wrap: true, fill: true },
      slots: { default: '<button>一</button><button>二</button>' },
    })

    expect(wrapper.classes()).toEqual(expect.arrayContaining(['z-space', 'z-space--horizontal', 'is-wrap', 'is-fill']))
    expect(wrapper.attributes('style')).toContain('--z-space-gap: var(--z-spacing-4)')
    expect(wrapper.attributes('style')).toContain('--z-space-align: center')
    expect(wrapper.findAll('button')).toHaveLength(2)
  })

  it('supports vertical layout and custom numeric gaps', () => {
    const wrapper = mount(Space, {
      props: { direction: 'vertical', size: 12 },
      slots: { default: '<span>内容</span>' },
    })

    expect(wrapper.classes()).toContain('z-space--vertical')
    expect(wrapper.attributes('style')).toContain('--z-space-gap: 12px')
  })
})
