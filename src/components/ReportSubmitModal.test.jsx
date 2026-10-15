import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ReportSubmitModal from './ReportSubmitModal';
import * as firestore from 'firebase/firestore';

vi.mock('../firebase/config', () => ({
  db: {}
}));

vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  addDoc: vi.fn().mockResolvedValue({ id: 'mock-report-id' }),
  serverTimestamp: vi.fn().mockReturnValue('mock-timestamp')
}));

describe('ReportSubmitModal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('does not render when isOpen is false', () => {
    const { container } = render(
      <ReportSubmitModal isOpen={false} onClose={vi.fn()} onSubmitted={vi.fn()} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders all required form fields when isOpen is true', () => {
    render(
      <ReportSubmitModal isOpen={true} onClose={vi.fn()} onSubmitted={vi.fn()} />
    );

    // Header title
    expect(screen.getByRole('heading', { name: /Subir mi Parte/i })).toBeInTheDocument();

    // Dique select
    const damSelect = screen.getByLabelText(/Dique/i);
    expect(damSelect).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /Dique San Roque/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /Dique Los Molinos/i })).toBeInTheDocument();

    // Fecha input
    const dateInput = screen.getByLabelText(/Fecha/i);
    expect(dateInput).toBeInTheDocument();
    expect(dateInput).toHaveAttribute('type', 'date');

    // Modalidad select (Costa / Embarcado)
    const modalitySelect = screen.getByLabelText(/Modalidad/i);
    expect(modalitySelect).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /^Costa$/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /^Embarcado$/i })).toBeInTheDocument();

    // Profundidad / Encarne input
    const depthInput = screen.getByLabelText(/Profundidad \/ Encarne/i);
    expect(depthInput).toBeInTheDocument();
    expect(depthInput).toHaveAttribute('placeholder', expect.stringContaining('Al barro con mojarra viva'));

    // Comentario breve textarea
    const commentInput = screen.getByLabelText(/Comentario breve/i);
    expect(commentInput).toBeInTheDocument();

    // Nombre del pescador (opcional)
    const authorInput = screen.getByLabelText(/Nombre del pescador/i);
    expect(authorInput).toBeInTheDocument();

    // Foto
    expect(screen.getByText(/Foto de la salida/i)).toBeInTheDocument();
  });

  it('submits report with pending: true and status: "pending"', async () => {
    const onSubmitted = vi.fn();
    render(
      <ReportSubmitModal isOpen={true} onClose={vi.fn()} onSubmitted={onSubmitted} />
    );

    // Fill form
    fireEvent.change(screen.getByLabelText(/Profundidad \/ Encarne/i), {
      target: { value: 'Al barro con mojarra viva a 4 metros' }
    });
    fireEvent.change(screen.getByLabelText(/Comentario breve/i), {
      target: { value: 'Muy buen pique a primera hora de la mañana.' }
    });
    fireEvent.change(screen.getByLabelText(/Nombre del pescador/i), {
      target: { value: 'Carlos P.' }
    });

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /Subir Parte/i }));

    await waitFor(() => {
      expect(firestore.addDoc).toHaveBeenCalledTimes(1);
    });

    const submittedData = firestore.addDoc.mock.calls[0][1];
    expect(submittedData.pending).toBe(true);
    expect(submittedData.status).toBe('pending');
    expect(submittedData.author).toBe('Carlos P.');
    expect(submittedData.depthAndBait).toBe('Al barro con mojarra viva a 4 metros');
    expect(submittedData.comment).toBe('Muy buen pique a primera hora de la mañana.');

    // Success message is displayed
    expect(await screen.findByText(/¡Parte de Pesca Recibido!/i)).toBeInTheDocument();
    expect(screen.getByText(/pending: true/i)).toBeInTheDocument();
  });

  it('defaults to anonymous when author is left blank', async () => {
    render(
      <ReportSubmitModal isOpen={true} onClose={vi.fn()} onSubmitted={vi.fn()} />
    );

    fireEvent.change(screen.getByLabelText(/Profundidad \/ Encarne/i), {
      target: { value: 'Línea de flote' }
    });
    fireEvent.change(screen.getByLabelText(/Comentario breve/i), {
      target: { value: 'Poco viento' }
    });

    fireEvent.click(screen.getByRole('button', { name: /Subir Parte/i }));

    await waitFor(() => {
      expect(firestore.addDoc).toHaveBeenCalledTimes(1);
    });

    const submittedData = firestore.addDoc.mock.calls[0][1];
    expect(submittedData.author).toBe('Pescador anónimo');
    expect(submittedData.pending).toBe(true);
    expect(submittedData.status).toBe('pending');
  });
});
