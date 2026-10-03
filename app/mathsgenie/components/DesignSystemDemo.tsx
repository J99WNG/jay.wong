'use client';

import { useState } from 'react';
import { DesignSystemSpecimens, type AlertState } from './DesignSystemSpecimens';
import { cn } from '@/lib/utils';
import styles from '../mathsgenie.module.css';

export function DesignSystemDemo() {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  const [selectedSubject, setSelectedSubject] = useState('Full');
  const [held, setHeld] = useState<string | null>(null);
  const [alerts, setAlerts] = useState<AlertState>({ welcome: true, subjects: true });

  const toggleHeld = (name: string) => {
    setHeld((current) => current === name ? null : name);
  };

  const dismissAlert = (name: keyof AlertState) => {
    setAlerts((current) => ({ ...current, [name]: false }));
  };

  const dark = mode === 'dark';

  return (
    <div className={cn(
      styles.systemPanel,
      'mt-4 grid gap-6 font-sans',
      dark ? 'text-slate-50' : 'text-slate-950',
    )} data-theme={mode}>
      <div className={cn(
        'flex flex-col gap-4 rounded-2xl border px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6',
        dark ? 'border-slate-700 bg-slate-950' : 'border-slate-200 bg-slate-50',
      )}>
        <div>
          <p className="text-xs font-semibold tracking-wider text-indigo-500 uppercase">MathsGenie library</p>
          <p className={cn('mt-1 text-sm', dark ? 'text-slate-300' : 'text-slate-600')}>Reusable foundations for navigation, discovery, revision and feedback.</p>
        </div>
        <div className={cn('flex gap-1 rounded-xl p-1', dark ? 'bg-slate-800' : 'bg-slate-200')} role="group" aria-label="Component preview theme">
          {(['light', 'dark'] as const).map((theme) => (
            <button
              key={theme}
              type="button"
              className={cn(
                'cursor-pointer rounded-lg px-3 py-2 text-sm font-medium capitalize',
                mode === theme
                  ? 'bg-indigo-600 text-white'
                  : dark ? 'text-slate-200 hover:bg-slate-700' : 'text-slate-700 hover:bg-slate-300',
              )}
              aria-pressed={mode === theme}
              onClick={() => setMode(theme)}
            >
              {theme === 'light' ? 'Light' : 'Dark'}
            </button>
          ))}
        </div>
      </div>

      <DesignSystemSpecimens
        selectedSubject={selectedSubject}
        onSelectSubject={setSelectedSubject}
        held={held}
        onToggleHeld={toggleHeld}
        alerts={alerts}
        onDismissAlert={dismissAlert}
        onResetAlerts={() => setAlerts({ welcome: true, subjects: true })}
        dark={dark}
      />
    </div>
  );
}
