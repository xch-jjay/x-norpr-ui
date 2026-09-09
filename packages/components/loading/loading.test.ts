import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import Loading, { LoadingService } from './index'

describe('ZLoading', () => {
  afterEach(() => {
    document.body.style.overflow = ''
    document.body.innerHTML = ''
  })

  it('renders a controlled loading overlay with text', async () => {
    const wrapper = mount(Loading, {
      props: { modelValue: true, fullscreen: true, text: '加载中' },
    })

    await nextTick()

    expect(document.querySelector('.z-loading')).not.toBeNull()
    expect(document.querySelector('.z-loading__text')?.textContent).toBe('加载中')
    await wrapper.setProps({ modelValue: false })
    expect(document.querySelector('.z-loading')).toBeNull()
    wrapper.unmount()
  })

  it('supports service usage and can be closed manually', async () => {
    const instance = LoadingService({ text: '提交中' })

    await nextTick()

    expect(document.querySelector('.z-loading__text')?.textContent).toBe('提交中')
    expect(document.body.style.overflow).toBe('hidden')
    instance.close()
    expect(document.querySelector('.z-loading')).toBeNull()
    expect(document.body.style.overflow).toBe('')
  })

  it('supports a target element without locking the page', async () => {
    const target = document.createElement('div')
    document.body.appendChild(target)
    const instance = LoadingService({ target, text: '局部加载' })

    await nextTick()

    expect(target.querySelector('.z-loading')).not.toBeNull()
    expect(document.body.style.overflow).toBe('')
    instance.close()
    expect(target.querySelector('.z-loading')).toBeNull()
  })
})
