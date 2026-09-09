import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Pagination from './index'

describe('ZPagination', () => {
  it('renders total pages and emits controlled page changes', async () => {
    const wrapper = mount(Pagination, { props: { total: 100, pageSize: 10, currentPage: 1 } })

    expect(wrapper.findAll('.z-pagination__item')).toHaveLength(9)
    expect(wrapper.find('.z-pagination__item.is-active').text()).toBe('1')
    await wrapper.find('[aria-label="下一页"]').trigger('click')

    expect(wrapper.emitted('update:currentPage')).toEqual([[2]])
    expect(wrapper.emitted('change')).toEqual([[2]])
  })

  it('collapses long page ranges with more buttons', () => {
    const wrapper = mount(Pagination, { props: { total: 500, pageSize: 10, currentPage: 25 } })

    expect(wrapper.findAll('.is-more')).toHaveLength(2)
    expect(wrapper.find('.z-pagination__item.is-active').text()).toBe('25')
  })

  it('supports disabling and hiding a single page', async () => {
    const disabled = mount(Pagination, { props: { total: 30, pageSize: 10, disabled: true } })
    await disabled.find('[aria-label="下一页"]').trigger('click')
    expect(disabled.emitted('change')).toBeUndefined()

    const hidden = mount(Pagination, { props: { total: 1, pageSize: 10, hideOnSinglePage: true } })
    expect(hidden.find('.z-pagination').exists()).toBe(false)
  })
})
