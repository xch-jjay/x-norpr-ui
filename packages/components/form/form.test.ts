import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Form, { FormItem } from './index'
import Input from '../input'
import Switch from '../switch'
import type { FormRules } from './index'

function mountForm(model: Record<string, unknown>, rules: FormRules) {
  return mount(Form, {
    props: { model, rules },
    slots: {
      default: () => h(FormItem, { prop: 'username', label: '用户名' }, {
        default: () => h('input', { value: model.username }),
      }),
    },
  })
}

describe('ZForm', () => {
  it('validates required and length rules', async () => {
    const model = { username: '' }
    const wrapper = mountForm(model, {
      username: [
        { required: true, message: '请输入用户名' },
        { min: 3, message: '至少 3 个字符' },
      ],
    })

    expect(await (wrapper.vm as unknown as { validate: () => Promise<boolean> }).validate()).toBe(false)
    expect(wrapper.find('.z-form-item__error').text()).toBe('请输入用户名')

    model.username = 'zui'
    expect(await (wrapper.vm as unknown as { validate: () => Promise<boolean> }).validate()).toBe(true)
    expect(wrapper.find('.z-form-item__error').exists()).toBe(false)
  })

  it('supports custom validators and resetFields', async () => {
    const model = { username: 'initial' }
    const wrapper = mountForm(model, {
      username: { validator: (value: unknown) => value === 'valid' ? undefined : '值不正确' },
    })

    model.username = 'invalid'
    expect(await (wrapper.vm as unknown as { validate: () => Promise<boolean> }).validate()).toBe(false)
    expect(wrapper.find('.z-form-item__error').text()).toBe('值不正确')

    await (wrapper.vm as unknown as { resetFields: () => void }).resetFields()
    expect(model.username).toBe('initial')
    expect(wrapper.find('.z-form-item__error').exists()).toBe(false)
  })

  it('renders labels and required markers', () => {
    const wrapper = mountForm({ username: '' }, { username: { required: true } })

    expect(wrapper.find('.z-form-item__label').text()).toContain('用户名')
    expect(wrapper.find('.z-form-item__required').text()).toBe('*')
  })

  it('provides size and disabled state to form controls', () => {
    const model = { username: '' }
    const wrapper = mount(Form, {
      props: { model, rules: {}, size: 'large', disabled: true },
      slots: {
        default: () => [
          h(Input, { modelValue: model.username }),
          h(Switch, { modelValue: false }),
        ],
      },
    })

    expect(wrapper.find('.z-input').classes()).toContain('z-input--large')
    expect(wrapper.find('.z-input__inner').attributes('disabled')).toBeDefined()
    expect(wrapper.find('.z-switch').classes()).toContain('z-switch--large')
    expect(wrapper.find('.z-switch').attributes('disabled')).toBeDefined()
  })
})
