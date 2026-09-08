import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Breadcrumb, { BreadcrumbItem } from './index'

describe('ZBreadcrumb', () => {
  it('renders item separators, links and current state', () => {
    const wrapper = mount(Breadcrumb, {
      props: { separator: '>' },
      slots: {
        default: () => [
          h(BreadcrumbItem, { to: '/home' }, { default: () => '首页' }),
          h(BreadcrumbItem, { to: '/users' }, { default: () => '用户' }),
          h(BreadcrumbItem, { current: true }, { default: () => '详情' }),
        ],
      },
    })

    expect(wrapper.findAll('.z-breadcrumb__item')).toHaveLength(3)
    expect(wrapper.findAll('.z-breadcrumb__separator').map((item) => item.text())).toEqual(['>', '>'])
    expect(wrapper.findAll('a')).toHaveLength(2)
    expect(wrapper.find('[aria-current="page"]').text()).toBe('详情')
  })

  it('supports disabled items without creating links', () => {
    const wrapper = mount(Breadcrumb, {
      slots: { default: () => h(BreadcrumbItem, { to: '/disabled', disabled: true }, { default: () => '禁用' }) },
    })

    expect(wrapper.find('a').exists()).toBe(false)
    expect(wrapper.find('.is-disabled').exists()).toBe(true)
  })
})
