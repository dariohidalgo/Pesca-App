import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const scriptPath = path.resolve(__dirname, 'verify-seo.mjs');

describe('scripts/verify-seo.mjs - JSDOM static verification', () => {
  let manifest;
  let mockFs;
  let originalFs;
  
  beforeEach(async () => {
    // Run the script to generate manifest for testing
    const { generateRoutesManifest } = await import('../scripts/generate-routes.mjs');
    manifest = await generateRoutesManifest();
    
    // Mock fs for testing
    originalFs = { ...fs };
  });
  
  afterEach(() => {
    vi.resetModules();
  });

  describe('runStaticVerification', () => {
    it('exports runStaticVerification function', async () => {
      const mod = await import(scriptPath);
      expect(typeof mod.runStaticVerification).toBe('function');
    });

    it('exports runBrowserVerification function', async () => {
      const mod = await import(scriptPath);
      expect(typeof mod.runBrowserVerification).toBe('function');
    });
  });

  describe('checkRouteWithJSDOM', () => {
    it('validates correct SEO tags in prerendered HTML', async () => {
      const mod = await import(scriptPath);
      
      // Make body content long enough (>500 chars)
      const longContent = 'Test content that is long enough to pass the body length check '.repeat(20);
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Test Page</title>
          <meta name="description" content="Test description">
          <link rel="canonical" href="https://pesca-app.com/test">
          <meta property="og:title" content="Test Page">
          <meta property="og:description" content="Test description">
          <meta property="og:image" content="https://pesca-app.com/image.jpg">
          <meta property="og:url" content="https://pesca-app.com/test">
          <meta name="twitter:title" content="Test Page">
          <meta name="twitter:description" content="Test description">
          <script type="application/ld+json">{"@context":"https://schema.org","@type":"WebSite"}</script>
        </head>
        <body>
          <div id="root">${longContent}</div>
        </body>
        </html>
      `;
      
      const result = mod.checkRouteWithJSDOM('/test', html, 'https://pesca-app.com/test');
      expect(result.ok).toBe(true);
      expect(result.title).toBe('Test Page');
      expect(result.canonicalMatch).toBe(true);
      expect(result.ldJsonOk).toBe(true);
    });

    it('detects missing title', async () => {
      const mod = await import(scriptPath);
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta name="description" content="Test description">
          <link rel="canonical" href="https://pesca-app.com/test">
          <meta property="og:title" content="Test Page">
          <meta property="og:description" content="Test description">
          <meta property="og:image" content="https://pesca-app.com/image.jpg">
          <meta property="og:url" content="https://pesca-app.com/test">
          <meta name="twitter:title" content="Test Page">
          <meta name="twitter:description" content="Test description">
          <script type="application/ld+json">{"@context":"https://schema.org","@type":"WebSite"}</script>
        </head>
        <body>
          <div id="root">Test content that is long enough to pass the body length check</div>
        </body>
        </html>
      `;
      
      const result = mod.checkRouteWithJSDOM('/test', html, 'https://pesca-app.com/test');
      expect(result.ok).toBe(false);
      expect(result.titleCount).toBe(0);
    });

    it('detects duplicate JSON-LD schema types', async () => {
      const mod = await import(scriptPath);
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Test Page</title>
          <meta name="description" content="Test description">
          <link rel="canonical" href="https://pesca-app.com/test">
          <meta property="og:title" content="Test Page">
          <meta property="og:description" content="Test description">
          <meta property="og:image" content="https://pesca-app.com/image.jpg">
          <meta property="og:url" content="https://pesca-app.com/test">
          <meta name="twitter:title" content="Test Page">
          <meta name="twitter:description" content="Test description">
          <script type="application/ld+json">{"@context":"https://schema.org","@type":"WebSite"}</script>
          <script type="application/ld+json">{"@context":"https://schema.org","@type":"WebSite"}</script>
        </head>
        <body>
          <div id="root">Test content that is long enough to pass the body length check</div>
        </body>
        </html>
      `;
      
      const result = mod.checkRouteWithJSDOM('/test', html, 'https://pesca-app.com/test');
      expect(result.ok).toBe(false);
      expect(result.ldJsonOk).toBe(false);
    });

    it('detects thin body content', async () => {
      const mod = await import(scriptPath);
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Test Page</title>
          <meta name="description" content="Test description">
          <link rel="canonical" href="https://pesca-app.com/test">
          <meta property="og:title" content="Test Page">
          <meta property="og:description" content="Test description">
          <meta property="og:image" content="https://pesca-app.com/image.jpg">
          <meta property="og:url" content="https://pesca-app.com/test">
          <meta name="twitter:title" content="Test Page">
          <meta name="twitter:description" content="Test description">
          <script type="application/ld+json">{"@context":"https://schema.org","@type":"WebSite"}</script>
        </head>
        <body>
          <div id="root">Short</div>
        </body>
        </html>
      `;
      
      const result = mod.checkRouteWithJSDOM('/test', html, 'https://pesca-app.com/test');
      expect(result.ok).toBe(false);
      expect(result.bodyLength).toBeLessThan(500);
    });
  });
});

describe('verify-seo.mjs - CLI execution', () => {
  it('runs static verification via CLI', { timeout: 60000 }, async () => {
    const { execSync } = await import('node:child_process');
    const result = execSync('node scripts/verify-seo.mjs', { 
      cwd: rootDir,
      encoding: 'utf-8',
      stdio: 'pipe'
    });
    expect(result).toContain('Todas las rutas cumplen estrictamente con los requisitos SEO');
  });
});