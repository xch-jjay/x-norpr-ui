import { nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import Dialog from './index'

describe('ZDialog', () => {
  afterEach(() => {
    document.body.style.overflow = ''
    document.body.innerHTML = ''
  })

  it('renders a titled dialog and manages focus and body scroll', async () => {
    const trigger = document.createElement('button')
    trigger.textContent = '打开'
    document.body.appendChild(trigger)
    trigger.focus()

    const wrapper = mount(Dialog, {
      props: { modelValue: true, title: '编辑资料' },
      slots: { default: '表单内容' },
    })

    await nextTick()

    expect(document.querySelector('.z-dialog__title')?.textContent).toBe('编辑资料')
    expect(document.querySelector('.z-dialog__body')?.textContent).toContain('表单内容')
    expect(document.body.style.overflow).toBe('hidden')
    expect(document.activeElement).toBe(document.querySelector('.z-dialog__content'))

    await wrapper.setProps({ modelValue: false })
    expect(document.body.style.overflow).toBe('')
    expect(document.activeElement).toBe(trigger)
    wrapper.unmount()
  })

  it('closes from the close button, overlay and Escape', async () => {
    const wrapper = mount(Dialog, {
      props: { modelValue: true, closeOnClickModal: true },
    })

    await nextTick()
    document.querySelector<HTMLButtonElement>('.z-dialog__close')?.click()
    expect(wrapper.emitted('update:modelValue')).toEqual([[false]])

    await wrapper.setProps({ modelValue: true })
    await nextTick()
    document.querySelector<HTMLElement>('.z-dialog__overlay')?.click()
    expect(wrapper.emitted('update:modelValue')).toHaveLength(2)

    await wrapper.setProps({ modelValue: true })
    await nextTick()
    document.querySelector<HTMLElement>('.z-dialog')?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    expect(wrapper.emitted('update:modelValue')).toHaveLength(3)
    wrapper.unmount()
  })

  it('can be controlled by a parent and keep the dialog mounted', async () => {
    const visible = ref(true)
    const wrapper = mount({
      components: { Dialog },
      setup: () => ({ visible }),
      template: '<Dialog v-model="visible"><template #footer>操作</template></Dialog>',
    })

    await nextTick()
    expect(document.querySelector('.z-dialog__footer')?.textContent).toContain('操作')
    visible.value = false
    await nextTick()
    expect(document.querySelector<HTMLElement>('.z-dialog')?.style.display).toBe('none')
    expect(document.body.style.overflow).toBe('')
    expect(wrapper.exists()).toBe(true)
    wrapper.unmount()
  })
})
