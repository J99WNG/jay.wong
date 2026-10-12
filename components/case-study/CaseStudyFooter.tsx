import { CaseStudyCard } from '@/components/case-study/CaseStudyCard';
import CaseStudyCarousel from '@/components/case-study/CaseStudyCarousel';
import { caseStudies } from '@/content/caseStudies';

type CaseStudyFooterProps = {
  currentSlug: string;
};

const MAX_CASE_STUDIES = 3;

export default function CaseStudyFooter({ currentSlug }: CaseStudyFooterProps) {
  // Only promote published work, never repeat the case study someone just read,
  // and keep the footer concise for hiring managers scanning the portfolio.
  const relatedCaseStudies = caseStudies
    .filter((caseStudy) => caseStudy.available && caseStudy.slug !== currentSlug)
    .slice(0, MAX_CASE_STUDIES);

  if (!relatedCaseStudies.length) return null;

  return (
    <section
      className="bg-bg-primary py-25"
      aria-labelledby="more-case-studies-heading"
      data-case-study-navigation="exclude"
    >
      {/* This section deliberately sits outside the case-study <article>, so it
          is not collected by CaseStudyNavigation's article-section query. */}
      <div className="page-container">
        <div className="section-grid">
          <div className="section-heading">
            <h2>Not yet convinced? <br />
              <span className="section-subtitle">
                Read another one.
              </span>
            </h2>
          </div>

          <div className="section-content">
            <div className="content-block">
              <p className="lead">
                See how I approach different products, teams, and constraints.
              </p>
            </div>

            {/* Desktop cards live inside the section content column and use the
                established horizontal card composition. */}
            <ul className="hidden flex-col gap-6 md:flex" aria-label="Other available case studies">
              {relatedCaseStudies.map((project) => (
                <li key={project.slug} className="flex min-w-0">
                  <CaseStudyCard project={project} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* The timed, looping carousel is a mobile-only enhancement. */}
        <div className="mt-10 md:hidden">
          <CaseStudyCarousel projects={relatedCaseStudies} />
        </div>
      </div>
    </section>
  );
}
