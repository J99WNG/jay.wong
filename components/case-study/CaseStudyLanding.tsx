import Section from "@/components/layout/Section";
import NextProjectCTA from "@/components/case-study/NextProjectCTA";
import LightboxContent from "@/components/case-study/LightboxContent";
import LightboxImage from "@/components/case-study/LightboxImage";
import { CaseStudy } from "@/content/caseStudies";
import CaseStudyNavigation from "@/components/case-study/CaseStudyNavigation";
import RivePlayer from "@/components/case-study/RivePlayer";

type CaseStudyLandingProps = {
  project: CaseStudy;
};

export function CaseStudyLanding({ project }: CaseStudyLandingProps) {
  const { badges } = project;

  const hasRiveBento = [project.bentoImage2, project.bentoImage3]
    .some((src) => src?.endsWith('.riv'));

  const renderBentoItem = (src: string, label: string, className: string, priority = false) => {
    // LightboxImage renders a <figure>, which has global block margins. Reset all
    // bento children so mixed image and Rive tiles share the same grid edges.
    const bentoItemClassName = `${className} m-0 min-h-0 min-w-0 overflow-hidden rounded-xl`;

    if (src.endsWith('.riv')) {
      return (
        <LightboxContent
          className={`${bentoItemClassName} aspect-video`}
          buttonClassName="rounded-xl"
          alt={label}
          expandedContent={(
            <RivePlayer
              className="mx-auto max-w-5xl"
              src={src}
              label={label}
              aspectRatio="video"
            />
          )}
        >
          <RivePlayer src={src} label={label} aspectRatio="video" />
        </LightboxContent>
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

          <div className={project.bentoImage2 || project.bentoImage3 ? `grid w-full min-h-0 min-w-0 grid-cols-1 items-stretch gap-6 md:grid-cols-[1.5fr_1fr] md:grid-rows-2 ${hasRiveBento ? '' : 'md:h-[400px]'}` : 'w-full'}>
            {renderBentoItem(project.bentoImage, project.bentoAlt, 'w-full max-md:h-auto md:h-full md:row-span-2', true)}
            {project.bentoImage2 && renderBentoItem(project.bentoImage2, project.bentoAlt2, project.bentoImage2.endsWith('.riv') ? 'w-full' : 'w-full max-md:h-auto md:h-full')}
            {project.bentoImage3 && renderBentoItem(project.bentoImage3, project.bentoAlt3, project.bentoImage3.endsWith('.riv') ? 'w-full' : 'w-full max-md:h-auto md:h-full')}
          </div>

          <div className="mx-auto flex w-full max-w-[65ch] flex-col items-center gap-2 text-center">
            <span className="font-mono text-base uppercase tracking-tight text-text-tertiary sm:text-lg">
              {project.year} · {project.company} · {project.industry}
            </span>

            <h1>{project.title}</h1>

            <p className="text-[clamp(1.25rem,2vw,1.5rem)] leading-8 tracking-tight md:leading-9">
              {project.tagline}
            </p>

            <div className="inline-flex w-fit gap-x-2 gap-y-3 mt-2 flex-wrap">
              {badges.map((badge) => (
                <p key={badge} className="badge">{badge}</p>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
