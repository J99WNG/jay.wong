'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { DesktopIcon, MoonIcon, SunIcon, type Icon as PhosphorIcon } from '@phosphor-icons/react';
import Button from './Button';

type Theme = 'system' | 'light' | 'dark';

const themeIcons: Record<Theme, PhosphorIcon> = {
  system: DesktopIcon,
  light: SunIcon,
  dark: MoonIcon,
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

const applyThemeClass = (newTheme: Theme) => {
  const root = document.documentElement;
  root.classList.remove('light', 'dark');

  if (newTheme === 'light') {
    root.classList.add('light');
  } else if (newTheme === 'dark') {
    root.classList.add('dark');
  }
};

const applyTheme = (newTheme: Theme) => {
  applyThemeClass(newTheme);
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

    const updateTheme = () => {
      // Apply the class synchronously so the browser captures the new palette
      // inside the view transition rather than one React render later.
      applyThemeClass(nextTheme);
      setTheme(nextTheme);
      localStorage.setItem('theme-preference', nextTheme);
    };

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !document.startViewTransition) {
      updateTheme();
      return;
    }

    // Native view transitions provide a lightweight crossfade without adding
    // animation state or another dependency. The class scopes its CSS to this
    // interaction only, leaving page-navigation transitions untouched.
    const root = document.documentElement;
    root.classList.add('theme-transition');
    const transition = document.startViewTransition(updateTheme);
    const removeTransitionClass = () => root.classList.remove('theme-transition');
    void transition.finished.then(removeTransitionClass, removeTransitionClass);
  };

  if (!mounted) return null;

  const nextTheme: Theme =
    theme === 'system' ? 'light' : theme === 'light' ? 'dark' : 'system';

  return (
    <Button
      variant="secondary"
      className="min-h-11 min-w-11 px-3 py-2 rounded-full text-xs capitalize bg-bg-secondary hover:bg-bg-tertiary text-text-primary hover:border-border-hover shadow-md motion-safe:active:scale-[0.97]"
      onClick={cycleTheme}
      aria-label={`Theme: ${theme}. Switch to ${nextTheme} theme`}
      revealLabel={theme}
    >
      <span className="relative inline-flex size-4 shrink-0" aria-hidden="true">
        {(Object.entries(themeIcons) as [Theme, PhosphorIcon][]).map(([iconTheme, ThemeIcon]) => {
          const isVisible = iconTheme === theme;

          return (
            <ThemeIcon
              key={iconTheme}
              data-visible={isVisible}
              weight="duotone"
              className={`motion-icon-swap absolute inset-0 motion-reduce:scale-100 ${isVisible ? 'scale-100' : 'scale-75'}`}
            />
          );
        })}
      </span>
    </Button>
  );
}
