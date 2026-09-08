import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Tabs, { TabPane } from './index'

function mountTabs(props = {}) {
  return mount(Tabs, {
    props,
    slots: {
      default: () => [
        h(TabPane, { name: 'first', label: '第一项' }, { default: () => '第一项内容' }),
        h(TabPane, { name: 'second', label: '第二项' }, { default: () => '第二项内容' }),
        h(TabPane, { name: 'disabled', label: '禁用', disabled: true }, { default: () => '禁用内容' }),
      ],
    },
  })
}

describe('ZTabs', () => {
  it('renders the first pane by default and switches panes', async () => {
    const wrapper = mountTabs()
    await nextTick()

    expect(wrapper.find('.z-tabs__tab.is-active').text()).toContain('第一项')
    expect(wrapper.find('.z-tabs__pane[aria-hidden="false"]').text()).toContain('第一项内容')
    await wrapper.findAll('.z-tabs__tab')[1].trigger('click')

    expect(wrapper.emitted('update:modelValue')).toEqual([['second']])
    expect(wrapper.emitted('change')).toEqual([['second']])
  })

  it('supports controlled values, disabled panes and closable tabs', async () => {
    const wrapper = mountTabs({ modelValue: 'second', closable: true })
    await nextTick()

    expect(wrapper.find('.z-tabs__tab.is-active').text()).toContain('第二项')
    await wrapper.find('.z-tabs__close').trigger('click')
    expect(wrapper.emitted('tabRemove')).toEqual([['first']])
    await wrapper.findAll('.z-tabs__tab')[2].trigger('click')
    expect(wrapper.emitted('change')).toBeUndefined()
  })
})
