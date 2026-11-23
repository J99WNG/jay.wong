import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ContentOverlayCTAProps = {
  children: ReactNode;
  className?: string;
};

export default function ContentOverlayCTA({ children, className }: ContentOverlayCTAProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute right-3 bottom-3 z-20 grid size-10 place-items-center rounded-full border border-border-base bg-bg-primary/80 text-text-primary shadow-md backdrop-blur-sm motion-safe:transition-[scale,background-color,border-color,box-shadow] motion-safe:duration-[var(--motion-duration-standard)] motion-safe:ease-[var(--motion-ease-spring)] group-hover:border-border-hover group-hover:bg-bg-primary group-hover:shadow-lg motion-safe:group-hover:scale-96 group-focus-visible:border-border-hover group-focus-visible:bg-bg-primary group-focus-visible:shadow-lg motion-safe:group-focus-visible:scale-96 motion-safe:group-active:scale-96',
        className,
      )}
    >
      {children}
    </span>
  );
}
