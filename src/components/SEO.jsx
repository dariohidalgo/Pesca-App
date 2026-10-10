import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

const DEFAULT_IMAGE = 'https://pesca-app.com/img/SEO.webp';
const SITE_NAME = 'Pesca Córdoba';

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
  useEffect(() => {
    if (typeof document !== 'undefined' && title) {
      document.title = title;
    }
  }, [title]);

  const robotsContent = noindex ? 'noindex, follow' : 'index, follow';

  return (
    <Helmet>
      {/* Título único y específico */}
      <title>{title}</title>

      {/* Meta descripción única y específica */}
      <meta name="description" content={description} />

      {/* Enlace canónico absoluto */}
      <link rel="canonical" href={canonical} />

      {/* Directivas de indexación */}
      <meta name="robots" content={robotsContent} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Metadatos editoriales condicionales */}
      {author && <meta name="author" content={author} />}
      {author && <meta property="article:author" content={author} />}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
    </Helmet>
  );
}