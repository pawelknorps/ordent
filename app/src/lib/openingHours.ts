// The lab's clock, not the visitor's: `Date#getDay`/`getHours` read the host zone, while the
// hours we publish are Europe/Warsaw. An explicit `timeZone` is the only host-independent read
// (and it follows Polish DST for free).
const warsaw = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/Warsaw',
  weekday: 'long',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
})

/** The structured mirror of the published hours (`openingHours` in `data/site.ts`). */
export interface OpeningHours {
  /** English weekday names, as `Intl` reports them. */
  day: string[]
  opens: string
  closes: string
}

/** Europe/Warsaw weekday name and minutes since local midnight. */
export function warsawNow(d: Date): { weekday: string; minutes: number } {
  const parts = warsaw.formatToParts(d)
  const part = (type: string) => parts.find((p) => p.type === type)?.value ?? ''
  // % 24: hour12:false resolves to h23 in V8, but h24 builds spell midnight "24:00".
  return { weekday: part('weekday'), minutes: (Number(part('hour')) % 24) * 60 + Number(part('minute')) }
}

const CLOCK = /^(\d{1,2}):(\d{2})$/

function toMinutes(value: string): number | undefined {
  const match = CLOCK.exec(value)
  if (!match) return undefined
  const hours = Number(match[1])
  const minutes = Number(match[2])
  return hours < 24 && minutes < 60 ? hours * 60 + minutes : undefined
}

/** The week in `Intl`'s weekday order, for stepping forward from the current day. */
const WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

/**
 * The next weekday the lab opens, relative to `d`; `daysAhead` 0 means later today.
 * `undefined` when nothing is configured to open (or `d` is malformed).
 */
export function nextOpeningAt(
  d: Date,
  openingHours: OpeningHours[],
): { day: string; daysAhead: number } | undefined {
  let weekday: string
  let minutes: number
  try {
    ;({ weekday, minutes } = warsawNow(d))
  } catch {
    return undefined
  }

  const start = WEEK.indexOf(weekday)
  if (start < 0) return undefined

  for (let daysAhead = 0; daysAhead < WEEK.length; daysAhead++) {
    const day = WEEK[(start + daysAhead) % WEEK.length]
    for (const entry of openingHours) {
      if (!entry.day.includes(day)) continue
      const from = toMinutes(entry.opens)
      if (from === undefined) continue
      // Today counts only while its opening time is still ahead; a later day always counts.
      if (daysAhead > 0 || minutes < from) return { day, daysAhead }
    }
  }
  return undefined
}

/** Open when the Warsaw weekday is listed and `opens <= now < closes` (17:00 reads as closed). */
export function isOpenAt(d: Date, openingHours: OpeningHours[]): boolean {
  try {
    const { weekday, minutes } = warsawNow(d)
    return openingHours.some(({ day, opens, closes }) => {
      if (!day.includes(weekday)) return false
      const from = toMinutes(opens)
      const to = toMinutes(closes)
      return from !== undefined && to !== undefined && from <= minutes && minutes < to
    })
  } catch {
    // Malformed date or hours: a wrong badge beats a page that will not render.
    return false
  }
}
