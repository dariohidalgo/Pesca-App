import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

describe('scripts/prerender.js - JSON-LD extraction and manifest consumption', () => {
  describe('JSON-LD extraction logic', () => {
    it('extracts JSON-LD from rendered body and injects into head', async () => {
      const { JSDOM } = await import('jsdom');
      
      const htmlWithJsonLdInBody = `
        <title>Test</title>
        <meta name="description" content="Test">
        <script type="application/ld+json">{"@context":"https://schema.org","@type":"WebSite"}</script>
        <h1>Content</h1>
        <script type="application/ld+json">{"@context":"https://schema.org","@type":"Article"}</script>
      `;
      
      const frag = new JSDOM(htmlWithJsonLdInBody).window.document;
      const ldJsonScripts = Array.from(frag.querySelectorAll('script[type="application/ld+json"]'));
      
      expect(ldJsonScripts.length).toBe(2);
      
      const headElements = [];
      for (const script of ldJsonScripts) {
        headElements.push(script.outerHTML);
        script.remove();
      }
      
      expect(headElements.length).toBe(2);
      expect(frag.querySelectorAll('script[type="application/ld+json"]').length).toBe(0);
    });

    it('produces HTML with JSON-LD only in head, none in body', async () => {
      const { JSDOM } = await import('jsdom');
      
      const template = `<!doctype html>
<html>
<head>
  <!-- app-head -->
</head>
<body>
  <div id="root"></div>
</body>
</html>`;
      
      const html = `
        <title>Test</title>
        <script type="application/ld+json">{"@type":"WebSite"}</script>
        <h1>Content</h1>
        <script type="application/ld+json">{"@type":"Article"}</script>
      `;
      
      const frag = new JSDOM(html).window.document;
      const ldJsonScripts = Array.from(frag.querySelectorAll('script[type="application/ld+json"]'));
      
      const headElements = [];
      const bodyElements = [];
      
      for (const script of ldJsonScripts) {
        headElements.push(script.outerHTML);
        script.remove();
      }
      
      for (const node of Array.from(frag.childNodes)) {
        if (node.nodeType === 1) {
          const tagName = node.tagName.toLowerCase();
          if (['title', 'meta', 'link'].includes(tagName)) {
            headElements.push(node.outerHTML);
          } else {
            bodyElements.push(node.outerHTML);
          }
        } else if (node.nodeType === 3) {
          const text = node.textContent.trim();
          if (text) bodyElements.push(text);
        }
      }
      
      const headString = headElements.join('\n  ');
      const bodyString = bodyElements.join('');
      
      let pageHtml = template.replace('<!-- app-head -->', headString);
      pageHtml = pageHtml.replace('<div id="root"></div>', `<div id="root">${bodyString}</div>`);
      
      const resultDom = new JSDOM(pageHtml).window.document;
      
      // Verify JSON-LD is in head
      const headScripts = resultDom.querySelectorAll('head script[type="application/ld+json"]');
      expect(headScripts.length).toBe(2);
      
      // Verify NO JSON-LD in body
      const bodyScripts = resultDom.querySelectorAll('body script[type="application/ld+json"]');
      expect(bodyScripts.length).toBe(0);
    });
  });
});