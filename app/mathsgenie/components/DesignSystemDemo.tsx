'use client';

import { useState } from 'react';
import { DesignSystemSpecimens, type AlertState } from './DesignSystemSpecimens';
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

  return (
    <div className={styles.systemPanel} data-theme={mode}>
      <div className={styles.libraryHeader}>
        <div>
          <p className={styles.eyebrow}>YesGenie library</p>
          <p className={styles.libraryIntro}>Reusable foundations for navigation, discovery, revision and feedback.</p>
        </div>
        <div className={styles.modeSwitch} role="group" aria-label="Component preview theme">
          {(['light', 'dark'] as const).map((theme) => (
            <button
              key={theme}
              type="button"
              className={styles.themeControl}
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
      />
    </div>
  );
}
