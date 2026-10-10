import { describe, it, expect, beforeAll } from 'vitest';
import path from 'node:path';

let posts, damsData, rigTutorials;

beforeAll(async () => {
  const postsModule = await import('../src/data/posts.js');
  const damsModule = await import('../src/data/damsData.js');
  const rigModule = await import('../src/data/rigTutorials.js');
  
  posts = postsModule.POSTS;
  damsData = damsModule.DAMS_DATA;
  rigTutorials = rigModule.RIG_TUTORIALS;
});

describe('Content Migration - updated fields', () => {
  describe('posts.js', () => {
    it('all posts have updated field', () => {
      posts.forEach(post => {
        expect(post).toHaveProperty('updated');
        expect(post.updated).toBeDefined();
        expect(typeof post.updated).toBe('string');
        // Should be valid YYYY-MM-DD format
        expect(post.updated).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      });
    });

    it('updated field is not before date field', () => {
      posts.forEach(post => {
        if (post.date && post.updated) {
          expect(new Date(post.updated) >= new Date(post.date)).toBe(true);
        }
      });
    });
  });

  describe('damsData.js', () => {
    it('all published dams have updated field', () => {
      const publishedDams = damsData.filter(d => d.status === 'published');
      publishedDams.forEach(dam => {
        expect(dam).toHaveProperty('updated');
        expect(dam.updated).toBeDefined();
        expect(typeof dam.updated).toBe('string');
        expect(dam.updated).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      });
    });

    it('updated field uses lastVerified for published dams', () => {
      const publishedDams = damsData.filter(d => d.status === 'published');
      publishedDams.forEach(dam => {
        if (dam.verification && dam.verification.lastVerified) {
          // The lastVerified might be a resolution string, not a date
          // If it's a date-like string, updated should match or be derived from it
          const lastVerified = dam.verification.lastVerified;
          if (lastVerified.match(/^\d{4}-\d{2}-\d{2}$/)) {
            expect(dam.updated).toBe(lastVerified);
          }
        }
      });
    });

    it('draft dams may not have updated field', () => {
      const draftDams = damsData.filter(d => d.status === 'draft');
      // Draft dams are excluded from routes, so updated is optional
      // This is just documentation - no assertion needed
    });
  });

  describe('rigTutorials.js', () => {
    it('all tutorials have updated field', () => {
      rigTutorials.forEach(rig => {
        expect(rig).toHaveProperty('updated');
        expect(rig.updated).toBeDefined();
        expect(typeof rig.updated).toBe('string');
        expect(rig.updated).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      });
    });
  });
});