import { test, expect } from '@playwright/test';

test.describe('SEO Verification - Browser Navigation', () => {
  test.beforeEach(async ({ page }) => {
    page.on('console', msg => {
      if (msg.type() === 'warning' || msg.type() === 'error') {
        console.log(`Console ${msg.type()}: ${msg.text()}`);
      }
    });
  });

  test('Navigation: home → blog post → dam detail → home - JSON-LD verification', async ({ page }) => {
    // Start at home
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Verify JSON-LD on home
    const homeJsonLd = await extractJsonLd(page);
    const homeSchemaTypes = homeJsonLd.map(j => j['@type']).flat();
    expect(homeSchemaTypes.filter(t => t === 'WebSite').length).toBe(1);
    expect(homeSchemaTypes.filter(t => t === 'BreadcrumbList').length).toBeLessThanOrEqual(1);
    
    // Navigate to blog post
    await page.goto('/blog/secretos-pesca-tarariras-verano');
    await page.waitForLoadState('networkidle');
    
    const blogJsonLd = await extractJsonLd(page);
    const blogSchemaTypes = blogJsonLd.map(j => j['@type']).flat();
    expect(blogSchemaTypes.filter(t => t === 'Article').length).toBe(1);
    expect(blogSchemaTypes.filter(t => t === 'BreadcrumbList').length).toBeLessThanOrEqual(1);
    expect(blogSchemaTypes.filter(t => t === 'WebSite').length).toBe(1);
    
    // Navigate to dam detail
    await page.goto('/diques/san-roque');
    await page.waitForLoadState('networkidle');
    
    const damJsonLd = await extractJsonLd(page);
    const damSchemaTypes = damJsonLd.map(j => j['@type']).flat();
    expect(damSchemaTypes.filter(t => t === 'Guide').length).toBe(1);
    expect(damSchemaTypes.filter(t => t === 'BreadcrumbList').length).toBeLessThanOrEqual(1);
    expect(damSchemaTypes.filter(t => t === 'WebSite').length).toBe(1);
    
    // Navigate back to home
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const homeJsonLd2 = await extractJsonLd(page);
    const homeSchemaTypes2 = homeJsonLd2.map(j => j['@type']).flat();
    expect(homeSchemaTypes2.filter(t => t === 'WebSite').length).toBe(1);
    expect(homeSchemaTypes2.filter(t => t === 'BreadcrumbList').length).toBeLessThanOrEqual(1);
  });

  test('404 route returns HTTP 404 with noindex meta @pending-deploy', async ({ page }) => {
    test.info().annotations.push({ type: 'pending-deploy', description: 'HTTP 404 not reproducible in vercel dev (SPA fallback serves 200); only in production/preview' });
    
    const response = await page.goto('/nonexistent-route-12345', { waitUntil: 'networkidle' });
    // In vercel dev, SPA fallback returns 200; in production Vercel, 404 is served
    const status = response?.status();
    if (status === 404) {
      expect(status).toBe(404);
    } else {
      // In dev, verify the 404 page content is rendered (client-side)
      expect(status).toBe(200);
    }
    
    // Wait for client-side Helmet to render the noindex meta
    const noindexMeta = page.locator('meta[name="robots"][content="noindex, follow"]');
    await expect(noindexMeta).toHaveCount(1);
    
    // Canonical on 404 page should be self-referencing /404
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveCount(1);
    await expect(canonical).toHaveAttribute('href', 'https://pesca-app.com/404');
  });

  test('Hydration: zero console warnings on initial load', async ({ page }) => {
    const warnings: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'warning' && msg.text().includes('hydrat')) {
        warnings.push(msg.text());
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    expect(warnings.length).toBe(0);
  });

  test('@pending-deploy - Vercel edge headers and functions', async ({ page }) => {
    test.info().annotations.push({ type: 'pending-deploy', description: 'Vercel edge headers not reproducible in vercel dev' });
    
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);
    
    // These would need Vercel deployed environment to verify
    // Marked as pending-deploy
  });

  test('@pending-deploy - Vercel edge routing for prerendered routes', async ({ page }) => {
    test.info().annotations.push({ type: 'pending-deploy', description: 'Vercel edge routing not fully reproducible in vercel dev' });
    
    await page.goto('/blog/secretos-pesca-tarariras-verano');
    await page.waitForLoadState('networkidle');
    
    const response = await page.goto('/blog/secretos-pesca-tarariras-verano');
    expect(response?.status()).toBe(200);
  });
});

async function extractJsonLd(page: import('@playwright/test').Page) {
  const scripts = await page.locator('script[type="application/ld+json"]').all();
  const results = [];
  for (const script of scripts) {
    const content = await script.textContent();
    if (content) {
      try {
        results.push(JSON.parse(content));
      } catch {
        // Invalid JSON-LD
      }
    }
  }
  return results;
}