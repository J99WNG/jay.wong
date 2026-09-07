'use client';

import Section from "../Section";
import ImageDeck from "../ui/ImageDeck";
import StrengthsTimeline from "../ui/StrengthsTimeline";
import ToolsDeck from "../ui/ToolsGrid";

export default function AboutDraft() {
  return (
    <Section id="about">
      <div className="section-grid">
        <div className="section-heading">
          <h2>
            About me
            <br />
            <span className="font-normal text-text-tertiary">
              Curious by nature. Practical by design.
            </span>
          </h2>
        </div>

        <div className="inline-flex max-w-full flex-col gap-12">
          <div className="flex flex-col gap-7">
            <p className="lead">
              I&apos;m Jay, a product designer that enjoys simplifying complex things. I&apos;ve spent the past seven years asking
              awkward questions, spotting patterns, and helping teams turn
              fuzzy ideas into products people can actually use.
            </p>
          </div>

          <ImageDeck />

          <div className="content-block flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <h3>How I show up</h3>
              <p className="lead">
                I&apos;m usually the person asking one more “why?”, prompting a
                thought to make it tangible, or bringing the right people into
                the same conversation. I like structure, but I&apos;m not precious
                about process. My aim is always to understand what matters and
                make something useful.
              </p>
            </div>

            <StrengthsTimeline />
          </div>

          <div className="content-block flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h3>Tools I work with</h3>
              <p>A practical mix for designing, aligning, building, and shipping.</p>
            </div>

            <ToolsDeck />
          </div>
        </div>
      </div>
    </Section>
  );
}
