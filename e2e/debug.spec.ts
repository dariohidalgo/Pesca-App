import { test, expect } from '@playwright/test';

for (const path of ['/', '/blog/secretos-pesca-tarariras-verano', '/blog/mejores-equipos-pejerrey-invierno-cordoba', '/diques/san-roque']) {
  test(`Direct load and reload preserve metadata without runtime errors: ${path}`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', err => errors.push(err.message));
    page.on('console', msg => {
      if (['error', 'warning'].includes(msg.type())) errors.push(msg.text());
    });
    await page.goto(path);
    for (const reload of [false, true]) {
      if (reload) await page.reload();
      await page.waitForLoadState('networkidle');
      await expect(page.locator('title')).toHaveCount(1);
      expect(await page.title()).not.toBe('');
      await expect(page.locator('meta[name="description"]')).toHaveCount(1);
      await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://www.pescacordoba.com.ar${path}`);
      const schemas = await page.locator('script[type="application/ld+json"]').evaluateAll(nodes => nodes.map(node => JSON.parse(node.textContent)));
      const types = schemas.flatMap(schema => schema['@type']);
      expect(schemas.length).toBeGreaterThan(0);
      expect(new Set(types).size).toBe(types.length);
      expect(JSON.stringify(schemas)).not.toContain('pesca-app.com');
      expect(errors).toEqual([]);
    }
  });
}
