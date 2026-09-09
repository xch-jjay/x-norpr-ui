import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import Drawer from './index'

describe('ZDrawer', () => {
  afterEach(() => {
    document.body.style.overflow = ''
    document.body.innerHTML = ''
  })

  it('renders a titled drawer and restores focus and scroll on close', async () => {
    const trigger = document.createElement('button')
    document.body.appendChild(trigger)
    trigger.focus()
    const wrapper = mount(Drawer, { props: { modelValue: true, title: '筛选条件' }, slots: { default: '筛选内容' } })

    await nextTick()
    expect(document.querySelector('.z-drawer__title')?.textContent).toBe('筛选条件')
    expect(document.querySelector('.z-drawer__body')?.textContent).toContain('筛选内容')
    expect(document.body.style.overflow).toBe('hidden')
    expect(document.activeElement).toBe(document.querySelector('.z-drawer__content'))

    await wrapper.setProps({ modelValue: false })
    expect(document.body.style.overflow).toBe('')
    expect(document.activeElement).toBe(trigger)
    wrapper.unmount()
  })

  it('closes from the overlay and Escape', async () => {
    const wrapper = mount(Drawer, { props: { modelValue: true, closeOnClickModal: true } })
    await nextTick()
    document.querySelector<HTMLElement>('.z-drawer__overlay')?.click()
    expect(wrapper.emitted('update:modelValue')).toEqual([[false]])

    await wrapper.setProps({ modelValue: true })
    await nextTick()
    document.querySelector<HTMLElement>('.z-drawer')?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    expect(wrapper.emitted('update:modelValue')).toHaveLength(2)
    wrapper.unmount()
  })
})
