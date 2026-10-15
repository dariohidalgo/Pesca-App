import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

describe('PWA and Workbox Configuration', () => {
  const rootDir = path.resolve(__dirname, '../..');
  const publicDir = path.resolve(rootDir, 'public');
  const distDir = path.resolve(rootDir, 'dist');

  it('provides all required PWA icons in public directory', () => {
    const requiredIcons = [
      'pwa-192x192.png',
      'pwa-512x512.png',
      'maskable-icon-512x512.png',
      'apple-touch-icon.png',
      'pesca.svg'
    ];

    for (const icon of requiredIcons) {
      const iconPath = path.resolve(publicDir, icon);
      expect(fs.existsSync(iconPath), `Icon ${icon} must exist`).toBe(true);
      expect(fs.statSync(iconPath).size).toBeGreaterThan(0);
    }
  });

  it('generates valid manifest.json with PescaApp metadata and icons', () => {
    const manifestPath = path.resolve(distDir, 'manifest.json');
    expect(fs.existsSync(manifestPath), 'dist/manifest.json must exist').toBe(true);

    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
    expect(manifest.short_name).toBe('PescaApp');
    expect(manifest.name).toContain('Pesca Córdoba');
    expect(manifest.display).toBe('standalone');
    expect(manifest.start_url).toBe('/');
    expect(manifest.icons).toBeInstanceOf(Array);
    expect(manifest.icons.length).toBeGreaterThanOrEqual(4);

    const icon192 = manifest.icons.find(i => i.sizes === '192x192');
    const icon512 = manifest.icons.find(i => i.sizes === '512x512' && i.purpose !== 'maskable');
    const maskable512 = manifest.icons.find(i => i.purpose === 'maskable');

    expect(icon192).toBeDefined();
    expect(icon512).toBeDefined();
    expect(maskable512).toBeDefined();
  });

  it('generates Service Worker with CacheFirst for images and StaleWhileRevalidate for offline sections', () => {
    const swPath = path.resolve(distDir, 'sw.js');
    expect(fs.existsSync(swPath), 'dist/sw.js must exist').toBe(true);

    const swContent = fs.readFileSync(swPath, 'utf-8');

    // Verifica que el SW incluya precaching
    expect(swContent).toContain('precacheAndRoute');

    // Verifica que incluya la estrategia CacheFirst para imágenes
    expect(swContent).toContain('CacheFirst');
    expect(swContent).toContain('pesca-images-cache');

    // Verifica que incluya StaleWhileRevalidate para las secciones offline
    expect(swContent).toContain('StaleWhileRevalidate');
    expect(swContent).toContain('pesca-critical-sections-cache');
    expect(swContent).toContain('/nudos');
    expect(swContent).toContain('/lineas');
    expect(swContent).toContain('/reglamento');

    // Verifica fallback de navegación a index.html
    expect(swContent).toContain('/index.html');
  });
});
