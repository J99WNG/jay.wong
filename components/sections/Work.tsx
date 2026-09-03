import Section from "../Section";
import { caseStudies } from "@/app/data/caseStudies";
import { CaseStudyCard } from "@/components/ui/CaseStudyCard";

export default function Work() {
    return (
        <Section id="work">
            <div className="section-grid">

                <div className="section-heading md:static">
                    <h2>Featured work
                    <br />
                    <span className="font-normal text-text-tertiary">Kinda rough around the edges.</span>
                    </h2>
                </div>

                <div className="inline-flex max-w-full flex-col gap-10">
                    <div className="flex flex-col gap-2">
                        <p className="lead">
                            Explore a selection of my recent work and get a feel for how I think, collaborate, and design. If it resonates, there’s always room to build something great together.
                        </p>

                        <div className="flex flex-row gap-1 items-start">
                            <span className="icon icon-md" aria-hidden="true">
                                <span className="material-symbols-rounded text-accent-primary" translate="no">info</span>
                            </span>
                            
                            <p className="italic">Some projects are simplified or anonymised to respect client confidentiality and NDAs.</p>
                        </div>  
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center gap-8 mt-6">
                {caseStudies.map((project) => (
                    <CaseStudyCard key={project.slug} project={project} />
                ))}
            </div>
        </Section>
    )
};
            