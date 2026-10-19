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
    <div className="mx-auto flex aspect-video w-full max-w-5xl flex-col gap-4 overflow-hidden rounded-xl bg-slate-100 p-4 text-slate-950">
      <RivePlayer
        key={persona.file}
        compact
        className="min-h-0 flex-1 rounded-xl border-0"
        src={`/assets/case-studies/mathsgenie/rive/${persona.file}.riv`}
        label={`Genie ${persona.name.toLowerCase()} animation`}
      />
      <div className="flex shrink-0 flex-wrap justify-center gap-2" role="group" aria-label="Choose a Genie animation">
        {personas.map((item, index) => (
          <Button
            key={item.file}
            type="button"
            variant="secondary"
            aria-pressed={selected === index}
            className={`border-slate-300 bg-white text-slate-950 hover:bg-slate-200 ${selected === index ? 'ring-2 ring-indigo-500 ring-inset' : ''}`}
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
      className="mt-4 font-sans"
      frameClassName="border border-slate-300 bg-slate-100"
      expandedContent={canvas}
    >
      {canvas}
    </MathsGenieGalleryFigure>
  );
}
