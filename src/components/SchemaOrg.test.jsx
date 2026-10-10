import { render, screen } from '@testing-library/react';
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
  });

  describe('Stable ID per schema type for Helmet deduplication', () => {
    it('renders WebSite schema with stable id="schema-website"', () => {
      const schema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Test Site"
      };

      renderWithHelmet(<SchemaOrg schema={schema} />);

      const script = screen.getByTestId('schema-website');
      expect(script).toBeInTheDocument();
      expect(script).toHaveAttribute('type', 'application/ld+json');
      expect(JSON.parse(script.textContent)).toEqual(schema);
    });

    it('renders Article schema with stable id="schema-article"', () => {
      const schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Test Article"
      };

      renderWithHelmet(<SchemaOrg schema={schema} />);

      const script = screen.getByTestId('schema-article');
      expect(script).toBeInTheDocument();
      expect(JSON.parse(script.textContent)).toEqual(schema);
    });

    it('renders Guide schema with stable id="schema-guide"', () => {
      const schema = {
        "@context": "https://schema.org",
        "@type": "Guide",
        "name": "Test Guide"
      };

      renderWithHelmet(<SchemaOrg schema={schema} />);

      const script = screen.getByTestId('schema-guide');
      expect(script).toBeInTheDocument();
      expect(JSON.parse(script.textContent)).toEqual(schema);
    });

    it('renders HowTo schema with stable id="schema-howto"', () => {
      const schema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "Test HowTo"
      };

      renderWithHelmet(<SchemaOrg schema={schema} />);

      const script = screen.getByTestId('schema-howto');
      expect(script).toBeInTheDocument();
      expect(JSON.parse(script.textContent)).toEqual(schema);
    });

    it('renders BreadcrumbList schema with stable id="schema-breadcrumb"', () => {
      const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": []
      };

      renderWithHelmet(<SchemaOrg schema={schema} />);

      const script = screen.getByTestId('schema-breadcrumb');
      expect(script).toBeInTheDocument();
      expect(JSON.parse(script.textContent)).toEqual(schema);
    });

    it('renders unknown schema type with generic stable id="schema-generic"', () => {
      const schema = {
        "@context": "https://schema.org",
        "@type": "CustomType",
        "name": "Test Custom"
      };

      renderWithHelmet(<SchemaOrg schema={schema} />);

      const script = screen.getByTestId('schema-generic');
      expect(script).toBeInTheDocument();
      expect(JSON.parse(script.textContent)).toEqual(schema);
    });
  });

  describe('Helmet deduplication prevents duplicate JSON-LD scripts', () => {
    it('renders only one script per schema type when component re-renders with same schema type', () => {
      const { rerender } = renderWithHelmet(
        <SchemaOrg schema={{ "@context": "https://schema.org", "@type": "WebSite", "name": "Site 1" }} />
      );

      // Re-render with different content but same schema type
      rerender(
        <HelmetProvider>
          <SchemaOrg schema={{ "@context": "https://schema.org", "@type": "WebSite", "name": "Site 2" }} />
        </HelmetProvider>
      );

      // Should only have one script with id="schema-website"
      const scripts = document.querySelectorAll('[data-testid="schema-website"]');
      expect(scripts.length).toBe(1);
      expect(scripts[0].textContent).toContain('Site 2');
    });

    it('allows different schema types to coexist', () => {
      renderWithHelmet(
        <>
          <SchemaOrg schema={{ "@context": "https://schema.org", "@type": "WebSite", "name": "Site" }} />
          <SchemaOrg schema={{ "@context": "https://schema.org", "@type": "Article", "headline": "Article" }} />
        </>
      );

      expect(screen.getByTestId('schema-website')).toBeInTheDocument();
      expect(screen.getByTestId('schema-article')).toBeInTheDocument();
    });
  });
});