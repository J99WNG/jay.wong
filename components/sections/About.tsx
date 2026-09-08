'use client';

import Section from "../Section";
import ImageDeck from "../ui/ImageDeck";
import StrengthsTimeline from "../ui/StrengthsTimeline";
import ToolsGrid from "../ui/ToolsGrid";

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

        <div className="section-content">
            <p className="lead">
              I have an innate fascination to simplify complex things through the lens of design. I&apos;ve spent the past seven years asking
              awkward questions, spotting patterns, and helping teams turn
              fuzzy ideas into products people can actually use.
            </p>

            <ImageDeck />

            <div className="content-block">
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

            <div className="content-block">
              <h3>Tools I work with</h3>
              <p>A practical mix for designing, aligning, building, and shipping.</p>
            </div>

            <ToolsGrid />
        </div>
      </div>
    </Section>
  );
}
