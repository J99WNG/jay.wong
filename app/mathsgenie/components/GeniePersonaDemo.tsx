'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Button from '@/components/ui/Button';
import styles from '../mathsgenie.module.css';

const RivePlayer = dynamic(() => import('@/components/ui/RivePlayer'), {
  ssr: false,
  loading: () => (
    <div className="grid h-[300px] place-items-center text-text-secondary">
      Loading Genie…
    </div>
  ),
});

const personas = [
  { name: 'Landing', file: 'genie-landing', description: 'The Genie’s introduction to the learning experience.' },
  { name: 'Chat', file: 'genie-chat', description: 'The persona alongside the AI tutoring conversation.' },
  { name: 'Loading', file: 'genie-loading', description: 'A moment of personality while students wait.' },
  { name: 'Carpet', file: 'genie-carpet', description: 'An expressive variation of the Genie in motion.' },
] as const;

export function GeniePersonaDemo() {
  const [selected, setSelected] = useState(0);
  const persona = personas[selected];

  return (
    <div className={styles.personaPanel}>
      <div className={styles.toolbar} role="group" aria-label="Choose a Genie animation">
        {personas.map((item, index) => (
          <Button
            key={item.file}
            type="button"
            variant="secondary"
            aria-pressed={selected === index}
            className={styles.control}
            onClick={() => setSelected(index)}
          >
            {item.name}
          </Button>
        ))}
      </div>
      <RivePlayer
        key={persona.file}
        className="rounded-none border-0"
        src={`/assets/images/mathsgenie/rive/${persona.file}.riv`}
        label={`Genie ${persona.name.toLowerCase()} animation`}
      />
      <p className={styles.caption}>{persona.description}</p>
    </div>
  );
}
