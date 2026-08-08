import Section from '@/components/Section';
import Image from 'next/image';
import { GalleryProvider } from '@/components/ui/GalleryContext';
import FigureModal from '@/components/ui/FigureModal';
import { caseStudies } from "@/app/data/caseStudies";
import { CaseStudyLanding } from "@/components/sections/CaseStudyLanding";
import { Metadata } from 'next'

const project = caseStudies.find((s) => s.slug === "revisiondojo-yc")!;

export const metadata: Metadata = {
    title: project.title,
    description: project.tagline,
    openGraph: {
      title: `${project.title} – Jay Wong`,
      description: project.tagline,
      images: [{ url: project.bentoImage }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      images: [project.bentoImage],
    },
  }

  export default async function Page() {
    // Force Next.js to wait for 2 seconds before rendering this page
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (!project) return null;
    
    return (
        <GalleryProvider>
            <article>
                <CaseStudyLanding project={project} />

                <Section id="Snapshot">
                    <div className="col-30-70">

                        <div className="section-heading">
                            <h2>Snapshot
                            <br/>
                            <span className="section-subheading">The “too long didn&apos;t read”.</span>
                            </h2>
                        </div>

                        <div className="section-content">
                            <div className="content-block">
                                <p className="small">Problem</p>
                                <p>Relationship Managers (RM) at Credit Suisse had no single platform to manage client tasks, KYC deadlines, portfolio data, and market intelligence. Everything lived across disconnected systems, pulling RMs away from valuable client time and into unnecessary admin, costing up to 70% of their day.</p>
                            </div>
                            
                            <div className="content-block">
                                <p className="small">Outcome</p>
                                <p>Designed RM Suite, a conceptual mobile solution bringing everything into a unified, secured interface – covering tasks, reminders, client profiles, live market data, and portfolio access.</p>
                            </div>

                            <div className="content-block">
                                <p className="small">Impact</p>

                                <p>Top 3 finalist out of 10 competing teams at a bi-annual Employer Showcase. Prototype validated directly by the Regional IT Head of Wealth Management Technology and a serving Relationship Manager.</p>

                                <div className="card">
                                    <div className="card-content px-6 py-5">
                                    <p>
                                        <span className="emphasis">~136,800 hrs</span>
                                        <br />
                                        Recovered annually by reducing context-switching and admin time.
                                    </p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="grid place-items-start justify-start md:place-items-stretch gap-6 grid-cols-1 md:grid-cols-2">
                                <div className="metadata">
                                    <p className="small">Company</p>

                                    <p>
                                        <span className="icon icon-inline icon-md">
                                        <img 
                                        src="/assets/logos/creditsuisse-symbol.svg"
                                        alt="credit suisse"
                                        loading="lazy"
                                        />
                                        </span> Credit Suisse</p>
                                </div>

                                <div className="metadata">
                                    <p className="small">Industry</p>

                                    <p>{project.industry}</p>
                                </div>

                                <div className="metadata">
                                    <p className="small">Role</p>

                                    <p>{project.role}</p>
                                </div>

                                <div className="metadata">
                                    <p className="small">Year / Timeline</p>

                                    <p>{project.year} · 8 months
                                        <br />
                                        (Discovery → Proof of Concept)</p>
                                </div>

                                <div className="metadata">
                                    <p className="small">Scale</p>

                                    <p>1,140+ Relationship Managers, 36 locations, 25 countries, CHF 645 billion AUM</p>
                                </div>

                                <div className="metadata">
                                    <p className="small">Team</p>

                                    <p>5 people (Product Manager/Designer, Lead Developer, Project Analyst, Business Analyst, Research Analyst)</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </Section>

                <div className="container">
                    <hr className="divider" />
                </div>

            </article>
        </GalleryProvider>
    );
}