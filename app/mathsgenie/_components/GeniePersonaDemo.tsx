'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Button from '@/components/ui/Button';
import { MathsGenieGalleryFigure } from './MathsGenieGalleryFigure';

const RivePlayer = dynamic(() => import('@/components/case-study/RivePlayer'), {
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

  const canvas = (
    <div className="flex aspect-video w-full flex-col gap-4 bg-bg-secondary p-4">
      <div className="min-h-0 flex-1">
        <RivePlayer
          key={persona.file}
          compact
          className="h-full min-h-0 rounded-xl border-0"
          src={`/assets/case-studies/mathsgenie/rive/${persona.file}.riv`}
          label={`Genie ${persona.name.toLowerCase()} animation`}
        />
      </div>
      <div className="flex shrink-0 flex-wrap justify-center gap-2" role="group" aria-label="Choose a Genie animation">
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
    </div>
  );

  return (
    <MathsGenieGalleryFigure
      alt={`Genie ${persona.name.toLowerCase()} animation and persona selector`}
      caption={persona.description}
      className="mt-4 overflow-hidden rounded-2xl border border-border-muted bg-bg-secondary font-sans"
      expandedContent={<div className="mx-auto grid min-h-full w-full max-w-5xl place-items-center">{canvas}</div>}
    >
      {canvas}
    </MathsGenieGalleryFigure>
  );
}
