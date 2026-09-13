import Section from '@/components/Section';
import { GalleryProvider } from '@/components/ui/GalleryContext';
import { CaseStudyLanding } from '@/components/sections/CaseStudyLanding';
import { caseStudies } from '@/app/data/caseStudies';
import { createCaseStudyMetadata } from '@/app/data/siteMetadata';
import { BrandLanguageFigure, SelectedWorkDemos, TokenArchitectureFigure } from './components';
import styles from './mathsgenie.module.css';
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

            <div className="section-content">
              <div className="content-block">
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

              <div className="content-block">
                <p className="small">Outcome</p>
                <p>I led the relaunch from a static content product into an AI-layered, gamified learning experience. My focus was giving the AI tutor a distinct persona, supported by reusable interface and motion components that engineering could carry into the product.</p>
              </div>

              <div className="content-block">
                <p className="small">My contribution · Persona creation</p>
                <p>I defined the tutor&apos;s visual identity, voice and interaction personality, shaping how the Genie appeared, spoke and responded. Working closely with engineering on conversational UI patterns, I carried that persona into the tutoring experience as it scaled to more than 40,000 messages a day.</p>
              </div>

              <div className="content-block">
                <p className="small">My contribution · Systems and motion</p>
                <ul>
                  <li>Unified the design systems of three subsidiary platforms into a single Figma source of truth.</li>
                  <li>Aligned components and Tailwind tokens across three engineering teams while preserving market-specific needs.</li>
                  <li>Built reusable Rive state machine components for onboarding and rewards.</li>
                  <li>Gave engineers a single reference for motion states, reducing design-to-engineering handoff friction.</li>
                </ul>
              </div>

              <div className="content-block">
                <p className="small">Impact</p>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="card flex justify-center w-full gap-2 p-5">
                    <p><span className="emphasis">242,000</span><br />Peak daily active users within two weeks of the relaunch.</p>
                  </div>

                  <div className="card flex justify-center w-full gap-2 p-5">
                    <p><span className="emphasis">40,000+</span><br />Daily messages handled by the AI tutoring feature.</p>
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

        <Section id="design-language">
          <div className="section-grid">
            <div className="section-heading">
              <h2>One design language<br /><span className="font-normal text-text-tertiary">Three products, one family.</span></h2>
            </div>
            <div className="section-content min-w-0">
              <div className="content-block">
                <h3>Shared character without flattening the brands</h3>
                <p>I brought MathsGenie into the same product family as RevisionDojo and OnePrep while leaving room for each platform&apos;s curriculum, audience and mascot to feel distinct. The shared language came from a small set of recognisable principles:</p>
                <ul>
                  <li>Expressive mascots that reassure, celebrate progress and make feedback feel less mechanical.</li>
                  <li>Simple geometric forms and rounded components that make dense learning tools easier to approach.</li>
                  <li>Gamification tied to useful habits: returning, practising, reflecting and completing the next step.</li>
                  <li>Springy micro-interactions that acknowledge input quickly without slowing down study.</li>
                </ul>
              </div>

              <BrandLanguageFigure />

              <div className="content-block">
                <h3>Figma and production as one system</h3>
                <p>The library only worked if design and code described the same thing. I aligned Figma variants with component props, interaction states and Tailwind-facing semantic tokens so teams could trace a decision from a design frame to its production implementation.</p>
                <ul>
                  <li>One shared Figma library held foundations, components and product patterns.</li>
                  <li>Variant names matched mode, hierarchy, size and state in code.</li>
                  <li>Motion references described timing, easing and state changes for engineering.</li>
                  <li>Platform accents and mascot behavior stayed local while component anatomy remained shared.</li>
                </ul>
              </div>
            </div>
          </div>
        </Section>

        <div className="page-container"><hr className="divider" /></div>

        <Section id="token-architecture">
          <div className="section-grid">
            <div className="section-heading">
              <h2>Token architecture<br /><span className="font-normal text-text-tertiary">Name the role, then choose the value.</span></h2>
            </div>
            <div className="section-content min-w-0">
              <div className="content-block">
                <h3>Stable roles across themes and products</h3>
                <p>I separated raw palette values from the jobs they perform. Primitive OKLCH tokens describe colour; semantic tokens describe purpose. A component asks for <code>action.primary.background</code> or <code>border.validation.negative</code>, rather than depending on a particular blue or red.</p>
                <ul>
                  <li>Primitive scales provide predictable lightness and chroma in OKLCH.</li>
                  <li>Semantic roles cover surfaces, text, borders, actions, feedback and validation.</li>
                  <li>Primary through quaternary actions create a clear hierarchy without one-off styling.</li>
                  <li>Rest, hover, focus, active, invalid and disabled states are designed as part of each component.</li>
                </ul>
              </div>

              <TokenArchitectureFigure />

              <div className="content-block">
                <h3>Atomic structure and engineering handoff</h3>
                <p>Atomic design kept the system legible as it grew: foundations feed tokens, tokens style components, and components combine into patterns such as revision cards, navigation and feedback flows. I recorded naming, state behavior, accessibility requirements and Figma-to-code mappings in <code>DESIGN.md</code>, giving engineering a reference that could be reviewed alongside production changes.</p>
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
            <div className="section-content min-w-0">
              <SelectedWorkDemos />
            </div>
          </div>
        </Section>

        <div className="page-container"><hr className="divider" /></div>

        <Section id="reflection">
          <div className="section-grid">
            <div className="section-heading">
              <h2>Reflection<br /><span className="font-normal text-text-tertiary">Too much change, too soon.</span></h2>
            </div>
            <div className="section-content">
              <div className="content-block">
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
              <div className="content-block">
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
