import { describe, expect, it } from 'vitest'
import { openingHours } from '../data/site'
import { isOpenAt, nextOpeningAt, warsawNow } from './openingHours'

// 2026-07-15 is a Wednesday, and Warsaw is UTC+2 then (CEST): 08:00Z == 10:00 local.
// 2026-01-14 is a Wednesday and UTC+1 (CET): 09:00Z == 10:00 local.
const wednesdayCest = (time: string) => new Date(`2026-07-15T${time}Z`)

describe('warsawNow', () => {
  it('reports the Europe/Warsaw weekday and minute of the day', () => {
    expect(warsawNow(wednesdayCest('11:30'))).toEqual({ weekday: 'Wednesday', minutes: 810 }) // 13:30
  })
})

describe('isOpenAt', () => {
  it('is open mid-weekday', () => {
    expect(isOpenAt(wednesdayCest('09:00'), openingHours)).toBe(true)
  })

  it('is closed at 09:59', () => {
    expect(isOpenAt(wednesdayCest('07:59'), openingHours)).toBe(false)
  })

  it('is open exactly at 10:00', () => {
    expect(isOpenAt(wednesdayCest('08:00'), openingHours)).toBe(true)
  })

  it('is closed exactly at 17:00', () => {
    expect(isOpenAt(wednesdayCest('15:00'), openingHours)).toBe(false)
  })

  it('is closed on Saturday', () => {
    expect(isOpenAt(new Date('2026-07-18T10:00:00Z'), openingHours)).toBe(false)
  })

  it('is closed on Sunday', () => {
    expect(isOpenAt(new Date('2026-07-19T10:00:00Z'), openingHours)).toBe(false)
  })

  // 08:30Z is 08:30 UTC (closed) but 10:30 in Warsaw (open) — a host-local or UTC read fails here.
  it('reads Warsaw time, not UTC (CEST)', () => {
    expect(isOpenAt(wednesdayCest('08:30'), openingHours)).toBe(true)
  })

  it('reads Warsaw time, not UTC (CET)', () => {
    expect(isOpenAt(new Date('2026-01-14T09:30:00Z'), openingHours)).toBe(true)
  })

  it('returns false instead of throwing on malformed input', () => {
    expect(isOpenAt(new Date('nope'), openingHours)).toBe(false)
    expect(isOpenAt(wednesdayCest('11:00'), [{ day: ['Wednesday'], opens: 'dziesięć', closes: '17:00' }])).toBe(false)
    expect(isOpenAt(wednesdayCest('11:00'), [{ day: [], opens: '10:00', closes: '17:00' }])).toBe(false)
  })
})

describe('nextOpeningAt', () => {
  // 2026-07-15 is a Wednesday; CEST is UTC+2, so 00:30Z is 02:30 local.
  it('points at today while the opening time is still ahead', () => {
    expect(nextOpeningAt(wednesdayCest('00:30'), openingHours)).toEqual({ day: 'Wednesday', daysAhead: 0 })
  })

  it('points at the next working day once closed (16:00Z = 18:00 local)', () => {
    expect(nextOpeningAt(wednesdayCest('16:00'), openingHours)).toEqual({ day: 'Thursday', daysAhead: 1 })
  })

  it('skips the weekend to Monday', () => {
    // 2026-07-18 is a Saturday at 12:00 local.
    expect(nextOpeningAt(new Date('2026-07-18T10:00:00Z'), openingHours)).toEqual({
      day: 'Monday',
      daysAhead: 2,
    })
  })

  it('returns undefined when nothing is configured to open', () => {
    expect(nextOpeningAt(wednesdayCest('11:00'), [])).toBeUndefined()
    expect(nextOpeningAt(new Date('nope'), openingHours)).toBeUndefined()
  })
})
