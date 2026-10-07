import { CheckCircle2, CircleAlert, Info, TriangleAlert } from 'lucide-react';
import { Fragment } from 'react';
import { cn } from '@/lib/utils';
import styles from '../mathsgenie.module.css';

const primitiveTokens = [
  { token: 'primary.100', value: 'oklch(0.942 0.028 265.5)', shade: 'bg-indigo-100' },
  { token: 'primary.400', value: 'oklch(0.726 0.141 267.2)', shade: 'bg-indigo-400' },
  { token: 'primary.800', value: 'oklch(0.412 0.146 268.2)', shade: 'bg-indigo-800' },
  { token: 'neutral.900', value: 'oklch(0.256 0.016 264.2)', shade: 'bg-slate-950' },
] as const;

const semanticTokens = [
  { token: 'action.primary.background', value: 'oklch(0.726 0.141 267.2)', shade: 'bg-indigo-400' },
  { token: 'surface.raised', value: 'oklch(0.325 0.022 267.3)', shade: 'bg-slate-800' },
  { token: 'feedback.negative.background', value: 'oklch(0.950 0.030 24.2)', shade: 'bg-red-100' },
] as const;

const assembledTokens = [
  { layer: 'Component', code: 'button.primary.rest', note: 'Rest, hover, focus and disabled', preview: 'button' },
  { layer: 'Pattern', code: 'revision.next-step', note: 'Assembled from tested atoms', preview: 'pattern' },
] as const;

const feedbackStates = [
  { name: 'Positive', copy: 'Answer saved', icon: CheckCircle2, className: 'border-emerald-700 bg-emerald-100 text-emerald-800' },
  { name: 'Information', copy: 'A hint is available', icon: Info, className: 'border-indigo-600 bg-indigo-100 text-indigo-800' },
  { name: 'Warning', copy: 'Check this step', icon: TriangleAlert, className: 'border-amber-700 bg-amber-100 text-amber-800' },
  { name: 'Negative', copy: 'Answer needs attention', icon: CircleAlert, className: 'border-red-700 bg-red-100 text-red-800' },
] as const;

const buttonBase = 'inline-flex w-full items-center justify-center rounded-xl border border-b-2 px-3 py-3 text-base font-medium leading-none transition duration-200 active:translate-y-px';

function FlowArrow() {
  return <li className="mx-auto grid size-6 place-items-center rounded-full border border-slate-700 bg-slate-950 text-indigo-400" aria-hidden="true">↓</li>;
}

function TokenCollection({
  layer,
  tokens,
}: {
  layer: 'Primitive' | 'Semantic';
  tokens: readonly { token: string; value: string; shade: string }[];
}) {
  return (
    <li className="grid gap-2">
      <div className="grid min-w-0 gap-4 rounded-2xl border border-slate-700 bg-slate-800 p-5">
        <span className="text-xs font-semibold tracking-wider text-indigo-400 uppercase">{layer}</span>
        <ul className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2" role="list">
          {tokens.map((token) => (
            <li key={token.token} className="grid min-w-0 gap-3 rounded-xl border border-slate-700 bg-slate-950 p-4">
              <code className="w-fit max-w-full text-sm">{token.token}</code>
              <span className={cn('h-10 w-full rounded-lg border border-slate-600', token.shade)} role="img" aria-label={`${token.token} colour shade`} />
              <small className="text-xs leading-5 text-slate-300">{token.value}</small>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export function TokenArchitectureFigure() {
  return (
    <figure className={cn(styles.tokenArchitecture, 'mt-4 overflow-hidden rounded-2xl border border-slate-700 bg-slate-950 p-6 font-sans text-slate-50')}>
      <figcaption className="sr-only">Primitive OKLCH values flow into semantic roles, component states and reusable product patterns.</figcaption>

      <ol className="m-0 grid list-none gap-2 p-0" role="list">
        <TokenCollection layer="Primitive" tokens={primitiveTokens} />
        <FlowArrow />
        <TokenCollection layer="Semantic" tokens={semanticTokens} />
        <FlowArrow />
        {assembledTokens.map((token, index) => (
          <Fragment key={token.layer}>
          <li>
            <div className="flex min-w-0 flex-col items-start gap-3 rounded-2xl border border-slate-700 bg-slate-800 p-5">
              <span className="text-xs font-semibold tracking-wider text-indigo-400 uppercase">{token.layer}</span>
              <code className="text-sm">{token.code}</code>
              {token.preview === 'button' && <button type="button" className={cn(buttonBase, 'border-slate-950 bg-indigo-400 text-slate-950 hover:bg-indigo-300')}>Continue</button>}
              {token.preview === 'pattern' && <span className="flex w-full items-center justify-between gap-2 rounded-lg border border-slate-700 bg-slate-950 p-3 text-xs text-slate-300">12 questions <strong className="text-indigo-400">Continue</strong></span>}
              <small className="text-xs leading-5 text-slate-300">{token.note}</small>
            </div>
          </li>
          {index < assembledTokens.length - 1 && <FlowArrow />}
          </Fragment>
        ))}
      </ol>

      <div className="mt-8 grid grid-cols-1 gap-8">
        <section aria-labelledby="action-hierarchy-title">
          <h4 className="mb-3 text-base text-slate-50" id="action-hierarchy-title">Action hierarchy</h4>
          <div className="grid grid-cols-1 gap-2">
            <button type="button" className={cn(buttonBase, 'border-slate-950 bg-indigo-400 text-slate-950 hover:bg-indigo-300')}>Primary</button>
            <button type="button" className={cn(buttonBase, 'border-slate-700 bg-slate-950 text-slate-50 hover:bg-slate-800')}>Secondary</button>
            <button type="button" className={cn(buttonBase, 'border-transparent bg-transparent text-indigo-400 hover:text-indigo-300')}>Tertiary</button>
            <button type="button" className={cn(buttonBase, 'border-slate-700 bg-transparent text-slate-300 hover:border-slate-500 hover:text-white')}>Quaternary</button>
          </div>
        </section>

        <section aria-labelledby="border-states-title">
          <h4 className="mb-3 text-base text-slate-50" id="border-states-title">Border states</h4>
          <ul className="m-0 grid list-none grid-cols-1 gap-2 p-0 sm:grid-cols-2" role="list">
            <li className="grid min-h-14 place-items-center rounded-xl border-2 border-slate-700 bg-slate-800 text-xs text-slate-300">Rest</li>
            <li className="grid min-h-14 place-items-center rounded-xl border-2 border-slate-500 bg-slate-800 text-xs text-slate-300">Hover</li>
            <li className="grid min-h-14 place-items-center rounded-xl border-2 border-indigo-400 bg-slate-800 text-xs text-slate-300 ring-2 ring-indigo-400/25">Focus</li>
            <li className="grid min-h-14 place-items-center rounded-xl border-2 border-red-700 bg-slate-800 text-xs text-slate-300">Invalid</li>
            <li className="grid min-h-14 place-items-center rounded-xl border-2 border-dashed border-slate-600 bg-slate-800 text-xs text-slate-300 opacity-50">Disabled</li>
          </ul>
        </section>
      </div>

      <section className="mt-8" aria-labelledby="feedback-states-title">
        <h4 className="mb-3 text-base text-slate-50" id="feedback-states-title">Feedback and validation</h4>
        <ul className="m-0 grid list-none grid-cols-1 gap-2 p-0" role="list">
          {feedbackStates.map(({ name, copy, icon: StateIcon, className }) => (
            <li key={name} className={cn('flex items-center gap-3 rounded-xl border p-3', className)}>
              <StateIcon aria-hidden="true" size={18} />
              <span className="flex flex-col text-sm"><strong className="text-base">{name}</strong>{copy}</span>
            </li>
          ))}
        </ul>
      </section>
    </figure>
  );
}
