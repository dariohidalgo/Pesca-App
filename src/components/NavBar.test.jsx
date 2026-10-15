import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar';

// Helper to render NavBar with Router
const renderWithRouter = (component) => {
  return render(
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      {component}
    </BrowserRouter>
  );
};

describe('NavBar', () => {
  describe('Scenario: renders desktop navigation links', () => {
    it('renders navigation links in desktop menu', () => {
      renderWithRouter(<NavBar />);
      
      // Get all links with these texts - both desktop and mobile render
      // We just verify at least one of each exists
      const pronosticoLinks = screen.getAllByText(/pronóstico/i);
      expect(pronosticoLinks.length).toBeGreaterThan(0);
      
      const mapaLinks = screen.getAllByText(/mapa/i);
      expect(mapaLinks.length).toBeGreaterThan(0);
      
      const solunarLinks = screen.getAllByText(/solunar/i);
      expect(solunarLinks.length).toBeGreaterThan(0);
      
      const diquesLinks = screen.getAllByText(/diques/i);
      expect(diquesLinks.length).toBeGreaterThan(0);
      
      const botesLinks = screen.getAllByText(/botes/i);
      expect(botesLinks.length).toBeGreaterThan(0);
    });
  });

  describe('Scenario: mobile menu toggles on button click', () => {
    it('mobile menu is hidden by default', () => {
      const { container } = renderWithRouter(<NavBar />);
      // Mobile menu has class 'lg:hidden fixed inset-x-0' and starts invisible
      const mobileMenu = container.querySelector('.lg\\:hidden.fixed');
      expect(mobileMenu).toHaveClass('invisible');
    });

    it('mobile menu becomes visible when toggle button is clicked', () => {
      const { container } = renderWithRouter(<NavBar />);
      
      // Find the mobile toggle button with accessible label
      const toggleButton = screen.getByRole('button', { name: /abrir menú/i });
      fireEvent.click(toggleButton);
      
      // Mobile menu should now be visible
      const mobileMenu = container.querySelector('.lg\\:hidden.fixed');
      expect(mobileMenu).toHaveClass('visible');
    });
  });

  describe('Scenario: active link has distinct styling', () => {
    it('links have different classes based on active state', () => {
      renderWithRouter(<NavBar />);
      
      // At root "/" path, the Pronóstico link should be active (has blue classes)
      // We check that at least one link has the active styling
      const allLinks = document.querySelectorAll('a[href="/"]');
      const activeLinks = Array.from(allLinks).filter(link => 
        link.className.includes('bg-blue-50') || link.className.includes('text-blue-700')
      );
      expect(activeLinks.length).toBeGreaterThan(0);
    });
  });

  describe('Scenario: Ctrl+K opens search modal', () => {
    it('Ctrl+K keydown triggers onSearchOpen callback', () => {
      const mockSearchOpen = vi.fn();
      renderWithRouter(<NavBar onSearchOpen={mockSearchOpen} />);
      
      // Fire Ctrl+K event on document (where the listener is attached)
      const event = new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true });
      document.dispatchEvent(event);
      
      // The callback is called with a function (toggle pattern), verify it's called
      expect(mockSearchOpen).toHaveBeenCalled();
    });

    it('Meta+K (Cmd+K) also triggers onSearchOpen callback', () => {
      const mockSearchOpen = vi.fn();
      renderWithRouter(<NavBar onSearchOpen={mockSearchOpen} />);
      
      // Fire Meta+K event (Mac) on document
      const event = new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true });
      document.dispatchEvent(event);
      
      expect(mockSearchOpen).toHaveBeenCalled();
    });
  });

  describe('Scenario: mobile menu closes on navigation', () => {
    it('mobile menu toggle works correctly', () => {
      const { container } = renderWithRouter(<NavBar />);
      
      // Get mobile menu element
      const mobileMenu = container.querySelector('.lg\\:hidden.fixed');
      
      // Initially closed
      expect(mobileMenu).toHaveClass('invisible');
      
      // Open mobile menu
      const openButton = screen.getByRole('button', { name: /abrir menú/i });
      fireEvent.click(openButton);
      
      // Menu should be open
      expect(mobileMenu).toHaveClass('visible');
      
      // Simulate closing via toggle button which now has 'Cerrar menú' label
      const closeButton = screen.getByRole('button', { name: /cerrar menú/i });
      fireEvent.click(closeButton);
      
      // Menu should be closed
      expect(mobileMenu).toHaveClass('invisible');
    });
  });

  describe('Scenario: 4 dropdown groups in desktop and mobile accordions', () => {
    it('renders the 4 dropdown groups', () => {
      renderWithRouter(<NavBar />);
      
      expect(screen.getAllByText('Clima y Pique').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Lugares').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Técnica').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Info').length).toBeGreaterThan(0);
    });

    it('renders Sumar Servicio button outside dropdowns', () => {
      renderWithRouter(<NavBar />);
      
      const sumarButtons = screen.getAllByRole('link', { name: /sumar servicio/i });
      expect(sumarButtons.length).toBeGreaterThan(0);
      expect(sumarButtons[0]).toHaveAttribute('href', '/sumar-servicio');
    });

    it('toggles mobile accordion sections', () => {
      const { container } = renderWithRouter(<NavBar />);
      
      // Open mobile drawer
      const openButton = screen.getByRole('button', { name: /abrir menú/i });
      fireEvent.click(openButton);
      
      // Accordion buttons inside mobile menu
      const mobileNav = container.querySelector('#mobile-navigation-menu');
      const tecnicaAccordionBtn = mobileNav.querySelector('button[aria-controls="accordion-tecnica"]');
      expect(tecnicaAccordionBtn).toHaveAttribute('aria-expanded', 'false');
      
      // Click to toggle Técnica accordion
      fireEvent.click(tecnicaAccordionBtn);
      expect(tecnicaAccordionBtn).toHaveAttribute('aria-expanded', 'true');
    });

    it('closes desktop dropdown on Escape key', () => {
      renderWithRouter(<NavBar />);
      
      // Open desktop dropdown by clicking its trigger
      const climaTriggers = screen.getAllByRole('button', { name: /clima y pique/i });
      const desktopTrigger = climaTriggers[0];
      
      fireEvent.click(desktopTrigger);
      expect(desktopTrigger).toHaveAttribute('aria-expanded', 'true');
      
      // Press Escape
      fireEvent.keyDown(desktopTrigger, { key: 'Escape' });
      expect(desktopTrigger).toHaveAttribute('aria-expanded', 'false');
    });
  });
});