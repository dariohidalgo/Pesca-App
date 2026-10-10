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
});
