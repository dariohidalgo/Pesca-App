import { render, screen, waitFor } from '@testing-library/react';
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
});
