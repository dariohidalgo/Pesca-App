import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import axios from 'axios';
import WeatherDashboard from './WeatherDashboard';

vi.mock('axios');

const renderWithHelmet = (component) => {
  return render(
    <HelmetProvider>
      {component}
    </HelmetProvider>
  );
};

describe('WeatherDashboard Component', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    // Set fixed system time: 2026-10-15 15:00:00 UTC = 2026-10-15 12:00:00 in Cordoba (UTC-3)
    vi.setSystemTime(new Date('2026-10-15T15:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('renders wind card with cardinal direction, rotating arrow and gusts text', async () => {
    const mockWeatherData = {
      current: {
        surface_pressure: 955,
        wind_speed_10m: 16,
        wind_gusts_10m: 29,
        wind_direction_10m: 225 // SO (Suroeste)
      },
      daily: {
        time: ['2026-10-15', '2026-10-16'],
        temperature_2m_max: [24, 25],
        temperature_2m_min: [12, 13],
        wind_speed_10m_max: [18, 15],
        weather_code: [1, 2]
      }
    };

    axios.get.mockResolvedValueOnce({ data: mockWeatherData });

    const { container } = renderWithHelmet(<WeatherDashboard />);

    await waitFor(() => {
      expect(screen.getByText('16 km/h')).toBeInTheDocument();
    });

    // Verify cardinal direction
    expect(screen.getByText('SO')).toBeInTheDocument();

    // Verify secondary gusts text
    expect(screen.getByText('Ráfagas: 29 km/h')).toBeInTheDocument();

    // Verify rotating arrow style
    const arrow = container.querySelector('svg.lucide-arrow-up');
    expect(arrow).toBeInTheDocument();
    expect(arrow).toHaveStyle({ transform: 'rotate(225deg)' });
  });

  it('filters extended forecast so days prior to today in Cordoba are never displayed', async () => {
    const mockWeatherData = {
      current: {
        surface_pressure: 955,
        wind_speed_10m: 12,
        wind_gusts_10m: 20,
        wind_direction_10m: 0 // N
      },
      daily: {
        // Includes 2 past days (13th and 14th Oct), today (15th Oct), and tomorrow (16th Oct)
        time: ['2026-10-13', '2026-10-14', '2026-10-15', '2026-10-16'],
        temperature_2m_max: [20, 21, 22, 23],
        temperature_2m_min: [10, 11, 12, 13],
        wind_speed_10m_max: [15, 16, 17, 18],
        weather_code: [0, 0, 1, 2]
      }
    };

    axios.get.mockResolvedValueOnce({ data: mockWeatherData });

    renderWithHelmet(<WeatherDashboard />);

    await waitFor(() => {
      expect(screen.getByText('12 km/h')).toBeInTheDocument();
    });

    // Past days (13 and 14 October 2026) must NEVER be rendered in the forecast cards
    expect(screen.queryByText(/13 de octubre|13 octubre/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/14 de octubre|14 octubre/i)).not.toBeInTheDocument();

    // Today (15) and future (16) should be rendered
    expect(screen.getByText(/15 de octubre|15 octubre/i)).toBeInTheDocument();
    expect(screen.getByText(/16 de octubre|16 octubre/i)).toBeInTheDocument();
  });

  it('opens modal with more data when clicking a forecast card, and closes it', async () => {
    const mockWeatherData = {
      current: {
        surface_pressure: 950,
        wind_speed_10m: 10,
        wind_gusts_10m: 18,
        wind_direction_10m: 90
      },
      daily: {
        time: ['2026-10-15', '2026-10-16'],
        temperature_2m_max: [22, 26],
        temperature_2m_min: [11, 14],
        wind_speed_10m_max: [14, 11],
        wind_gusts_10m_max: [20, 19],
        wind_direction_10m_dominant: [90, 180],
        precipitation_sum: [0, 2.5],
        precipitation_probability_max: [0, 45],
        sunrise: ['2026-10-15T06:44', '2026-10-16T06:43'],
        sunset: ['2026-10-15T19:33', '2026-10-16T19:34'],
        weather_code: [0, 61]
      }
    };

    axios.get.mockResolvedValueOnce({ data: mockWeatherData });

    renderWithHelmet(<WeatherDashboard />);

    await waitFor(() => {
      expect(screen.getByText('10 km/h')).toBeInTheDocument();
    });

    // Card should have clickable role and show "Ver más datos"
    const cards = screen.getAllByRole('button', { name: /ver más datos/i });
    expect(cards.length).toBe(2);

    // Click on future day card (index 1: 16 de octubre)
    fireEvent.click(cards[1]);

    // Modal should open
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/Pronóstico detallado/i)).toBeInTheDocument();
    expect(screen.getByText(/26° \/ 14°/i)).toBeInTheDocument();
    expect(screen.getByText(/Ráfagas: 19 km\/h/i)).toBeInTheDocument();
    expect(screen.getByText(/06:43 \/ 19:34/i)).toBeInTheDocument();
    expect(screen.getByText(/45%/i)).toBeInTheDocument();

    // Close modal via close button
    const closeBtn = screen.getByRole('button', { name: /cerrar detalle del pronóstico/i });
    fireEvent.click(closeBtn);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});

