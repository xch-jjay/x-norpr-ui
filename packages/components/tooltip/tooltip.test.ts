import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import Tooltip from './index'

describe('ZTooltip', () => {
  it('shows content on hover and hides on leave', async () => {
    const wrapper = mount(Tooltip, { props: { content: '帮助信息' }, slots: { default: '<button>悬浮</button>' } })

    await wrapper.trigger('mouseenter')
    expect(wrapper.find('[role="tooltip"]').text()).toBe('帮助信息')
    await wrapper.trigger('mouseleave')
    expect(wrapper.find('[role="tooltip"]').exists()).toBe(false)
  })

  it('supports delayed display and click trigger', async () => {
    vi.useFakeTimers()
    const wrapper = mount(Tooltip, { props: { content: '延迟', showAfter: 200, trigger: 'click' } })
    await wrapper.trigger('click')
    expect(wrapper.find('[role="tooltip"]').exists()).toBe(false)
    vi.advanceTimersByTime(200)
    await nextTick()
    expect(wrapper.find('[role="tooltip"]').exists()).toBe(true)
    vi.useRealTimers()
  })

  it('does not open when disabled', async () => {
    const wrapper = mount(Tooltip, { props: { content: '不可见', disabled: true } })
    await wrapper.trigger('mouseenter')
    expect(wrapper.find('[role="tooltip"]').exists()).toBe(false)
  })
})
