import { describe, it, expect, vi, beforeEach } from 'vitest';

const { hydrateRoot, createRoot, render } = vi.hoisted(() => ({
  hydrateRoot: vi.fn(), createRoot: vi.fn(), render: vi.fn(),
}));
vi.mock('react-dom/client', () => ({ hydrateRoot, createRoot }));
vi.mock('./App.jsx', () => ({ default: () => null }));

describe('Client entry chooses the matching render strategy', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    createRoot.mockReturnValue({ render });
  });

  it('hydrates existing prerendered content', async () => {
    document.body.innerHTML = '<div id="root"><main>SSR content</main></div>';
    const root = document.getElementById('root');
    await import('./main.jsx');
    expect(hydrateRoot).toHaveBeenCalledWith(root, expect.anything());
    expect(createRoot).not.toHaveBeenCalled();
    expect(root.textContent).toBe('SSR content');
  });

  it('mounts an empty development root without attempting hydration', async () => {
    document.body.innerHTML = '<div id="root"></div>';
    await import('./main.jsx');
    expect(createRoot).toHaveBeenCalledWith(document.getElementById('root'));
    expect(render).toHaveBeenCalledOnce();
    expect(hydrateRoot).not.toHaveBeenCalled();
  });
});
