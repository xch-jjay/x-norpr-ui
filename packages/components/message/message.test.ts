import { nextTick } from 'vue'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Message } from './index'

describe('Message service', () => {
  afterEach(() => {
    Message.closeAll()
    vi.useRealTimers()
  })

  it('creates typed messages and returns a close handler', async () => {
    const handler = Message.success('保存成功')

    await nextTick()

    const message = document.querySelector('.z-message--success')
    expect(message?.textContent).toContain('保存成功')
    expect(handler.id).toMatch(/^z-message-/)

    handler.close()

    expect(document.querySelector('.z-message-container')).toBeNull()
  })

  it('automatically closes after the configured duration', async () => {
    vi.useFakeTimers()
    Message({ message: '稍后关闭', duration: 1000 })

    await nextTick()
    expect(document.querySelector('.z-message')).not.toBeNull()

    vi.advanceTimersByTime(1000)
    expect(document.querySelector('.z-message-container')).toBeNull()
  })

  it('supports manual close and closeAll', async () => {
    Message({ message: '第一条', closable: true, duration: 0 })
    Message.info('第二条')
    await nextTick()

    expect(document.querySelectorAll('.z-message')).toHaveLength(2)
    document.querySelector<HTMLButtonElement>('.z-message__close')?.click()
    expect(document.querySelectorAll('.z-message')).toHaveLength(1)

    Message.closeAll()
    expect(document.querySelector('.z-message-container')).toBeNull()
  })
})
