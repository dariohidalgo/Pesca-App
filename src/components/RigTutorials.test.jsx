import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import RigTutorials from './RigTutorials';

const renderWithRouter = (ui) => {
  return render(
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      {ui}
    </BrowserRouter>
  );
};

describe('RigTutorials Component', () => {
  it('renders tutorials catalog with core line assemblies', () => {
    renderWithRouter(<RigTutorials />);
    expect(screen.getByText(/Tutoriales de Líneas de Pesca/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Línea de flote clásica de 3 boyas/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Línea Paternoster regulable/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Línea de fondo con resorte cebador/i).length).toBeGreaterThan(0);
  });
});
