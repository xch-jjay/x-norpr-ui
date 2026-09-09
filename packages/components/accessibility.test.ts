import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import Button from './button'
import Input from './input'
import Select, { Option } from './select'
import Switch from './switch'
import Tabs, { TabPane } from './tabs'

describe('公开组件可访问性语义', () => {
  afterEach(() => {
    document.body.style.overflow = ''
    document.body.innerHTML = ''
  })

  it('为按钮、输入框和开关暴露状态与可读标签', () => {
    const button = mount(Button, { props: { loading: true, disabled: true } })
    expect(button.attributes('aria-busy')).toBe('true')
    expect(button.attributes('aria-disabled')).toBe('true')

    const input = mount(Input, { props: { modelValue: '内容', clearable: true } })
    expect(input.get('button').attributes('aria-label')).toBe('清除内容')

    const toggle = mount(Switch, { props: { modelValue: true, ariaLabel: '自动保存' } })
    expect(toggle.attributes('role')).toBe('switch')
    expect(toggle.attributes('aria-checked')).toBe('true')
    expect(toggle.attributes('aria-label')).toBe('自动保存')

    button.unmount()
    input.unmount()
    toggle.unmount()
  })

  it('为选择器和标签页提供键盘可操作的 ARIA 结构', async () => {
    const select = mount(Select, {
      slots: {
        default: () => [
          h(Option, { label: 'Vue 3', value: 'vue' }),
          h(Option, { label: 'React', value: 'react' }),
        ],
      },
    })
    await nextTick()

    const trigger = select.get('[role="combobox"]')
    expect(trigger.attributes('aria-haspopup')).toBe('listbox')
    expect(trigger.attributes('aria-expanded')).toBe('false')
    await trigger.trigger('keydown', { key: 'ArrowDown' })
    expect(trigger.attributes('aria-expanded')).toBe('true')
    expect(select.find('[role="listbox"]').exists()).toBe(true)

    const tabs = mount(Tabs, {
      slots: {
        default: () => [
          h(TabPane, { name: 'first', label: '第一项' }, { default: () => '内容一' }),
          h(TabPane, { name: 'second', label: '第二项' }, { default: () => '内容二' }),
        ],
      },
    })
    await nextTick()

    expect(tabs.find('[role="tablist"]').exists()).toBe(true)
    const tab = tabs.findAll('[role="tab"]')[1]
    expect(tab.attributes('aria-controls')).toMatch(/^z-tab-panel-/)
    await tab.trigger('keydown.enter')
    expect(tabs.emitted('update:modelValue')).toEqual([['second']])

    select.unmount()
    tabs.unmount()
  })
})
