import { test, expect } from '@playwright/test';

test('Debug page errors', async ({ page }) => {
  page.on('pageerror', err => {
    console.log('PAGE ERROR:', err.message);
    console.log('STACK:', err.stack);
  });
  page.on('console', msg => {
    if (msg.type() === 'error') console.log('CONSOLE ERROR:', msg.text());
    if (msg.type() === 'warning') console.log('CONSOLE WARN:', msg.text());
  });
  
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.goto('/blog/secretos-pesca-tarariras-verano');
  await page.waitForLoadState('networkidle');
  
  // Check for pesca-app.com in metadata only
  const metaTags = await page.locator('title, meta, link[rel="canonical"], script[type="application/ld+json"]').all();
  for (const tag of metaTags) {
    const html = await tag.evaluate(el => el.outerHTML);
    if (html.includes('pesca-app.com')) {
      console.log('FOUND pesca-app.com in:', html);
    }
  }
});
