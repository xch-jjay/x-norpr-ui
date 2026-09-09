import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Switch from './index'

describe('ZSwitch', () => {
  it('toggles its boolean model value', async () => {
    const wrapper = mount(Switch, { props: { modelValue: false } })

    await wrapper.trigger('click')

    expect(wrapper.emitted('update:modelValue')).toEqual([[true]])
    expect(wrapper.emitted('change')).toEqual([[true]])
    expect(wrapper.attributes('aria-checked')).toBe('false')
  })

  it('supports custom active and inactive values', async () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: 'off',
        activeValue: 'on',
        inactiveValue: 'off',
      },
    })

    await wrapper.trigger('click')

    expect(wrapper.emitted('update:modelValue')).toEqual([['on']])
  })

  it('supports labels, colors and loading state', () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: true,
        activeText: '已启用',
        activeColor: '#7c3aed',
        loading: true,
      },
    })

    expect(wrapper.text()).toContain('已启用')
    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.attributes('style')).toContain('--z-switch-on-color: #7c3aed')
    expect(wrapper.find('.z-switch__loading').exists()).toBe(true)
  })

  it('does not emit changes while disabled', async () => {
    const wrapper = mount(Switch, { props: { disabled: true } })

    await wrapper.trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(wrapper.classes()).toContain('is-disabled')
  })
})

