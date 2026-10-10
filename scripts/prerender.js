import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const distSsrDir = path.resolve(rootDir, 'dist-ssr');

// Inicializar entorno DOM para librerías que esperan globales de navegador durante SSR
const dom = new JSDOM('<!doctype html><html><head></head><body><div id="root"></div></body></html>');
global.window = dom.window;
global.document = dom.window.document;
if (!global.navigator) {
  global.navigator = dom.window.navigator;
}

function loadManifest() {
  const manifestPath = path.resolve(distDir, 'routes-manifest.json');
  if (!fs.existsSync(manifestPath)) {
    throw new Error(`Route manifest not found at ${manifestPath}. Run generate-routes.mjs first.`);
  }
  return JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
}

function getPrerenderRoutes(manifest) {
  const routes = [];
  for (const route of manifest.routes) {
    if (route.path === '*') continue; // Skip catch-all
    routes.push(route.path);
  }
  // Always include 404 page
  routes.push('/404');
  return routes;
}

const routes = getPrerenderRoutes(loadManifest());

async function prerender() {
  const templatePath = path.resolve(distDir, 'index.html');
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template no encontrado en ${templatePath}. Ejecutá 'vite build' primero.`);
  }
  const template = fs.readFileSync(templatePath, 'utf-8');

  const { render } = await import(path.resolve(distSsrDir, 'entry-server.js'));

  console.log(`Prerenderizando ${routes.length} rutas...`);

  for (const url of routes) {
    const helmetContext = {};
    const { html } = render(url, helmetContext);

    // Extraer etiquetas hoisted de head y schemas JSON-LD
    const frag = JSDOM.fragment(html);
    const headElements = [];
    const bodyElements = [];

    // Extraer scripts JSON-LD para colocarlos en head
    const ldJsonScripts = Array.from(frag.querySelectorAll('script[type="application/ld+json"]'));
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

    let pageHtml = template.replace('<!-- app-head -->', () => headString);
    pageHtml = pageHtml.replace('<div id="root"></div>', () => `<div id="root">${bodyString}</div>`);

    if (url === '/404') {
      fs.writeFileSync(path.resolve(distDir, '404.html'), pageHtml, 'utf-8');
      console.log('✓ /404 -> dist/404.html');
    } else {
      const cleanPath = url === '/' ? '' : url.replace(/^\//, '');
      const outDir = path.resolve(distDir, cleanPath);
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(path.resolve(outDir, 'index.html'), pageHtml, 'utf-8');

      // Crear también el archivo .html en el nivel correspondiente para servidores con cleanUrls
      if (cleanPath) {
        const cleanFile = path.resolve(distDir, `${cleanPath}.html`);
        fs.mkdirSync(path.dirname(cleanFile), { recursive: true });
        fs.writeFileSync(cleanFile, pageHtml, 'utf-8');
      }
      console.log(`✓ ${url} -> dist/${cleanPath ? cleanPath + '/' : ''}index.html`);
    }
  }

  // Limpiar directorio temporal SSR
  if (fs.existsSync(distSsrDir)) {
    fs.rmSync(distSsrDir, { recursive: true, force: true });
    console.log('✓ Directorio temporal dist-ssr eliminado.');
  }

  console.log(`Prerenderizado finalizado exitosamente para ${routes.length} rutas.`);
}

prerender().catch(err => {
  console.error('Error durante el prerenderizado:', err);
  process.exit(1);
});
