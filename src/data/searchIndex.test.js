import { search, searchIndex } from './searchIndex'

describe('searchIndex.js', () => {
  describe('search(query)', () => {
    it('returns exact match result', () => {
      const results = search('Pejerrey')
      expect(results.length).toBeGreaterThan(0)
      expect(results.some((r) => r.id === 'pejerrey')).toBe(true)
    })

    it('returns partial match results from description', () => {
      const results = search('dique')
      expect(results.length).toBeGreaterThan(0)
      expect(
        results.some((r) => r.description.toLowerCase().includes('dique'))
      ).toBe(true)
    })

    it('is case insensitive', () => {
      const results = search('TARARIRA')
      expect(results.length).toBeGreaterThan(0)
      expect(results.some((r) => r.id === 'tararira')).toBe(true)
    })

    it('returns empty array for query shorter than 2 chars', () => {
      expect(search('a')).toEqual([])
    })

    it('returns empty array for empty query', () => {
      expect(search('')).toEqual([])
    })

    it('returns empty array for undefined query', () => {
      expect(search(undefined)).toEqual([])
    })

    it('returns empty array when no matches', () => {
      expect(search('xyz123nonexistent')).toEqual([])
    })

    it('limits results to 8 items', () => {
      const results = search('pesca')
      expect(results.length).toBeLessThanOrEqual(8)
    })
  })

  describe('searchIndex export', () => {
    it('exports a non-empty array', () => {
      expect(Array.isArray(searchIndex)).toBe(true)
      expect(searchIndex.length).toBeGreaterThan(0)
    })

    it('each item has required fields', () => {
      searchIndex.forEach((item) => {
        expect(item).toHaveProperty('id')
        expect(item).toHaveProperty('name')
        expect(item).toHaveProperty('description')
        expect(item).toHaveProperty('category')
        expect(item).toHaveProperty('path')
      })
    })
  })
})
