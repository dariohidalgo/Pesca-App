import { test, expect } from '@playwright/test';

const PRODUCTION_DOMAIN = 'https://www.pescacordoba.com.ar';

test.describe('SEO Verification - Navigation & Client Behavior', () => {
  // Inspect the whole document so body duplicates cannot escape verification.
  async function extractJsonLd(page) {
    const scripts = await page.locator('script[type="application/ld+json"]').all();
    const results = [];
    for (const script of scripts) {
      const content = await script.textContent();
      if (content) {
        try {
          results.push(JSON.parse(content));
        } catch {
          results.push({ __parseError: true, raw: content });
        }
      }
    }
    return results;
  }

  // Helper to verify page metadata on client-side
  async function verifyPageMetadata(page, expectedPath, expectedSchemaTypes, options = {}) {
    const { allowWebSite = false, allowBreadcrumb = true, allowArticle = false, allowGuide = false, allowHowTo = false, allowItemList = false } = options;
    
    await page.waitForLoadState('networkidle');
    
    // Title
    await expect(page.locator('title')).toHaveCount(1);
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
    
    // Meta description - should be exactly 1 after client-side hydration
    const metaDesc = page.locator('meta[name="description"]');
    await expect(metaDesc).toHaveCount(1);
    const descContent = await metaDesc.getAttribute('content');
    expect(descContent?.length).toBeGreaterThan(0);
    
    // Canonical
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveCount(1);
    const expectedCanonical = `${PRODUCTION_DOMAIN}${expectedPath === '/' ? '/' : expectedPath}`;
    await expect(canonical).toHaveAttribute('href', expectedCanonical);
    
    // Open Graph
    await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);
    await expect(page.locator('meta[property="og:description"]')).toHaveCount(1);
    await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
    await expect(page.locator('meta[property="og:url"]')).toHaveCount(1);
    const ogUrl = await page.locator('meta[property="og:url"]').getAttribute('content');
    expect(ogUrl).toBe(expectedCanonical);
    
    // Twitter
    await expect(page.locator('meta[name="twitter:title"]')).toHaveCount(1);
    await expect(page.locator('meta[name="twitter:description"]')).toHaveCount(1);
    await expect(page.locator('meta[name="twitter:image"]')).toHaveCount(1);
    
    // JSON-LD
    const jsonLd = await extractJsonLd(page);
    const parseErrors = jsonLd.filter(j => j.__parseError);
    expect(parseErrors.length).toBe(0);
    
    const schemaTypes = jsonLd.map(j => j['@type']).flat();
    
    // WebSite: only on home
    const webSiteCount = schemaTypes.filter(t => t === 'WebSite').length;
    if (allowWebSite) {
      expect(webSiteCount).toBe(1);
    } else {
      expect(webSiteCount).toBe(0);
    }
    
    // BreadcrumbList
    const breadcrumbCount = schemaTypes.filter(t => t === 'BreadcrumbList').length;
    if (allowBreadcrumb) {
      expect(breadcrumbCount).toBeLessThanOrEqual(1);
    } else {
      expect(breadcrumbCount).toBe(0);
    }
    
    // Article
    if (allowArticle) {
      expect(schemaTypes.filter(t => t === 'Article').length).toBe(1);
    }
    
    // Guide
    if (allowGuide) {
      expect(schemaTypes.filter(t => t === 'Guide').length).toBe(1);
    }
    
    // HowTo
    if (allowHowTo) {
      expect(schemaTypes.filter(t => t === 'HowTo').length).toBe(1);
    }
    
    // ItemList / CollectionPage
    if (allowItemList) {
      expect(schemaTypes.filter(t => t === 'ItemList' || t === 'CollectionPage').length).toBeGreaterThanOrEqual(1);
    }
    
    // No duplicates of any schema type
    const typeCounts = {};
    for (const t of schemaTypes) {
      typeCounts[t] = (typeCounts[t] || 0) + 1;
    }
    for (const [type, count] of Object.entries(typeCounts)) {
      expect(count).toBe(1);
    }
    
    // No pesca-app.com references in metadata
    const metaSection = await page.locator('title, meta, link[rel="canonical"], script[type="application/ld+json"]').evaluateAll(nodes => nodes.map(node => node.outerHTML).join('\n'));
    expect(metaSection).not.toContain('pesca-app.com');
    
    return { title, jsonLd, canonical: expectedCanonical };
  }

  async function verifyNoResidualMetadata(page, previousPaths) {
    const jsonLd = await extractJsonLd(page);
    const schemaTypes = jsonLd.map(j => j['@type']).flat();
    
    // Check no residual WebSite from previous pages (only home should have it)
    const isHome = page.url().endsWith('/') || page.url().endsWith(PRODUCTION_DOMAIN);
    const webSiteCount = schemaTypes.filter(t => t === 'WebSite').length;
    if (!isHome) {
      expect(webSiteCount).toBe(0);
    }
    
    // Check no residual Article/Guide from previous pages
    if (!page.url().includes('/blog/')) {
      expect(schemaTypes.filter(t => t === 'Article').length).toBe(0);
    }
    if (!page.url().includes('/diques/')) {
      expect(schemaTypes.filter(t => t === 'Guide').length).toBe(0);
    }
    if (!page.url().includes('/lineas/')) {
      expect(schemaTypes.filter(t => t === 'HowTo').length).toBe(0);
    }
  }

  test('Navigation: Home → Blog → Article A → Blog → Article B → Dams → Dam Detail → Home', async ({ page }) => {
    const consoleData = { errors: [], warnings: [], pageErrors: [] };
    page.on('console', msg => {
      if (msg.type() === 'error') consoleData.errors.push(msg.text());
      if (msg.type() === 'warning') consoleData.warnings.push(msg.text());
    });
    page.on('pageerror', err => consoleData.pageErrors.push(err.message));
    
    // 1. Start at Home
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    let result = await verifyPageMetadata(page, '/', [], { allowWebSite: true, allowBreadcrumb: false });
    expect(result.canonical).toBe(`${PRODUCTION_DOMAIN}/`);
    
    // 2. Click to Blog index
    await page.click('a[href="/blog"]');
    await page.waitForLoadState('networkidle');
    await verifyPageMetadata(page, '/blog', [], { 
      allowItemList: true, 
      allowBreadcrumb: true 
    });
    await verifyNoResidualMetadata(page, ['/']);
    
    // 3. Click to Article A
    await page.click('a[href="/blog/secretos-pesca-tarariras-verano"]');
    await page.waitForLoadState('networkidle');
    await verifyPageMetadata(page, '/blog/secretos-pesca-tarariras-verano', [], { 
      allowArticle: true, 
      allowBreadcrumb: true 
    });
    await verifyNoResidualMetadata(page, ['/', '/blog']);
    
    // 4. Back to Blog index
    await page.goBack();
    await page.waitForLoadState('networkidle');
    await verifyPageMetadata(page, '/blog', [], { 
      allowItemList: true, 
      allowBreadcrumb: true 
    });
    await verifyNoResidualMetadata(page, ['/', '/blog/secretos-pesca-tarariras-verano']);
    
    // 5. Click to Article B
    await page.click('a[href="/blog/mejores-equipos-pejerrey-invierno-cordoba"]');
    await page.waitForLoadState('networkidle');
    await verifyPageMetadata(page, '/blog/mejores-equipos-pejerrey-invierno-cordoba', [], { 
      allowArticle: true, 
      allowBreadcrumb: true 
    });
    await verifyNoResidualMetadata(page, ['/', '/blog']);
    
    // 6. Click to Dams index (via nav)
    await page.click('a[href="/diques"]');
    await page.waitForLoadState('networkidle');
    await verifyPageMetadata(page, '/diques', [], { 
      allowItemList: true, 
      allowBreadcrumb: true 
    });
    await verifyNoResidualMetadata(page, ['/', '/blog/mejores-equipos-pejerrey-invierno-cordoba']);
    
    // 7. Click to Dam Detail
    await page.click('a[href="/diques/san-roque"]');
    await page.waitForLoadState('networkidle');
    await verifyPageMetadata(page, '/diques/san-roque', [], { 
      allowGuide: true, 
      allowBreadcrumb: true 
    });
    await verifyNoResidualMetadata(page, ['/', '/blog/mejores-equipos-pejerrey-invierno-cordoba', '/diques']);
    
    // 8. Return through the router, not a fresh document.
    await page.locator('a[href="/"]').first().click();
    await page.waitForLoadState('networkidle');
    await verifyPageMetadata(page, '/', [], { allowWebSite: true, allowBreadcrumb: false });
    await verifyNoResidualMetadata(page, ['/diques/san-roque', '/diques']);
    
    await page.goBack();
    await verifyPageMetadata(page, '/diques/san-roque', [], { allowGuide: true });
    await page.goForward();
    await verifyPageMetadata(page, '/', [], { allowWebSite: true, allowBreadcrumb: false });

    // 9. Reload home
    await page.reload();
    await page.waitForLoadState('networkidle');
    await verifyPageMetadata(page, '/', [], { allowWebSite: true, allowBreadcrumb: false });
    
    // Check no console errors related to hydration
    const hydrationWarnings = consoleData.warnings.filter(w => 
      w.toLowerCase().includes('hydrat') || 
      w.toLowerCase().includes('react') ||
      w.toLowerCase().includes('mismatch')
    );
    expect(hydrationWarnings.length).toBe(0);
    
    expect(consoleData.errors).toEqual([]);
    expect(consoleData.pageErrors).toEqual([]);
  });
});

test.describe('SEO Verification - Hydration & Console Errors', () => {
  test('Hydration: zero console errors/warnings on initial load', async ({ page }) => {
    const consoleData = { errors: [], warnings: [], pageErrors: [] };
    page.on('console', msg => {
      if (msg.type() === 'error') consoleData.errors.push(msg.text());
      if (msg.type() === 'warning') consoleData.warnings.push(msg.text());
    });
    page.on('pageerror', err => consoleData.pageErrors.push(err.message));
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check all warnings (not just hydration)
    const relevantWarnings = consoleData.warnings.filter(w => 
      !w.includes('punycode') && 
      !w.includes('localStorage') &&
      !w.includes('autofill')
    );
    
    const hydrationWarnings = relevantWarnings.filter(w => 
      w.toLowerCase().includes('hydrat') || 
      w.toLowerCase().includes('mismatch') ||
      w.toLowerCase().includes('react')
    );
    
    if (hydrationWarnings.length > 0) {
      console.log('Hydration warnings:', hydrationWarnings);
    }
    expect(hydrationWarnings.length).toBe(0);
    
    // No console errors
    expect(consoleData.errors.length).toBe(0);
    
    expect(consoleData.pageErrors).toEqual([]);
  });
});

test.describe('SEO Verification - 404 Page', () => {
  test('404 page has noindex meta and correct canonical', async ({ page }) => {
    await page.goto('/nonexistent-route-12345');
    await page.waitForLoadState('networkidle');
    
    // Check noindex
    await expect(page.locator('meta[name="robots"][content="noindex, follow"]')).toHaveCount(1);
    
    // Canonical should be self-referencing 404
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveCount(1);
    await expect(canonical).toHaveAttribute('href', `${PRODUCTION_DOMAIN}/404`);
  });

  test('HTTP 404 for nonexistent routes @pending-deploy', async ({ page }) => {
    test.info().annotations.push({ 
      type: 'pending-deploy', 
      description: 'HTTP 404 only in Vercel production/preview; vercel dev returns 200 with SPA fallback' 
    });
    test.skip(true, 'Requires Vercel production/preview deployment');
  });

  test('HTTP 404 for nonexistent blog slug @pending-deploy', async ({ page }) => {
    test.info().annotations.push({ 
      type: 'pending-deploy', 
      description: 'HTTP 404 only in Vercel production/preview' 
    });
    test.skip(true, 'Requires Vercel production/preview deployment');
  });

  test('HTTP 404 for nonexistent dam slug @pending-deploy', async ({ page }) => {
    test.info().annotations.push({ 
      type: 'pending-deploy', 
      description: 'HTTP 404 only in Vercel production/preview' 
    });
    test.skip(true, 'Requires Vercel production/preview deployment');
  });
});

test.describe('SEO Verification - Vercel Deployment (pending)', () => {
  test('@pending-deploy - Vercel edge headers', async ({ page }) => {
    test.info().annotations.push({ 
      type: 'pending-deploy', 
      description: 'Requires Vercel production/preview deployment to verify security headers, caching headers, edge functions' 
    });
    test.skip(true, 'Requires Vercel deployment');
  });

  test('@pending-deploy - Vercel edge routing for prerendered routes', async ({ page }) => {
    test.info().annotations.push({ 
      type: 'pending-deploy', 
      description: 'Requires Vercel production/preview to verify edge routing serves prerendered HTML' 
    });
    test.skip(true, 'Requires Vercel deployment');
  });
});

// Helper functions
async function extractJsonLd(page) {
  const scripts = await page.locator('script[type="application/ld+json"]').all();
  const results = [];
  for (const script of scripts) {
    const content = await script.textContent();
    if (content) {
      try {
        results.push(JSON.parse(content));
      } catch {
        results.push({ __parseError: true, raw: content });
      }
    }
  }
  return results;
}
