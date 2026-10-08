import CaseStudyContent from './_components/CaseStudyContent';
import { caseStudies } from '@/content/caseStudies';
import { createCaseStudyMetadata } from '@/content/siteMetadata';
import { notFound } from 'next/navigation';

const project = caseStudies.find((study) => study.slug === 'mathsgenie')!;

export function generateMetadata() {
  if (!project.available && process.env.NODE_ENV === 'production') notFound();

  return createCaseStudyMetadata(project);
}

export default function Page() {
  if (!project.available && process.env.NODE_ENV === 'production') notFound();

  return <CaseStudyContent />;
}
