/**
 * Centralized domain configuration for SEO.
 * Single source of truth for the public production domain.
 */

export const PRODUCTION_DOMAIN = 'https://www.pescacordoba.com.ar';
export const SITE_NAME = 'Pesca Córdoba';
export const DEFAULT_IMAGE = `${PRODUCTION_DOMAIN}/img/SEO.webp`;
export const LOGO_URL = `${PRODUCTION_DOMAIN}/pesca.svg`;

// Helper to build absolute URLs
export function buildUrl(path) {
  if (!path.startsWith('/')) path = `/${path}`;
  return `${PRODUCTION_DOMAIN}${path}`;
}

// Helper for canonical URLs
export function canonicalUrl(path) {
  return buildUrl(path);
}

// Helper for JSON-LD URLs
export function jsonLdUrl(path) {
  return buildUrl(path);
}
