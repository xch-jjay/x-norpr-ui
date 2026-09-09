import { mount } from '@vue/test-utils'
import { h } from 'vue'
import { describe, expect, it } from 'vitest'
import Checkbox, { CheckboxGroup } from './index'

describe('ZCheckbox', () => {
  it('supports single checkbox values and emits changes', async () => {
    const wrapper = mount(Checkbox, {
      props: { modelValue: false, label: '同意协议' },
    })

    await wrapper.get('input').setValue(true)

    expect(wrapper.emitted('update:modelValue')).toEqual([[true]])
    expect(wrapper.emitted('change')).toEqual([[true]])
    expect(wrapper.classes()).toContain('z-checkbox--default')
  })

  it('supports custom true and false values', async () => {
    const wrapper = mount(Checkbox, {
      props: { modelValue: '否', trueValue: '是', falseValue: '否' },
    })

    await wrapper.get('input').setValue(true)

    expect(wrapper.emitted('update:modelValue')).toEqual([['是']])
  })

  it('does not emit changes while disabled', async () => {
    const wrapper = mount(Checkbox, {
      props: { modelValue: false, disabled: true },
    })

    await wrapper.get('input').setValue(true)

    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(wrapper.classes()).toContain('is-disabled')
  })

  it('sets the native indeterminate state', async () => {
    const wrapper = mount(Checkbox, { props: { indeterminate: true } })

    await wrapper.vm.$nextTick()

    expect((wrapper.get('input').element as HTMLInputElement).indeterminate).toBe(true)
    expect(wrapper.classes()).toContain('is-indeterminate')
  })
})

describe('ZCheckboxGroup', () => {
  it('adds and removes values through the group model', async () => {
    const wrapper = mount(CheckboxGroup, {
      props: { modelValue: ['vue'] },
      slots: {
        default: () => [
          h(Checkbox, { label: 'vue' }),
          h(Checkbox, { label: 'ts' }),
        ],
      },
    })

    const inputs = wrapper.findAll('input')
    expect(inputs).toHaveLength(2)
    expect(inputs[0].element.checked).toBe(true)

    await inputs[1].setValue(true)
    expect(wrapper.emitted('update:modelValue')).toEqual([[['vue', 'ts']]])

    await wrapper.setProps({ modelValue: ['vue', 'ts'] })
    await inputs[0].setValue(false)
    expect(wrapper.emitted('update:modelValue')).toEqual([
      [['vue', 'ts']],
      [['ts']],
    ])
  })

  it('enforces the maximum selection limit', async () => {
    const wrapper = mount(CheckboxGroup, {
      props: { modelValue: ['vue'], max: 1 },
      slots: {
        default: () => [
          h(Checkbox, { label: 'vue' }),
          h(Checkbox, { label: 'ts' }),
        ],
      },
    })

    const inputs = wrapper.findAll('input')
    expect(inputs).toHaveLength(2)
    expect(inputs[1].attributes('disabled')).toBeDefined()
    await inputs[1].setValue(true)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })
})
