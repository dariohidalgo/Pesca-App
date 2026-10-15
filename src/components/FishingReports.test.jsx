import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import FishingReports from './FishingReports';

vi.mock('../firebase/config', () => ({
  db: {}
}));

vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
  getDocs: vi.fn().mockResolvedValue({ docs: [] }),
  addDoc: vi.fn().mockResolvedValue({ id: 'mock-id' }),
  serverTimestamp: vi.fn()
}));

const renderWithRouter = (ui) => {
  return render(
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      {ui}
    </BrowserRouter>
  );
};

describe('FishingReports Component', () => {
  it('renders "Subir mi Parte" button in the header', () => {
    renderWithRouter(<FishingReports />);
    const buttons = screen.getAllByRole('button', { name: /Subir mi Parte/i });
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('opens ReportSubmitModal when clicking "Subir mi Parte"', () => {
    renderWithRouter(<FishingReports />);
    const button = screen.getAllByRole('button', { name: /Subir mi Parte/i })[0];
    fireEvent.click(button);

    // Modal title should appear
    expect(screen.getByRole('heading', { name: /Subir mi Parte/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Dique/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Profundidad \/ Encarne/i)).toBeInTheDocument();
  });
});
