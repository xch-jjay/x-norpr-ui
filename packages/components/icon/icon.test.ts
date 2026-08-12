import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Icon from './index'

describe('ZIcon', () => {
  it('renders its slot content', () => {
    const wrapper = mount(Icon, {
      slots: { default: '★' },
    })

    expect(wrapper.element.tagName).toBe('I')
    expect(wrapper.text()).toBe('★')
    expect(wrapper.classes()).toContain('z-icon')
  })

  it('converts numeric size to pixels', () => {
    const wrapper = mount(Icon, {
      props: { size: 24, color: 'tomato' },
    })

    expect(wrapper.attributes('style')).toContain('font-size: 24px')
    expect(wrapper.attributes('style')).toContain('color: tomato')
  })

  it('keeps string size values intact', () => {
    const wrapper = mount(Icon, {
      props: { size: '1.5em' },
    })

    expect(wrapper.attributes('style')).toContain('font-size: 1.5em')
  })
})
