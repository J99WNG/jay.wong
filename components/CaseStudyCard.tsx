// components/CaseStudyCard.tsx
import Image from "next/image";
import TextLink from "./ui/TextLink";
import type { CaseStudy } from "@/app/data/caseStudies";

export function CaseStudyCard({ project }: { project: CaseStudy }) {
  const { slug, year, company, industry, title, tagline, badges, bentoImage, available } = project;

  return (
    <article className="card">
      <div className="card-content card-padding-lg">

        <p className="small">
          {year} / {company} / {industry}
        </p>

        <h3 className="card-title">{title}</h3>

        <p className="card-text">{tagline}</p>

        <div className="badge-group">
          {badges.map((badge) => (
            <p key={badge} className="badge">{badge}</p>
          ))}
        </div>

        {/* Only show the link if the case study is live */}
        {available && (
          <TextLink className="card-link" href={`/${slug}`}>
            View case study
            <span className="icon icon-sm" aria-hidden="true">
              <span className="material-symbols-rounded">arrow_forward</span>
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