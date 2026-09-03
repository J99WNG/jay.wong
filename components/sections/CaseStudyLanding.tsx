import Section from "@/components/Section";
import NextProjectCTA from "@/components/ui/NextProjectCTA";
import FigureModal from "@/components/ui/FigureModal";
import { CaseStudy } from "@/app/data/caseStudies";
// Kept for the planned case-study navigation treatment.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

          <div className={project.bentoImage2 || project.bentoImage3 ? 'grid grid-cols-1 gap-6 md:h-[400px] md:grid-cols-[1.5fr_1fr] md:grid-rows-2' : 'w-full'}>
            <FigureModal
              className="h-full w-full md:row-span-2"
              src={project.bentoImage}
              alt={`Featured image for ${project.title}`}
              priority
            />
            {project.bentoImage2 && <FigureModal className="h-full w-full" src={project.bentoImage2} alt="" priority />}
            {project.bentoImage3 && <FigureModal className="h-full w-full" src={project.bentoImage3} alt="" priority />}
          </div>
        </div>
      </Section>
    </>
  );
}
