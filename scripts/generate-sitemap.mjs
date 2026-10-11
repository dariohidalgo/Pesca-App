import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const PRODUCTION_DOMAIN = 'https://www.pescacordoba.com.ar';

function loadManifest() {
  const manifestPath = path.resolve(rootDir, 'dist/routes-manifest.json');
  if (!fs.existsSync(manifestPath)) {
    throw new Error(`Route manifest not found at ${manifestPath}. Run generate-routes.mjs first.`);
  }
  return JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
}

async function loadContentData() {
  const postsModule = await import('../src/data/posts.js');
  const damsModule = await import('../src/data/damsData.js');
  const rigModule = await import('../src/data/rigTutorials.js');

  return { 
    posts: postsModule.POSTS, 
    damsData: damsModule.DAMS_DATA, 
    rigTutorials: rigModule.RIG_TUTORIALS 
  };
}

function getLastMod(route, contentData) {
  let entry;
  if (route.contentSource === 'posts.js') {
    const slug = route.params.includes('slug') ? route.path.replace('/blog/', '') : null;
    entry = contentData.posts.find(p => p.slug === slug);
  } else if (route.contentSource === 'damsData.js') {
    const slug = route.params.includes('slug') ? route.path.replace('/diques/', '') : null;
    entry = contentData.damsData.find(d => d.slug === slug);
  } else if (route.contentSource === 'rigTutorials.js') {
    const slug = route.params.includes('slug') ? route.path.replace('/lineas/', '') : null;
    entry = contentData.rigTutorials.find(r => r.slug === slug);
  }
  
  if (!entry) return null;
  
  const updated = entry.updated;
  const date = entry.date;
  
  if (updated && date && new Date(updated) < new Date(date)) {
    console.warn(`Warning: ${route.path} has updated (${updated}) older than date (${date})`);
  }
  
  return updated || date || null;
}

function generateSitemapContent(manifest, contentData) {
  const baseUrl = PRODUCTION_DOMAIN;
  
  let urls = '';
  
  for (const route of manifest.routes) {
    if (route.path === '*') continue;
    if (route.type === 'dynamic' && !route.contentSource) continue;
    
    const fullUrl = `${baseUrl}${route.path}`;
    const lastmod = getLastMod(route, contentData);
    
    urls += `  <url>\n`;
    urls += `    <loc>${fullUrl}</loc>\n`;
    
    if (lastmod) {
      urls += `    <lastmod>${lastmod}</lastmod>\n`;
    }
    
    if (route.type === 'static') {
      urls += `    <changefreq>weekly</changefreq>\n`;
    } else {
      urls += `    <changefreq>monthly</changefreq>\n`;
    }
    
    if (route.path === '/') {
      urls += `    <priority>1.0</priority>\n`;
    } else if (route.type === 'static') {
      urls += `    <priority>0.8</priority>\n`;
    } else {
      urls += `    <priority>0.6</priority>\n`;
    }
    
    urls += `  </url>\n`;
  }
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}</urlset>`;
}

export async function generateSitemap() {
  const manifest = loadManifest();
  const contentData = await loadContentData();
  const sitemap = generateSitemapContent(manifest, contentData);
  
  const sitemapPath = path.resolve(rootDir, 'public/sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemap, 'utf-8');
  
  console.log(`✓ Sitemap written to ${sitemapPath}`);
  console.log(`  ${manifest.routes.length} URLs included`);
}

async function main() {
  try {
    await generateSitemap();
  } catch (error) {
    console.error('Error generating sitemap:', error.message);
    process.exit(1);
  }
}

if (import.meta.url === `file://${__filename}`) {
  main();
}
