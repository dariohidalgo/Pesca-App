import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useClientSEO } from '../hooks/useClientSEO';
import { SITE_NAME, DEFAULT_IMAGE, LOGO_URL, canonicalUrl } from '../lib/domain';

export default function SEO({
  title,
  description,
  canonical,
  image = DEFAULT_IMAGE,
  type = 'website',
  publishedTime,
  author,
  noindex = false,
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Use client-side SEO manager on client side
  useClientSEO({
    title,
    description,
    canonical,
    image,
    type,
    publishedTime,
    author,
    noindex,
  });

  const robotsContent = noindex ? 'noindex, follow' : 'index, follow';
  const canonicalHref = canonical ? canonicalUrl(canonical) : undefined;

  // On server: render Helmet tags for SSR
  // On client: return null (useClientSEO handles meta tags via DOM API)
  if (isClient) {
    return null;
  }

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonicalHref && <link rel="canonical" href={canonicalHref} />}
      <meta name="robots" content={robotsContent} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      {canonicalHref && <meta property="og:url" content={canonicalHref} />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      {canonicalHref && <meta name="twitter:url" content={canonicalHref} />}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {author && <meta name="author" content={author} />}
      {author && <meta property="article:author" content={author} />}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
    </Helmet>
  );
}
