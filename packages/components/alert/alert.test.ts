import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Alert from './index'

describe('ZAlert', () => {
  it('renders a typed alert with title and description', () => {
    const wrapper = mount(Alert, {
      props: { title: '保存成功', description: '数据已经保存。', type: 'success', showIcon: true },
    })

    expect(wrapper.classes()).toEqual(expect.arrayContaining(['z-alert', 'z-alert--success']))
    expect(wrapper.text()).toContain('保存成功')
    expect(wrapper.text()).toContain('数据已经保存。')
    expect(wrapper.find('.z-alert__icon').exists()).toBe(true)
  })

  it('emits visibility and close events', async () => {
    const wrapper = mount(Alert, { props: { title: '可关闭', closable: true } })

    await wrapper.get('.z-alert__close').trigger('click')

    expect(wrapper.emitted('update:visible')).toEqual([[false]])
    expect(wrapper.emitted('close')).toHaveLength(1)
    expect(wrapper.find('.z-alert').exists()).toBe(false)
  })

  it('supports slots and stays hidden when visible is false', () => {
    const wrapper = mount(Alert, {
      props: { visible: false },
      slots: { title: '自定义标题', default: '自定义内容' },
    })

    expect(wrapper.find('.z-alert').exists()).toBe(false)
  })
})

