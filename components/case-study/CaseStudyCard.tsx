// components/CaseStudyCard.tsx
import Image from "next/image";
import TextLink from "@/components/ui/TextLink";
import type { CaseStudy } from "@/content/caseStudies";
import { ArrowRight, Lock } from 'lucide-react';

export function CaseStudyCard({ project }: { project: CaseStudy }) {
  const { slug, year, company, industry, title, tagline, badges, bentoImage, available } = project;
  const accessRequestSubject = `Access request: ${title}`;
  const accessRequestBody = `Hi Jay,\n\nI've just come across your portfolio and would love to learn more about the case study “${title}”. Could you please share access with me?\n\nThanks!`;
  const accessRequestHref = `mailto:hello@jaywong.digital?subject=${encodeURIComponent(accessRequestSubject)}&body=${encodeURIComponent(accessRequestBody)}`;

  return (
    <article className="card md:flex-row motion-safe:focus-within:scale-104 motion-safe:hover:scale-104 motion-safe:active:scale-104 motion-safe:transition-[scale,border-color,box-shadow] motion-safe:duration-[var(--motion-duration-standard)] motion-safe:ease-[var(--motion-ease-spring)]">
      {/* Card Content */}
      <div className="flex md:w-1/2 flex-col gap-2 p-6">
        <p className="meta-label">
          {year} · {company} · {industry}
        </p>

        <h3>{title}</h3>

        <p>{tagline}</p>

        <div className="inline-flex gap-x-2 gap-y-3 mt-2 flex-wrap">
          {badges.map((badge) => (
            <p key={badge} className="badge">{badge}</p>
          ))}
        </div>

        <TextLink
          className="mt-2 cursor-pointer justify-start gap-1"
          href={available ? `/${slug}` : accessRequestHref}
        >
          {available ? 'View case study' : 'Request access'}
          {available ? (
            <ArrowRight aria-hidden="true" size={16} className="motion-icon-right" />
          ) : (
            <Lock aria-hidden="true" size={16} className="motion-icon-right" />
          )}
        </TextLink>
      </div>

      {/* Card Image */}
      <div className="relative flex md:w-1/2 w-full aspect-video md:min-h-auto">
        <Image 
          className="block w-full h-full object-cover"
          src={bentoImage} alt={title} fill />
      </div>
    </article>
  );
}
