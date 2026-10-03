import { ArrowRight } from 'lucide-react';

import LightboxContent from '@/components/ui/LightboxContent';
import styles from '../dai-pai-dong.module.css';

type JourneyMode = 'current' | 'future';
type ServiceLayer = 'Customer' | 'Frontstage' | 'Backstage' | 'Systems';
type JourneyStage = { label: string; detail: string; tone: 'pain' | 'opportunity' | 'stable' };
type Journey = {
  eyebrow: string;
  title: string;
  summary: string;
  takeaway: string;
  preview: string[];
  lanes: Record<ServiceLayer, JourneyStage[]>;
};

const layerOrder: ServiceLayer[] = ['Customer', 'Frontstage', 'Backstage', 'Systems'];

const journeys: Record<JourneyMode, Journey> = {
  current: {
    eyebrow: 'Current state',
    title: 'Many signals, one human bottleneck',
    summary: 'Phone calls, walk-ins, paper and radio all converge on the manager during peak service.',
    takeaway: 'The manager is forced to reconcile demand, capacity and memory while also welcoming customers.',
    preview: ['Discover', 'Request', 'Reconcile', 'Seat & serve'],
    lanes: {
      Customer: [
        { label: 'Discover', detail: 'Find the restaurant through word of mouth or an inconsistent listing.', tone: 'pain' },
        { label: 'Request', detail: 'Call repeatedly or arrive without knowing whether a table is available.', tone: 'pain' },
        { label: 'Wait', detail: 'Join the crowd around the reception point with little certainty.', tone: 'pain' },
        { label: 'Dine', detail: 'Receive the familiar, informal dai pai dong welcome.', tone: 'stable' },
      ],
      Frontstage: [
        { label: 'Answer', detail: 'The manager takes calls while greeting walk-ins.', tone: 'pain' },
        { label: 'Check', detail: 'Search a hand-drawn page and reconcile names.', tone: 'pain' },
        { label: 'Seat', detail: 'Match party size to tables from memory.', tone: 'pain' },
        { label: 'Serve', detail: 'Waiters use notes and radios to coordinate.', tone: 'stable' },
      ],
      Backstage: [
        { label: 'Record', detail: 'Rewrite phone details into the paper ledger.', tone: 'pain' },
        { label: 'Reconcile', detail: 'Balance bookings, walk-ins and table turnover.', tone: 'pain' },
        { label: 'Order', detail: 'Cashier enters handwritten orders into the POS.', tone: 'stable' },
        { label: 'Confirm', detail: 'Radio checks connect cashier, floor and exit.', tone: 'stable' },
      ],
      Systems: [
        { label: 'Channels', detail: 'Phone, walk-in and platform listings.', tone: 'pain' },
        { label: 'Memory', detail: 'Ledger, paper pads and staff knowledge.', tone: 'pain' },
        { label: 'Service', detail: 'POS, kitchen tickets and radios.', tone: 'stable' },
        { label: 'Delivery', detail: 'Keeta remains the single delivery platform.', tone: 'stable' },
      ],
    },
  },
  future: {
    eyebrow: 'Future state',
    title: 'One shared view, familiar service',
    summary: 'Demand is captured in one lightweight service while the existing POS, kitchen and radio workflow stays intact.',
    takeaway: 'Technology coordinates the invisible work; it does not replace the human welcome or force customers into one channel.',
    preview: ['Be found', 'Capture', 'Match', 'Learn'],
    lanes: {
      Customer: [
        { label: 'Discover', detail: 'See accurate Google and social information.', tone: 'opportunity' },
        { label: 'Request', detail: 'Phone, WhatsApp or walk-in remains available.', tone: 'opportunity' },
        { label: 'Know', detail: 'Receive a booking or queue acknowledgement.', tone: 'opportunity' },
        { label: 'Dine', detail: 'Experience the same informal, human welcome.', tone: 'stable' },
      ],
      Frontstage: [
        { label: 'Capture', detail: 'Every party enters the same simple view.', tone: 'opportunity' },
        { label: 'See', detail: 'Bookings, walk-ins and table states appear together.', tone: 'opportunity' },
        { label: 'Match', detail: 'Surface the best table fit and waiting order.', tone: 'opportunity' },
        { label: 'Serve', detail: 'Staff retain familiar notes and radios.', tone: 'stable' },
      ],
      Backstage: [
        { label: 'Unify', detail: 'A single operational record replaces rewriting.', tone: 'opportunity' },
        { label: 'Anticipate', detail: 'Due-soon bookings sit beside the live queue.', tone: 'opportunity' },
        { label: 'Order', detail: 'The existing POS and kitchen flow remains.', tone: 'stable' },
        { label: 'Learn', detail: 'Track waits, no-shows and table turnaround.', tone: 'opportunity' },
      ],
      Systems: [
        { label: 'Demand', detail: 'Google, social, phone and future WhatsApp.', tone: 'opportunity' },
        { label: 'Tonight', detail: 'Bookings, queue and tables in one interface.', tone: 'opportunity' },
        { label: 'Service', detail: 'POS, kitchen tickets and radios stay intact.', tone: 'stable' },
        { label: 'Signals', detail: 'Operational measures inform the next release.', tone: 'opportunity' },
      ],
    },
  },
};

function JourneyFigure({ mode }: { mode: JourneyMode }) {
  const journey = journeys[mode];

  return (
    <LightboxContent
      className="m-0"
      buttonClassName="rounded-2xl"
      alt={`${journey.eyebrow}: ${journey.title}`}
      caption={journey.takeaway}
      expandedContent={
        <div className="grid gap-8">
          <header>
            <p className="eyebrow">{journey.eyebrow} · Service blueprint</p>
            <h2 className="mt-2">{journey.title}</h2>
            <p className="mt-2 text-text-tertiary">{journey.summary}</p>
          </header>
          {layerOrder.map((layer) => (
            <section className="grid gap-3" key={layer} aria-labelledby={`${mode}-${layer}`}>
              <h3 id={`${mode}-${layer}`} className="font-pixel text-sm uppercase text-text-tertiary">{layer}</h3>
              <div className={`${styles.expandedStages} grid grid-cols-1 gap-3 md:grid-cols-4`}>
                {journey.lanes[layer].map((stage, index) => (
                  <article className="relative p-5 md:min-h-48" key={stage.label} data-tone={stage.tone}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <h3>{stage.label}</h3>
                    <p>{stage.detail}</p>
                    {index < journey.lanes[layer].length - 1 && <ArrowRight aria-hidden="true" />}
                  </article>
                ))}
              </div>
            </section>
          ))}
          <div className={`${styles.blueprintTakeaway} grid gap-4 p-5 md:grid-cols-4`}>
            <span>Design implication</span>
            <p className="md:col-span-3">{journey.takeaway}</p>
          </div>
        </div>
      }
    >
      <div className={`${styles.journeyFigure} flex min-h-80 flex-col overflow-hidden`} data-mode={mode}>
        <div className={`${styles.journeyFigureHeader} min-h-40 p-6`}>
          <p className="eyebrow">{journey.eyebrow}</p>
          <h3>{journey.title}</h3>
          <p>{journey.summary}</p>
        </div>
        <div className={`${styles.journeyPreview} mx-6 grid grid-cols-2 gap-y-4 py-6 md:grid-cols-4`} aria-label={`${journey.eyebrow} summary`}>
          {journey.preview.map((stage, index) => (
            <div className="relative grid min-w-0 gap-2 px-2 first:pl-0" key={stage}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{stage}</strong>
              {index < journey.preview.length - 1 && <ArrowRight aria-hidden="true" />}
            </div>
          ))}
        </div>
      </div>
    </LightboxContent>
  );
}

export default function ServiceJourneyComparison() {
  return (
    <div className="grid gap-6">
      <JourneyFigure mode="current" />
      <JourneyFigure mode="future" />
      <div className={`${styles.journeyLegend} flex flex-wrap gap-3 text-xs`} aria-label="Journey legend">
        <span className="inline-flex items-center gap-2"><i data-tone="pain" /> Friction</span>
        <span className="inline-flex items-center gap-2"><i data-tone="opportunity" /> Designed opportunity</span>
        <span className="inline-flex items-center gap-2"><i data-tone="stable" /> Preserved workflow</span>
      </div>
    </div>
  );
}
