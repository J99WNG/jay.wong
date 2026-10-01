import Section from '@/components/Section';
import { caseStudies } from '@/app/data/caseStudies';
import { createCaseStudyMetadata } from '@/app/data/siteMetadata';
import { CaseStudyLanding } from '@/components/sections/CaseStudyLanding';
import { GalleryProvider } from '@/components/ui/GalleryContext';
import StreamingText from '@/components/ui/StreamingText';
import { MetricCard, MetricGrid } from '@/components/ui/MetricCard';

import AnnotatedRushPhoto from './components/AnnotatedRushPhoto';
import BusinessProfileResults from './components/BusinessProfileResults';
import ContextEvidence from './components/ContextEvidence';
import EvidencePlaceholder from './components/EvidencePlaceholder';
import PrototypeEmbed from './components/PrototypeEmbed';
import ServiceJourneyComparison from './components/ServiceJourneyComparison';
import styles from './dai-pai-dong.module.css';

const project = caseStudies.find((study) => study.slug === 'dai-pai-dong')!;

export const metadata = createCaseStudyMetadata(project);

const Divider = () => (
  <div className="page-container">
    <hr className="divider" />
  </div>
);

export default function Page() {
  if (!project) return null;

  return (
    <GalleryProvider>
      <article>
        <CaseStudyLanding project={project} />

        <Section id="snapshot">
          <div className="section-grid">
            <div className="section-heading">
              <h2>
                Snapshot
                <br />
                <span className="font-normal text-text-tertiary">Old-school dining culture.</span>
              </h2>
            </div>

            <div className="section-content">
              <div className="content-block">
                <p className="small">Problem</p>
                <p>
                  新志興至尊燒鵝大王 (Supreme Roast Goose King) is a busy Ngau Chi Wan restaurant operating in the dai pai dong tradition with a simple POS, radios and handwritten paper. On peak evenings, one manager had to answer booking calls, search a hand-drawn ledger, judge table availability and handle a crowd of walk-ins at the same time.
                </p>
              </div>

              <div className="content-block">
                <p className="small">Intervention</p>
                <p>
                  I shaped a phased service transformation: make the restaurant easier to find, create trusted channels for customer communication, then design a lightweight operational layer for bookings, walk-ins and tables without replacing tools the staff already understood.
                </p>
              </div>

              <div className="content-block">
                <p className="small">Observed digital outcomes · May–September 2026</p>
                <MetricGrid columns={3} ariaLabel="Observed Google Business Profile outcomes">
                  <MetricCard value="45,063" label="Business Profile views" />
                  <MetricCard value="19,187" label="Search appearances" />
                  <MetricCard value="8,584" label="Profile interactions" />
                  <MetricCard value="2,473" label="Calls from Google" />
                  <MetricCard value="4,923" label="Direction requests" />
                </MetricGrid>
                <p className="text-sm text-text-tertiary">
                  These are absolute Google Business Profile results. No reliable pre-change baseline exists, so I do not claim a percentage uplift or sole-cause attribution.
                </p>
              </div>

              <div className="content-block">
                <p className="small">Delivery status</p>
                <div className="grid gap-3">
                  <div className={`${styles.statusItem} flex items-start gap-3`} data-status="live">
                    <i aria-hidden="true" />
                    <div><strong>Live</strong><p>Google Business Profile, local SEO and social communication channels.</p></div>
                  </div>
                  <div className={`${styles.statusItem} flex items-start gap-3`} data-status="prototype">
                    <i aria-hidden="true" />
                    <div><strong>Pre-launch prototype</strong><p>“Tonight” table, booking and walk-in management experience. Not yet internally tested.</p></div>
                  </div>
                  <div className={`${styles.statusItem} flex items-start gap-3`} data-status="roadmap">
                    <i aria-hidden="true" />
                    <div><strong>Roadmap</strong><p>Staff validation, WhatsApp integration, customer tickets and operational measurement.</p></div>
                  </div>
                </div>
              </div>

              <div className="grid place-items-start gap-6 grid-cols-1 md:grid-cols-2">
                <div className="metadata">
                  <p className="small">Client</p>
                  <p>新志興至尊燒鵝大王<br />Supreme Roast Goose King</p>
                </div>
                <div className="metadata">
                  <p className="small">Industry</p>
                  <p>Hospitality · Independent F&amp;B</p>
                </div>
                <div className="metadata">
                  <p className="small">Role</p>
                  <p>Embedded Service Designer<br />Product Designer</p>
                </div>
                <div className="metadata">
                  <p className="small">Timeline</p>
                  <p>2025–2026 · Ongoing</p>
                </div>
                <div className="metadata">
                  <p className="small">Working model</p>
                  <p>Independent advisor embedded with ownership, management and floor staff.</p>
                </div>
                <div className="metadata">
                  <p className="small">Methods</p>
                  <p>Contextual observation, informal conversations, channel audit, service blueprinting, prototyping and implementation.</p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Divider />

        <Section id="role">
          <div className="section-grid">
            <div className="section-heading">
              <h2>
                My role
                <br />
                <span className="font-normal text-text-tertiary">Designing across the service.</span>
              </h2>
            </div>

            <div className="section-content">
              <StreamingText className="lead">
                I was not brought in to redesign a screen. I became the bridge between a traditional restaurant operation, its customers and the digital services surrounding it.
              </StreamingText>

              <div className="content-block">
                <h3>Service and product design</h3>
                <p>
                  I mapped how demand moved from search, social media, telephone and walk-in arrival into table allocation and food service. I translated that operating reality into an incremental roadmap and designed and built the reservation-management MVP.
                </p>
              </div>

              <div className="content-block">
                <h3>Technology and adoption</h3>
                <p>
                  My role also covered the practical work that makes transformation credible in a small business: Google profile ownership, local SEO, phone and CCTV support, POS maintenance, AI literacy and decisions about which technology not to introduce yet.
                </p>
              </div>

              <div className="content-block">
                <h3>Customer and cultural translation</h3>
                <p>
                  I helped foreign visitors navigate the menu and dining culture, translated between English and Cantonese, and acted as an informal food guide. Those interactions exposed where the restaurant’s character delighted newcomers—and where uncertainty about location, booking and arrival created avoidable friction.
                </p>
              </div>

              <blockquote className="notion-quote">
                The design challenge was not “How do we digitise a restaurant?” It was “Where can digital coordination create breathing room without turning a dai pai dong into a generic hospitality product?”
              </blockquote>
            </div>
          </div>
        </Section>

        <Divider />

        <Section id="context">
          <div className="section-grid">
            <div className="section-heading">
              <h2>
                Business context
                <br />
                <span className="font-normal text-text-tertiary">A local service under pressure.</span>
              </h2>
            </div>

            <div className="section-content">
              <StreamingText className="lead">
                Supreme Roast Goose King sits less than two minutes from Choi Hung MTR and beside one of Hong Kong’s most photographed housing estates, yet its back-alley position makes it easy to miss. The location is both an advantage and a discovery problem.
              </StreamingText>

              <aside className={`${styles.culturePrimer} grid gap-3`}>
                <span className="eyebrow">Culture primer · 大牌檔</span>
                <h3>What is a dai pai dong?</h3>
                <p>
                  A <em>dai pai dong</em> is Hong Kong’s informal street-side cooked-food tradition—open-fronted, lively and known for wok cooking, shared tables and direct, family-like service. The Cantonese name is commonly understood as “big licence stall,” referring to the large hawker licence once displayed by operators.
                </p>
                <p>
                  Supreme Roast Goose King operates in this cultural and service tradition. The official figures below refer more narrowly to licensed on-street pitches, not every restaurant popularly described as a dai pai dong.
                </p>
              </aside>

              <div className="content-block">
                <h3>Hospitality competition had changed</h3>
                <p>
                  The restaurant was competing not only with nearby dining rooms, but with the lower prices, polished service and deeply digitised customer journeys available across the border in Shenzhen. Hong Kong’s F&amp;B pressure is broader than any one cause: high operating costs, cautious spending and outbound dining all shape the market.
                </p>
              </div>

              <ContextEvidence items={['receipts']} />

              <div className="content-block">
                <h3>A cultural setting in transition</h3>
                <p>
                  The official count of licensed on-street cooked-food pitches fell from 22 in 2021 to 17 at the end of 2023. Ngau Chi Wan Village is also subject to land resumption and clearance for public-housing development. The project therefore sat inside a wider question: how can a culturally specific, informal service remain visible and viable while its physical neighbourhood changes?
                </p>
              </div>

              <ContextEvidence items={['stalls', 'redevelopment']} />
            </div>
          </div>
        </Section>

        <Divider />

        <Section id="discovery">
          <div className="section-grid">
            <div className="section-heading">
              <h2>
                Immersive discovery
                <br />
                <span className="font-normal text-text-tertiary">Learning from the dinner rush.</span>
              </h2>
            </div>

            <div className="section-content">
              <StreamingText className="lead">
                This was retrospective, embedded discovery rather than a formal research programme. Months of helping the restaurant and talking informally with staff revealed repeated behaviours, but I have not invented interview counts, transcripts or precision the evidence cannot support.
              </StreamingText>

              <AnnotatedRushPhoto />

              <div className="grid gap-4 sm:grid-cols-2">
                <article className={styles.insightCard}>
                  <span className="eyebrow mb-3">01 · Demand converges</span>
                  <h3>One person becomes the interface</h3>
                  <p>Calls, reservations, walk-ins and table questions all converge on the manager at the busiest point of service.</p>
                </article>
                <article className={styles.insightCard}>
                  <span className="eyebrow mb-3">02 · Paper is flexible</span>
                  <h3>The ledger works—until it has to scale</h3>
                  <p>Hand-drawn pages adapt to the night, but provide no shared live view, recovery path or useful operating history.</p>
                </article>
                <article className={styles.insightCard}>
                  <span className="eyebrow mb-3">03 · Technology is uneven</span>
                  <h3>Digital confidence varies</h3>
                  <p>Retirees, hikers, sports teams, tourists and Mainland workers arrive with different languages, expectations and channels such as WeChat.</p>
                </article>
                <article className={styles.insightCard}>
                  <span className="eyebrow mb-3">04 · The service is social</span>
                  <h3>Informality is part of the value</h3>
                  <p>The rough, familial tone is not a defect to polish away. It is a core part of what customers come to experience.</p>
                </article>
              </div>

              <div className={styles.quotePlaceholder}>
                <strong>Editorial placeholder · validate before publishing</strong>
                <p>Suggested staff paraphrase: “When the phone, the queue and the tables all need me at once, I have to keep the whole night in my head.”</p>
              </div>

              <div className="content-block">
                <h3>Public reviews as triangulation, not proof</h3>
                <p>
                  Accessible public reviews repeatedly describe a popular, good-value restaurant where advance booking is sensible and crowding is common. Because the available review set is sparse, inconsistent and often dated, I used it only to test whether observed themes appeared outside the team—not to manufacture wait-time data or competitor benchmarks.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <EvidencePlaceholder
                  title="The ledger in use"
                  brief="Capture an overhead close-up of a real service page, with customer phone numbers redacted, showing how columns and dates are improvised."
                />
                <EvidencePlaceholder
                  title="Radio → cashier → POS handoff"
                  brief="Photograph the handoff from floor staff to cashier to show how spoken updates and paper orders become kitchen tickets."
                />
              </div>
            </div>
          </div>
        </Section>

        <Divider />

        <Section id="service-blueprint" stickyHeading={false}>
          <div className="section-grid">
            <div className="section-heading">
              <h2>
                Service blueprint
                <br />
                <span className="font-normal text-text-tertiary">From fragmented signals to one shared view.</span>
              </h2>
            </div>

            <div className="section-content">
              <StreamingText className="lead">
                The bottleneck was not the absence of an app. It was the absence of shared operational awareness at the exact moment demand peaked.
              </StreamingText>
            </div>
          </div>

          <div className="mt-12">
            <ServiceJourneyComparison />
          </div>
        </Section>

        <Divider />

        <Section id="principles">
          <div className="section-grid">
            <div className="section-heading">
              <h2>
                Design principles
                <br />
                <span className="font-normal text-text-tertiary">Digitise coordination, not character.</span>
              </h2>
            </div>

            <div className="section-content">
              <div className="grid gap-4 sm:grid-cols-2">
                <article className={styles.principleCard}>
                  <span className="eyebrow mb-3">Preserve</span>
                  <h3>Keep the welcome human</h3>
                  <p>Technology supports decisions behind the scenes; it does not script the manager or formalise the dining room.</p>
                </article>
                <article className={styles.principleCard}>
                  <span className="eyebrow mb-3">Fit</span>
                  <h3>Work with existing habits</h3>
                  <p>Radios and the POS remain. The MVP focuses narrowly on the missing coordination layer around tables and arrivals.</p>
                </article>
                <article className={styles.principleCard}>
                  <span className="eyebrow mb-3">Reduce</span>
                  <h3>Lower the learning cost</h3>
                  <p>Plain language, large targets, familiar table labels and at-a-glance states matter more than feature density.</p>
                </article>
                <article className={styles.principleCard}>
                  <span className="eyebrow mb-3">Sequence</span>
                  <h3>Earn the next change</h3>
                  <p>Start with visible, low-risk wins. Validate staff behaviour before automating messages or adding customer-facing systems.</p>
                </article>
              </div>

              <table className="custom-table">
                <caption className="sr-only">Transformation scope decisions</caption>
                <tbody>
                  <tr><th scope="row">Now</th><td>Discoverability, public information, social communication, bookings, queue and table visibility.</td></tr>
                  <tr><th scope="row">Preserve</th><td>Existing POS, kitchen tickets, radio coordination, informal hospitality and a phone path for non-digital customers.</td></tr>
                  <tr><th scope="row">Later</th><td>WhatsApp API, customer-facing waiting tickets and operational reporting—only after staff validation.</td></tr>
                  <tr><th scope="row">Not now</th><td>POS replacement, customer-facing AI, mandatory self-service or multiple delivery platforms with added fees.</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </Section>

        <Divider />

        <Section id="transformation">
          <div className="section-grid">
            <div className="section-heading">
              <h2>
                Phased transformation
                <br />
                <span className="font-normal text-text-tertiary">Visibility first, operations next.</span>
              </h2>
            </div>

            <div className="section-content">
              <div className="content-block">
                <p className="eyebrow">Phase 01 · Be found</p>
                <h3>Turn location into an advantage</h3>
                <p>
                  I corrected and developed the Google Business Profile so customers could find the entrance, call the current number, check operating details and navigate from Choi Hung MTR. Search behaviour also revealed demand beyond branded queries: “restaurants” alone generated 8,317 appearances during the reporting window.
                </p>
                <p>
                  From May to September 2026, the profile recorded 45,063 views, 19,187 search appearances and 8,584 interactions—including 2,473 calls and 4,923 direction requests. These totals demonstrate meaningful use of the channel, but without a reliable prior baseline they are not presented as uplift.
                </p>
              </div>

              <BusinessProfileResults />

              <div className="content-block">
                <p className="eyebrow">Phase 02 · Communicate</p>
                <h3>Give a traditional business a living public voice</h3>
                <p>
                  I established Facebook and Instagram as practical service channels—not a glossy brand campaign. They created somewhere to communicate contact changes, opening hours, public holidays and neighbourhood regeneration updates while helping younger locals recognise the restaurant before they arrived.
                </p>
                <p>
                  I brought in a content and videography team, shaped the content rhythm and defined a voice that felt closer to the floor: direct, playful and familial. The aim was to retain the roughness of dai pai dong conversation rather than imitate formal dining language.
                </p>
                <a href="https://www.facebook.com/profile.php?id=61586171286658" target="_blank" rel="noreferrer">View the restaurant’s Facebook presence</a>
              </div>

              <EvidencePlaceholder
                title="Content production and tone"
                brief="Add a three-frame contact sheet showing a filming session, one operational update and one community-facing post, with final captions approved by the restaurant."
              />

              <div className="content-block">
                <p className="eyebrow">Phase 03 · Coordinate</p>
                <h3>Design one calm view for the busiest moment</h3>
                <p>
                  “Tonight” is a mobile-first table, booking and walk-in notebook designed around the manager’s shift—not a generic reservation platform. It shows table readiness, occupied time, reservations due soon, walk-in order, estimated waits and whether an available table fits a party.
                </p>
                <ul>
                  <li>Eight table cards with ready, occupied, reserved and cleaning states.</li>
                  <li>Upcoming bookings with arrival actions and seating preferences.</li>
                  <li>Walk-in tickets with elapsed and estimated waiting time.</li>
                  <li>Table-fit cues to support faster, fairer seating decisions.</li>
                  <li>English, Traditional Chinese and Simplified Chinese language options.</li>
                </ul>
                <p>
                  The prototype is intentionally pre-launch. It has not yet been tested with staff or connected to live customer data, so the case study makes no claim about reduced waits, fewer errors or revenue impact.
                </p>
              </div>

              <PrototypeEmbed />
            </div>
          </div>
        </Section>

        <Divider />

        <Section id="future-state">
          <div className="section-grid">
            <div className="section-heading">
              <h2>
                Future state
                <br />
                <span className="font-normal text-text-tertiary">A roadmap for adoption.</span>
              </h2>
            </div>

            <div className="section-content">
              <StreamingText className="lead">
                The next release should be earned through staff use—not assumed from a polished prototype.
              </StreamingText>

              <ol>
                <li><strong>Shadow mode:</strong> run “Tonight” alongside the paper book for selected services, comparing accuracy without forcing staff to abandon a trusted fallback.</li>
                <li><strong>Staff validation:</strong> test common actions during a realistic rush—add a walk-in, find a booking, hold a table, seat a party and recover from a mistake.</li>
                <li><strong>Operational pilot:</strong> use one manager and a limited table set before expanding to the full floor.</li>
                <li><strong>Customer acknowledgement:</strong> introduce simple WhatsApp booking confirmations and queue tickets only after the internal record is dependable.</li>
                <li><strong>Service learning:</strong> review waits, no-shows and overrides with staff, then remove anything that adds work without improving decisions.</li>
              </ol>

              <blockquote className="notion-quote">
                Adoption is part of the service design. A faster interface that staff do not trust would simply create a second, unofficial ledger.
              </blockquote>
            </div>
          </div>
        </Section>

        <Divider />

        <Section id="measurement">
          <div className="section-grid">
            <div className="section-heading">
              <h2>
                Measurement plan
                <br />
                <span className="font-normal text-text-tertiary">What success must prove.</span>
              </h2>
            </div>

            <div className="section-content">
              <div className="grid gap-4 sm:grid-cols-2">
                <article className={styles.measurementCard}>
                  <span className="eyebrow mb-3">Staff effort</span>
                  <h3>Less coordination overhead</h3>
                  <p>Time to record and retrieve a booking; duplicate entry; number of manager interruptions during peak service.</p>
                </article>
                <article className={styles.measurementCard}>
                  <span className="eyebrow mb-3">Customer certainty</span>
                  <h3>Clearer arrivals and waits</h3>
                  <p>Booking acknowledgement rate; quoted versus actual wait; walk-ins abandoning before seating.</p>
                </article>
                <article className={styles.measurementCard}>
                  <span className="eyebrow mb-3">Operational quality</span>
                  <h3>Fewer preventable errors</h3>
                  <p>Missing or duplicated bookings; seating overrides; no-shows; table turnaround visibility.</p>
                </article>
                <article className={styles.measurementCard}>
                  <span className="eyebrow mb-3">Adoption</span>
                  <h3>A tool staff choose to use</h3>
                  <p>Share of parties captured digitally; paper fallbacks; task success; staff confidence after each pilot service.</p>
                </article>
              </div>

              <div className="content-block">
                <h3>Evidence limitations</h3>
                <ul>
                  <li>The discovery record is based on embedded observation and informal conversations, not a formal sample with interview counts.</li>
                  <li>Public reviews are directional signals, not a representative dataset.</li>
                  <li>Google metrics have no reliable pre-change baseline and cannot be compared with competitors’ private dashboards.</li>
                  <li>The operational MVP remains untested and contains sample data only.</li>
                </ul>
              </div>
            </div>
          </div>
        </Section>

        <Divider />

        <Section id="reflection">
          <div className="section-grid">
            <div className="section-heading">
              <h2>
                Reflection
                <br />
                <span className="font-normal text-text-tertiary">Modernisation as stewardship.</span>
              </h2>
            </div>

            <div className="section-content">
              <StreamingText className="lead">
                This project reframed transformation for me: the most responsible solution was not the biggest platform, but the smallest sequence of changes the restaurant could understand, trust and sustain.
              </StreamingText>

              <div className="content-block">
                <h3>What worked</h3>
                <p>
                  Starting with discoverability created visible value without changing the dinner service. It also gave the restaurant a more reliable public front door while I continued learning how the operation behaved behind it.
                </p>
              </div>

              <div className="content-block">
                <h3>What remains unresolved</h3>
                <p>
                  The MVP still needs evidence from the people who will depend on it under pressure. The next design decisions should come from real parallel use: which states are understood, which actions slow staff down and when paper remains the safer fallback.
                </p>
              </div>

              <div className="content-block">
                <h3>What I would strengthen</h3>
                <p>
                  I would formalise the research trail earlier: consented staff quotes, timed observations, booking-error logs and baseline service measures. That would turn a rich lived understanding into stronger evidence for prioritisation and later impact measurement.
                </p>
              </div>

              <blockquote className="notion-quote">
                Preserving a service does not mean freezing it in time. It means changing the invisible machinery carefully enough that the experience people value can continue.
              </blockquote>
            </div>
          </div>
        </Section>
      </article>
    </GalleryProvider>
  );
}
