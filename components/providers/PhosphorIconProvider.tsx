'use client';

import { IconContext } from '@phosphor-icons/react';
import type { ReactNode } from 'react';

export default function PhosphorIconProvider({ children }: { children: ReactNode }) {
  // Phosphor's server-safe `/ssr` exports do not consume IconContext. Icons in
  // Server Components must repeat these defaults explicitly; client icons inherit them here.
  return (
    <IconContext.Provider
      value={{ color: 'currentColor', size: 16, weight: 'bold', mirrored: false }}
    >
      {children}
    </IconContext.Provider>
  );
}
