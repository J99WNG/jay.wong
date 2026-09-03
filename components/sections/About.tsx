import Section from "../Section";
import ShuffleDeck from "../ui/ShuffleDeck";

const skills = [
    "UX Research",
    "UI Design",
    "Design systems",
    "Accessible design",
    "Inclusive design",
    "Conversational AI",
    "Systems thinking",
    "Agile / Scrum Delivery",
    "ServiceNow",
    "HTML",
    "CSS",
    "Next.js",
    "Tailwind",
  ];

  const strengths = [
    {
        icon: "account_tree",
        title: "Strategic Operator",
        text: "Turns ambiguous opportunities into clear product direction, practical priorities, and measurable outcomes."
    },
    {
        icon: "category",
        title: "Cross-Functional Partner",
        text: "Creates alignment across design, engineering, business, and globally distributed teams."
    },
    {
        icon: "search_insights",
        title: "Evidence-Led Designer",
        text: "Grounds decisions in research, behavioural data, usability testing, and real user needs."
    },
    {
        icon: "diversity_4",
        title: "Agentic Builder",
        text: "Uses Claude, Codex, Cursor, and MCP-connected workflows to accelerate research, prototyping, design systems, and product operations."
    }
];

export default function About() {
    return (
        <Section id="about">
            <div className="section-grid">
                <div className="section-heading">
                    <h2>About me
                    <br />
                    <span className="font-normal text-text-tertiary">To observe first.</span>
                    </h2>
                </div>

                <div className="inline-flex max-w-full flex-col gap-10">
                    <p className="lead">
                        I build, navigate, and explore the world through the lens of design. I grew up chasing each generation of Nintendos and Sony Ericssons, which shaped my fascination for tech.
                    </p>

                    <ShuffleDeck />

                    <p className="lead">
                        Growing up, I wasn’t the loudest person in the room. I paid attention. I noticed patterns in how people interacted, how spaces made others feel, how small details could change the tone of a conversation. That instinct – to observe before reacting – quietly became the foundation of how I solve problems today.
                    </p>
                    
                    <ul className="inline-flex gap-x-2 gap-y-3 my-2 flex-wrap list-none p-0">
                        {skills.map((skill) => (
                            <li key={skill} className="badge">
                            {skill}
                            </li>
                        ))}
                    </ul>

                    <div className="grid place-items-start justify-start md:place-items-stretch gap-6 grid-cols-1 sm:grid-cols-2">
                        {strengths.map((item) => (
                            <div className="card" key={item.title}>
                                <div className="card-content px-7 py-6">
                                    <span className="icon icon-xl" aria-hidden="true">
                                        <span className="material-symbols-rounded text-accent-primary" translate="no">
                                            {item.icon}
                                        </span>
                                    </span>

                                    <p className="lead">{item.title}</p>

                                    <p className="card-text">{item.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    )
}
