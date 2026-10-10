import { Helmet } from 'react-helmet-async';

const schemaTypeToTestId = {
  WebSite: 'schema-website',
  Article: 'schema-article',
  Guide: 'schema-guide',
  HowTo: 'schema-howto',
  BreadcrumbList: 'schema-breadcrumb',
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

  return (
    <Helmet>
      <script
        id={id}
        type="application/ld+json"
        data-testid={testId}
      >
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}
