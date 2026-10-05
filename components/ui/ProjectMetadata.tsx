import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

export type ProjectMetadataItem = {
  label: string;
  value: ReactNode;
};

type ProjectMetadataProps = {
  items: readonly ProjectMetadataItem[];
  className?: string;
};

/**
 * Project facts presented as a semantic description list. Each label/value
 * pair shares the same content-block rhythm as the surrounding case-study copy.
 */
export default function ProjectMetadata({ items, className }: ProjectMetadataProps) {
  return (
    <dl className={cn('grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2', className)}>
      {items.map(({ label, value }) => (
        <div key={label} className="content-block">
          <dt className="meta-label">{label}</dt>
          <dd className="m-0 min-w-0 max-w-[65ch] text-base leading-7">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
