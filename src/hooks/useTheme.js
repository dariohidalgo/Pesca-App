import { useState, useEffect } from 'react';

export function useTheme() {
  // Keep the server and first client render identical before reading preferences.
  const [preference, setTheme] = useState(null);
  const theme = preference ?? 'light';

  useEffect(() => {
    let initialTheme = 'light';
    try {
      const stored = localStorage.getItem('theme');
      if (stored === 'light' || stored === 'dark') {
        initialTheme = stored;
      } else if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
        initialTheme = 'dark';
      }
    } catch {
      // Storage can be unavailable in restricted browser contexts.
    }
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    if (preference === null || typeof document === 'undefined') return;
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      if (typeof localStorage !== 'undefined' && typeof localStorage.setItem === 'function') {
        localStorage.setItem('theme', theme);
      }
    } catch {
      // fallback
    }
  }, [theme, preference]);


  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  return { theme, toggleTheme };
}
