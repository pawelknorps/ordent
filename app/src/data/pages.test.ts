import { describe, expect, it } from 'vitest'
import { pages } from './pages'
import { services } from './services'

const lengthRules = (title: string, description: string) => {
  expect(title.length).toBeGreaterThan(0)
  expect(title.length).toBeLessThanOrEqual(60)
  expect(description.length).toBeGreaterThan(0)
  expect(description.length).toBeLessThanOrEqual(155)
  expect(description).not.toBe(title)
}

describe('service slugs', () => {
  it('are non-empty, ascii kebab-case and unique', () => {
    const slugs = services.map((s) => s.slug)
    for (const slug of slugs) {
      expect(slug).toMatch(/^[a-z0-9-]+$/)
    }
    expect(new Set(slugs).size).toBe(slugs.length)
  })
})

describe('service seo', () => {
  it('keeps titles and descriptions within limits and distinct', () => {
    for (const { seo } of services) {
      lengthRules(seo.title, seo.description)
    }
  })
})

describe('pages metadata', () => {
  it('has exactly the three routes', () => {
    expect(Object.keys(pages).sort()).toEqual(['/', '/cennik/', '/poradnik/'])
  })

  it('keeps titles and descriptions within limits and distinct', () => {
    for (const { title, description } of Object.values(pages)) {
      lengthRules(title, description)
    }
  })
})
