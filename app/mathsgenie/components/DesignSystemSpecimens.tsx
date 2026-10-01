import { ArrowUp, ChevronDown, FileText, Home, Search, Settings, Sparkles, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ComponentSpecimen } from './ComponentSpecimen';
import styles from '../mathsgenie.module.css';

const subjects = ['Full', 'GCSE Maths', 'GCSE Statistics', 'Edexcel IGCSE (Mathematics A)', 'AS Level Maths', 'A Level Maths'];
const sidebarItems = ['Home', 'My Subjects', 'Ask Genie AI', 'Cheatsheets', 'Exam Builder', 'Study Planner'];

export type AlertState = { welcome: boolean; subjects: boolean };

type DesignSystemSpecimensProps = {
  selectedSubject: string;
  onSelectSubject: (subject: string) => void;
  held: string | null;
  onToggleHeld: (name: string) => void;
  alerts: AlertState;
  onDismissAlert: (name: keyof AlertState) => void;
  onResetAlerts: () => void;
  dark: boolean;
};

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'quaternary';

const buttonClass = (variant: ButtonVariant, dark: boolean, active = false) => cn(
  'inline-flex cursor-pointer items-center justify-center rounded-xl border border-b-2 px-3 py-3 text-base font-medium leading-none transition duration-200 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50',
  variant === 'primary' && (active ? 'border-indigo-900 bg-indigo-500 text-slate-950' : 'border-slate-950 bg-indigo-400 text-slate-950 hover:bg-indigo-300'),
  variant === 'secondary' && (dark
    ? cn('border-slate-700 bg-slate-950 text-slate-50 hover:bg-slate-800', active && 'border-slate-500 bg-slate-800')
    : cn('border-slate-300 bg-white text-slate-950 hover:bg-slate-100', active && 'border-slate-400 bg-slate-100')),
  variant === 'tertiary' && cn('border-transparent bg-transparent text-indigo-500 hover:text-indigo-400', active && 'text-indigo-400'),
  variant === 'quaternary' && (dark
    ? 'border-slate-700 bg-transparent text-slate-300 hover:border-slate-500 hover:text-white'
    : 'border-slate-300 bg-transparent text-slate-600 hover:border-slate-400 hover:text-slate-950'),
);

const cardClass = (dark: boolean, active = false) => cn(
  'flex min-h-40 flex-col items-start gap-3 rounded-2xl border p-5 text-left transition duration-200',
  dark
    ? cn('border-slate-700 bg-slate-800 text-slate-50', active && 'border-slate-500 bg-slate-700')
    : cn('border-slate-300 bg-white text-slate-950', active && 'border-slate-400 bg-slate-100'),
);

const cardTitleClass = cn(styles.displayType, 'w-full text-xl font-medium leading-tight');
const paperPillClass = 'inline-flex h-9 items-center gap-2 whitespace-nowrap rounded-2xl border px-3 py-2 text-base font-medium';

export function DesignSystemSpecimens(props: DesignSystemSpecimensProps) {
  return (
    <>
      <NavigationSpecimen dark={props.dark} />
      <SearchSpecimen dark={props.dark} />
      <SegmentedControlSpecimen {...props} />
      <ButtonsAndCardsSpecimen {...props} />
      <PaperPillsSpecimen dark={props.dark} />
      <CarouselAlertSpecimen {...props} />
      <SidebarSpecimen dark={props.dark} />
    </>
  );
}

function NavigationSpecimen({ dark }: Pick<DesignSystemSpecimensProps, 'dark'>) {
  return (
    <ComponentSpecimen title="Navigation" dark={dark}>
      <nav className={cn('flex w-max min-w-full items-center gap-3 rounded-2xl border px-3 py-2 text-xs sm:gap-6', dark ? 'border-slate-700 bg-slate-800' : 'border-slate-300 bg-white')} aria-label="Example MathsGenie navigation">
        <strong className="flex items-center gap-1 whitespace-nowrap text-base"><span aria-hidden="true">🧞</span> MathsGenie</strong>
        <div className="hidden flex-1 items-center gap-2 sm:flex">
          {['GCSE', 'AS Level', 'A Level', 'IGCSE', 'KS2'].map((item) => (
            <button type="button" className="flex cursor-pointer items-center gap-1 p-2 whitespace-nowrap" key={item}>{item} <ChevronDown size={16} aria-hidden="true" /></button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className={cn('hidden items-center gap-1 rounded-full px-3 py-2 sm:flex', dark ? 'bg-slate-950 text-slate-400' : 'bg-slate-100 text-slate-500')}><Search aria-hidden="true" size={16} /> Search</span>
          <button type="button" className={cn('rounded-lg border px-3 py-2 whitespace-nowrap', dark ? 'border-slate-700' : 'border-slate-300')}>Log in</button>
          <button type="button" className={buttonClass('primary', dark)}>Sign up</button>
        </div>
      </nav>
    </ComponentSpecimen>
  );
}

function SearchSpecimen({ dark }: Pick<DesignSystemSpecimensProps, 'dark'>) {
  const searchClass = cn('flex items-center gap-2 rounded-full px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500', dark ? 'bg-slate-950 text-slate-400' : 'bg-white text-slate-500');
  const inputClass = cn('min-w-0 flex-1 bg-transparent font-sans text-base outline-none', dark ? 'text-slate-50 placeholder:text-slate-500' : 'text-slate-950 placeholder:text-slate-500');

  return (
    <ComponentSpecimen title="Search inputs" dark={dark}>
      <div className="flex flex-wrap items-center gap-4">
        <label className={cn(searchClass, 'w-40')}><Search aria-hidden="true" /><span className="sr-only">Search</span><input className={inputClass} type="search" placeholder="Search" /></label>
        <label className={cn(searchClass, 'w-full max-w-sm p-4')}><Search aria-hidden="true" /><span className="sr-only">What are you studying for?</span><input className={cn(inputClass, 'text-xl sm:text-2xl')} type="search" placeholder="What are you studying for?" /></label>
      </div>
    </ComponentSpecimen>
  );
}

function SegmentedControlSpecimen({ selectedSubject, onSelectSubject, dark }: DesignSystemSpecimensProps) {
  return (
    <ComponentSpecimen title="Segmented control" hint="The full-width control is deliberately clipped by the specimen frame." dark={dark}>
      <div className="w-full overflow-hidden">
        <div className={cn('flex w-max items-center gap-1 rounded-2xl p-2', dark ? 'bg-slate-800' : 'bg-slate-200')} role="group" aria-label="Qualification filter">
          {subjects.map((subject) => {
            const selected = selectedSubject === subject;
            return <button key={subject} type="button" className={cn(styles.displayType, 'shrink-0 cursor-pointer rounded-xl px-3 py-2 text-xl', selected ? 'bg-indigo-600 text-white' : dark ? 'text-slate-50 hover:bg-indigo-200 hover:text-indigo-700' : 'text-slate-950 hover:bg-indigo-100 hover:text-indigo-700')} aria-pressed={selected} onClick={() => onSelectSubject(subject)}>{subject}</button>;
          })}
        </div>
      </div>
    </ComponentSpecimen>
  );
}

function ButtonsAndCardsSpecimen({ held, onToggleHeld, dark }: DesignSystemSpecimensProps) {
  return (
    <ComponentSpecimen title="Buttons and cards" dark={dark}>
      <div className="mb-5 flex flex-wrap gap-3">
        {(['primary', 'secondary', 'tertiary'] as const).map((variant) => (
          <button key={variant} type="button" className={buttonClass(variant, dark, held === variant)} aria-pressed={held === variant} onClick={() => onToggleHeld(variant)}>{variant.charAt(0).toUpperCase() + variant.slice(1)}</button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button type="button" className={cardClass(dark, held === 'revision')} aria-pressed={held === 'revision'} onClick={() => onToggleHeld('revision')}>
          <strong className={cardTitleClass}>GCSE Revision</strong>
          <span className={cn('text-sm leading-5', dark ? 'text-slate-300' : 'text-slate-600')}>Video tutorials, practice exam style questions and answers</span>
        </button>
        <button type="button" className={cardClass(dark, held === 'metrics')} aria-pressed={held === 'metrics'} onClick={() => onToggleHeld('metrics')}>
          <span className="w-full text-xs text-indigo-500">2 hours ago</span><strong className={cardTitleClass}>Metrics Conversions</strong>
          <span className={cn('text-sm leading-5', dark ? 'text-slate-300' : 'text-slate-600')}>Revisit a recent lesson and continue your progress.</span><span className={buttonClass('secondary', dark)}>Revisit</span>
        </button>
        <article className={cardClass(dark)}>
          <span className={cn(paperPillClass, 'border-indigo-700 bg-indigo-200 text-indigo-900')}><FileText aria-hidden="true" size={16} /> Paper 1</span><strong className={cardTitleClass}>Thursday 14 May 2026</strong>
          <span className={cn('text-sm', dark ? 'text-slate-300' : 'text-slate-600')}>9:00</span>
          <span className="mt-auto flex w-full items-center gap-3"><span className={cn(buttonClass('secondary', dark), 'flex-1')}>Revise</span><small className={cn('whitespace-nowrap', dark ? 'text-slate-300' : 'text-slate-600')}>11 days left</small></span>
        </article>
        <article className={cardClass(dark)}>
          <span className="flex w-full justify-between text-xs text-indigo-500">GB <span>May 12, 2025</span></span>
          <strong className={cardTitleClass}>Marcus R. <span className="float-right font-sans text-sm tracking-normal text-amber-400" aria-label="4.5 out of 5 stars">★★★★½</span></strong>
          <span className={cn('text-sm leading-5', dark ? 'text-slate-300' : 'text-slate-600')}>“YesGenie helps me understand the ‘why’ behind the maths.”</span>
        </article>
      </div>
    </ComponentSpecimen>
  );
}

function PaperPillsSpecimen({ dark }: Pick<DesignSystemSpecimensProps, 'dark'>) {
  return (
    <ComponentSpecimen title="Paper pills" dark={dark}>
      <div className="flex flex-wrap gap-3">
        <span className={cn(paperPillClass, 'border-indigo-700 bg-indigo-200 text-indigo-900')}><FileText aria-hidden="true" size={16} /> Paper 1</span>
        <span className={cn(paperPillClass, 'border-emerald-700 bg-emerald-100 text-emerald-800')}><FileText aria-hidden="true" size={16} /> Paper 2</span>
        <span className={cn(paperPillClass, 'border-amber-700 bg-amber-100 text-amber-800')}><FileText aria-hidden="true" size={16} /> Paper 3</span>
      </div>
    </ComponentSpecimen>
  );
}

function CarouselAlertSpecimen({ alerts, onDismissAlert, onResetAlerts, dark }: DesignSystemSpecimensProps) {
  const dismissClass = 'grid size-7 shrink-0 cursor-pointer place-items-center rounded-full hover:bg-black/10';
  return (
    <ComponentSpecimen title="Carousel alert" dark={dark}>
      {alerts.welcome || alerts.subjects ? <div className="grid gap-2">
        {alerts.welcome && <div className="flex min-h-12 items-center justify-between gap-2 border-y border-cyan-800 bg-cyan-300 px-3 py-2 text-center text-sm text-cyan-950" role="status"><span>Welcome to the new MathsGenie! <u>Tell us what you think</u></span><button className={dismissClass} type="button" aria-label="Dismiss welcome alert" onClick={() => onDismissAlert('welcome')}><X aria-hidden="true" size={16} /></button></div>}
        {alerts.subjects && <div className="flex min-h-12 items-center justify-between gap-2 border-y border-slate-950 bg-indigo-400 px-3 py-2 text-center text-sm text-slate-950" role="status"><span>We&apos;ve expanded the magic. Explore 100+ subjects tailored for your exact exam board. <u>Find my subject</u></span><button className={dismissClass} type="button" aria-label="Dismiss subjects alert" onClick={() => onDismissAlert('subjects')}><X aria-hidden="true" size={16} /></button></div>}
      </div> : <button type="button" className={buttonClass('secondary', dark)} onClick={onResetAlerts}>Reset alerts</button>}
    </ComponentSpecimen>
  );
}

function SidebarSpecimen({ dark }: Pick<DesignSystemSpecimensProps, 'dark'>) {
  return (
    <ComponentSpecimen title="Sidebar" dark={dark}>
      <aside className={cn('flex h-96 w-56 flex-col gap-2 rounded-lg p-3', dark ? 'bg-slate-800 text-slate-50' : 'bg-white text-slate-950')} aria-label="Example study navigation">
        <p className={cn('px-2 pb-1 text-xs uppercase', dark ? 'text-slate-400' : 'text-slate-500')}>Study</p>
        {sidebarItems.map((item, index) => {
          const current = index === 2;
          return <button type="button" key={item} aria-current={current ? 'page' : undefined} className={cn('flex w-full cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-left text-sm', current ? 'bg-indigo-800 text-white' : dark ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-600 hover:bg-slate-100')}>
            {current ? <Sparkles aria-hidden="true" size={16} /> : <Home aria-hidden="true" size={16} />}<span>{item}</span>{index > 0 && <small className="ml-auto rounded border border-indigo-500 px-1 py-0.5 text-xs text-indigo-500">{current ? '60% off' : 'New'}</small>}
          </button>;
        })}
        <div className="mt-auto flex flex-col gap-2">
          <button type="button" className={cn('flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm', dark ? 'hover:bg-slate-700' : 'hover:bg-slate-100')}><ArrowUp aria-hidden="true" size={16} /> Upgrade <small className="ml-auto rounded border border-indigo-500 px-1 py-0.5 text-xs text-indigo-500">60% off</small></button>
          <span className="flex items-center gap-2 px-2 py-2 text-xs"><span className={cn('size-6 rounded-full', dark ? 'bg-slate-400' : 'bg-slate-300')} />Firstname Surname<Settings className="ml-auto" aria-hidden="true" size={16} /></span>
        </div>
      </aside>
    </ComponentSpecimen>
  );
}
