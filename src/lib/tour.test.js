import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getTourSteps, TOUR_STORAGE_KEY, runDriverTour, startTour } from './tour';
import * as driverJs from 'driver.js';

vi.mock('driver.js', () => ({
  driver: vi.fn(),
}));

describe('tour helper module', () => {
  let mockDrive;
  let mockDriverInstance;

  beforeEach(() => {
    mockDrive = vi.fn();
    mockDriverInstance = {
      drive: mockDrive,
      destroy: vi.fn(),
    };
    vi.mocked(driverJs.driver).mockReturnValue(mockDriverInstance);
    window.location.pathname = '/';
    localStorage.getItem.mockReset();
    localStorage.setItem.mockReset();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('defines 4 concrete tour steps with expected titles and content', () => {
    const steps = getTourSteps();
    expect(steps).toHaveLength(4);

    // Step 1: Selector de Dique y Cota
    expect(steps[0].popover.title).toBe('Selector de Dique y Cota');
    expect(steps[0].popover.description).toMatch(/vertedero/i);
    expect(steps[0].popover.description).toMatch(/índice de pique/i);

    // Step 2: Menú Clima y Pique / Partes
    expect(steps[1].popover.title).toBe('Menú Clima y Pique / Partes');
    expect(steps[1].popover.description).toMatch(/reportes reales/i);
    expect(steps[1].popover.description).toMatch(/parte de pesca/i);

    // Step 3: Menú Lugares y Técnica
    expect(steps[2].popover.title).toBe('Menú Lugares y Técnica');
    expect(steps[2].popover.description).toMatch(/mapa interactivo/i);
    expect(steps[2].popover.description).toMatch(/offline/i);

    // Step 4: Buscador Rápido (Ctrl+K)
    expect(steps[3].popover.title).toBe('Buscador Rápido (Ctrl+K)');
    expect(steps[3].popover.description).toMatch(/Ctrl\+K/i);
  });

  it('element resolvers return proper elements or null without throwing', () => {
    const steps = getTourSteps();
    steps.forEach((step) => {
      expect(typeof step.element).toBe('function');
      expect(() => step.element()).not.toThrow();
    });
  });

  it('runDriverTour initializes driver.js with custom config and sets localStorage', () => {
    runDriverTour();

    expect(driverJs.driver).toHaveBeenCalledTimes(1);
    const config = vi.mocked(driverJs.driver).mock.calls[0][0];

    expect(config.popoverClass).toBe('pescaapp-tour-popover');
    expect(config.nextBtnText).toBe('Siguiente');
    expect(config.prevBtnText).toBe('Anterior');
    expect(config.doneBtnText).toBe('Finalizar');
    expect(config.showProgress).toBe(true);
    expect(mockDrive).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(TOUR_STORAGE_KEY, 'true');
  });

  it('startTour executes immediately when already at root path "/"', () => {
    vi.useFakeTimers();
    window.location.pathname = '/';

    startTour();
    vi.advanceTimersByTime(200);

    expect(driverJs.driver).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalledWith(TOUR_STORAGE_KEY, 'true');
    vi.useRealTimers();
  });

  it('startTour calls navigate("/") when on another page before running tour', () => {
    vi.useFakeTimers();
    window.location.pathname = '/diques';
    const mockNavigate = vi.fn();

    startTour(mockNavigate);
    expect(mockNavigate).toHaveBeenCalledWith('/');

    vi.advanceTimersByTime(350);
    expect(driverJs.driver).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalledWith(TOUR_STORAGE_KEY, 'true');
    vi.useRealTimers();
  });
});
