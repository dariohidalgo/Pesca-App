import { Helmet } from 'react-helmet-async';
import SchemaOrg from './SchemaOrg';

const DEFAULT_META = {
  title: 'Pesca Córdoba - Guía, Pronóstico y Nudos',
  description: 'La mejor guía de pesca deportiva en Córdoba. Descubre nudos, especies de peces, pronóstico del clima y los mejores lugares para pescar en Argentina.',
  keywords: 'pesca, córdoba, pesca deportiva, nudos de pesca, especies de peces, clima para pesca, lugares de pesca, argentina',
  image: 'https://www.pescacordoba.com.ar/seo.jpg',
  url: 'https://www.pescacordoba.com.ar/',
};

export default function SEO({ meta = {} }) {
  const title = meta.title || DEFAULT_META.title;
  const description = meta.description || DEFAULT_META.description;
  const keywords = meta.keywords || DEFAULT_META.keywords;
  const image = meta.image || DEFAULT_META.image;
  const url = meta.url || DEFAULT_META.url;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={url} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={image} />
      </Helmet>

      <SchemaOrg schema={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Pesca Córdoba",
        "url": url,
        "description": description,
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${url}?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      }} />
    </>
  );
}