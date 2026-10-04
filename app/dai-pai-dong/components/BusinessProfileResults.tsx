'use client';

import { useId, useState } from 'react';
import { BookOpenText, MapPin, MousePointerClick, Phone, Search } from 'lucide-react';

import styles from '../dai-pai-dong.module.css';

type ResultView = 'discovery' | 'search' | 'actions';

const views: { label: ResultView; shortLabel: string }[] = [
  { label: 'discovery', shortLabel: 'Discovery' },
  { label: 'search', shortLabel: 'Search demand' },
  { label: 'actions', shortLabel: 'Customer actions' },
];

const platforms = [
  { label: 'Google Maps · mobile', value: 27674, percent: 61, tone: 'coral' },
  { label: 'Google Search · mobile', value: 14574, percent: 32, tone: 'amber' },
  { label: 'Google Search · desktop', value: 1809, percent: 4, tone: 'blue' },
  { label: 'Google Maps · desktop', value: 1006, percent: 2, tone: 'green' },
];

const queries = [
  { label: 'restaurants', value: 8317 },
  { label: '牛池灣龍池徑新志興', value: 1370 },
  { label: '牛池灣龍池徑彩虹花園新志興至尊燒鵝大王60a號地舖', value: 934 },
  { label: '牛池灣大排檔', value: 912 },
  { label: '牛池灣', value: 855 },
];

function DiscoveryView() {
  return (
    <div className="grid items-center gap-8 sm:grid-cols-2">
      <div className="grid place-items-center">
        <div className={`${styles.discoveryDonut} grid aspect-square w-60 max-w-full place-items-center rounded-full`} role="img" aria-label="61% Maps mobile, 32% Search mobile, 4% Search desktop, 2% Maps desktop">
          <span><strong>45,063</strong>profile views</span>
        </div>
      </div>
      <div className="grid gap-2">
        {platforms.map((platform) => (
          <div className={`${styles.platformLegend} grid grid-cols-[auto_1fr_auto] items-center gap-3 p-3`} key={platform.label} data-tone={platform.tone}>
            <i aria-hidden="true" />
            <span>{platform.label}<small>{platform.value.toLocaleString()} views</small></span>
            <strong>{platform.percent}%</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

function SearchView() {
  return (
    <div>
      <div className={`${styles.canvasStat} mb-6 flex items-center gap-4`}><Search aria-hidden="true" /><span><strong>19,187</strong>search appearances</span></div>
      <div className="grid gap-3">
        {queries.map((query, index) => (
          <div className={`${styles.queryList} grid grid-cols-[auto_1fr_auto] items-center gap-3`} key={query.label}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <p title={query.label}>{query.label}</p>
            <i aria-hidden="true" style={{ '--width': `${(query.value / queries[0].value) * 100}%` } as React.CSSProperties} />
            <strong>{query.value.toLocaleString()}</strong>
          </div>
        ))}
      </div>
      <p className={styles.canvasInsight}>Generic intent dominated: “restaurants” generated more appearances than the four leading branded and neighbourhood queries combined.</p>
    </div>
  );
}

function ActionsView() {
  return (
    <div>
      <div className={`${styles.canvasStat} mb-6 flex items-center gap-4`}><MousePointerClick aria-hidden="true" /><span><strong>8,675</strong>profile interactions</span></div>
      <div className="grid gap-4 sm:grid-cols-3">
        <article className={`${styles.actionBars} grid grid-cols-[auto_1fr_auto] items-center gap-2 p-4`}>
          <MapPin aria-hidden="true" />
          <span>Direction requests</span>
          <strong>4,980</strong>
          <i><b style={{ width: '57.4%' }} /></i>
          <small>57.4% of recorded interactions</small>
        </article>
        <article className={`${styles.actionBars} grid grid-cols-[auto_1fr_auto] items-center gap-2 p-4`}>
          <Phone aria-hidden="true" />
          <span>Calls</span>
          <strong>2,490</strong>
          <i><b style={{ width: '28.7%' }} /></i>
          <small>28.7% of recorded interactions</small>
        </article>
        <article className={`${styles.actionBars} grid grid-cols-[auto_1fr_auto] items-center gap-2 p-4`}>
          <BookOpenText aria-hidden="true" />
          <span>Menu-content views</span>
          <strong>1,205</strong>
          <i><b style={{ width: '13.9%' }} /></i>
          <small>13.9% of recorded interactions</small>
        </article>
      </div>
      <p className={styles.canvasInsight}>Calls and direction requests accounted for 86.1% of all interactions, indicating that most recorded activity was tied to booking enquiries or plans to visit. October is excluded because it was incomplete.</p>
    </div>
  );
}

export default function BusinessProfileResults() {
  const [active, setActive] = useState<ResultView>('discovery');
  const id = useId();

  return (
    <figure className={styles.resultsCanvas}>
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
        <div>
          <p className="eyebrow">Interactive results canvas</p>
          <h3>Google Business Profile · May–September 2026</h3>
        </div>
        <p className="whitespace-nowrap rounded-full border border-border-muted px-3 py-2 font-mono text-xs text-text-tertiary">Five complete months</p>
      </div>
      <div className={`${styles.resultsTabs} my-6 flex gap-1 overflow-x-auto p-1`} role="group" aria-label="Business Profile result views">
        {views.map((view) => (
          <button
            className="min-h-11 flex-1 shrink-0 px-4"
            type="button"
            key={view.label}
            id={`${id}-${view.label}-tab`}
            aria-pressed={active === view.label}
            aria-controls={`${id}-results-panel`}
            onClick={() => setActive(view.label)}
          >
            {view.shortLabel}
          </button>
        ))}
      </div>
      <div
        id={`${id}-results-panel`}
        className={`${styles.resultsPanel} min-h-96 p-4 sm:p-6`}
        role="region"
        aria-live="polite"
        aria-labelledby={`${id}-${active}-tab`}
      >
        {active === 'discovery' && <DiscoveryView />}
        {active === 'search' && <SearchView />}
        {active === 'actions' && <ActionsView />}
      </div>
      <figcaption>Absolute totals from the restaurant’s Google Business Profile. No pre-change baseline is available, so these figures are not presented as causal uplift.</figcaption>
    </figure>
  );
}
