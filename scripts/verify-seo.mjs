import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

export function loadManifest() {
  const manifestPath = path.resolve(distDir, 'routes-manifest.json');
  if (!fs.existsSync(manifestPath)) {
    throw new Error('Route manifest not found. Run build first.');
  }
  return JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
}

function loadSitemapUrls() {
  const sitemapPath = path.resolve(rootDir, 'public/sitemap.xml');
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
  const locMatches = [...sitemapContent.matchAll(/<loc>https:\/\/pesca-app\.com([^<]*)<\/loc>/g)];
  return new Set(locMatches.map(m => m[1] || '/'));
}

export function getRoutesToCheck(manifest) {
  const routesFromManifest = manifest.routes
    .filter(r => r.path !== '/partes/:id')
    .map(r => r.path);
  return [...new Set([...routesFromManifest, '/404'])];
}

function getFilePath(route) {
  if (route === '/') {
    return path.resolve(distDir, 'index.html');
  } else if (route === '/404') {
    return path.resolve(distDir, '404.html');
  } else {
    return path.resolve(distDir, route.replace(/^\//, ''), 'index.html');
  }
}

export function checkRouteWithJSDOM(route, html, expectedCanonical) {
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  const titles = Array.from(doc.head.querySelectorAll('title'));
  const titleText = titles.length > 0 ? titles[0].textContent.trim() : '';

  const metaDescs = Array.from(doc.head.querySelectorAll('meta[name="description"]'));
  const canonicalLinks = Array.from(doc.head.querySelectorAll('link[rel="canonical"]'));
  const canonicalHref = canonicalLinks.length > 0 ? canonicalLinks[0].getAttribute('href') : '';

  const ogTitles = Array.from(doc.head.querySelectorAll('meta[property="og:title"]'));
  const ogDescs = Array.from(doc.head.querySelectorAll('meta[property="og:description"]'));
  const ogImages = Array.from(doc.head.querySelectorAll('meta[property="og:image"]'));
  const ogUrls = Array.from(doc.head.querySelectorAll('meta[property="og:url"]'));

  const twTitles = Array.from(doc.head.querySelectorAll('meta[name="twitter:title"]'));
  const twDescs = Array.from(doc.head.querySelectorAll('meta[name="twitter:description"]'));

  const ldJsonScripts = Array.from(doc.querySelectorAll('script[type="application/ld+json"]'));
  const rootContent = doc.getElementById('root')?.innerHTML.trim() || '';

  const isTitleOk = titles.length === 1 && titleText.length > 0;
  const isDescOk = metaDescs.length === 1 && metaDescs[0].getAttribute('content')?.trim().length > 0;
  const isCanonicalOk = canonicalLinks.length === 1 && canonicalHref === expectedCanonical;
  const isOgOk = ogTitles.length === 1 && ogDescs.length === 1 && ogImages.length === 1 && ogUrls.length === 1;
  const isTwOk = twTitles.length === 1 && twDescs.length === 1;
  const isBodyOk = rootContent.length > 500;

  const jsonLdByType = {};
  let jsonLdValid = true;
  for (const script of ldJsonScripts) {
    try {
      const data = JSON.parse(script.textContent || '');
      const type = Array.isArray(data) ? data[0]?.['@type'] : data['@type'];
      if (type) {
        if (jsonLdByType[type]) {
          jsonLdValid = false;
        }
        jsonLdByType[type] = (jsonLdByType[type] || 0) + 1;
      }
    } catch {
      jsonLdValid = false;
    }
  }
  const isJsonLdOk = jsonLdValid && ldJsonScripts.length > 0;

  const ok = isTitleOk && isDescOk && isCanonicalOk && isOgOk && isTwOk && isBodyOk && isJsonLdOk;

  return {
    route,
    title: titleText,
    titleCount: titles.length,
    descCount: metaDescs.length,
    canonical: canonicalHref,
    canonicalCount: canonicalLinks.length,
    expectedCanonical,
    canonicalMatch: isCanonicalOk,
    ogCount: ogTitles.length,
    twCount: twTitles.length,
    ldJsonCount: ldJsonScripts.length,
    ldJsonTypes: Object.keys(jsonLdByType),
    ldJsonOk: isJsonLdOk,
    bodyLength: rootContent.length,
    ok,
  };
}

export async function checkRouteWithPlaywright(page, route, expectedCanonical) {
  await page.goto(`http://localhost:3000${route}`, { waitUntil: 'networkidle' });
  
  const title = await page.title();
  
  const metaDesc = await page.locator('meta[name="description"]').getAttribute('content');
  const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
  
  const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
  const ogDesc = await page.locator('meta[property="og:description"]').getAttribute('content');
  const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
  const ogUrl = await page.locator('meta[property="og:url"]').getAttribute('content');
  
  const twTitle = await page.locator('meta[name="twitter:title"]').getAttribute('content');
  const twDesc = await page.locator('meta[name="twitter:description"]').getAttribute('content');
  
  const ldJsonScripts = await page.locator('script[type="application/ld+json"]').all();
  const ldJsonTypes = [];
  let jsonLdValid = true;
  const jsonLdByType = {};
  
  for (const script of ldJsonScripts) {
    const content = await script.textContent();
    if (content) {
      try {
        const data = JSON.parse(content);
        const type = Array.isArray(data) ? data[0]?.['@type'] : data['@type'];
        if (type) {
          if (jsonLdByType[type]) {
            jsonLdValid = false;
          }
          jsonLdByType[type] = (jsonLdByType[type] || 0) + 1;
          ldJsonTypes.push(type);
        }
      } catch {
        jsonLdValid = false;
      }
    }
  }
  
  const rootContent = await page.locator('#root').innerHTML();
  
  const isTitleOk = title.length > 0;
  const isDescOk = !!metaDesc && metaDesc.trim().length > 0;
  const isCanonicalOk = canonical === expectedCanonical;
  const isOgOk = !!ogTitle && !!ogDesc && !!ogImage && !!ogUrl;
  const isTwOk = !!twTitle && !!twDesc;
  const isBodyOk = rootContent.length > 500;
  const isJsonLdOk = jsonLdValid && ldJsonScripts.length > 0;
  
  const ok = isTitleOk && isDescOk && isCanonicalOk && isOgOk && isTwOk && isBodyOk && isJsonLdOk;
  
  return {
    route,
    title,
    titleCount: 1,
    descCount: metaDesc ? 1 : 0,
    canonical: canonical || '',
    canonicalCount: canonical ? 1 : 0,
    expectedCanonical,
    canonicalMatch: isCanonicalOk,
    ogCount: ogTitle ? 1 : 0,
    twCount: twTitle ? 1 : 0,
    ldJsonCount: ldJsonScripts.length,
    ldJsonTypes,
    ldJsonOk: isJsonLdOk,
    bodyLength: rootContent.length,
    ok,
  };
}

function printResults(results) {
  console.log('\n--- TABLA DE RESULTADOS ---');
  console.log('| URL | Título | Meta Descs | Canonical | JSON-LD | Resultado |');
  console.log('|---|---|---|---|---|---|');
  for (const r of results) {
    const status = r.ok ? '✅' : '❌';
    const canonicalStatus = r.canonicalMatch ? '✓' : '✗';
    const jsonLdStatus = r.ldJsonOk ? '✓' : '✗';
    console.log(`| ${r.route} | ${r.title.substring(0, 40)}... | ${r.descCount} | ${canonicalStatus} | ${jsonLdStatus} | ${status} |`);
  }
  
  console.log(`\nResumen: ${results.filter(r => r.ok).length}/${results.length} rutas verificadas con éxito.`);
}

function reportErrors(results) {
  const hasError = results.some(r => !r.ok);
  if (hasError) {
    console.error('Se detectaron problemas en algunas rutas.');
    for (const r of results) {
      if (!r.ok) {
        const issues = [];
        if (r.titleCount !== 1) issues.push(`title count=${r.titleCount}`);
        if (r.descCount !== 1) issues.push(`meta desc count=${r.descCount}`);
        if (!r.canonicalMatch) issues.push(`canonical mismatch: got "${r.canonical}", expected "${r.expectedCanonical}"`);
        if (!r.ldJsonOk) issues.push(`JSON-LD issues: ${(r.ldJsonTypes || []).join(', ') || 'invalid/duplicate'}`);
        if (r.bodyLength <= 500) issues.push(`thin body content (${r.bodyLength} chars)`);
        console.error(`  ${r.route}: ${issues.join(', ')}`);
      }
    }
    process.exit(1);
  } else {
    console.log('Todas las rutas cumplen estrictamente con los requisitos SEO.');
  }
}

export async function runStaticVerification() {
  const manifest = loadManifest();
  const routes = getRoutesToCheck(manifest);
  
  console.log(`Verificando ${routes.length} rutas en dist/ (modo estático JSDOM)...`);
  
  const results = [];
  
  for (const route of routes) {
    const filePath = getFilePath(route);
    const expectedCanonical = `https://pesca-app.com${route === '/404' ? '/404' : route}`;
    
    if (!fs.existsSync(filePath)) {
      results.push({
        route,
        title: 'N/A',
        titleCount: 0,
        descCount: 0,
        canonical: 'N/A',
        canonicalCount: 0,
        expectedCanonical,
        canonicalMatch: false,
        ogCount: 0,
        twCount: 0,
        ldJsonCount: 0,
        ldJsonTypes: [],
        ldJsonOk: false,
        bodyLength: 0,
        ok: false,
      });
      continue;
    }
    
    const html = fs.readFileSync(filePath, 'utf-8');
    const result = checkRouteWithJSDOM(route, html, expectedCanonical);
    results.push(result);
  }
  
  return results;
}

export async function runBrowserVerification(baseURL = 'http://localhost:3000') {
  const { chromium } = await import('@playwright/test');
  
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const manifest = loadManifest();
  const routes = getRoutesToCheck(manifest);
  
  console.log(`Verificando ${routes.length} rutas en ${baseURL} (modo navegador Playwright)...`);
  
  const results = [];
  
  for (const route of routes) {
    const expectedCanonical = `https://pesca-app.com${route === '/404' ? '/404' : route}`;
    const result = await checkRouteWithPlaywright(page, route, expectedCanonical);
    results.push(result);
  }
  
  await browser.close();
  return results;
}

async function main() {
  const mode = process.argv[2] || 'static';
  
  try {
    let results;
    
    if (mode === 'browser') {
      results = await runBrowserVerification();
    } else {
      results = await runStaticVerification();
    }
    
    printResults(results);
    reportErrors(results);
  } catch (error) {
    console.error('Error durante la verificación:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

if (import.meta.url === `file://${__filename}`) {
  main();
}