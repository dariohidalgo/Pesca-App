import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import DamsCatalog from './DamsCatalog';

const renderWithRouter = (ui) => {
  return render(
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      {ui}
    </BrowserRouter>
  );
};

describe('DamsCatalog Component', () => {
  it('renders dams catalog and switches to water level tab', () => {
    renderWithRouter(<DamsCatalog />);
    expect(screen.getByText(/Diques de Córdoba/i)).toBeInTheDocument();
    expect(screen.getByText(/Dique San Roque/i)).toBeInTheDocument();
    expect(screen.getByText(/Dique Los Molinos/i)).toBeInTheDocument();

    // Switch to water levels tab
    const levelsTab = screen.getByText(/Cotas de Vertedero y Niveles/i);
    fireEvent.click(levelsTab);
    expect(screen.getByText(/Transparencia sobre Cotas Oficiales/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Cota:/i).length).toBeGreaterThan(0);
  });
});
