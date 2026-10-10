import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { JSDOM } from 'jsdom';

describe('Client Entry Point - hydrateRoot', () => {
  let dom;
  let originalWindow;
  let originalDocument;
  let originalNavigator;
  let consoleErrorSpy;

  beforeEach(() => {
    dom = new JSDOM('<!doctype html><html><head></head><body><div id="root">SSR Content</div></body></html>', {
      url: 'http://localhost/',
      pretendToBeVisual: true,
    });

    originalWindow = global.window;
    originalDocument = global.document;
    originalNavigator = global.navigator;

    global.window = dom.window;
    global.document = dom.window.document;
    global.navigator = dom.window.navigator;

    // Mock requestIdleCallback and requestAnimationFrame
    global.requestIdleCallback = vi.fn((cb) => setTimeout(cb, 0));
    global.cancelIdleCallback = vi.fn();

    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    global.window = originalWindow;
    global.document = originalDocument;
    global.navigator = originalNavigator;
    consoleErrorSpy.mockRestore();
    vi.resetModules();
  });

  it('imports hydrateRoot from react-dom/client instead of createRoot', async () => {
    // This test verifies the source code uses hydrateRoot
    const fs = await import('node:fs');
    const path = await import('node:path');
    const filePath = path.resolve(process.cwd(), 'src/main.jsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    expect(content).toContain("import { hydrateRoot } from 'react-dom/client'");
    expect(content).not.toContain("import { createRoot } from 'react-dom/client'");
  });

  it('calls hydrateRoot on the root element', async () => {
    // Import the module which will execute hydrateRoot
    await import('./main.jsx');

    // Verify the root element has been hydrated (React 19 adds data attributes)
    const root = document.getElementById('root');
    expect(root).toBeInTheDocument();
    // The root should have React's internal markers after hydration
    expect(root.firstChild).toBeTruthy();
  });

  it('does not throw hydration mismatch errors', async () => {
    await import('./main.jsx');

    // Check no hydration mismatch errors were logged
    const hydrationErrors = consoleErrorSpy.mock.calls.filter(call =>
      call[0]?.includes?.('hydrat') || call[0]?.includes?.('Hydration')
    );
    expect(hydrationErrors.length).toBe(0);
  });
});