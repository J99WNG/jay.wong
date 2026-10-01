import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import styles from '../mathsgenie.module.css';

type ComponentSpecimenProps = {
  title: string;
  hint?: string;
  children: ReactNode;
  dark: boolean;
};

export function ComponentSpecimen({ title, hint, children, dark }: ComponentSpecimenProps) {
  return (
    <section
      className={cn('border-b last:border-b-0', dark ? 'border-slate-700' : 'border-slate-200')}
      aria-label={`${title} component specimen`}
    >
      <div className="flex flex-col gap-2 px-6 pt-4 pb-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <h4 className={cn(
          styles.displayType,
          styles.specimenHeading,
          'text-xl font-semibold',
        )}>{title}</h4>
        {hint && <p className={cn('text-sm sm:text-right', dark ? 'text-slate-400' : 'text-slate-500')}>{hint}</p>}
      </div>
      <div className="overflow-hidden px-6 pt-4 pb-6">
        <div className={cn(
          styles.specimenStage,
          'relative min-w-0 overflow-hidden rounded-xl border p-4',
          dark ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-slate-100',
        )}>
          <div className="relative z-10">{children}</div>
        </div>
      </div>
    </section>
  );
}
