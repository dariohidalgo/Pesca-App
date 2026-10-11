import { useEffect } from 'react';

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
  // The prerenderer moves the server payload into head. The client owns only
  // that head node; its first render matches the empty prerendered wrapper.
  useEffect(() => {
    const script = document.getElementById(id) || document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    script.dataset.testid = testId;
    if (script.textContent !== content) script.textContent = content;
    if (!script.isConnected) document.head.appendChild(script);
    return () => script.remove();
  }, [id, testId, content]);

  return (
    <div style={{ display: 'none' }} aria-hidden="true">
      {import.meta.env.SSR && (
        <script
          id={id}
          type="application/ld+json"
          data-testid={testId}
          dangerouslySetInnerHTML={{ __html: content.replace(/</g, '\\u003c') }}
        />
      )}
    </div>
  );
}
