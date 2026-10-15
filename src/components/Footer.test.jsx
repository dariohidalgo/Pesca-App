import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from './Footer';
import { describe, it, expect, vi } from 'vitest';
import * as tourModule from '../lib/tour';

vi.mock('../lib/tour', () => ({
  startTour: vi.fn(),
}));

const renderFooterWithRouter = () => {
  return render(
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Footer />
    </BrowserRouter>
  );
};

describe('Footer Component', () => {
  it('renders "Ver Guía de Uso" button and triggers startTour on click', () => {
    renderFooterWithRouter();

    const tourBtn = screen.getByRole('button', { name: /ver guía de uso/i });
    expect(tourBtn).toBeInTheDocument();

    fireEvent.click(tourBtn);
    expect(tourModule.startTour).toHaveBeenCalled();
  });
});
