import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Divider from './index'

describe('ZDivider', () => {
  it('renders a horizontal divider with text and the requested border style', () => {
    const wrapper = mount(Divider, {
      props: { content: '基础信息', borderStyle: 'dashed', contentPosition: 'left' },
    })

    expect(wrapper.classes()).toEqual(expect.arrayContaining(['z-divider', 'z-divider--horizontal', 'z-divider--dashed', 'is-with-content', 'is-left']))
    expect(wrapper.attributes('role')).toBe('separator')
    expect(wrapper.text()).toBe('基础信息')
  })

  it('supports vertical dividers and custom slots', () => {
    const wrapper = mount(Divider, {
      props: { direction: 'vertical' },
      slots: { default: '分组' },
    })

    expect(wrapper.classes()).toContain('z-divider--vertical')
    expect(wrapper.attributes('aria-orientation')).toBe('vertical')
    expect(wrapper.text()).toBe('分组')
  })
})
