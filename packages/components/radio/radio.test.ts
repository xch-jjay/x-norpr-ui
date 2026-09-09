import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Radio, { RadioGroup } from './index'

describe('ZRadio', () => {
  it('emits the label value when selected', async () => {
    const wrapper = mount(Radio, {
      props: { modelValue: 'light', label: 'dark' },
    })

    await wrapper.get('input').setValue(true)

    expect(wrapper.emitted('update:modelValue')).toEqual([['dark']])
    expect(wrapper.emitted('change')).toEqual([['dark']])
  })

  it('uses the group value and generated native name', () => {
    const wrapper = mount(RadioGroup, {
      props: { modelValue: 'vue' },
      slots: { default: () => h(Radio, { label: 'vue' }) },
    })

    const input = wrapper.get('input')
    expect(input.element.checked).toBe(true)
    expect(input.attributes('name')).toMatch(/^z-radio-group-/)
  })

  it('keeps generated names isolated between groups', () => {
    const wrapper = mount({
      render: () => h('div', [
        h(RadioGroup, { modelValue: 'one' }, {
          default: () => h(Radio, { label: 'one' }),
        }),
        h(RadioGroup, { modelValue: 'two' }, {
          default: () => h(Radio, { label: 'two' }),
        }),
      ]),
    })

    const names = wrapper.findAll('input').map((input) => input.attributes('name'))
    expect(names[0]).not.toBe(names[1])
  })

  it('updates the group value when another option is selected', async () => {
    const wrapper = mount(RadioGroup, {
      props: { modelValue: 'vue' },
      slots: {
        default: () => [
          h(Radio, { label: 'vue' }),
          h(Radio, { label: 'react' }),
        ],
      },
    })

    await wrapper.findAll('input')[1].setValue(true)

    expect(wrapper.emitted('update:modelValue')).toEqual([['react']])
    expect(wrapper.emitted('change')).toEqual([['react']])
  })

  it('does not emit changes while disabled', async () => {
    const wrapper = mount(Radio, { props: { label: 'vue', disabled: true } })

    await wrapper.get('input').setValue(true)

    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(wrapper.classes()).toContain('is-disabled')
  })
})
