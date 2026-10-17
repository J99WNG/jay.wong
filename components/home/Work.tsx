'use client';

import Section from '@/components/layout/Section';
import { caseStudies } from "@/content/caseStudies";
import { CaseStudyCard } from "@/components/case-study/CaseStudyCard";
import StreamingText from "@/components/ui/StreamingText";

export default function Work() {
    return (
        <Section id="work" stickyHeading={false}>
            <div className="section-grid">

                <div className="section-heading">
                    <h2>Featured work
                    <br />
                    <span className="section-subtitle">A few problems I've helped solve.</span>
                    </h2>
                </div>

                <div className="section-content">
                    <div className="content-block">
                        <StreamingText className="lead">
                            Explore a selection of my work. Get a feel for how I think, collaborate, and design. If it resonates, there’s always room to build something great together.
                        </StreamingText>
                    </div>
                </div>
            </div>

            <ul
                className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 [&>li>article>div]:transition-[filter] [&>li>article>div]:duration-[var(--motion-duration-standard)] [&>li>article>div]:ease-[var(--motion-ease-in-out)] [&:has(>li>article:is(:hover,:focus-within,[data-touch-active='true']))>li>article:not(:is(:hover,:focus-within,[data-touch-active='true']))>div]:grayscale"
                aria-label="Featured case studies"
            >
                {caseStudies.map((project, index) => (
                    <li key={project.slug} className={`flex min-w-0 ${index === 0 ? 'md:col-span-2' : ''}`}>
                        <CaseStudyCard
                            project={project}
                            layout={index === 0 ? 'responsive' : 'stacked'}
                        />
                    </li>
                ))}
            </ul>
        </Section>
    )
};
