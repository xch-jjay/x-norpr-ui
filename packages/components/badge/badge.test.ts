import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Badge from './index'

describe('ZBadge', () => {
  it('renders capped values and custom colors', () => {
    const wrapper = mount(Badge, {
      props: { value: 120, max: 99, type: 'primary', color: '#722ed1', offset: [2, -1] },
      slots: { default: '<button>通知</button>' },
    })

    expect(wrapper.classes()).toContain('z-badge')
    expect(wrapper.find('.z-badge__content').text()).toBe('99+')
    expect(wrapper.find('.z-badge__content').attributes('style')).toContain('--z-badge-custom-color: #722ed1')
    expect(wrapper.find('button').text()).toBe('通知')
  })

  it('supports dots, hidden values and zero values', () => {
    expect(mount(Badge, { props: { isDot: true } }).find('.z-badge__content').exists()).toBe(true)
    expect(mount(Badge, { props: { value: 0 } }).find('.z-badge__content').exists()).toBe(false)
    expect(mount(Badge, { props: { value: 0, showZero: true, hidden: true } }).find('.z-badge__content').exists()).toBe(false)
  })
})
