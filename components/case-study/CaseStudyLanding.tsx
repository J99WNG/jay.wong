import Section from "@/components/layout/Section";
import NextProjectCTA from "@/components/case-study/NextProjectCTA";
import LightboxImage from "@/components/case-study/LightboxImage";
import { CaseStudy } from "@/content/caseStudies";
import CaseStudyNavigation from "@/components/case-study/CaseStudyNavigation";
import RivePlayer from "@/components/case-study/RivePlayer";

type CaseStudyLandingProps = {
  project: CaseStudy;
};

export function CaseStudyLanding({ project }: CaseStudyLandingProps) {
  const renderBentoItem = (src: string, label: string, className: string, priority = false) => {
    // LightboxImage renders a <figure>, which has global block margins. Reset all
    // bento children so mixed image and Rive tiles share the same grid edges.
    const bentoItemClassName = `${className} m-0 min-h-0 min-w-0 overflow-hidden rounded-xl`;

    if (src.endsWith('.riv')) {
      return (
        <RivePlayer
          className={bentoItemClassName}
          src={src}
          label={label}
          compact
        />
      );
    }

    return (
      <LightboxImage
        className={bentoItemClassName}
        src={src}
        alt={label}
        priority={priority}
        fillContainer
      />
    );
  };

  return (
    <>
      {/* Case-study navigation is local to case-study pages; the backToTop stays global */}
      <CaseStudyNavigation />
      
      <Section id="landing" isLanding={true}>
        <div className="flex flex-col gap-8">
          <NextProjectCTA />

          <div className="flex flex-col gap-2">
            <span className="font-mono text-base sm:text-lg uppercase tracking-tight text-text-tertiary">
              {project.year} · {project.company} · {project.industry}
            </span>

            <h1>{project.title}</h1>

            <p className="text-[clamp(1.25rem,2vw,1.5rem)] leading-8 tracking-tight">
              {project.tagline}
            </p>
          </div>

          <div className={project.bentoImage2 || project.bentoImage3 ? 'grid w-full min-h-0 min-w-0 grid-cols-1 items-stretch gap-6 md:h-[400px] md:grid-cols-[1.5fr_1fr] md:grid-rows-2' : 'w-full'}>
            {renderBentoItem(project.bentoImage, `Featured image for ${project.title}`, 'w-full max-md:h-auto md:h-full md:row-span-2', true)}
            {project.bentoImage2 && renderBentoItem(project.bentoImage2, `${project.company} chat animation`, 'w-full max-md:h-auto md:h-full')}
            {project.bentoImage3 && renderBentoItem(project.bentoImage3, `${project.company} carpet animation`, 'w-full max-md:h-auto md:h-full')}
          </div>
        </div>
      </Section>
    </>
  );
}
