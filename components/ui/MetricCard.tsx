import type { ReactNode } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type MetricGridProps = {
  children: ReactNode;
  columns?: 1 | 2 | 3 | 4;
  ariaLabel?: string;
  className?: string;
};

type MetricCardProps = {
  value: ReactNode;
  label: ReactNode;
  note?: ReactNode;
  className?: string;
};

/**
 * Shared layout for comparable outcome metrics. Equal grid rows keep cards
 * visually balanced even when labels wrap at different viewport widths.
 */
export function MetricGrid({
  children,
  columns = 2,
  ariaLabel = 'Key metrics',
  className,
}: MetricGridProps) {
  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  }[columns];

  return (
    <ul
      className={cn(
        'm-0 grid list-none auto-rows-fr gap-8 p-0 mb-4',
        columnClasses,
        className,
      )}
      aria-label={ariaLabel}
    >
      {children}
    </ul>
  );
}

/**
 * A non-interactive outcome card. Values always use the portfolio pixel face;
 * labels and optional evidence notes retain the primary reading typeface.
 */
export function MetricCard({ value, label, note, className }: MetricCardProps) {
  return (
    <li
      className={cn(
        'flex h-full min-w-0 flex-col justify-center rounded-2xl',
        className,
      )}
    >
      <span className="block break-words font-mono text-3xl leading-none tracking-tight text-accent-primary tabular-nums">
        {value}
      </span>
      <p className="m-0 mt-2 text-base leading-snug text-text-secondary">
        {label}
      </p>
      {note && (
        <p className="m-0 mt-2 max-w-lg text-xs leading-relaxed text-text-tertiary">
          {note}
        </p>
      )}
    </li>
  );
}
