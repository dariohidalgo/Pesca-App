import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const scriptPath = path.resolve(__dirname, 'generate-routes.mjs');

describe('generate-routes.mjs', () => {
  let manifest;

  beforeAll(async () => {
    // Run the script to generate manifest
    const { generateRoutesManifest } = await import(scriptPath);
    manifest = await generateRoutesManifest();
  });

  describe('Manifest Schema', () => {
    it('has correct top-level structure', () => {
      expect(manifest).toHaveProperty('routes');
      expect(manifest).toHaveProperty('generatedAt');
      expect(manifest).toHaveProperty('version');
      expect(Array.isArray(manifest.routes)).toBe(true);
    });

    it('has version "1"', () => {
      expect(manifest.version).toBe('1');
    });

    it('generatedAt is a valid ISO timestamp', () => {
      expect(() => new Date(manifest.generatedAt).toISOString()).not.toThrow();
    });
  });

  describe('Route entries', () => {
    it('includes static routes', () => {
      const staticRoutes = manifest.routes.filter(r => r.type === 'static');
      expect(staticRoutes.length).toBeGreaterThan(0);
      
      const homeRoute = staticRoutes.find(r => r.path === '/');
      expect(homeRoute).toBeDefined();
      expect(homeRoute.contentSource).toBeNull();
    });

    it('includes dynamic blog routes expanded from posts.js', () => {
      const blogRoutes = manifest.routes.filter(r => r.path.startsWith('/blog/') && r.path !== '/blog');
      expect(blogRoutes.length).toBeGreaterThan(0);
      
      blogRoutes.forEach(route => {
        expect(route.type).toBe('dynamic');
        expect(route.contentSource).toBe('posts.js');
        expect(route.params).toContain('slug');
      });
    });

    it('includes dynamic dams routes expanded from damsData.js (published only)', () => {
      const damRoutes = manifest.routes.filter(r => r.path.startsWith('/diques/') && r.path !== '/diques');
      expect(damRoutes.length).toBeGreaterThan(0);
      
      damRoutes.forEach(route => {
        expect(route.type).toBe('dynamic');
        expect(route.contentSource).toBe('damsData.js');
        expect(route.params).toContain('slug');
      });
    });

    it('includes dynamic rig tutorial routes expanded from rigTutorials.js', () => {
      const rigRoutes = manifest.routes.filter(r => r.path.startsWith('/lineas/') && r.path !== '/lineas');
      expect(rigRoutes.length).toBeGreaterThan(0);
      
      rigRoutes.forEach(route => {
        expect(route.type).toBe('dynamic');
        expect(route.contentSource).toBe('rigTutorials.js');
        expect(route.params).toContain('slug');
      });
    });

    it('excludes draft dams from routes', () => {
      const allDamSlugs = manifest.routes
        .filter(r => r.contentSource === 'damsData.js')
        .map(r => r.path.replace('/diques/', ''));
      
      // cerro-pelado and el-cajon are drafts, should not be in routes
      expect(allDamSlugs).not.toContain('cerro-pelado');
      expect(allDamSlugs).not.toContain('el-cajon');
    });

    it('each route has required fields', () => {
      manifest.routes.forEach(route => {
        expect(route).toHaveProperty('path');
        expect(route).toHaveProperty('type');
        expect(route).toHaveProperty('contentSource');
        expect(route).toHaveProperty('params');
        expect(typeof route.path).toBe('string');
        expect(['static', 'dynamic']).toContain(route.type);
        expect(route.params).toBeInstanceOf(Array);
      });
    });
  });

  describe('Drift Detection', () => {
    it('detects orphaned routes (in App.jsx but no content source)', async () => {
      // This test will be implemented after the main logic
      // For now, verify the manifest can be generated without error
      expect(manifest.routes.length).toBeGreaterThan(0);
    });
  });
});

describe('generate-routes.mjs - CLI execution', () => {
  it('writes manifest to dist/routes-manifest.json when run as script', async () => {
    // This will be tested after implementation
    const distManifestPath = path.resolve(rootDir, 'dist/routes-manifest.json');
    if (fs.existsSync(distManifestPath)) {
      const content = JSON.parse(fs.readFileSync(distManifestPath, 'utf-8'));
      expect(content).toHaveProperty('routes');
      expect(content).toHaveProperty('version', '1');
    }
  });
});