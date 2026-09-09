import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Empty from './index'

describe('ZEmpty', () => {
  it('renders a default description and action slot', () => {
    const wrapper = mount(Empty, {
      props: { imageSize: 64 },
      slots: { default: '<button>重新加载</button>' },
    })

    expect(wrapper.attributes('role')).toBe('status')
    expect(wrapper.find('.z-empty__description').text()).toBe('暂无数据')
    expect(wrapper.find('.z-empty__image').attributes('style')).toContain('width: 64px')
    expect(wrapper.find('button').text()).toBe('重新加载')
  })

  it('supports custom image and description slots', () => {
    const wrapper = mount(Empty, {
      props: { description: '没有搜索结果' },
      slots: { image: '<span>图片</span>', description: '<strong>暂无匹配</strong>' },
    })

    expect(wrapper.text()).toContain('图片')
    expect(wrapper.find('strong').text()).toBe('暂无匹配')
  })
})
