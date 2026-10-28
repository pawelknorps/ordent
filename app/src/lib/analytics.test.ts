import { describe, expect, it } from 'vitest'
import { phoneFromHref, track } from './analytics'

describe('phoneFromHref', () => {
  it('extracts an international number', () => {
    expect(phoneFromHref('tel:+48601594229')).toBe('+48601594229')
  })

  it('extracts a local number', () => {
    expect(phoneFromHref('tel:601594229')).toBe('601594229')
  })

  it('returns undefined for a non-tel href', () => {
    expect(phoneFromHref('https://example.com')).toBeUndefined()
  })
})

describe('track', () => {
  it('no-ops without throwing before initAnalytics', () => {
    expect(() => track('Call', { phone: '601594229' })).not.toThrow()
  })
})
