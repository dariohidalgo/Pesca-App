import { useEffect, useState } from 'react';

const schemaTypeToTestId = {
  WebSite: 'schema-website',
  Article: 'schema-article',
  Guide: 'schema-guide',
  HowTo: 'schema-howto',
  BreadcrumbList: 'schema-breadcrumb',
  WebPage: 'schema-webpage',
  ItemList: 'schema-itemlist',
  CollectionPage: 'schema-collectionpage',
  Report: 'schema-report',
  WebApplication: 'schema-webapp',
};

function getSchemaTestId(schema) {
  const type = schema?.['@type'];
  if (Array.isArray(type)) {
    return type[0] ? schemaTypeToTestId[type[0]] || 'schema-generic' : 'schema-generic';
  }
  return type ? schemaTypeToTestId[type] || 'schema-generic' : 'schema-generic';
}

function getSchemaId(schema) {
  const type = schema?.['@type'];
  if (Array.isArray(type)) {
    return type[0] ? `schema-ld-${type[0].toLowerCase()}` : 'schema-ld-generic';
  }
  return type ? `schema-ld-${type.toLowerCase()}` : 'schema-ld-generic';
}

export default function SchemaOrg({ schema }) {
  const testId = getSchemaTestId(schema);
  const id = getSchemaId(schema);
  const content = JSON.stringify(schema);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // On client: manage script tag in head for navigation updates
  useEffect(() => {
    // Always remove any existing script with this ID (from static HTML or previous navigation)
    // to avoid duplicates caused by hydration fallback re-mounting
    const existing = document.getElementById(id);
    if (existing) {
      existing.remove();
    }
    const script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      const current = document.getElementById(id);
      if (current) {
        current.remove();
      }
    };
  }, [id, schema]);

  // Server: render script tag in hidden div for prerenderer to find and move to head
  // Client: render empty hidden div (suppressHydrationWarning avoids mismatch warning)
  // The useEffect above manages the live script in <head> on the client.
  // This matches the original design: prerenderer extracts from body to head in static HTML.
  if (isClient) {
    return <div style={{ display: 'none' }} aria-hidden="true" suppressHydrationWarning />;
  }

  return (
    <div style={{ display: 'none' }} aria-hidden="true">
      <script
        id={getSchemaId(schema)}
        type="application/ld+json"
        data-testid={getSchemaTestId(schema)}
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </div>
  );
}
