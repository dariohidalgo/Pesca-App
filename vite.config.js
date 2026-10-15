import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [
    tailwindcss(),
    react(),
    ...(!isSsrBuild
      ? [
          VitePWA({
            registerType: 'autoUpdate',
            injectRegister: null,
            manifestFilename: 'manifest.json',
            includeAssets: [
              'pesca.svg',
              'pwa-192x192.png',
              'pwa-512x512.png',
              'maskable-icon-512x512.png',
              'apple-touch-icon.png',
              'img/**/*',
              'robots.txt'
            ],
            manifest: {
              name: 'Pesca Córdoba - Guía de Pesca Deportiva',
              short_name: 'PescaApp',
              description: 'Guía de pesca deportiva en Córdoba. Pronóstico, catálogo de nudos, tutoriales de líneas y reglamento oficial.',
              start_url: '/',
              scope: '/',
              lang: 'es',
              display: 'standalone',
              background_color: '#f8fafc',
              theme_color: '#2563eb',
              orientation: 'portrait-primary',
              icons: [
                {
                  src: '/pwa-192x192.png',
                  sizes: '192x192',
                  type: 'image/png',
                  purpose: 'any'
                },
                {
                  src: '/pwa-512x512.png',
                  sizes: '512x512',
                  type: 'image/png',
                  purpose: 'any'
                },
                {
                  src: '/maskable-icon-512x512.png',
                  sizes: '512x512',
                  type: 'image/png',
                  purpose: 'maskable'
                },
                {
                  src: '/pesca.svg',
                  sizes: 'any',
                  type: 'image/svg+xml',
                  purpose: 'any'
                }
              ]
            },
            workbox: {
              globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,jpg,gif,json}'],
              maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
              navigateFallback: '/index.html',
              navigateFallbackDenylist: [/^\/api\//, /^\/ads\.txt/, /^\/robots\.txt/, /^\/sitemap\.xml/],
              runtimeCaching: [
                // 1. Assets estáticos e imágenes (CacheFirst para imágenes de nudos, aparejos y logos)
                {
                  urlPattern: ({ request, url }) =>
                    request.destination === 'image' ||
                    url.pathname.startsWith('/img/') ||
                    /\.(?:png|jpg|jpeg|svg|gif|webp)$/i.test(url.pathname),
                  handler: 'CacheFirst',
                  options: {
                    cacheName: 'pesca-images-cache',
                    expiration: {
                      maxEntries: 120,
                      maxAgeSeconds: 60 * 24 * 60 * 60 // 60 días
                    },
                    cacheableResponse: {
                      statuses: [0, 200]
                    }
                  }
                },
                // 2. Secciones prioritarias offline (Catálogo de Nudos, Tutoriales de Líneas y Reglamento)
                {
                  urlPattern: ({ url }) =>
                    url.pathname === '/nudos' ||
                    url.pathname.startsWith('/lineas') ||
                    url.pathname === '/reglamento',
                  handler: 'StaleWhileRevalidate',
                  options: {
                    cacheName: 'pesca-critical-sections-cache',
                    expiration: {
                      maxEntries: 50,
                      maxAgeSeconds: 30 * 24 * 60 * 60 // 30 días
                    },
                    cacheableResponse: {
                      statuses: [0, 200]
                    }
                  }
                },
                // 3. Páginas y navegación general
                {
                  urlPattern: ({ request }) => request.mode === 'navigate',
                  handler: 'StaleWhileRevalidate',
                  options: {
                    cacheName: 'pesca-pages-cache',
                    expiration: {
                      maxEntries: 50,
                      maxAgeSeconds: 15 * 24 * 60 * 60
                    },
                    cacheableResponse: {
                      statuses: [0, 200]
                    }
                  }
                },
                // 4. Recursos estáticos de la aplicación (JS y CSS)
                {
                  urlPattern: ({ request, url }) =>
                    request.destination === 'script' ||
                    request.destination === 'style' ||
                    /\.(?:js|css)$/i.test(url.pathname),
                  handler: 'StaleWhileRevalidate',
                  options: {
                    cacheName: 'pesca-static-assets-cache',
                    expiration: {
                      maxEntries: 100,
                      maxAgeSeconds: 30 * 24 * 60 * 60
                    },
                    cacheableResponse: {
                      statuses: [0, 200]
                    }
                  }
                },
                // 5. CDNs y recursos externos
                {
                  urlPattern: ({ url }) =>
                    url.origin === 'https://fonts.googleapis.com' ||
                    url.origin === 'https://fonts.gstatic.com' ||
                    url.origin === 'https://unpkg.com',
                  handler: 'StaleWhileRevalidate',
                  options: {
                    cacheName: 'pesca-external-resources',
                    expiration: {
                      maxEntries: 30,
                      maxAgeSeconds: 365 * 24 * 60 * 60
                    },
                    cacheableResponse: {
                      statuses: [0, 200]
                    }
                  }
                }
              ]
            }
          })
        ]
      : [])
  ],
  build: {
    rollupOptions: {
      output: {
        ...(isSsrBuild ? {} : {
          manualChunks: {
            'leaflet-vendor': ['leaflet', 'react-leaflet'],
            'firebase-vendor': ['firebase/app', 'firebase/firestore'],
            'lucide-vendor': ['lucide-react']
          }
        })
      }
    }
  }
}))
