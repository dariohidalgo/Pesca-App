import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import FishingRules from './FishingRules';

const renderWithRouter = (ui) => {
  return render(
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      {ui}
    </BrowserRouter>
  );
};

describe('FishingRules Component', () => {
  it('renders official regulation headings and framework', () => {
    renderWithRouter(<FishingRules />);
    expect(screen.getByText(/Reglamento Oficial y Permisos de Pesca/i)).toBeInTheDocument();
    expect(screen.getByText(/Vedas y Restricciones Provinciales Corroboradas/i)).toBeInTheDocument();
  });

  it('renders dam quota cards with official links for mobile presentation', () => {
    renderWithRouter(<FishingRules />);

    // Check dam names appear in the mobile cards / desktop table
    expect(screen.getAllByText(/Dique San Roque/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Dique Los Molinos/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Embalse de Río Tercero/i).length).toBeGreaterThan(0);

    // Check official consultation links are preserved
    const links = screen.getAllByRole('link', { name: /consultar en cazaypesca/i });
    expect(links.length).toBeGreaterThan(0);
  });
});
