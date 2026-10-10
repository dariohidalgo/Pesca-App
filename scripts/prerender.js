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

const routes = [
  '/',
  '/diques',
  '/diques/san-roque',
  '/diques/los-molinos',
  '/diques/embalse',
  '/diques/cruz-del-eje',
  '/diques/pichanas',
  '/lineas',
  '/lineas/flote-pejerrey-tres-boyas',
  '/lineas/paternoster-pejerrey',
  '/lineas/fondo-carpa-feeder',
  '/lineas/fondo-pesado-tararira-bagre',
  '/lineas/flote-boya-plop',
  '/planificador',
  '/partes',
  '/mapa',
  '/calendario',
  '/nudos',
  '/reglamento',
  '/botes',
  '/blog',
  '/blog/secretos-pesca-tarariras-verano',
  '/blog/mejores-equipos-pejerrey-invierno-cordoba',
  '/blog/armado-lineas-infalibles-pejerrey',
  '/blog/pesca-carpas-lagos-cordobeses',
  '/blog/como-armar-lineas-de-vuelo-pejerrey',
  '/blog/pesca-con-mosca-sierras-cordoba',
  '/blog/mantenimiento-equipos-de-pesca',
  '/blog/pesca-bagre-monstruo',
  '/blog/pesca-devolucion-el-futuro',
  '/blog/el-pique-del-silencio-pesca-kayak',
  '/sumar-servicio',
  '/nosotros',
  '/privacidad',
  '/terminos',
  '/404'
];

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
