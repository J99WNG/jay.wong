'use client';

import { useEffect, useState } from 'react';

type Theme = 'system' | 'light' | 'dark';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('system');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Read saved theme preference from local storage on mount
    const savedTheme = localStorage.getItem('theme-preference') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    }
    setMounted(true);
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');

    if (newTheme === 'light') {
      root.classList.add('light');
    } else if (newTheme === 'dark') {
      root.classList.add('dark');
    }
    // 'system' mode works automatically via `color-scheme: light dark`
  };

  const cycleTheme = () => {
    const nextTheme: Theme = 
      theme === 'system' ? 'light' : 
      theme === 'light' ? 'dark' : 'system';

    setTheme(nextTheme);
    localStorage.setItem('theme-preference', nextTheme);
    applyTheme(nextTheme);
  };

  // Prevent hydration mismatched rendering
  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-9999">
      <button
        onClick={cycleTheme}
        type="button"
        aria-label={`Current theme: ${theme}. Click to switch theme.`}
        className="flex items-center justify-center gap-2 px-3 py-2 rounded-full bg-bg-secondary text-text-primary border border-border-base shadow-md hover:border-border-hover hover:cursor-pointer transition-all duration-200 focus-visible:outline-2 focus-visible:outline-accent-primary"
      >
        <span className="icon icon-sm" aria-hidden="true">
          <span className="material-symbols-rounded select-none" aria-hidden="true">
            {theme === 'light' ? 'light_mode' : theme === 'dark' ? 'dark_mode' : 'desktop_windows'}
          </span>
        </span>
        
        <span className="text-xs font-medium capitalize tracking-wide hidden sm:inline">
          {theme}
        </span>
      </button>
    </div>
  );
}