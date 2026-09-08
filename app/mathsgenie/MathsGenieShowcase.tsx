'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Button from '@/components/ui/Button';
import styles from './MathsGenieShowcase.module.css';
import MathsGenieLibraryDemo from './MathsGenieDS';

const RivePlayer = dynamic(() => import('@/components/ui/RivePlayer'), {
  ssr: false,
  loading: () => (
    <div className="grid h-[300px] place-items-center text-[var(--mg-neutral-800)]">
      Loading Genie…
    </div>
  ),
});

const personas = [
  { name: 'Landing', file: 'genie-landing', description: 'The Genie’s introduction to the learning experience.' },
  { name: 'Chat', file: 'genie-chat', description: 'The persona alongside the AI tutoring conversation.' },
  { name: 'Loading', file: 'genie-loading', description: 'A moment of personality while students wait.' },
  { name: 'Carpet', file: 'genie-carpet', description: 'An expressive variation of the Genie in motion.' },
];

export default function MathsGenieShowcase() {
  const [selected, setSelected] = useState(0);
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
          <RivePlayer
            key={persona.file}
            className="rounded-none border-0 bg-[var(--mg-neutral-900)]"
            src={`/assets/images/mathsgenie/rive/${persona.file}.riv`}
            label={`Genie ${persona.name.toLowerCase()} animation`}
          />
          <p className={styles.caption}>{persona.description}</p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3>A shared system, built to scale</h3>
        <p>Interactive examples from the shared Figma library. Switch themes, focus or hover controls, and select states to explore how the system behaves.</p>
        <MathsGenieLibraryDemo />
      </div>
    </>
  );
}
