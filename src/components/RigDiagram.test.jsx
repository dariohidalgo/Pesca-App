import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RigDiagram from './RigDiagram';

describe('RigDiagram Component', () => {
  it('renders inline diagram with horizontal scroll note and expand button', () => {
    render(<RigDiagram rigId="flote-pejerrey-tres-boyas" />);

    expect(screen.getByText(/Deslizá para explorar el montaje/i)).toBeInTheDocument();
    const expandBtn = screen.getByRole('button', { name: /ampliar esquema/i });
    expect(expandBtn).toBeInTheDocument();
  });

  it('opens accessible expanded modal with zoom and close controls when expand button is clicked', () => {
    render(<RigDiagram rigId="flote-pejerrey-tres-boyas" />);

    const expandBtn = screen.getByRole('button', { name: /ampliar esquema/i });
    fireEvent.click(expandBtn);

    // Modal dialog is rendered
    const dialog = screen.getByRole('dialog', { name: /esquema técnico ampliado/i });
    expect(dialog).toBeInTheDocument();

    // Zoom controls and close button exist with accessible names
    expect(screen.getByRole('button', { name: /aumentar zoom/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reducir zoom/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cerrar esquema ampliado/i })).toBeInTheDocument();
  });

  it('closes expanded modal when close button is clicked', () => {
    render(<RigDiagram rigId="flote-pejerrey-tres-boyas" />);

    fireEvent.click(screen.getByRole('button', { name: /ampliar esquema/i }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    const closeBtn = screen.getByRole('button', { name: /cerrar esquema ampliado/i });
    fireEvent.click(closeBtn);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes expanded modal on Escape key press', () => {
    render(<RigDiagram rigId="flote-pejerrey-tres-boyas" />);

    fireEvent.click(screen.getByRole('button', { name: /ampliar esquema/i }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('updates zoom level when zoom in and zoom out buttons are clicked', () => {
    render(<RigDiagram rigId="flote-pejerrey-tres-boyas" />);

    fireEvent.click(screen.getByRole('button', { name: /ampliar esquema/i }));
    expect(screen.getByTestId('zoom-level')).toHaveTextContent('100%');

    const zoomInBtn = screen.getByRole('button', { name: /aumentar zoom/i });
    fireEvent.click(zoomInBtn);
    expect(screen.getByTestId('zoom-level')).toHaveTextContent('125%');

    const zoomOutBtn = screen.getByRole('button', { name: /reducir zoom/i });
    fireEvent.click(zoomOutBtn);
    expect(screen.getByTestId('zoom-level')).toHaveTextContent('100%');

    const resetBtn = screen.getByRole('button', { name: /restablecer zoom al 100%/i });
    fireEvent.click(zoomInBtn);
    fireEvent.click(zoomInBtn);
    expect(screen.getByTestId('zoom-level')).toHaveTextContent('150%');
    fireEvent.click(resetBtn);
    expect(screen.getByTestId('zoom-level')).toHaveTextContent('100%');
  });

  it('locks body overflow while open and restores it when closed', () => {
    render(<RigDiagram rigId="flote-pejerrey-tres-boyas" />);

    expect(document.body.style.overflow).toBe('');

    fireEvent.click(screen.getByRole('button', { name: /ampliar esquema/i }));
    expect(document.body.style.overflow).toBe('hidden');

    const closeBtn = screen.getByRole('button', { name: /cerrar esquema ampliado/i });
    fireEvent.click(closeBtn);
    expect(document.body.style.overflow).toBe('');
  });

  it('traps focus inside the dialog with Tab key', () => {
    render(<RigDiagram rigId="flote-pejerrey-tres-boyas" />);

    fireEvent.click(screen.getByRole('button', { name: /ampliar esquema/i }));
    const closeBtn = screen.getByRole('button', { name: /cerrar esquema ampliado/i });
    const resetBtn = screen.getByRole('button', { name: /restablecer zoom al 100%/i });

    // Focus close button
    closeBtn.focus();
    expect(document.activeElement).toBe(closeBtn);

    // Shift+Tab from first element wraps to last focusable element
    fireEvent.keyDown(window, { key: 'Tab', shiftKey: true });
    // The diagram area or last button should now have focus
    expect(screen.getByRole('dialog').contains(document.activeElement)).toBe(true);
  });
});
