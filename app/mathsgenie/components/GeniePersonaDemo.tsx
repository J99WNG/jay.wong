'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Button from '@/components/ui/Button';

const RivePlayer = dynamic(() => import('@/components/ui/RivePlayer'), {
  ssr: false,
  loading: () => (
    <div className="grid h-72 place-items-center text-text-secondary">
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
    <div className="mt-4 overflow-hidden rounded-2xl border border-border-muted bg-bg-secondary font-sans">
      <div className="flex flex-wrap gap-2 p-4" role="group" aria-label="Choose a Genie animation">
        {personas.map((item, index) => (
          <Button
            key={item.file}
            type="button"
            variant="secondary"
            aria-pressed={selected === index}
            className={selected === index ? 'ring-2 ring-current ring-inset' : undefined}
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
      <p className="px-5 pt-3 pb-5 text-sm leading-6">{persona.description}</p>
    </div>
  );
}
