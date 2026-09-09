import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Select, { Option } from './index'

function mountSelect(props = {}) {
  return mount(Select, {
    props,
    slots: {
      default: () => [
        h(Option, { label: 'Vue 3', value: 'vue' }),
        h(Option, { label: 'React', value: 'react' }),
        h(Option, { label: 'Svelte', value: 'svelte', disabled: true }),
      ],
    },
  })
}

describe('ZSelect', () => {
  it('opens options and emits the selected value', async () => {
    const wrapper = mountSelect({ modelValue: undefined })

    await wrapper.get('.z-select__trigger').trigger('click')
    expect(wrapper.findAll('.z-select-option')).toHaveLength(3)
    await wrapper.findAll('.z-select-option')[0].trigger('click')

    expect(wrapper.emitted('update:modelValue')).toEqual([['vue']])
    expect(wrapper.emitted('change')).toEqual([['vue']])
  })

  it('does not select disabled options', async () => {
    const wrapper = mountSelect({ modelValue: 'vue' })

    await wrapper.get('.z-select__trigger').trigger('click')
    await wrapper.findAll('.z-select-option')[2].trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('filters options and supports clearing', async () => {
    const wrapper = mountSelect({ modelValue: 'vue', filterable: true, clearable: true })

    await wrapper.get('.z-select__input').setValue('react')
    expect(wrapper.findAll('.z-select-option').filter((item) => item.isVisible())).toHaveLength(1)

    await wrapper.get('.z-select__clear').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toEqual([[undefined]])
    expect(wrapper.emitted('change')).toEqual([[undefined]])
  })

  it('supports keyboard opening and disabled state', async () => {
    const wrapper = mountSelect({ disabled: true })

    await wrapper.get('.z-select__trigger').trigger('keydown', { key: 'ArrowDown' })
    expect(wrapper.find('.z-select__dropdown').exists()).toBe(false)
    expect(wrapper.classes()).toContain('is-disabled')
  })
})

