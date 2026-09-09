import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Table, { TableColumn } from './index'

const columns = () => [
  h(TableColumn, { prop: 'name', label: '姓名' }),
  h(TableColumn, { prop: 'age', label: '年龄', width: 80, sortable: true }),
]

describe('ZTable', () => {
  it('renders configured columns, rows, border and stripe classes', async () => {
    const wrapper = mount(Table, {
      props: { data: [{ id: 1, name: '小明', age: 18 }], border: true, stripe: true },
      slots: { default: columns },
    })

    await nextTick()
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['z-table', 'is-border', 'is-stripe']))
    expect(wrapper.findAll('th')).toHaveLength(2)
    expect(wrapper.findAll('tbody tr')).toHaveLength(1)
    expect(wrapper.text()).toContain('小明')
    expect(wrapper.find('th:nth-child(2)').attributes('style')).toContain('width: 80px')
  })

  it('sorts a sortable column and emits sort changes', async () => {
    const wrapper = mount(Table, {
      props: { data: [{ name: '小明', age: 18 }, { name: '小红', age: 16 }] },
      slots: { default: columns },
    })

    await nextTick()
    await wrapper.find('th:nth-child(2)').trigger('click')
    expect(wrapper.find('tbody tr:first-child').text()).toContain('小红')
    expect(wrapper.emitted('sort-change')).toEqual([[{ prop: 'age', order: 'ascending' }]])
  })

  it('renders the empty state', async () => {
    const wrapper = mount(Table, { props: { data: [], emptyText: '没有记录' }, slots: { default: columns } })
    await nextTick()

    expect(wrapper.find('.z-table__empty').text()).toBe('没有记录')
  })
})
