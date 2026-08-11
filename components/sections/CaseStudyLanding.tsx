import Section from "@/components/Section";
import NextProjectCTA from "@/components/ui/NextProjectCTA";
import FigureModal from "@/components/ui/FigureModal";
import { CaseStudy } from "@/app/data/caseStudies";
import CaseStudyNavigation from "@/components/ui/CaseStudyNavigation";

type CaseStudyLandingProps = {
  project: CaseStudy;
};

export function CaseStudyLanding({ project }: CaseStudyLandingProps) {
  return (
    <>
      {/* <CaseStudyNavigation /> */}
      <Section id="landing" isLanding>
        <div className="flex flex-col gap-8">

          <NextProjectCTA />

          <div className="flex flex-col gap-3">
            <p className="small">
              {project.year} · {project.company} · {project.industry}
            </p>

            <h1>{project.title}</h1>

            <p className="text-[clamp(1.25rem,2vw,1.5rem)] leading-8 tracking-tighter">
              {project.tagline}
            </p>
          </div>

          <div className="bento-grid">
            <FigureModal
              className="bento-item md:row-span-2"
              src={project.bentoImage}
              alt={`Featured image for ${project.title}`}
              priority
            />
            <FigureModal className="bento-item" src={project.bentoImage2} alt="" priority />
            <FigureModal className="bento-item" src={project.bentoImage3} alt="" priority />
          </div>
        </div>
      </Section>
    </>
  );
}
