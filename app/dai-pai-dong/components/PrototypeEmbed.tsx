'use client';

import { useEffect, useState } from 'react';
import { ExternalLink, RefreshCw } from 'lucide-react';

import styles from '../dai-pai-dong.module.css';

const prototypeUrl = 'https://tonight-dinner-notebook.j99wng.chatgpt.site';

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
    <div className={styles.prototypeShell}>
      <div className={`${styles.prototypeBar} flex flex-col justify-between gap-3 p-4 sm:flex-row sm:items-center`}>
        <div className="flex flex-wrap items-center gap-2">
          <span className={styles.liveDot} aria-hidden="true" />
          <strong>Interactive prototype</strong>
          <span>Sample data · not a live booking service</span>
        </div>
        <a className="inline-flex w-fit items-center gap-1" href={prototypeUrl} target="_blank" rel="noreferrer">
          Open prototype <ExternalLink aria-hidden="true" size={15} />
        </a>
      </div>

      <div className={`${styles.prototypeViewport} relative min-h-screen`}>
        {status !== 'ready' && (
          <div className={`${styles.prototypeState} absolute inset-0 z-2 grid place-content-center justify-items-center p-8 text-center`} role="status">
            {status === 'loading' ? (
              <>
                <span className={`${styles.loader} mb-3 size-6`} aria-hidden="true" />
                <strong>Loading the table-management prototype…</strong>
                <p>The embedded experience may take a moment to wake up.</p>
              </>
            ) : (
              <>
                <strong>The embedded prototype is taking longer than expected.</strong>
                <p>You can retry here or open it in a separate tab.</p>
                <div className="mt-4 flex gap-4">
                  <button className="inline-flex items-center gap-1" type="button" onClick={retry}>
                    <RefreshCw aria-hidden="true" size={15} /> Retry
                  </button>
                  <a className="inline-flex items-center gap-1" href={prototypeUrl} target="_blank" rel="noreferrer">
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
          className={`block min-h-screen w-full border-0 ${status === 'ready' ? styles.prototypeReady : ''}`}
        />
      </div>
    </div>
  );
}
