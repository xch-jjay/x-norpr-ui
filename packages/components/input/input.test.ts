import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Input from './index'

describe('ZInput', () => {
  it('renders the native input with its basic props', () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: '关键字',
        placeholder: '请输入关键字',
        size: 'large',
      },
    })

    const input = wrapper.get('input')
    expect(input.element.value).toBe('关键字')
    expect(input.attributes('placeholder')).toBe('请输入关键字')
    expect(wrapper.classes()).toEqual(expect.arrayContaining([
      'z-input',
      'z-input--large',
    ]))
  })

  it('emits v-model and input events', async () => {
    const wrapper = mount(Input, { props: { modelValue: '' } })

    await wrapper.get('input').setValue('新的内容')

    expect(wrapper.emitted('update:modelValue')).toEqual([['新的内容']])
    expect(wrapper.emitted('input')).toEqual([['新的内容']])
  })

  it('supports clearable content and keeps focus after clearing', async () => {
    const wrapper = mount(Input, {
      props: { modelValue: '待清除', clearable: true },
    })

    await wrapper.get('input').trigger('focus')
    await wrapper.get('.z-input__clear').trigger('click')

    expect(wrapper.emitted('update:modelValue')).toEqual([['']])
    expect(wrapper.emitted('clear')).toHaveLength(1)
    expect(wrapper.classes()).toContain('is-focus')
  })

  it('renders prefix, suffix, and word count slots', () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: '内容',
        maxlength: 10,
        showWordLimit: true,
      },
      slots: {
        prefix: '@',
        suffix: '⌕',
      },
    })

    expect(wrapper.find('.z-input__prefix').text()).toBe('@')
    expect(wrapper.find('.z-input__suffix').text()).toContain('2 / 10')
    expect(wrapper.find('.z-input__suffix').text()).toContain('⌕')
  })
})
