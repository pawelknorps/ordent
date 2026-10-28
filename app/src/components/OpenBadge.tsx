import { useEffect, useState } from 'react'
import { openingHours, ui } from '../data/site'
import { isOpenAt, nextOpeningAt } from '../lib/openingHours'

// The English weekday names in `openingHours` are the structured data; these are only labels.
const PL_DAY: Record<string, string> = {
  Monday: 'pon.',
  Tuesday: 'wt.',
  Wednesday: 'śr.',
  Thursday: 'czw.',
  Friday: 'pt.',
  Saturday: 'sob.',
  Sunday: 'niedz.',
}

export default function OpenBadge() {
  const [state, setState] = useState<{ open: boolean; day?: string } | null>(null)

  // Clock reads belong in an effect, never in the render body: vite-react-ssg prerenders from
  // this component and would bake the build-time state into the HTML. null = neutral first paint.
  useEffect(() => {
    const now = new Date()
    // The next opening day, not `openingHours[0].day[0]` — that was always "Monday" and told a
    // visitor looking on a Wednesday that the lab opens on Monday.
    const next = nextOpeningAt(now, openingHours)
    // oxlint-disable-next-line react/set-state-in-effect -- a prerender-stable render body is the point
    setState({
      open: isOpenAt(now, openingHours),
      day: next && (next.daysAhead === 0 ? ui.reopenToday : PL_DAY[next.day]),
    })
  }, [])

  if (state === null) return null

  return (
    <span className={`open-badge open-badge--${state.open ? 'open' : 'closed'}`}>
      {state.open ? ui.openNow : ui.closedNow}
      {!state.open && state.day && ` – ${ui.reopenHint} ${state.day}`}
    </span>
  )
}
