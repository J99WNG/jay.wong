// components/CaseStudyCard.tsx
import Image from "next/image";
import TextLink from "./TextLink";
import type { CaseStudy } from "@/app/data/caseStudies";
import Icon from "./Icon";

export function CaseStudyCard({ project }: { project: CaseStudy }) {
  // `logo` is retained for the planned branded card treatment.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { slug, year, company, logo, industry, title, tagline, badges, bentoImage, available } = project;

  return (
    <article className="card motion-safe:focus-within:scale-104 motion-safe:hover:scale-104 motion-safe:active:scale-104 motion-safe:transition-[scale,border-color,box-shadow] motion-safe:duration-[var(--motion-duration-standard)] motion-safe:ease-[var(--motion-ease-spring)]">
      <div className="flex flex-1 md:w-1/2 flex-col gap-2 p-8 px-7">
        <p className="small">
          {year} · {company} · {industry}
        </p>

        <h3>{title}</h3>

        <p>{tagline}</p>

        <div className="inline-flex gap-x-2 gap-y-3 mt-2 flex-wrap">
          {badges.map((badge) => (
            <p key={badge} className="badge">{badge}</p>
          ))}
        </div>

        {/* Only show the link if the case study is live */}
        {available && (
          <TextLink className="mt-2 cursor-pointer justify-start gap-1" href={`/${slug}`}>
            View case study
            <Icon name="arrow-right" size="sm" motion="right" />
          </TextLink>
        )}
      </div>

      <div className="relative flex md:w-1/2 w-full aspect-video md:min-h-auto">
        <Image 
          className="block w-full h-full object-cover"
          src={bentoImage} alt={title} fill />
      </div>
    </article>
  );
}
