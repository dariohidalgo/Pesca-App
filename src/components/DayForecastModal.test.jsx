import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DayForecastModal from './DayForecastModal';

describe('DayForecastModal Component', () => {
  const mockDay = {
    date: new Date('2026-10-16T12:00:00'),
    weatherCode: 0,
    tempMax: 24,
    tempMin: 12,
    windMax: 15,
    windGustsMax: 26,
    windDirectionDominant: 180, // S
    moonPhaseText: 'Gibosa Creciente',
    sunrise: '2026-10-16T06:42',
    sunset: '2026-10-16T19:35',
    precipitationSum: 0,
    precipitationProbability: 5,
    fishingIndex: {
      label: 'Excelente',
      color: 'bg-emerald-600',
      text: 'Condiciones óptimas para pesca.'
    }
  };

  it('does not render when isOpen is false', () => {
    const { container } = render(
      <DayForecastModal
        isOpen={false}
        onClose={vi.fn()}
        day={mockDay}
        locationName="Dique Los Molinos"
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders modal with detailed weather information when open', () => {
    render(
      <DayForecastModal
        isOpen={true}
        onClose={vi.fn()}
        day={mockDay}
        locationName="Dique Los Molinos"
        isBestDay={true}
        fishingIndex={mockDay.fishingIndex}
      />
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/Dique Los Molinos/i)).toBeInTheDocument();
    expect(screen.getByText(/Mejor día para pescar esta semana/i)).toBeInTheDocument();
    expect(screen.getByText(/Cielo despejado/i)).toBeInTheDocument();
    expect(screen.getByText(/24° \/ 12°/i)).toBeInTheDocument();
    expect(screen.getByText(/15 km\/h/i)).toBeInTheDocument();
    expect(screen.getByText(/Ráfagas: 26 km\/h/i)).toBeInTheDocument();
    expect(screen.getByText(/^S$/)).toBeInTheDocument();
    expect(screen.getByText(/Gibosa Creciente/i)).toBeInTheDocument();
    expect(screen.getByText(/06:42 \/ 19:35/i)).toBeInTheDocument();
    expect(screen.getByText(/5%/i)).toBeInTheDocument();
    expect(screen.getByText(/Condiciones óptimas para pesca/i)).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    render(
      <DayForecastModal
        isOpen={true}
        onClose={onClose}
        day={mockDay}
        locationName="Dique Los Molinos"
      />
    );

    const closeBtn = screen.getByRole('button', { name: /Cerrar detalle del pronóstico/i });
    fireEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when pressing Escape key', () => {
    const onClose = vi.fn();
    render(
      <DayForecastModal
        isOpen={true}
        onClose={onClose}
        day={mockDay}
        locationName="Dique Los Molinos"
      />
    );

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when clicking on backdrop', () => {
    const onClose = vi.fn();
    render(
      <DayForecastModal
        isOpen={true}
        onClose={onClose}
        day={mockDay}
        locationName="Dique Los Molinos"
      />
    );

    const backdrop = screen.getByRole('dialog');
    fireEvent.click(backdrop);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
