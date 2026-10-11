import { useEffect, useRef } from 'react';
import { canonicalUrl, DEFAULT_IMAGE, SITE_NAME, LOGO_URL } from '../lib/domain';

/**
 * Custom hook to manage SEO meta tags directly via DOM API.
 * Ensures exactly one of each meta tag type exists at all times.
 * Used on client side to avoid Helmet deduplication issues during SPA navigation.
 */
export function useClientSEO({
  title,
  description,
  canonical,
  image = DEFAULT_IMAGE,
  type = 'website',
  publishedTime,
  author,
  noindex = false,
}) {
  const initialized = useRef(false);

  useEffect(() => {
    // Helper to set/replace a meta tag
    const setMeta = (name, content, attr = 'name') => {
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Helper to set/replace a link tag (removes ALL existing with same rel first)
    const setLink = (rel, href) => {
      // Remove all existing links with this rel to avoid duplicates on SPA navigation
      document.querySelectorAll(`link[rel="${rel}"]`).forEach(el => el.remove());
      const el = document.createElement('link');
      el.setAttribute('rel', rel);
      el.setAttribute('href', href);
      document.head.appendChild(el);
    };

    // Helper to remove a tag
    const removeTag = (selector) => {
      const el = document.querySelector(selector);
      if (el) el.remove();
    };

    // Title
    if (title) {
      document.title = title;
    }

    // Meta description
    setMeta('description', description);

    // Canonical
    const canonicalHref = canonical ? canonicalUrl(canonical) : undefined;
    if (canonicalHref) {
      setLink('canonical', canonicalHref);
    } else {
      removeTag('link[rel="canonical"]');
    }

    // Robots
    const robotsContent = noindex ? 'noindex, follow' : 'index, follow';
    setMeta('robots', robotsContent);

    // Open Graph
    setMeta('og:type', type, 'property');
    setMeta('og:site_name', SITE_NAME, 'property');
    if (canonicalHref) setMeta('og:url', canonicalHref, 'property');
    setMeta('og:title', title, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:image', image, 'property');

    // Twitter
    setMeta('twitter:card', 'summary_large_image', 'name');
    if (canonicalHref) setMeta('twitter:url', canonicalHref, 'name');
    setMeta('twitter:title', title, 'name');
    setMeta('twitter:description', description, 'name');
    setMeta('twitter:image', image, 'name');

    // Editorial metadata
    if (author) {
      setMeta('author', author);
      setMeta('article:author', author, 'property');
    } else {
      removeTag('meta[name="author"]');
      removeTag('meta[property="article:author"]');
    }
    if (publishedTime) {
      setMeta('article:published_time', publishedTime, 'property');
    } else {
      removeTag('meta[property="article:published_time"]');
    }

    // Clean up any pesca-app.com references that might have leaked
    // (defensive, shouldn't happen with canonicalUrl)
    const badCanonical = document.querySelector('link[rel="canonical"][href*="pesca-app.com"]');
    if (badCanonical) badCanonical.remove();

    const badOgUrl = document.querySelector('meta[property="og:url"][content*="pesca-app.com"]');
    if (badOgUrl) badOgUrl.remove();

    const badTwitterUrl = document.querySelector('meta[name="twitter:url"][content*="pesca-app.com"]');
    if (badTwitterUrl) badTwitterUrl.remove();

    const badOgImage = document.querySelector('meta[property="og:image"][content*="pesca-app.com"]');
    if (badOgImage) badOgImage.remove();

    const badTwitterImage = document.querySelector('meta[name="twitter:image"][content*="pesca-app.com"]');
    if (badTwitterImage) badTwitterImage.remove();

    initialized.current = true;

    // Cleanup on unmount
    return () => {
      // Don't remove tags on unmount - they should persist for next page
      // The next page's useEffect will update them
    };
  }, [title, description, canonical, image, type, publishedTime, author, noindex]);
}

export default useClientSEO;
