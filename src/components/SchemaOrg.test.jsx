import { render, screen, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SchemaOrg from './SchemaOrg';

const renderWithHelmet = (component) => {
  return render(
    <HelmetProvider>
      {component}
    </HelmetProvider>
  );
};

describe('SchemaOrg Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Clear any existing JSON-LD scripts in head from previous tests
    document.querySelectorAll('head script[type="application/ld+json"]').forEach(s => s.remove());
  });

  describe('Stable ID per schema type for Helmet deduplication', () => {
    it('renders WebSite schema with stable id="schema-website" in head', async () => {
      const schema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Test Site"
      };

      renderWithHelmet(<SchemaOrg schema={schema} />);

      // Wait for useEffect to add script to head
      await waitFor(() => {
        const script = document.head.querySelector('[data-testid="schema-website"]');
        expect(script).toBeInTheDocument();
        expect(script).toHaveAttribute('type', 'application/ld+json');
        expect(script).toHaveAttribute('id', 'schema-ld-website');
        expect(JSON.parse(script.textContent)).toEqual(schema);
      });
    });

    it('renders Article schema with stable id="schema-article" in head', async () => {
      const schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Test Article"
      };

      renderWithHelmet(<SchemaOrg schema={schema} />);

      await waitFor(() => {
        const script = document.head.querySelector('[data-testid="schema-article"]');
        expect(script).toBeInTheDocument();
        expect(JSON.parse(script.textContent)).toEqual(schema);
      });
    });

    it('renders Guide schema with stable id="schema-guide" in head', async () => {
      const schema = {
        "@context": "https://schema.org",
        "@type": "Guide",
        "name": "Test Guide"
      };

      renderWithHelmet(<SchemaOrg schema={schema} />);

      await waitFor(() => {
        const script = document.head.querySelector('[data-testid="schema-guide"]');
        expect(script).toBeInTheDocument();
        expect(JSON.parse(script.textContent)).toEqual(schema);
      });
    });

    it('renders HowTo schema with stable id="schema-howto" in head', async () => {
      const schema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "Test HowTo"
      };

      renderWithHelmet(<SchemaOrg schema={schema} />);

      await waitFor(() => {
        const script = document.head.querySelector('[data-testid="schema-howto"]');
        expect(script).toBeInTheDocument();
        expect(JSON.parse(script.textContent)).toEqual(schema);
      });
    });

    it('renders BreadcrumbList schema with stable id="schema-breadcrumb" in head', async () => {
      const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": []
      };

      renderWithHelmet(<SchemaOrg schema={schema} />);

      await waitFor(() => {
        const script = document.head.querySelector('[data-testid="schema-breadcrumb"]');
        expect(script).toBeInTheDocument();
        expect(JSON.parse(script.textContent)).toEqual(schema);
      });
    });

    it('renders unknown schema type with generic stable id="schema-generic" in head', async () => {
      const schema = {
        "@context": "https://schema.org",
        "@type": "CustomType",
        "name": "Test Custom"
      };

      renderWithHelmet(<SchemaOrg schema={schema} />);

      await waitFor(() => {
        const script = document.head.querySelector('[data-testid="schema-generic"]');
        expect(script).toBeInTheDocument();
        expect(JSON.parse(script.textContent)).toEqual(schema);
      });
    });
  });

  describe('Helmet deduplication prevents duplicate JSON-LD scripts', () => {
    it('renders only one script per schema type when component re-renders with same schema type', async () => {
      const { rerender } = renderWithHelmet(
        <SchemaOrg schema={{ "@context": "https://schema.org", "@type": "WebSite", "name": "Site 1" }} />
      );

      await waitFor(() => {
        const scripts = document.head.querySelectorAll('[data-testid="schema-website"]');
        expect(scripts.length).toBe(1);
        expect(scripts[0].textContent).toContain('Site 1');
      });

      // Re-render with different content but same schema type
      rerender(
        <HelmetProvider>
          <SchemaOrg schema={{ "@context": "https://schema.org", "@type": "WebSite", "name": "Site 2" }} />
        </HelmetProvider>
      );

      // Should only have one script with id="schema-website"
      await waitFor(() => {
        const scripts = document.head.querySelectorAll('[data-testid="schema-website"]');
        expect(scripts.length).toBe(1);
        expect(scripts[0].textContent).toContain('Site 2');
      });
    });

    it('allows different schema types to coexist', async () => {
      renderWithHelmet(
        <>
          <SchemaOrg schema={{ "@context": "https://schema.org", "@type": "WebSite", "name": "Site" }} />
          <SchemaOrg schema={{ "@context": "https://schema.org", "@type": "Article", "headline": "Article" }} />
        </>
      );

      await waitFor(() => {
        expect(document.head.querySelector('[data-testid="schema-website"]')).toBeInTheDocument();
        expect(document.head.querySelector('[data-testid="schema-article"]')).toBeInTheDocument();
      });
    });
  });
});