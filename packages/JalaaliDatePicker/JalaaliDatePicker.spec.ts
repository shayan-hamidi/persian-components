import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import { JalaaliDatePicker, useJalali } from './index'

describe('JalaaliDatePicker', () => {
  it('renders properly', async () => {
    const wrapper = mount(JalaaliDatePicker)
    await wrapper.find('button.day-btn').trigger('click')
    const emitted = wrapper.emitted()
    expect(emitted.onSelectDate.length).toBe(1)

    expect(wrapper.emitted().onSelectDate[0]).toEqual([1])

    expect(wrapper.findComponent(JalaaliDatePicker).isVisible()).toBe(true)
  })

  it('next month', () => {
    const { currentMonth, nextMonth } = useJalali()
    const date = new Date(
      currentMonth.value.getFullYear(),
      currentMonth.value.getMonth() + 1,
      currentMonth.value.getDate()
    )
    nextMonth()
    expect(currentMonth.value.getMonth() === date.getMonth()).toBe(true)
  })

  it('previous month', () => {
    const { currentMonth, previousMonth } = useJalali()
    const date = new Date(
      currentMonth.value.getFullYear(),
      currentMonth.value.getMonth() - 1,
      currentMonth.value.getDate()
    )
    previousMonth()
    expect(currentMonth.value.getMonth() === date.getMonth()).toBe(true)
  })

  it('next Year', () => {
    const { currentMonth, nextYear } = useJalali()
    const date = new Date(
      currentMonth.value.getFullYear() + 1,
      currentMonth.value.getMonth(),
      currentMonth.value.getDate()
    )
    nextYear()
    expect(currentMonth.value.getFullYear() === date.getFullYear()).toBe(true)
  })

  it('previous Year', () => {
    const { currentMonth, previousYear } = useJalali()
    const date = new Date(
      currentMonth.value.getFullYear() - 1,
      currentMonth.value.getMonth(),
      currentMonth.value.getDate()
    )
    previousYear()
    expect(currentMonth.value.getFullYear() === date.getFullYear()).toBe(true)
  })

  it('select date', () => {
    const { selectedDate, selectDate, getActiveDay } = useJalali()
    selectDate(17)
    const date = new Date(
      selectedDate.gregorian.getFullYear(),
      selectedDate.gregorian.getMonth(),
      17
    )
    expect(selectedDate.gregorian.getDate() === date.getDate()).toBe(true)
    expect(selectedDate.jalali.jDay === 17).toBe(true)
    expect(getActiveDay(17)).toBe(true)
    expect(getActiveDay(18)).toBe(false)
  })
})
