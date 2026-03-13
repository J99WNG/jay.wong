import Section from "../Section";
import { caseStudies } from "@/app/data/caseStudies";
import { CaseStudyCard } from "@/components/CaseStudyCard";

export default function Work() {
    return (
        <Section id="work">
            <div className="col-30-70">

                <div className="section-heading">
                    <h2>Featured work
                    <br />
                    <span className="section-subtitle">Kinda rough around the edges.</span>
                    </h2>
                </div>

                <div className="section-content">
                    <div className="content-block">
                        <p className="lead">
                            Explore a selection of my recent work and get a feel for how I think, collaborate, and design. If it resonates, there’s always room to build something great together.
                        </p>

                        <p>
                            Equally, if something doesn&apos;t resonate, let me hear from you too! Always open to feedback!
                        </p>

                        <div className="flex flex-row gap-1 items-start">
                            <span className="icon icon-md" aria-hidden="true">
                                <span className="material-symbols-rounded" translate="no">info</span>
                            </span>
                            
                            <p className="italic">Some projects are simplified or anonymised to respect client confidentiality and NDAs.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-8 mt-6">
                {caseStudies.map((project) => (
                    <CaseStudyCard key={project.slug} project={project} />
                ))}
            </div>
        </Section>
    )
};
            