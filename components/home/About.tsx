'use client';

import Section from '@/components/layout/Section';
import ImageDeck from "./ImageDeck";
import StrengthsTimeline from "./StrengthsTimeline";
import TechStack from "./TechStack";
import StreamingText from "../ui/StreamingText";

export default function About() {
  return (
    <Section id="about">
      <div className="section-grid">
        <div className="section-heading">
          <h2>
            About me
            <br />
            <span className="section-subtitle">
              Curious by nature. Practical by design.
            </span>
          </h2>
        </div>

        <div className="section-content">
            <StreamingText className="lead">
              I have an innate fascination to simplify complex things through the lens of design. I&apos;ve spent the past seven years asking
              awkward questions, spotting patterns, and helping teams turn
              fuzzy ideas into products people can actually use.
            </StreamingText>

            <ImageDeck />

            <div className="content-block">
              <h3>How I show up</h3>
              <StreamingText className="lead">
                I&apos;m usually the person asking one more “why?”, prompting a
                thought to make it tangible, or bringing the right people into
                the same conversation. I like structure, but I&apos;m not precious
                about process. My aim is always to understand what matters and
                make something useful.
              </StreamingText>
            </div>

            <StrengthsTimeline />

            <div className="content-block content-flow">
              <h3>Tech stack</h3>
              <p>A practical mix for designing, aligning, building, and shipping.</p>

              <TechStack />
            </div>


        </div>
      </div>
    </Section>
  );
}
