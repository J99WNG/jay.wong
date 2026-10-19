import type { ReactNode } from 'react';

import Section from '@/components/layout/Section';
import ProjectMetadata, { type ProjectMetadataItem } from '@/components/case-study/ProjectMetadata';
import BrandMark from '@/components/ui/BrandMark';
import type { CaseStudy } from '@/content/caseStudies';

type ImpactType = 'Measured impact' | 'Projected impact';

type CaseStudySnapshotProps = {
  project: Pick<CaseStudy, 'company' | 'logo'>;
  subtitle?: string;
  problem: ReactNode;
  intervention: ReactNode;
  impact: ReactNode;
  impactType: ImpactType;
  impactContext?: string;
  deliveryStatus: ReactNode;
  metadata: readonly ProjectMetadataItem[];
};

export default function CaseStudySnapshot({
  project,
  subtitle = 'The “too long didn’t read”.',
  problem,
  intervention,
  impact,
  impactType,
  impactContext,
  deliveryStatus,
  metadata,
}: CaseStudySnapshotProps) {
  const impactLabel = impactContext ? `${impactType} · ${impactContext}` : impactType;

  return (
    <Section id="snapshot">
      <div className="section-grid">
        <div className="section-heading">
          <h2>
            Snapshot
            <br />
            <span className="section-subtitle">{subtitle}</span>
          </h2>
        </div>

        <div className="section-content">
          <div className="content-block content-flow">
            <p className="meta-label">Problem</p>
            {problem}
          </div>

          <div className="content-block content-flow">
            <p className="meta-label">Intervention</p>
            {intervention}
          </div>

          <div className="content-block content-flow">
            <p className="meta-label">{impactLabel}</p>
            {impact}
          </div>

          <div className="content-block content-flow">
            <p className="meta-label">Delivery status</p>
            {deliveryStatus}
          </div>

          <ProjectMetadata
            items={[
              {
                label: 'Company',
                value: project.logo ? (
                  <span className="inline-flex items-center gap-2">
                    <BrandMark src={project.logo} size="sm" />
                    {project.company}
                  </span>
                ) : project.company,
              },
              ...metadata,
            ]}
          />
        </div>
      </div>
    </Section>
  );
}
