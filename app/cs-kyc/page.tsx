import CaseStudyContent from './_components/CaseStudyContent';
import { caseStudies } from '@/content/caseStudies';
import { createCaseStudyMetadata } from '@/content/siteMetadata';

const project = caseStudies.find((study) => study.slug === 'cs-kyc')!;

export const metadata = createCaseStudyMetadata(project);

export default function Page() {
  return <CaseStudyContent />;
}
