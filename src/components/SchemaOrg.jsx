import { Helmet } from 'react-helmet-async';

export default function SchemaOrg({ schema }) {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}
