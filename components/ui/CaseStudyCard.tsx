// components/CaseStudyCard.tsx
import Image from "next/image";
import TextLink from "./TextLink";
import type { CaseStudy } from "@/app/data/caseStudies";

export function CaseStudyCard({ project }: { project: CaseStudy }) {
  // `logo` is retained for the planned branded card treatment.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { slug, year, company, logo, industry, title, tagline, badges, bentoImage, available } = project;

  return (
    <article className="card motion-safe:focus-within:scale-104 motion-safe:hover:scale-104 motion-safe:active:scale-104 motion-safe:transition-[scale,border-color,box-shadow] motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.25,1,0.5,1)]">
      <div className="card-content p-8 px-7">

        <p className="small">
          {year} · {company} · {industry}
        </p>

        <h3 className="card-title">{title}</h3>

        <p className="card-text">{tagline}</p>

        <div className="inline-flex gap-x-2 gap-y-3 my-2 flex-wrap">
          {badges.map((badge) => (
            <p key={badge} className="badge">{badge}</p>
          ))}
        </div>

        {/* Only show the link if the case study is live */}
        {available && (
          <TextLink className="mt-2 cursor-pointer justify-start gap-1" href={`/${slug}`}>
            View case study
            <span className="icon icon-sm" aria-hidden="true">
              <span className="material-symbols-rounded arrow_forward">arrow_forward</span>
            </span>
          </TextLink>
        )}

      </div>

      <div className="card-img">
        <Image src={bentoImage} alt={title} fill />
      </div>
    </article>
  );
}
