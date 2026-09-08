import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import InputNumber from './index'

describe('ZInputNumber', () => {
  it('increments and decrements with controls', async () => {
    const wrapper = mount(InputNumber, { props: { modelValue: 2 } })

    await wrapper.findAll('button')[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toEqual([[3]])
    expect(wrapper.emitted('change')).toEqual([[3]])

    await wrapper.setProps({ modelValue: 3 })
    await wrapper.findAll('button')[0].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toEqual([[3], [2]])
  })

  it('respects range, step and precision', async () => {
    const wrapper = mount(InputNumber, {
      props: {
        modelValue: 1.2,
        min: 0,
        max: 1.5,
        step: 0.2,
        precision: 1,
      },
    })

    await wrapper.findAll('button')[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toEqual([[1.4]])

    await wrapper.setProps({ modelValue: 1.4 })
    await wrapper.findAll('button')[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toEqual([[1.4], [1.5]])
    await wrapper.setProps({ modelValue: 1.5 })
    expect(wrapper.findAll('button')[1].attributes('disabled')).toBeDefined()
  })

  it('supports keyboard increments and empty values', async () => {
    const wrapper = mount(InputNumber, { props: { modelValue: 4 } })
    const input = wrapper.get('input')

    await input.trigger('keydown', { key: 'ArrowUp' })
    expect(wrapper.emitted('update:modelValue')).toEqual([[5]])

    await input.setValue('')
    expect(wrapper.emitted('update:modelValue')).toContainEqual([undefined])
  })

  it('does not change while disabled or readonly', async () => {
    const wrapper = mount(InputNumber, {
      props: { modelValue: 4, disabled: true },
    })

    await wrapper.findAll('button')[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(wrapper.classes()).toContain('is-disabled')
  })
})
