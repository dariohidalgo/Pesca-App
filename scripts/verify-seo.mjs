import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

// Leer sitemap para obtener las rutas a verificar
const sitemapContent = fs.readFileSync(path.resolve(rootDir, 'public/sitemap.xml'), 'utf-8');
const locMatches = [...sitemapContent.matchAll(/<loc>https:\/\/www\.pescacordoba\.com\.ar([^<]*)<\/loc>/g)];
const urls = locMatches.map(m => m[1] || '/');

// Agregar 404
const allRoutes = [...urls, '/404'];

console.log(`Verificando ${allRoutes.length} rutas en dist/...`);

const results = [];
let hasError = false;

for (const route of allRoutes) {
  let filePath;
  if (route === '/') {
    filePath = path.resolve(distDir, 'index.html');
  } else if (route === '/404') {
    filePath = path.resolve(distDir, '404.html');
  } else {
    filePath = path.resolve(distDir, route.replace(/^\//, ''), 'index.html');
  }

  if (!fs.existsSync(filePath)) {
    results.push({
      route,
      status: 'MISSING_FILE',
      title: 'N/A',
      descCount: 0,
      canonical: 'N/A',
      ok: false
    });
    hasError = true;
    continue;
  }

  const html = fs.readFileSync(filePath, 'utf-8');
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
  const isCanonicalOk = canonicalLinks.length === 1 && canonicalHref.startsWith('https://www.pescacordoba.com.ar');
  const isOgOk = ogTitles.length === 1 && ogDescs.length === 1 && ogImages.length === 1 && ogUrls.length === 1;
  const isTwOk = twTitles.length === 1 && twDescs.length === 1;
  const isBodyOk = rootContent.length > 500;

  const ok = isTitleOk && isDescOk && isCanonicalOk && isOgOk && isTwOk && isBodyOk;
  if (!ok) hasError = true;

  results.push({
    route,
    title: titleText,
    titleCount: titles.length,
    descCount: metaDescs.length,
    canonical: canonicalHref,
    canonicalCount: canonicalLinks.length,
    ogCount: ogTitles.length,
    twCount: twTitles.length,
    ldJsonCount: ldJsonScripts.length,
    bodyLength: rootContent.length,
    ok
  });
}

console.log('\n--- TABLA DE RESULTADOS ---');
console.log('| URL | Título | Meta Descs | Canonical | Resultado |');
console.log('|---|---|---|---|---|');
for (const r of results) {
  const status = r.ok ? '✅ Correcto' : '❌ Error';
  console.log(`| ${r.route} | ${r.title.substring(0, 40)}... | ${r.descCount} | ${r.canonical} | ${status} |`);
}

console.log(`\nResumen: ${results.filter(r => r.ok).length}/${results.length} rutas verificadas con éxito.`);
if (hasError) {
  console.error('Se detectaron problemas en algunas rutas.');
  process.exit(1);
} else {
  console.log('Todas las rutas canónicas y el 404 cumplen estrictamente con los requisitos SEO.');
}
