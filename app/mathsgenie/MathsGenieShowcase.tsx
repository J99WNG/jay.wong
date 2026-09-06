'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Button from '@/components/ui/Button';
import styles from './MathsGenieShowcase.module.css';

const GenieAnimation = dynamic(() => import('./GenieAnimation'), {
  ssr: false,
  loading: () => <div className={styles.loading}>Loading Genie…</div>,
});

const personas = [
  { name: 'Landing', file: 'genie-landing', description: 'The Genie’s introduction to the learning experience.' },
  { name: 'Chat', file: 'genie-chat', description: 'The persona alongside the AI tutoring conversation.' },
  { name: 'Loading', file: 'genie-loading', description: 'A moment of personality while students wait.' },
  { name: 'Carpet', file: 'genie-carpet', description: 'An expressive variation of the Genie in motion.' },
];

export default function MathsGenieShowcase() {
  const [selected, setSelected] = useState(0);
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  const [pinned, setPinned] = useState<string | null>(null);
  const persona = personas[selected];

  return (
    <>
      <div className="flex flex-col gap-2">
        <h3>Meet the Genie</h3>
        <p>One persona, expressed across the product. Explore the original Rive animations.</p>
        <div className={styles.personaPanel}>
          <div className={styles.toolbar} role="group" aria-label="Choose a Genie animation">
            {personas.map((item, index) => (
              <Button key={item.file} type="button" variant="secondary" aria-pressed={selected === index}
                className={styles.control} onClick={() => setSelected(index)}>
                {item.name}
              </Button>
            ))}
          </div>
          <GenieAnimation key={persona.file} file={persona.file} label={`Genie ${persona.name.toLowerCase()} animation`} />
          <p className={styles.caption}>{persona.description}</p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3>A shared system, built to scale</h3>
        <p>Buttons and a revision card from the shared Figma library. Switch themes, hover or focus to explore their states. Tap a sample to hold its hover state.</p>
        <div className={styles.systemPanel} data-theme={mode}>
          <div className={styles.toolbar} role="group" aria-label="Component preview theme">
            {(['light', 'dark'] as const).map((theme) => (
              <button key={theme} type="button" className={styles.themeControl}
                aria-pressed={mode === theme} onClick={() => setMode(theme)}>
                {theme === 'light' ? 'Light' : 'Dark'}
              </button>
            ))}
          </div>
          <div className={styles.samples}>
            <div className={styles.buttonRow}>
              {(['primary', 'secondary', 'tertiary'] as const).map((variant) => (
                <button key={variant} type="button"
                  className={`${styles.sampleButton} ${styles[variant]}`}
                  data-held={pinned === variant} aria-pressed={pinned === variant}
                  aria-label={`${variant} button: hold hover state`}
                  onClick={() => setPinned(pinned === variant ? null : variant)}>
                  {variant.charAt(0).toUpperCase() + variant.slice(1)}
                </button>
              ))}
            </div>
            <button type="button" className={styles.sampleCard}
              data-held={pinned === 'card'} aria-pressed={pinned === 'card'}
              aria-label="GCSE Revision card: hold hover state"
              onClick={() => setPinned(pinned === 'card' ? null : 'card')}>
              <span className={styles.cardTitle}>GCSE Revision</span>
              <span className={styles.cardBody}>Video tutorials, practice exam style questions and answers</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
