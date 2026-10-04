import Section from '@/components/Section';
import { caseStudies } from '@/app/data/caseStudies';
import { createCaseStudyMetadata } from '@/app/data/siteMetadata';
import { CaseStudyLanding } from '@/components/sections/CaseStudyLanding';
import { LightboxProvider } from '@/components/ui/LightboxGallery';
import LightboxImage from '@/components/ui/LightboxImage';
import StreamingText from '@/components/ui/StreamingText';
import { MetricCard, MetricGrid } from '@/components/ui/MetricCard';

import BusinessProfileResults from './components/BusinessProfileResults';
import ContextEvidence from './components/ContextEvidence';
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
    <LightboxProvider>
      <article>
        <CaseStudyLanding project={project} />

        <Section id="snapshot">
          <div className="section-grid">
            <div className="section-heading">
              <h2>
                Snapshot
                <br />
                <span className="section-subtitle">Old-school dining culture.</span>
              </h2>
            </div>

            <div className="section-content">
              <div className="content-block content-flow">
                <p className="meta-label">Problem</p>
                <p>
                  新志興至尊燒鵝大王 (Supreme Roast Goose King) is a busy Ngau Chi Wan restaurant operating in the dai pai dong tradition with a simple POS, radios and handwritten paper. On peak evenings, one manager had to answer booking calls, search a hand-drawn ledger, judge table availability and handle a crowd of walk-ins at the same time.
                </p>
              </div>

              <div className="content-block content-flow">
                <p className="meta-label">Intervention</p>
                <p>
                  I shaped a phased service transformation: make the restaurant easier to find, create trusted channels for customer communication, then design a lightweight operational layer for bookings, walk-ins and tables without replacing tools the staff already understood.
                </p>
              </div>

              <div className="content-block">
                <p className="meta-label">Observed digital outcomes · May–September 2026</p>
                <MetricGrid columns={3} ariaLabel="Observed Google Business Profile outcomes">
                  <MetricCard value="45,063" label="Business Profile views" />
                  <MetricCard value="19,187" label="Search appearances" />
                  <MetricCard value="8,675" label="Total interactions" />
                  <MetricCard value="57.4%" label="Direction requests" />
                  <MetricCard value="28.7%" label="Calls from Google" />
                  <MetricCard value="13.9%" label="Menu-content views" />
                </MetricGrid>
              </div>

              <div className="content-block">
                <p className="meta-label">Delivery status</p>
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
                  <p className="meta-label">Client</p>
                  <p>新志興至尊燒鵝大王<br />Supreme Roast Goose King</p>
                </div>
                <div className="metadata">
                  <p className="meta-label">Role</p>
                  <p>Embedded Service Designer<br />Product Designer</p>
                </div>
                <div className="metadata">
                  <p className="meta-label">Timeline</p>
                  <p>2025–2026 · Ongoing</p>
                </div>
                <div className="metadata">
                  <p className="meta-label">Methods</p>
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
                <span className="section-subtitle">Designing across the service.</span>
              </h2>
            </div>

            <div className="section-content">
              <StreamingText className="lead">
                I was not brought in to redesign a screen. I became the bridge between a traditional restaurant operation, its customers and the digital services surrounding it.
              </StreamingText>

              <div className="content-block content-flow">
                <h3>An end-to-end remit</h3>
                <ul>
                  <li><strong>Service and product design:</strong> mapped demand from search and arrival through table allocation, then designed and built the reservation-management MVP.</li>
                  <li><strong>Technology and adoption:</strong> owned local SEO and Google Business Profile improvements, maintained CCTV, phones and POS equipment, supported staff with radios and Keeta, and advised on ethical AI adoption.</li>
                  <li><strong>Customer translation:</strong> helped international visitors navigate the menu and dining culture, exposing friction around finding, booking and entering the restaurant.</li>
                </ul>
              </div>
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
                <span className="section-subtitle">A local service under pressure.</span>
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
                  A <em>dai pai dong</em> is Hong Kong’s informal street-side cooked-food tradition. It is open-fronted, lively and known for wok cooking, shared tables and direct, family-like service. Supreme Roast Goose King operates in this tradition, although official “licensed pitch” figures use a narrower definition.
                </p>
              </aside>

              <div className="content-block content-flow">
                <h3>Hospitality competition had changed</h3>
                <p>
                  Competition included nearby restaurants and the lower prices, polished service and digitised customer journeys available across the border in Shenzhen. High operating costs, cautious spending and outbound dining were all putting pressure on Hong Kong’s F&amp;B sector.
                </p>
              </div>

              <ContextEvidence items={['receipts']} />

              <div className="content-block content-flow">
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
                <span className="section-subtitle">Learning from the dinner rush.</span>
              </h2>
            </div>

            <div className="section-content">
              <StreamingText className="lead">
                Months embedded in the service exposed repeated behaviours across busy evenings. This was contextual observation and informal conversation, not a formal study with interview counts or transcripts.
              </StreamingText>

              <LightboxImage
                className="m-0"
                src="/assets/images/dai-pai-dong/dpd-discovery-1.png"
                alt="Friday dinner service at Supreme Roast Goose King, with the manager in a purple shirt handling a crowd near the reception point."
                caption="Friday dinner service. The manager in the purple shirt is handling the crowd while the handwritten ledger sits in the foreground. 新志興訂座記錄 translates as ‘Supreme Roast Goose King reservation record.’"
              />

              <div className="grid gap-4">
                <article className={styles.insightCard}>
                  <span className="eyebrow mb-3">01 · Demand converges</span>
                  <h3>One person becomes the interface</h3>
                  <p>Calls, reservations, walk-ins and table questions all converge on the manager at the busiest point of service.</p>
                </article>
                <article className={styles.insightCard}>
                  <span className="eyebrow mb-3">02 · Paper is flexible</span>
                  <h3>The ledger works until demand peaks</h3>
                  <p>Hand-drawn pages adapt to the night, but provide no shared live view, recovery path or useful operating history.</p>
                </article>
                <article className={styles.insightCard}>
                  <span className="eyebrow mb-3">03 · Access varies</span>
                  <h3>One digital path would exclude people</h3>
                  <p>Retirees, tourists, sports teams and Mainland workers arrive with different languages, confidence and channels. The informal welcome remains part of the value.</p>
                </article>
              </div>

              <div className="content-block content-flow">
                <h3>Public reviews as triangulation, not proof</h3>
                <p>
                  I grouped repeated observations across publicly indexed customer reviews and retained both praise and criticism. The sample is small, fragmented across platforms and partly historical, so it validates themes but not their prevalence, exact wait times or performance against competitors.
                </p>
              </div>

              <div className="grid gap-4">
                <article className={styles.insightCard}>
                  <span className="eyebrow mb-3">01 · Character</span>
                  <h3>The setting is part of the value</h3>
                  <p>
                    Communal tables, outdoor energy, generous sharing plates and old-Hong-Kong character are recurring positives. These are part of the experience, not rough edges to polish away.
                  </p>
                </article>
                <article className={styles.insightCard}>
                  <span className="eyebrow mb-3">02 · Demand</span>
                  <h3>Popularity creates pressure</h3>
                  <p>
                    Crowds, full seating and booking ahead recur across the feedback. They signal demand, but also expose arrival anxiety and a service bottleneck when staff must reconcile reservations and walk-ins during the rush.
                  </p>
                </article>
                <article className={styles.insightCard}>
                  <span className="eyebrow mb-3">03 · Food</span>
                  <h3>Consistency matters more than novelty</h3>
                  <p>
                    Roast goose anchors expectations, but mixed comments across dishes expose consistency as the main experience risk.
                  </p>
                </article>
              </div>

              <div className="border-l-2 border-accent-primary pl-5">
                <span className="eyebrow mb-3 block">Synthesis</span>
                <p className="lead">
                  Reviewers value the restaurant’s character. The opportunity is to make that same experience easier to access and more consistent.
                </p>
              </div>

              <div>
                <p className="meta-label mb-2">Directional review sources</p>
                <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-text-tertiary">
                  <a href="https://www.google.com/maps/search/%E6%96%B0%E5%BF%97%E8%88%88%E8%87%B3%E5%B0%8A%E7%87%92%E9%B5%9D%E5%A4%A7%E7%8E%8B%2C%2B" target="_blank" rel="noreferrer">Google Maps listing</a>
                  <a href="https://www.tripadvisor.com.tw/Restaurant_Review-g294217-d15075388-Reviews-Xin_Zhixing-Hong_Kong.html" target="_blank" rel="noreferrer">Tripadvisor reviews</a>
                  <a href="https://hk.trip.com/restaurant/china/hong-kong/detail/restaurant-11753773/" target="_blank" rel="noreferrer">Trip.com reviews</a>
                  <a href="https://roasterpig.blogspot.com/2019/04/ngau-chi-wan-duck-hkfd.html" target="_blank" rel="noreferrer">Independent dining account</a>
                  <a href="https://www.youtube.com/watch?v=set1t4ruM50" target="_blank" rel="noreferrer">Critical video review</a>
                </div>
              </div>

              <div className="grid gap-6">
                <LightboxImage
                  className="m-0"
                  src="/assets/images/dai-pai-dong/dpd-discovery-2.png"
                  alt="The restaurant’s handwritten reservation book, with customer details obscured."
                  caption="The reservation book adapts to each service, but availability has to be interpreted from handwriting and memory."
                />
                <LightboxImage
                  className="m-0"
                  src="/assets/images/dai-pai-dong/dpd-discovery-3.png"
                  alt="Handwritten booking notes, walk-in slips and stationery at the restaurant reception point."
                  caption="Bookings and walk-in notes share the reception surface, leaving the manager to reconcile them during service."
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
                <span className="section-subtitle">From fragmented signals to one shared view.</span>
              </h2>
            </div>

            <div className="section-content">
              <StreamingText className="lead">
                The missing piece was a shared operational view at the exact moment demand peaked.
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
                <span className="section-subtitle">Digitise coordination, not character.</span>
              </h2>
            </div>

            <div className="section-content">
              <div className="grid gap-4 md:grid-cols-3">
                <article className={styles.principleCard}>
                  <span className="eyebrow mb-3">Preserve</span>
                  <h3>Keep the welcome human</h3>
                  <p>Technology supports decisions behind the scenes; it does not script the manager or formalise the dining room.</p>
                </article>
                <article className={styles.principleCard}>
                  <span className="eyebrow mb-3">Fit</span>
                  <h3>Work with existing habits</h3>
                  <p>Radios and the POS remain. The MVP adds only the missing table-and-arrival view, using familiar labels and at-a-glance states.</p>
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
                  <tr><th scope="row">Later</th><td>WhatsApp API, customer-facing waiting tickets and operational reporting after staff validation.</td></tr>
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
                <span className="section-subtitle">Visibility first, operations next.</span>
              </h2>
            </div>

            <div className="section-content">
              <div className="content-block content-flow">
                <p className="eyebrow">Phase 01 · Be found</p>
                <h3>Turn location into an advantage</h3>
                <p>
                  I rebuilt the Google Business Profile around accurate contact details, operating information, entrance discovery and navigation from Choi Hung MTR. From May to September 2026 it recorded 45,063 views and 8,675 interactions; calls and direction requests made up 86.1% of those actions. “Restaurants” alone generated 8,317 search appearances, showing reach beyond customers already searching for the name.
                </p>
              </div>

              <BusinessProfileResults />

              <div className="content-block content-flow">
                <p className="eyebrow">Phase 02 · Communicate</p>
                <h3>Give a traditional business a living public voice</h3>
                <p>
                  I established Facebook and Instagram as practical service channels for contact changes, opening hours, holidays and regeneration updates. I also commissioned a content team and defined a direct, playful, familial voice that felt recognisable as the restaurant.
                </p>
                <a href="https://www.facebook.com/profile.php?id=61586171286658" target="_blank" rel="noreferrer">View the restaurant’s Facebook presence</a>
              </div>

              <div className="content-block content-flow">
                <p className="eyebrow">Phase 03 · Coordinate</p>
                <h3>Design one calm view for the busiest moment</h3>
                <p>
                  “Tonight” is a mobile-first table, booking and walk-in notebook designed around the manager’s shift. It shows table readiness, occupied time, reservations due soon, walk-in order, estimated waits and whether an available table fits a party.
                </p>
                <ul>
                  <li>One view of ready, occupied, reserved and cleaning tables.</li>
                  <li>Bookings, walk-in order, wait estimates and table-fit cues.</li>
                  <li>English, Traditional Chinese and Simplified Chinese support.</li>
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
                <span className="section-subtitle">A roadmap for adoption.</span>
              </h2>
            </div>

            <div className="section-content">
              <StreamingText className="lead">
                Staff use must determine the next release. A polished prototype is not enough.
              </StreamingText>

              <ol>
                <li><strong>Shadow and validate:</strong> run “Tonight” beside the paper book, testing the essential rush-hour tasks without removing a trusted fallback.</li>
                <li><strong>Pilot and measure:</strong> use one manager and a limited table set; compare accuracy, effort, waits and overrides after each service.</li>
                <li><strong>Expand only when dependable:</strong> add WhatsApp acknowledgements and customer queue tickets after staff trust the internal record.</li>
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
                <span className="section-subtitle">What success must prove.</span>
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

              <div className="content-block content-flow">
                <h3>Evidence limitations</h3>
                <p>
                  Discovery came from embedded observation and informal conversations; reviews are directional, Google metrics lack a reliable pre-change baseline, and the operational MVP remains untested with sample data. The case study therefore separates observed digital outcomes from future operational hypotheses.
                </p>
              </div>

              <div className="content-block content-flow">
                <h3>What this changed in my practice</h3>
                <p>
                  The right transformation was the smallest sequence the restaurant could trust and sustain. Starting with discoverability created visible value without disturbing service. Next time, I would formalise the research trail earlier with consented quotes, timed observations and booking-error baselines.
                </p>
              </div>

              <blockquote className="notion-quote">
                Preserve the experience people value by changing its invisible machinery carefully.
              </blockquote>
            </div>
          </div>
        </Section>
      </article>
    </LightboxProvider>
  );
}
