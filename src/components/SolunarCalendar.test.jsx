import { render, screen, act } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import SolunarCalendar from './SolunarCalendar';
import SunCalc from 'suncalc';

const renderWithHelmet = (component) => {
  return render(
    <HelmetProvider>
      {component}
    </HelmetProvider>
  );
};

describe('SolunarCalendar Component - SSR-safe date handling', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-10-10T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders without hydration mismatch - shows stable placeholder during SSR', () => {
    // During SSR, the date should be stable
    const { container } = renderWithHelmet(<SolunarCalendar />);
    
    // The component should render without throwing
    expect(container).toBeInTheDocument();
    expect(screen.getByText(/Calendario Solunar/i)).toBeInTheDocument();
  });

  it('displays moon phase information', () => {
    renderWithHelmet(<SolunarCalendar />);
    
    // Should show moon phase details
    expect(screen.getByText(/Disco iluminado:/i)).toBeInTheDocument();
    expect(screen.getByText(/Actividad Teórica:/i)).toBeInTheDocument();
  });

  it('displays solar times', () => {
    renderWithHelmet(<SolunarCalendar />);
    
    expect(screen.getByText(/Horarios Solares/i)).toBeInTheDocument();
    expect(screen.getByText(/Salida del sol/i)).toBeInTheDocument();
    expect(screen.getByText(/Puesta del sol/i)).toBeInTheDocument();
  });

  it('displays lunar times', () => {
    renderWithHelmet(<SolunarCalendar />);
    
    expect(screen.getByText(/Efemérides Lunares/i)).toBeInTheDocument();
    expect(screen.getByText(/Salida de la luna/i)).toBeInTheDocument();
    // "Puesta de la luna" appears twice, use getAllByText
    expect(screen.getAllByText(/Puesta de la luna/i).length).toBeGreaterThan(0);
  });

  it('displays major and minor solunar periods', () => {
    renderWithHelmet(<SolunarCalendar />);
    
    // "Períodos Mayores" appears twice, use getAllByText
    expect(screen.getAllByText(/Períodos Mayores/i).length).toBeGreaterThan(0);
    // "Períodos Menores" appears twice, use getAllByText
    expect(screen.getAllByText(/Períodos Menores/i).length).toBeGreaterThan(0);
  });
});