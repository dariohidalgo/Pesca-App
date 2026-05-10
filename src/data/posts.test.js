import { POSTS } from './posts'

describe('posts.js', () => {
  describe('POSTS data structure', () => {
    it('each post has required fields', () => {
      const requiredFields = [
        'id',
        'slug',
        'title',
        'description',
        'date',
        'dateDisplay',
        'author',
        'readTime',
        'content',
      ]

      POSTS.forEach((post) => {
        requiredFields.forEach((field) => {
          expect(post).toHaveProperty(field)
          expect(post[field]).toBeDefined()
        })
      })
    })

    it('posts have unique IDs', () => {
      const ids = POSTS.map((p) => p.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(POSTS.length)
    })

    it('post IDs are sequential starting from 1', () => {
      const ids = POSTS.map((p) => p.id).sort((a, b) => a - b)
      expect(ids[0]).toBe(1)
      expect(ids).toEqual(ids.map((_, i) => i + 1))
    })

    it('post slugs are URL-safe (lowercase, hyphens, no spaces)', () => {
      POSTS.forEach((post) => {
        expect(post.slug).toBe(post.slug.toLowerCase())
        expect(post.slug).not.toMatch(/\s/)
        expect(post.slug).toMatch(/^[a-z0-9-]+$/)
      })
    })
  })
})
