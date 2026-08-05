import Section from "@/components/Section";
import NextProjectCTA from "@/components/ui/NextProjectCTA";
import FigureModal from "@/components/ui/FigureModal";
import { CaseStudy } from "@/app/data/caseStudies";

type CaseStudyLandingProps = {
  project: CaseStudy;
};

export function CaseStudyLanding({ project }: CaseStudyLandingProps) {
  return (
    <Section id="landing" isLanding>
      <NextProjectCTA />

      <div className="flex flex-col gap-2 mbe-4">
        <p className="small">
          {project.year} · {project.company} · {project.industry}
        </p>

        <h1>{project.title}</h1>

        <p className="text-[clamp(1.25rem,2vw,1.5rem)] leading-[1.6] tracking-tighter">
          {project.tagline}
        </p>
      </div>

      <div className="bento-grid">
        <FigureModal
          className="bento-item md:row-span-2"
          src={project.bentoImage}
          alt={`Featured image for ${project.title}`}
        />
        <FigureModal className="bento-item" src={project.bentoImage2} alt="" />
        <FigureModal className="bento-item" src={project.bentoImage3} alt="" />
      </div>
    </Section>
  );
}