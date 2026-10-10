import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import TripPlanner from './TripPlanner';

const renderWithRouter = (ui) => {
  return render(
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      {ui}
    </BrowserRouter>
  );
};

describe('TripPlanner Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders trip planner with form controls and checklist', () => {
    renderWithRouter(<TripPlanner />);
    expect(screen.getByText(/Planificador de Salida/i)).toBeInTheDocument();
    expect(screen.getByText(/Lista de Preparación/i)).toBeInTheDocument();
    expect(screen.getByText(/Dique de destino/i)).toBeInTheDocument();
  });

  it('allows checking and unchecking checklist items and persists to localStorage', async () => {
    renderWithRouter(<TripPlanner />);
    
    const docItem = screen.getByText(/Carnet de pesca deportiva digital de Córdoba/i);
    expect(docItem).toBeInTheDocument();
    
    // Click to check
    fireEvent.click(docItem);

    // Verify localStorage.setItem is called
    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'pescacordoba_trip_plan_state',
        expect.stringContaining('doc-carnet')
      );
    });
  });

  it('triggers window.print when print button is clicked', () => {
    const printSpy = vi.spyOn(window, 'print').mockImplementation(() => {});
    renderWithRouter(<TripPlanner />);
    
    const printButton = screen.getByTitle(/Imprimir o guardar en PDF/i);
    fireEvent.click(printButton);
    expect(printSpy).toHaveBeenCalled();
  });

  it('renders experience levels with aria-pressed state', () => {
    renderWithRouter(<TripPlanner />);
    const intermedioBtn = screen.getByRole('button', { name: /intermedio/i });
    expect(intermedioBtn).toHaveAttribute('aria-pressed', 'true');

    const principianteBtn = screen.getByRole('button', { name: /principiante/i });
    expect(principianteBtn).toHaveAttribute('aria-pressed', 'false');

    fireEvent.click(principianteBtn);
    expect(principianteBtn).toHaveAttribute('aria-pressed', 'true');
    expect(intermedioBtn).toHaveAttribute('aria-pressed', 'false');
  });

  it('renders Reiniciar and Imprimir buttons with accessible names', () => {
    renderWithRouter(<TripPlanner />);
    expect(screen.getByRole('button', { name: /reiniciar lista de preparación/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /imprimir o guardar en pdf/i })).toBeInTheDocument();
  });
});
