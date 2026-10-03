import { ArrowUpRight } from 'lucide-react';

import LightboxContent from '@/components/ui/LightboxContent';
import styles from '../dai-pai-dong.module.css';

type EvidenceItem = {
  id: string;
  eyebrow: string;
  title: string;
  summary: string;
  sourceTitle: string;
  sourceUrl: string;
  visual: 'receipts' | 'stalls' | 'redevelopment';
};

const evidence: EvidenceItem[] = [
  {
    id: 'receipts',
    eyebrow: 'Market pressure',
    title: 'Recovery had stalled below the pre-pandemic peak',
    summary: '2024 restaurant receipts were 8.5% below 2018; Chinese-restaurant receipts were about 24% lower.',
    sourceTitle: 'Legislative Council Research Office · Food and beverage services sector in Hong Kong',
    sourceUrl: 'https://app7.legco.gov.hk/rpdb/en/uploads/2025/ISSH/ISSH29_2025_20250910_en.pdf',
    visual: 'receipts',
  },
  {
    id: 'stalls',
    eyebrow: 'Cultural scarcity',
    title: 'Licensed on-street pitches continued to disappear',
    summary: 'The official count fell from 22 in 2021 to 17 at the end of 2023, a 23% decline in two years.',
    sourceTitle: 'Hong Kong Government · Written reply on cooked-food hawker licences',
    sourceUrl: 'https://www.info.gov.hk/gia/general/202407/10/P2024071000422p.htm',
    visual: 'stalls',
  },
  {
    id: 'redevelopment',
    eyebrow: 'Neighbourhood change',
    title: 'Regeneration is reshaping the restaurant’s setting',
    summary: 'Land resumption and clearance support about 2,700 public-housing homes, with completion targeted for 2028.',
    sourceTitle: 'Civil Engineering and Development Department · Ngau Chi Wan Village project',
    sourceUrl: 'https://www.cedd.gov.hk/eng/our-projects/major-projects/index-id-135.html',
    visual: 'redevelopment',
  },
];

function EvidenceVisual({ type }: { type: EvidenceItem['visual'] }) {
  if (type === 'receipts') {
    return (
      <div className={`${styles.receiptsVisual} grid gap-8 py-8`} role="img" aria-label="Restaurant receipt comparison">
        <div className="grid items-center gap-4 md:grid-cols-4">
          <span>All restaurants</span>
          <div className="grid gap-2 md:col-span-2">
            <i className={`${styles.compareBar} flex min-w-36 justify-between gap-4 rounded-md px-3 py-2 not-italic`} style={{ '--bar': '100%' } as React.CSSProperties}><b>2018</b><em>HK$119.6B</em></i>
            <i className={`${styles.compareBar} flex min-w-36 justify-between gap-4 rounded-md px-3 py-2 not-italic`} style={{ '--bar': '91.5%' } as React.CSSProperties}><b>2024</b><em>HK$109.4B</em></i>
          </div>
          <strong>−8.5%</strong>
        </div>
        <div className="grid items-center gap-4 md:grid-cols-4">
          <span>Chinese restaurants</span>
          <div className="grid gap-2 md:col-span-2">
            <i className={`${styles.compareBar} flex min-w-36 justify-between gap-4 rounded-md px-3 py-2 not-italic`} style={{ '--bar': '100%' } as React.CSSProperties}><b>2018</b><em>HK$52.1B</em></i>
            <i className={`${styles.compareBar} flex min-w-36 justify-between gap-4 rounded-md px-3 py-2 not-italic`} style={{ '--bar': '76%' } as React.CSSProperties}><b>2024</b><em>HK$39.6B</em></i>
          </div>
          <strong>−24%</strong>
        </div>
        <p>Q2 2026 volume was also 0.3% below the year-earlier quarter, despite a 0.4% rise in nominal value.</p>
      </div>
    );
  }

  if (type === 'stalls') {
    return (
      <div className={`${styles.stallVisual} py-10 text-center`} role="img" aria-label="Licensed on-street cooked-food pitch count">
        <div className="flex flex-col items-center gap-4 md:flex-row">
          <div className="grid flex-1 gap-2"><span>2021</span><strong>22</strong></div>
          <i className="h-5 w-px shrink-0 md:h-px md:w-8" aria-hidden="true" />
          <div className="grid flex-1 gap-2"><span>2022</span><strong>21</strong></div>
          <i className="h-5 w-px shrink-0 md:h-px md:w-8" aria-hidden="true" />
          <div className="grid flex-1 gap-2"><span>2023</span><strong>17</strong></div>
        </div>
        <p>No new dai pai dong licences were issued from 2021 to 2023.</p>
      </div>
    );
  }

  return (
    <div className={`${styles.redevelopmentVisual} flex flex-col items-center gap-6 py-10 md:flex-row`} role="img" aria-label="Ngau Chi Wan redevelopment timeline">
      <div className="w-full flex-1"><span>JUN 2025</span><strong>Construction begins</strong><p>Land resumption, clearance and site formation.</p></div>
      <i className="h-8 w-0.5 shrink-0 md:h-0.5 md:w-20" aria-hidden="true" />
      <div className="w-full flex-1"><span>2028</span><strong>Target completion</strong><p>About 2,700 public-housing units planned.</p></div>
    </div>
  );
}

function EvidenceCard({ item }: { item: EvidenceItem }) {
  const sourceNote = (
    <div className={styles.sourceNote}>
      <p>Figures are transcribed from the published source and redrawn for readability; this is not a screenshot of the original document.</p>
      <a className="mr-4 mb-1 inline-flex items-center gap-1" href={item.sourceUrl} target="_blank" rel="noreferrer">
        {item.sourceTitle} <ArrowUpRight size={15} aria-hidden="true" />
      </a>
      {item.visual === 'receipts' && (
        <a className="mr-4 mb-1 inline-flex items-center gap-1" href="https://www.censtatd.gov.hk/en/scode540.html" target="_blank" rel="noreferrer">
          Census and Statistics Department · Q2 2026 restaurant receipts <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      )}
    </div>
  );

  return (
    <LightboxContent
      className="m-0"
      buttonClassName="rounded-2xl"
      alt={`${item.title}. ${item.summary}`}
      caption={`${item.eyebrow}: ${item.summary}`}
      expandedContent={
        <div className="grid gap-6">
          <div>
            <p className="eyebrow">{item.eyebrow} · Source evidence</p>
            <h2 className="mt-2">{item.title}</h2>
            <p className="mt-2 text-text-tertiary">{item.summary}</p>
          </div>
          <EvidenceVisual type={item.visual} />
          {sourceNote}
        </div>
      }
    >
      <article className={`${styles.evidenceCard} grid gap-6 p-5 sm:p-6`}>
        <div>
          <p className="eyebrow">{item.eyebrow}</p>
          <h3>{item.title}</h3>
          <p>{item.summary}</p>
        </div>
        <EvidenceVisual type={item.visual} />
      </article>
    </LightboxContent>
  );
}

export default function ContextEvidence({ items }: { items?: EvidenceItem['id'][] }) {
  const visibleEvidence = items
    ? evidence.filter((item) => items.includes(item.id))
    : evidence;

  return (
    <div className="grid gap-6" aria-label="Context evidence">
      {visibleEvidence.map((item) => <EvidenceCard item={item} key={item.id} />)}
    </div>
  );
}
