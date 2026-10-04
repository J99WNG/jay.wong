import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import styles from '../mathsgenie.module.css';
import { MathsGenieGalleryFigure } from './MathsGenieGalleryFigure';

type ComponentSpecimenProps = {
  title: string;
  hint?: string;
  children: ReactNode;
  dark: boolean;
};

export function ComponentSpecimen({ title, hint, children, dark }: ComponentSpecimenProps) {
  const stage = () => (
    <div className={cn(
      styles.specimenStage,
      'relative grid aspect-video w-full min-w-0 place-items-center overflow-hidden rounded-xl border p-6',
      dark ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-slate-100',
    )}>
      {children}
    </div>
  );

  return (
    <MathsGenieGalleryFigure
      alt={`${title} component specimen from the MathsGenie design system`}
      caption={hint ?? `${title} shown as an interactive production-aligned component.`}
      captionClassName={dark ? 'text-slate-300' : 'text-slate-600'}
      className={cn(
        'overflow-hidden rounded-2xl border',
        dark ? 'border-slate-700 bg-slate-950 text-slate-50' : 'border-slate-200 bg-slate-50 text-slate-950',
      )}
      expandedContent={(
        <section className={cn(
          styles.systemPanel,
          'grid min-h-full gap-5 rounded-2xl p-5 font-sans',
          dark ? 'bg-slate-950 text-slate-50' : 'bg-slate-50 text-slate-950',
        )} data-theme={dark ? 'dark' : 'light'} aria-label={`${title} expanded component specimen`}>
          <header>
            <p className="text-xs font-semibold tracking-wider text-indigo-500 uppercase">MathsGenie library</p>
            <h2 className={cn(styles.displayType, styles.specimenHeading, 'mt-2 text-2xl font-semibold')}>{title}</h2>
            {hint && <p className={cn('mt-2 text-sm', dark ? 'text-slate-400' : 'text-slate-500')}>{hint}</p>}
          </header>
          {stage()}
        </section>
      )}
    >
      <section aria-label={`${title} component specimen`}>
        <div className="flex flex-col gap-2 px-6 pt-5 pr-16 pb-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <h4 className={cn(
          styles.displayType,
          styles.specimenHeading,
          'text-xl font-semibold',
        )}>{title}</h4>
        {hint && <p className={cn('text-sm sm:text-right', dark ? 'text-slate-400' : 'text-slate-500')}>{hint}</p>}
        </div>
        <div className="overflow-hidden px-6 pt-4 pb-6">{stage()}</div>
      </section>
    </MathsGenieGalleryFigure>
  );
}
