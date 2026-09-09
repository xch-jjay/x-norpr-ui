import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Card from './index'

describe('ZCard', () => {
  it('renders header, body and footer with the configured shadow', () => {
    const wrapper = mount(Card, {
      props: { header: '用户信息', footer: '最后更新', shadow: 'hover', bodyPadding: '12px' },
      slots: { default: '卡片内容' },
    })

    expect(wrapper.classes()).toEqual(expect.arrayContaining(['z-card', 'z-card--hover']))
    expect(wrapper.find('.z-card__header').text()).toBe('用户信息')
    expect(wrapper.find('.z-card__body').text()).toBe('卡片内容')
    expect(wrapper.find('.z-card__body').attributes('style')).toContain('padding: 12px')
    expect(wrapper.find('.z-card__footer').text()).toBe('最后更新')
  })

  it('supports custom header and footer slots', () => {
    const wrapper = mount(Card, {
      slots: { header: '<strong>标题</strong>', footer: '<button>操作</button>' },
    })

    expect(wrapper.find('strong').text()).toBe('标题')
    expect(wrapper.find('button').text()).toBe('操作')
  })
})
