import { describe, expect, it } from 'vitest'
import { faq } from './faq'
import { articles } from './poradnik'
import { ROUTES } from '../pages/meta'

describe('article slugs', () => {
  it('are non-empty, ascii kebab-case and unique', () => {
    const slugs = articles.map((a) => a.slug)
    for (const slug of slugs) {
      expect(slug).toMatch(/^[a-z0-9-]+$/)
    }
    expect(new Set(slugs).size).toBe(slugs.length)
  })
})

describe('article content', () => {
  it('has at least one section with non-empty body text', () => {
    for (const article of articles) {
      expect(article.sections.length).toBeGreaterThanOrEqual(1)
      const text = article.sections.flatMap((s) => s.body).join(' ').trim()
      expect(text.length).toBeGreaterThan(0)
    }
  })

  it('traces every article to a verbatim question in faq.ts', () => {
    const questions = faq.map((f) => f.q)
    for (const article of articles) {
      expect(questions).toContain(article.sourceQuestion)
    }
  })
})

describe('routes', () => {
  it('has 18 entries and no duplicates', () => {
    expect(ROUTES).toHaveLength(18)
    expect(new Set(ROUTES).size).toBe(ROUTES.length)
  })
})
