'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import Icon, { type IconName } from './Icon';

type Theme = 'system' | 'light' | 'dark';

const themeIcons: Record<Theme, IconName> = {
  system: 'monitor',
  light: 'sun',
  dark: 'moon',
};

const subscribeToMount = () => () => {};

const applyTheme = (newTheme: Theme) => {
  const root = document.documentElement;
  root.classList.remove('light', 'dark');

  if (newTheme === 'light') {
    root.classList.add('light');
  } else if (newTheme === 'dark') {
    root.classList.add('dark');
  }

  // Force browser to re-parse /favicon.svg with active class context
  const faviconLink = document.querySelector<HTMLLinkElement>("link[rel*='icon']");
  if (faviconLink) {
    const baseUrl = faviconLink.href.split('?')[0];
    faviconLink.href = `${baseUrl}?v=${newTheme}-${Date.now()}`;
  }
};

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'system';
    return (localStorage.getItem('theme-preference') as Theme | null) ?? 'system';
  });
  const mounted = useSyncExternalStore(subscribeToMount, () => true, () => false);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const cycleTheme = () => {
    const nextTheme: Theme = 
      theme === 'system' ? 'light' : 
      theme === 'light' ? 'dark' : 'system';

    setTheme(nextTheme);
    localStorage.setItem('theme-preference', nextTheme);
  };

  if (!mounted) return null;

  const nextTheme: Theme =
    theme === 'system' ? 'light' : theme === 'light' ? 'dark' : 'system';

  return (
    <div className="fixed bottom-5 right-5 z-(--layer-utility)">
      <button
        onClick={cycleTheme}
        type="button"
        aria-label={`Switch to ${nextTheme} theme`}
        className="flex min-h-11 items-center justify-center gap-2 px-3 py-2 rounded-full bg-bg-secondary hover:bg-bg-tertiary text-text-primary border border-border-base hover:border-border-hover shadow-md hover:cursor-pointer motion-safe:transition-[color,background-color,border-color,box-shadow] motion-safe:duration-[var(--motion-duration-fast)] motion-safe:ease-[var(--motion-ease-standard)]"
      >
        <Icon name={themeIcons[theme]} size="sm" />
        
        <span className="text-xs font-medium capitalize tracking-tight hidden sm:inline">
          {theme}
        </span>
      </button>
    </div>
  );
}
