import Section from "../Section";

const skills = [
    "UX Research",
    "UI Design",
    "Design systems",
    "Accessible design",
    "Inclusive design",
    "Conversational AI",
    "Systems thinking",
    "Agile methodology",
    "ServiceNow",
    "HTML",
    "CSS",
    "Next.js",
    "Tailwind",
  ];

  const strengths = [
    {
        icon: "account_tree",
        title: "Strategic Organiser",
        text: "I keep teams aligned, focused, and moving fast. Kanbans and PBIs are nothing new to me."
    },
    {
        icon: "category",
        title: "Cross-Functional",
        text: "Fluency across design, IT, and business – I turn gaps into shared understanding."
    },
    {
        icon: "search_insights",
        title: "Evidence-Led",
        text: "My decisions are grounded in research, data, and real user needs – not assumptions."
    },
    {
        icon: "diversity_4",
        title: "Collaborative Owner",
        text: "I lead with trust and shared ownership, driving outcomes together, not alone."
    }
];

export default function About() {
    return (
        <Section id="about">
            <div className="col-30-70">
                <div className="section-heading">
                    <h2>About me
                    <br />
                    <span className="section-subheading">To observe first.</span>
                    </h2>
                </div>

                <div className="section-content">
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
                                        <span className="material-symbols-rounded card-icon" translate="no">
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