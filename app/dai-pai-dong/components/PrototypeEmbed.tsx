'use client';

import { useEffect, useState } from 'react';
import { ExternalLink, RefreshCw } from 'lucide-react';

const prototypeUrl = 'https://j99wng.github.io/tonight-dinner-notebook-pages/';

export default function PrototypeEmbed() {
  const [status, setStatus] = useState<'loading' | 'ready' | 'slow'>('loading');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (status !== 'loading') return;
    const timer = window.setTimeout(() => setStatus('slow'), 12000);
    return () => window.clearTimeout(timer);
  }, [attempt, status]);

  const retry = () => {
    setStatus('loading');
    setAttempt((value) => value + 1);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-border-base bg-bg-secondary shadow-xl">
      <div className="flex flex-col justify-between gap-3 border-b border-border-muted p-4 sm:flex-row sm:items-center">
        <div className="flex flex-wrap items-center gap-2">
          <span className="size-2 rounded-full bg-accent-primary" aria-hidden="true" />
          <strong>Interactive prototype</strong>
          <span className="text-xs text-text-tertiary">Sample data · not a live booking service</span>
        </div>
        <a className="inline-flex w-fit items-center gap-1 text-sm text-text-link" href={prototypeUrl} target="_blank" rel="noreferrer">
          Open prototype <ExternalLink aria-hidden="true" size={15} />
        </a>
      </div>

      <div className="bg-[radial-gradient(circle_at_top_left,color-mix(in_srgb,var(--color-accent-primary)_32%,transparent),transparent_42%),linear-gradient(135deg,#f4cda3_0%,#f9eadb_48%,#d9e8d9_100%)] p-4 sm:p-8 lg:p-12">
        <div
          className="relative mx-auto aspect-[16/10] w-full max-w-5xl overflow-hidden rounded-[2rem] bg-neutral-950 p-2 shadow-2xl sm:rounded-[2.5rem] sm:p-3"
          aria-label="Huawei MatePad Mini presentation frame"
        >
          <span className="absolute left-1/2 top-1.5 z-20 size-1.5 -translate-x-1/2 rounded-full bg-neutral-700 ring-1 ring-neutral-600 sm:top-2" aria-hidden="true" />
          <div className="relative h-full w-full overflow-hidden rounded-[1.5rem] bg-[#f5f0e8] sm:rounded-[2rem]">
            {status !== 'ready' && (
              <div className="absolute inset-0 z-10 grid place-content-center justify-items-center bg-[#f5f0e8] p-8 text-center text-[#322d29]" role="status">
                {status === 'loading' ? (
                  <>
                    <span className="mb-3 size-6 animate-spin rounded-full border-2 border-[#d7cbbf] border-t-[#c85f3d] motion-reduce:animate-none" aria-hidden="true" />
                    <strong>Loading the table-management prototype...</strong>
                    <p className="mt-2 text-sm text-[#6d6259]">The GitHub Pages build may take a moment to load.</p>
                  </>
                ) : (
                  <>
                    <strong>The embedded prototype is taking longer than expected.</strong>
                    <p className="mt-2 text-sm text-[#6d6259]">Retry here or open the GitHub Pages build in a separate tab.</p>
                    <div className="mt-4 flex gap-4">
                      <button className="inline-flex items-center gap-1 text-sm text-text-link" type="button" onClick={retry}>
                        <RefreshCw aria-hidden="true" size={15} /> Retry
                      </button>
                      <a className="inline-flex items-center gap-1 text-sm text-text-link" href={prototypeUrl} target="_blank" rel="noreferrer">
                        Open prototype <ExternalLink aria-hidden="true" size={15} />
                      </a>
                    </div>
                  </>
                )}
              </div>
            )}

            <iframe
              key={attempt}
              src={prototypeUrl}
              title="Tonight table, booking and walk-in management prototype for 新志興"
              loading="lazy"
              sandbox="allow-forms allow-popups allow-same-origin allow-scripts"
              referrerPolicy="strict-origin-when-cross-origin"
              onLoad={() => setStatus('ready')}
              className={`block h-full w-full border-0 transition-opacity motion-reduce:transition-none ${status === 'ready' ? 'opacity-100' : 'opacity-0'}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
