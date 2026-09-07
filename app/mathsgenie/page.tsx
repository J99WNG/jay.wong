import Section from '@/components/Section';
import { GalleryProvider } from '@/components/ui/GalleryContext';
import { CaseStudyLanding } from '@/components/sections/CaseStudyLanding';
import { caseStudies } from '@/app/data/caseStudies';
import { createCaseStudyMetadata } from '@/app/data/siteMetadata';
import MathsGenieShowcase from './MathsGenieShowcase';
import styles from './MathsGenieShowcase.module.css';
import localFont from 'next/font/local';

const geom = localFont({
  src: '../fonts/Geom-Variable.woff2',
  variable: '--font-geom',
  weight: '300 900',
  display: 'swap',
});

const project = caseStudies.find((study) => study.slug === 'mathsgenie')!;

export const metadata = createCaseStudyMetadata(project);

export default function Page() {
  return (
    <GalleryProvider>
      <article className={`${geom.variable} ${styles.mathsGenieRoute}`}>
        <CaseStudyLanding project={project} />

        <Section id="snapshot">
          <div className="section-grid">
            <div className="section-heading">
              <h2>
                Snapshot<br />
                <span className="font-normal text-text-tertiary">The “too long didn&apos;t read”.</span>
              </h2>
            </div>

            <div className="inline-flex max-w-full flex-col gap-10">
              <div className="flex flex-col gap-2">
                <p className="small">Problem</p>
                <p>MathsGenie was a newly acquired, content-only exam preparation platform used by around 300,000 students across the UK. The business wanted to align it with its other learning platforms through:</p>
                <ul>
                  <li>AI tutoring.</li>
                  <li>Gamified learning.</li>
                  <li>A recognisable mascot.</li>
                  <li>A freemium model.</li>
                </ul>
                <p>In a seed-stage company searching for product–market fit, speed and commercial alignment led the brief, sometimes at the expense of customer needs. The working principle was 80/20: focus effort on the changes that could solve the most immediate problems.</p>
              </div>

              <div className="flex flex-col gap-2">
                <p className="small">Outcome</p>
                <p>I led the relaunch from a static content product into an AI-layered, gamified learning experience. My focus was giving the AI tutor a distinct persona, supported by reusable interface and motion components that engineering could carry into the product.</p>
              </div>

              <div className="flex flex-col gap-2">
                <p className="small">My contribution · Persona creation</p>
                <p>I defined the tutor&apos;s visual identity, voice and interaction personality, shaping how the Genie appeared, spoke and responded. Working closely with engineering on conversational UI patterns, I carried that persona into the tutoring experience as it scaled to more than 40,000 messages a day.</p>
              </div>

              <div className="flex flex-col gap-2">
                <p className="small">My contribution · Systems and motion</p>
                <ul>
                  <li>Unified the design systems of three subsidiary platforms into a single Figma source of truth.</li>
                  <li>Aligned components and Tailwind tokens across three engineering teams while preserving market-specific needs.</li>
                  <li>Built reusable Rive state machine components for onboarding and rewards.</li>
                  <li>Gave engineers a single reference for motion states, reducing design-to-engineering handoff friction.</li>
                </ul>
              </div>

              <div className="flex flex-col gap-2">
                <p className="small">Impact</p>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="card">
                    <div className="flex justify-center w-full gap-2 px-6 py-5">
                      <p><span className="emphasis">242,000</span><br />Peak daily active users within two weeks of the relaunch.</p>
                    </div>
                  </div>
                  <div className="card">
                    <div className="flex justify-center w-full gap-2 px-6 py-5">
                      <p><span className="emphasis">40,000+</span><br />Daily messages handled by the AI tutoring feature.</p>
                    </div>
                  </div>
                </div>
                <p>NPS reached −30 during exam season, revealing the cost of introducing too much change at once.</p>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="metadata">
                  <p className="small">Platform</p>
                  <p>MathsGenie · UK EdTech</p>
                </div>
                <div className="metadata">
                  <p className="small">Focus</p>
                  <p>Product design, AI persona, design systems and motion</p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <div className="page-container"><hr className="divider" /></div>

        <Section id="selected-work">
          <div className="section-grid">
            <div className="section-heading">
              <h2>Selected work<br /><span className="font-normal text-text-tertiary">Personality, made reusable.</span></h2>
            </div>
            <div className="inline-flex max-w-full min-w-0 flex-col gap-10">
              <MathsGenieShowcase />
            </div>
          </div>
        </Section>

        <div className="page-container"><hr className="divider" /></div>

        <Section id="reflection">
          <div className="section-grid">
            <div className="section-heading">
              <h2>Reflection<br /><span className="font-normal text-text-tertiary">Too much change, too soon.</span></h2>
            </div>
            <div className="inline-flex max-w-full flex-col gap-10">
              <div className="flex flex-col gap-2">
                <h3>We got the pace and timing wrong</h3>
                <p>We pushed too many changes at once during a critical exam season. Students went from a familiar, content-heavy revision site to:</p>
                <ul>
                  <li>AI tutoring and gamification.</li>
                  <li>A redesigned interface and information architecture.</li>
                  <li>An authentication wall.</li>
                  <li>A freemium model.</li>
                </ul>
                <p>We changed both how students studied and how they accessed the resources they relied on.</p>
                <p>NPS reached −30. The usage figures showed the platform&apos;s reach, but the feedback exposed how disruptive the relaunch had been for students at a moment when continuity mattered.</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3>What I would do differently</h3>
                <p>As a product designer, I should have done more to manage expectations and influence the founders&apos; decisions with user feedback and research. I would bring evidence of students&apos; needs into scope and timing discussions earlier, making the trade-offs between commercial ambition and disruption explicit.</p>
                <p>I would:</p>
                <ul>
                  <li>Advocate for a phased rollout.</li>
                  <li>Preserve familiar access to core revision content through exam season.</li>
                  <li>Test changes to navigation, authentication and pricing separately.</li>
                  <li>Use clearer communication and feedback checkpoints to decide when students were ready for the next change.</li>
                </ul>
              </div>
            </div>
          </div>
        </Section>
      </article>
    </GalleryProvider>
  );
}
