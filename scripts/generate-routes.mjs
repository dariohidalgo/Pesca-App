import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
const traverseFn = traverse.default || traverse;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function parseRoutesFromAppJsx() {
  const appPath = path.resolve(rootDir, 'src/App.jsx');
  const content = fs.readFileSync(appPath, 'utf-8');
  
  const ast = parse(content, {
    sourceType: 'module',
    plugins: ['jsx'],
  });

  const routes = [];
  
  traverseFn(ast, {
    JSXElement(path) {
      const openingElement = path.node.openingElement;
      if (openingElement.name.name === 'Route') {
        const pathAttr = openingElement.attributes.find(
          attr => attr.type === 'JSXAttribute' && attr.name.name === 'path'
        );
        const elementAttr = openingElement.attributes.find(
          attr => attr.type === 'JSXAttribute' && attr.name.name === 'element'
        );
        
        if (pathAttr && pathAttr.value && pathAttr.value.type === 'StringLiteral') {
          const routePath = pathAttr.value.value;
          // Skip catch-all route (*) - handled by React Router for 404
          if (routePath === '*') return;
          
          const componentName = elementAttr && elementAttr.value && elementAttr.value.expression 
            ? elementAttr.value.expression.name 
            : null;
          
          routes.push({ path: routePath, component: componentName });
        }
      }
    }
  });

  return routes;
}

async function loadContentData() {
  // Use dynamic import with import.meta.resolve for correct module resolution
  const postsModule = await import('../src/data/posts.js');
  const damsModule = await import('../src/data/damsData.js');
  const rigModule = await import('../src/data/rigTutorials.js');

  return { 
    posts: postsModule.POSTS, 
    damsData: damsModule.DAMS_DATA, 
    rigTutorials: rigModule.RIG_TUTORIALS 
  };
}

function expandDynamicRoutes(routes, contentData) {
  const expanded = [];
  
  for (const route of routes) {
    if (route.path.includes(':')) {
      // Dynamic route - expand based on content source
      if (route.path === '/blog/:slug') {
        for (const post of contentData.posts) {
          expanded.push({
            path: `/blog/${post.slug}`,
            type: 'dynamic',
            contentSource: 'posts.js',
            params: ['slug']
          });
        }
      } else if (route.path === '/diques/:slug') {
        for (const dam of contentData.damsData.filter(d => d.status === 'published')) {
          expanded.push({
            path: `/diques/${dam.slug}`,
            type: 'dynamic',
            contentSource: 'damsData.js',
            params: ['slug']
          });
        }
      } else if (route.path === '/lineas/:slug') {
        for (const rig of contentData.rigTutorials) {
          expanded.push({
            path: `/lineas/${rig.slug}`,
            type: 'dynamic',
            contentSource: 'rigTutorials.js',
            params: ['slug']
          });
        }
      } else if (route.path === '/partes/:id') {
        // Fishing reports - no content source yet; skip pattern (not real URLs for sitemap)
        // Keep in manifest for prerender/verification if needed, but don't expand
      } else {
        // Other dynamic routes without known content source - keep as pattern for prerender
        // but don't expand to sitemap
        expanded.push({
          path: route.path,
          type: 'dynamic',
          contentSource: null,
          params: route.path.match(/:(\w+)/g)?.map(p => p.slice(1)) || []
        });
      }
    } else {
      // Static route
      expanded.push({
        path: route.path,
        type: 'static',
        contentSource: null,
        params: []
      });
    }
  }
  
  return expanded;
}

function detectDrift(appRoutes, contentData, expandedRoutes) {
  const errors = [];
  
  // Known dynamic routes and their content sources
  const knownDynamicRoutes = {
    '/blog/:slug': { source: 'posts.js', check: () => contentData.posts.length > 0 },
    '/diques/:slug': { source: 'damsData.js', check: () => contentData.damsData.filter(d => d.status === 'published').length > 0 },
    '/lineas/:slug': { source: 'rigTutorials.js', check: () => contentData.rigTutorials.length > 0 },
  };
  
  // Check for routes in App.jsx that have no content source (for dynamic routes that should have one)
  const dynamicAppRoutes = appRoutes.filter(r => r.path.includes(':') && r.path !== '/partes/:id');
  
  for (const route of dynamicAppRoutes) {
    const knownRoute = knownDynamicRoutes[route.path];
    if (knownRoute) {
      if (!knownRoute.check()) {
        errors.push(`Route ${route.path} has no content in ${knownRoute.source}`);
      }
    } else {
      // Unknown dynamic route - this is drift
      errors.push(`Unknown dynamic route ${route.path} in App.jsx has no recognized content source`);
    }
  }
  
  // Check for content that has no route
  // Posts should have /blog/:slug route
  if (contentData.posts.length > 0) {
    const hasBlogRoute = appRoutes.some(r => r.path === '/blog/:slug');
    if (!hasBlogRoute) {
      errors.push('posts.js has content but no /blog/:slug route in App.jsx');
    }
  }
  
  // Published dams should have /diques/:slug route
  const publishedDams = contentData.damsData.filter(d => d.status === 'published');
  if (publishedDams.length > 0) {
    const hasDamsRoute = appRoutes.some(r => r.path === '/diques/:slug');
    if (!hasDamsRoute) {
      errors.push('damsData.js has published content but no /diques/:slug route in App.jsx');
    }
  }
  
  // Rig tutorials should have /lineas/:slug route
  if (contentData.rigTutorials.length > 0) {
    const hasRigRoute = appRoutes.some(r => r.path === '/lineas/:slug');
    if (!hasRigRoute) {
      errors.push('rigTutorials.js has content but no /lineas/:slug route in App.jsx');
    }
  }
  
  return errors;
}

export async function generateRoutesManifest() {
  const appRoutes = parseRoutesFromAppJsx();
  const contentData = await loadContentData();
  const expandedRoutes = expandDynamicRoutes(appRoutes, contentData);
  
  const driftErrors = detectDrift(appRoutes, contentData, expandedRoutes);
  if (driftErrors.length > 0) {
    const errorMsg = 'Route drift detected:\n' + driftErrors.map(e => `  - ${e}`).join('\n');
    throw new Error(errorMsg);
  }
  
  const manifest = {
    routes: expandedRoutes,
    generatedAt: new Date().toISOString(),
    version: '1'
  };
  
  return manifest;
}

async function main() {
  try {
    const manifest = await generateRoutesManifest();
    
    const distDir = path.resolve(rootDir, 'dist');
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }
    
    const manifestPath = path.resolve(distDir, 'routes-manifest.json');
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');
    
    console.log(`✓ Route manifest written to ${manifestPath}`);
    console.log(`  ${manifest.routes.length} routes (${manifest.routes.filter(r => r.type === 'static').length} static, ${manifest.routes.filter(r => r.type === 'dynamic').length} dynamic)`);
  } catch (error) {
    console.error('Error generating route manifest:', error.message);
    process.exit(1);
  }
}

// Run if executed directly
if (import.meta.url === `file://${__filename}`) {
  main();
}