import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Tag from './index'

describe('ZTag', () => {
  it('renders type, size, effect and custom color classes', () => {
    const wrapper = mount(Tag, {
      props: { type: 'success', size: 'small', effect: 'dark', round: true, hit: true, color: '#722ed1' },
      slots: { default: '已完成' },
    })

    expect(wrapper.classes()).toEqual(expect.arrayContaining(['z-tag', 'z-tag--success', 'z-tag--small', 'z-tag--dark', 'is-round', 'is-hit']))
    expect(wrapper.attributes('style')).toContain('--z-tag-custom-color: #722ed1')
    expect(wrapper.text()).toContain('已完成')
  })

  it('emits close from the accessible close button', async () => {
    const wrapper = mount(Tag, { props: { closable: true }, slots: { default: '待处理' } })

    await wrapper.get('.z-tag__close').trigger('click')

    expect(wrapper.emitted('close')).toHaveLength(1)
  })
})
