import Section from "@/components/Section";
import NextProjectCTA from "@/components/ui/NextProjectCTA";
import FigureModal from "@/components/ui/FigureModal";
import { CaseStudy } from "@/app/data/caseStudies";
import CaseStudyNavigation from "@/components/ui/CaseStudyNavigation";
import RivePlayer from "@/components/ui/RivePlayer";

type CaseStudyLandingProps = {
  project: CaseStudy;
};

export function CaseStudyLanding({ project }: CaseStudyLandingProps) {
  const renderBentoItem = (src: string, label: string, className: string, priority = false) => {
    if (src.endsWith('.riv')) {
      return (
        <RivePlayer
          className={className}
          src={src}
          label={label}
          compact
        />
      );
    }

    return <FigureModal className={className} src={src} alt={label} priority={priority} />;
  };

  return (
    <>
      <CaseStudyNavigation />
      <Section id="landing" isLanding={true}>
        <div className="flex flex-col gap-8">
          <NextProjectCTA />

          <div className="flex flex-col gap-2">
            <p className="small">
              {project.year} · {project.company} · {project.industry}
            </p>

            <h1>{project.title}</h1>

            <p className="text-[clamp(1.25rem,2vw,1.5rem)] leading-8 tracking-tighter">
              {project.tagline}
            </p>
          </div>

          <div className={project.bentoImage2 || project.bentoImage3 ? 'grid grid-cols-1 gap-6 md:h-[400px] md:grid-cols-[1.5fr_1fr] md:grid-rows-2' : 'w-full'}>
            {renderBentoItem(project.bentoImage, `Featured image for ${project.title}`, 'h-full w-full md:row-span-2', true)}
            {project.bentoImage2 && renderBentoItem(project.bentoImage2, `${project.company} chat animation`, 'h-full w-full')}
            {project.bentoImage3 && renderBentoItem(project.bentoImage3, `${project.company} carpet animation`, 'h-full w-full')}
          </div>
        </div>
      </Section>
    </>
  );
}
