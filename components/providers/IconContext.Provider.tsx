'use client';

import { IconContext } from '@phosphor-icons/react';
import type { ReactNode } from 'react';
import { iconDefaults } from '@/lib/iconography';

export default function PhosphorIconProvider({ children }: { children: ReactNode }) {
  // Client icons inherit these values. `/ssr` icons spread the same object directly.
  return (
    <IconContext.Provider value={iconDefaults}>
      {children}
    </IconContext.Provider>
  );
}
