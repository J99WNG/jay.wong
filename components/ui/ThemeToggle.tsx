'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { Monitor, Moon, Sun, type LucideIcon } from 'lucide-react';
import Button from '../ui/Button';

type Theme = 'system' | 'light' | 'dark';

const themeIcons: Record<Theme, LucideIcon> = {
  system: Monitor,
  light: Sun,
  dark: Moon,
};

const subscribeToMount = () => () => {};

const syncFavicon = (theme: Theme) => {
  // A favicon is loaded as a separate document, so it cannot inherit the
  // website's .light/.dark class. Add one final, active icon link that points
  // directly to the matching generated asset instead.
  let faviconLink = document.querySelector<HTMLLinkElement>('#active-theme-favicon');

  if (!faviconLink) {
    faviconLink = document.createElement('link');
    faviconLink.id = 'active-theme-favicon';
    faviconLink.rel = 'icon';
    faviconLink.sizes = '512x512';
    document.head.appendChild(faviconLink);
  }

  const isSystemTheme = theme === 'system';
  faviconLink.type = isSystemTheme ? 'image/svg+xml' : 'image/png';
  faviconLink.href = isSystemTheme
    ? `/favicon.svg?v=${Date.now()}`
    : `/favicon-${theme}.png?v=${Date.now()}`;
};

const applyTheme = (newTheme: Theme) => {
  const root = document.documentElement;
  root.classList.remove('light', 'dark');

  if (newTheme === 'light') {
    root.classList.add('light');
  } else if (newTheme === 'dark') {
    root.classList.add('dark');
  }

  syncFavicon(newTheme);
};

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'system';
    return (localStorage.getItem('theme-preference') as Theme | null) ?? 'system';
  });
  const mounted = useSyncExternalStore(subscribeToMount, () => true, () => false);

  useEffect(() => {
    applyTheme(theme);

    if (theme !== 'system') return;

    // Some browsers cache SVG favicons aggressively. Refresh the adaptive SVG
    // when the OS theme changes so the browser chrome stays in sync too.
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = () => syncFavicon('system');
    systemTheme.addEventListener('change', handleSystemThemeChange);

    return () => systemTheme.removeEventListener('change', handleSystemThemeChange);
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
  const ThemeIcon = themeIcons[theme];

  return (
    <div className="fixed bottom-5 right-5 z-(--layer-utility)">
      <Button
        variant="secondary"
        className="min-h-10 min-w-10 px-3 py-2 rounded-full text-xs capitalize bg-bg-secondary hover:bg-bg-tertiary text-text-primary hover:border-border-hover shadow-md"
        onClick={cycleTheme}
        aria-label={`Theme: ${theme}. Switch to ${nextTheme} theme`}
        revealLabel={theme}
      >
        <ThemeIcon aria-hidden="true" size={16} />
      </Button>
    </div>
  );
}
