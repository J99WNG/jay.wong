import Section from "../Section";
import ShuffleDeck from "../ui/ShuffleDeck";
import StrengthsTimeline from "../ui/StrengthsTimeline";
import ToolsDeck from "../ui/ToolsGrid";

const proofPoints = [
  { value: "7 years", label: "Designing digital products" },
  { value: "87,000+", label: "Enterprise employees reached" },
  { value: "≈250,000", label: "Students reached" },
] as const;

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

            <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {proofPoints.map((item) => (
                <div
                  key={item.label}
                  className="card flex flex-col gap-1 py-5 px-5"
                >
                  <dt className="order-2 text-sm tracking-tight text-text-tertiary">
                    {item.label}
                  </dt>
                  <dd className="order-1 m-0 text-2xl font-medium tracking-tight text-text-primary">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <ShuffleDeck />

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

          <div className="content-block flex flex-col gap-6">
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
