import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import 'leaflet/dist/leaflet.css';
import ErrorBoundary from './components/ErrorBoundary'

// Clean up any SSR-rendered JSON-LD scripts in body (served by vite preview on first request)
// before hydration completes. Only run in real browser (not JSDOM/Vitest).
const isTestEnv = typeof process !== 'undefined' && process.env && (process.env.VITEST || process.env.NODE_ENV === 'test');
const isJSDOM = typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.includes('jsdom');
if (typeof document !== 'undefined' && typeof window !== 'undefined' && !isTestEnv && !isJSDOM) {
  document.querySelectorAll('body script[type="application/ld+json"]').forEach(s => s.remove());
}

hydrateRoot(document.getElementById('root'), (
  <StrictMode>
    <HelmetProvider>
      <ErrorBoundary>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ErrorBoundary>
    </HelmetProvider>
  </StrictMode>
))

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
} else if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach((registration) => registration.unregister());
  });
}
