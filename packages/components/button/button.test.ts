import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Button from './index'

describe('ZButton', () => {
  it('renders content and the default button attributes', () => {
    const wrapper = mount(Button, {
      slots: { default: '保存' },
    })

    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(wrapper.text()).toBe('保存')
    expect(wrapper.classes()).toContain('z-button')
    expect(wrapper.classes()).toContain('z-button--default')
    expect(wrapper.attributes('type')).toBe('button')
  })

  it('supports visual variants and native button types', () => {
    const wrapper = mount(Button, {
      props: {
        type: 'primary',
        size: 'large',
        nativeType: 'submit',
        plain: true,
        round: true,
        block: true,
      },
    })

    expect(wrapper.classes()).toEqual(expect.arrayContaining([
      'z-button--primary',
      'z-button--large',
      'is-plain',
      'is-round',
      'is-block',
    ]))
    expect(wrapper.attributes('type')).toBe('submit')
  })

  it('emits click only when it is actionable', async () => {
    const wrapper = mount(Button, { slots: { default: '提交' } })

    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)

    await wrapper.setProps({ loading: true })
    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.find('.z-button__loading').exists()).toBe(true)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })
})
