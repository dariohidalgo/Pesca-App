import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DamWaterLevelIndicator from './DamWaterLevelIndicator';

describe('DamWaterLevelIndicator Component', () => {
  it('renders green badge for San Roque (-1.80m from spillway)', () => {
    render(<DamWaterLevelIndicator damId="san-roque" />);
    expect(screen.getByText(/Cota: -1.80m del vertedero/i)).toBeInTheDocument();
  });

  it('renders yellow badge for Los Molinos (-2.20m from spillway)', () => {
    render(<DamWaterLevelIndicator damId="los-molinos" />);
    expect(screen.getByText(/Cota: -2.20m del vertedero/i)).toBeInTheDocument();
  });

  it('renders orange badge for Cruz del Eje (-4.70m from spillway)', () => {
    render(<DamWaterLevelIndicator damId="cruz-del-eje" />);
    expect(screen.getByText(/Cota: -4.70m del vertedero/i)).toBeInTheDocument();
  });

  it('renders progress bar when showBar is true or variant is compact', () => {
    render(<DamWaterLevelIndicator damId="san-roque" showBar={true} />);
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toBeInTheDocument();
    expect(progressbar).toHaveAttribute('aria-valuenow');
  });

  it('renders card variant with detailed metrics', () => {
    render(<DamWaterLevelIndicator damId="san-roque" variant="card" />);
    expect(screen.getByText(/Nivel Hidrométrico/i)).toBeInTheDocument();
    expect(screen.getByText(/Actual:/i)).toBeInTheDocument();
    expect(screen.getByText(/Vertedero: 35.30 m/i)).toBeInTheDocument();
  });

  it('renders fallback when damId is unknown or data is missing', () => {
    render(<DamWaterLevelIndicator damId="desconocido" />);
    expect(screen.getByText(/Cota: Sin dato oficial/i)).toBeInTheDocument();
  });

  it('accepts explicit currentLevel and spillwayLevel props', () => {
    render(<DamWaterLevelIndicator currentLevel={33.30} spillwayLevel={35.30} />);
    expect(screen.getByText(/Cota: -2.00m del vertedero/i)).toBeInTheDocument();
  });
});
