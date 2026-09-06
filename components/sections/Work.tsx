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
                    <span className="font-normal text-text-tertiary">A few problems I've helped solve.</span>
                    </h2>
                </div>

                <div className="inline-flex max-w-full flex-col gap-10">
                    <div className="flex flex-col gap-2">
                        <p className="lead">
                            Explore a selection of my work. Get a feel for how I think, collaborate, and design. If it resonates, there’s always room to build something great together.
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center gap-8 mt-10">
                {caseStudies.map((project) => (
                    <CaseStudyCard key={project.slug} project={project} />
                ))}
            </div>
        </Section>
    )
};
            