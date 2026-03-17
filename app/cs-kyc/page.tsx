import Section from '@/components/Section';
import Image from 'next/image';
import FigureModal from '@/components/ui/FigureModal';
import { GalleryProvider } from '@/components/ui/GalleryContext';
import NextProjectCTA from '@/components/NextProjectCTA';
import { caseStudies } from "@/app/data/caseStudies";

const project = caseStudies.find((s) => s.slug === "cs-kyc")!;

export default function Page() {
    return (
        <GalleryProvider>
            <article>
                <Section id="landing" isLanding={true}>
                    <NextProjectCTA />

                    <div className="title-block">
                        <p className="small">
                            {project.year} / {project.company} / {project.industry}
                        </p>
                        <h1>{project.title}</h1>
                        <p className="tagline">{project.tagline}</p>
                    </div>

                    <div className="bento-grid">
                        <div className="bento-item tall">
                            <Image
                                    src={project.bentoImage}
                                    alt="Featured Project"
                                    fill // Makes image fill the container
                                    priority // Ensures this image loads fast
                                />
                        </div>

                        <div className="bento-item">
                            <Image
                                    src={project.bentoImage2}
                                    alt=""
                                    fill // Makes image fill the container
                                />
                        </div>

                        <div className="bento-item">
                            <Image
                                    src={project.bentoImage3}
                                    alt=""
                                    fill // Makes image fill the container
                                />
                        </div>
                    </div>
                </Section>

                <Section id="Snapshot">
                    <div className="col-30-70">

                        <div className="section-heading">
                            <h2>Snapshot
                            <br/>
                            <span className="section-subtitle">The “too long didn&apos;t read”.</span>
                            </h2>
                        </div>

                        <div className="section-content">
                            <div className="content-block">
                                <p className="small">Problem</p>
                                <p>Relationship Managers at Credit Suisse had no single platform to manage client tasks, KYC deadlines, portfolio data, and market intelligence. Everything lived across disconnected systems, pulling RMs away from clients and into unnecessary admin.</p>
                            </div>
                            
                            <div className="content-block">
                                <p className="small">Outcome</p>
                                <p>Designed and shipped RM Suite, a conceptual mobile solution bringing everything into one clean, secured interface – covering tasks, reminders, client profiles, live market data, and portfolio access.</p>
                            </div>

                            <div className="content-block">
                                <p className="small">Impact</p>

                                <p>Top 3 finalist out of 10 competing teams at a bi-annual Employer Showcase. Prototype validated directly by Credit Suisse's Regional Head of IT and a serving Relationship Manager.</p>
                            </div>
                            
                            <div className="grid-layout">
                                <div className="metadata">
                                    <p className="small">Company</p>

                                    <p>
                                        <span className="icon icon-inline icon-md">
                                        <img 
                                        src="/assets/logos/creditsuisse-symbol.svg"
                                        alt="credit suisse"
                                        loading="lazy"
                                        />
                                        </span> Credit Suisse</p>
                                </div>

                                <div className="metadata">
                                    <p className="small">Year / Industry</p>

                                    <p>2020 · FinTech</p>
                                </div>

                                <div className="metadata">
                                    <p className="small">Role</p>

                                    <p>Product Manager / Designer</p>
                                </div>

                                <div className="metadata">
                                    <p className="small">Timeline</p>

                                    <p>8 months
                                        <br />
                                        (Discovery → Proof of Concept)</p>
                                </div>

                                <div className="metadata">
                                    <p className="small">Scale</p>

                                    <p>1,140+ Relationship Managers, 36 locations, 25 countries, CHF 645 billion AUM</p>
                                </div>

                                <div className="metadata">
                                    <p className="small">Team</p>

                                    <p>5 people (Project Manager, Lead Developer, Project Analyst, Business Analyst, Research Analyst)</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </Section>

                <div className="container">
                <hr className="divider" />
                </div>

                <Section id="context">
                    <div className="col-30-70">

                        <div className="section-heading">
                            <h2>Business context
                            <br/>
                            <span className="section-subtitle">Why it mattered.</span>
                            </h2>
                        </div>

                        <div className="section-content">
                            <div className="content-block">
                                <p className="lead">Credit Suisse's International Wealth Management division manages CHF 645 billion in assets, serving ultra-high-net-worth clients across Europe, the Middle East, Africa, and Latin America. At the centre of that operation sits the <strong>Relationship Manager.</strong></p>

                                <p>The bank's strategy was built on three priorities:</p>
                                
                                <ol>
                                    <li>
                                        Delivering client value
                                    </li>

                                    <li>
                                        Enhancing client proximity
                                    </li>

                                    <li>
                                        Maximising face time with clients
                                    </li>
                                </ol>
                
                                <p>What was actually happening looked quite different. RMs were spending significant parts of their day navigating disconnected systems, chasing KYC documentation, and managing admin that pulled them away from the people they were supposed to be advising.</p>

                                <p>Credit Suisse had invested heavily in its wealth management infrastructure. But the tools being used by the people closest to clients hadn't kept pace. There was an internal CRM and a calendar system, but nothing that put the full picture of an RM's day into a single, mobile-first surface. The result was a productivity gap that had a direct impact on the division's ability to meet its own strategic goals.</p>
                                
                                <blockquote className="notion-quote">
                                    This was the brief that landed in front of our team in September 2019.
                                </blockquote>
                            </div>
                        </div>
                    
                    </div>
                </Section>

                <div className="container">
                    <hr className="divider" />
                </div>

                <Section id="role" aria-labelledby="role-heading">
                    <div className="col-30-70">

                        <div className="section-heading">
                            <h2 className="section-title">My role
                            <br/>
                            <span className="section-subtitle">Ownership and strategic focus.</span>
                            </h2>
                        </div>

                        <div className="section-content">
                            <div className="content-block">
                                <p className="lead">As the sole Product Designer embedded within the delivery squad, I was responsible for:</p>

                                <ul>
                                    <li>Leading 6-weeks of discovery across UK, US, India and the Caribbean.</li>
                                    <li>Facilitated stakeholder alignment across workplace operations, IT and regional office teams.</li>
                                    <li>Steering a squad of ServiceNow developers between India and Bulgaria to balance UX ambitions with platform constraints.</li>
                                    <li>Shaped the global rollout strategy by leading data collection across 50+ workplace locations, identifying early adopters and translating operational insights into the core problem statements and experience principles for the programme.</li>
                                    <li>Influenced the move towards a consolidated global information architecture.</li>
                                    <li>Led the end-to-end experience design for the global workplace hub within ServiceNow.</li>
                                </ul>
                            </div>
                            
                            <div className="content-block">
                                <p className="lead">Strategically, I focused on:</p>

                                <ul>
                                    <li>Simplification over feature expansion.</li>
                                    <li>Global consistency with regional flexibility.</li>
                                    <li>Shift user behaviour for adoption, not just launch.</li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </Section>

                <div className="container">
                    <hr className="divider" />
                </div>

                <Section id="discovery" aria-labelledby="discovery-heading">
                    <div className="col-30-70">

                        <div className="section-heading">
                            <h2 className="section-title">Discovery and research
                            <br/>
                            <span className="section-subtitle">Uncovering the insights.</span>
                            </h2>
                        </div>

                        <div className="section-content">
                            <p className="lead">Through workshops, interviews, journey mapping, office observation and platform audits, several patterns emerged.</p>

                            <blockquote className="notion-quote">
                                This wasn’t just a UX issue. It was an operating model issue.
                            </blockquote>

                            <div className="content-block">
                                <h3>Workplace services varied by location, not just region</h3>
                                
                                <p>Desk booking, catering, parking and vendors differed office-by-office, significantly impacting how we approach IA and backend logic.</p>
                                    
                                <FigureModal
                                    src="assets/images/case-study-2/ow-discovery-1.png"
                                    alt=""
                                    caption="One location was operating workplace services through more than 8 different touchpoints, scattered across SharePoint pages. This was a repeating theme."
                                />

                            </div>

                            <div className="content-block">
                                <h3>Content was deeply fragmented</h3>
                                
                                <p>Information and services lived across SharePoint, Viva Engage, PowerApps and local documents.</p>

                                <FigureModal
                                    src="assets/images/case-study-2/ow-discovery-2.png"
                                    alt=""
                                    caption="My audit mapping of our Houston location revealed various systems and platforms in use across different service categories. This fragmentation was consistent across London and Pune, underscoring the need for consolidation and a unified approach."
                                />
                            </div>

                            <div className="content-block">
                                <h3>Search was not trusted</h3>
                                
                                <p>'Bookmarking' was a common behaviour observed, signalling low confidence in findability.</p>

                                <FigureModal
                                    src="assets/images/case-study-2/ow-discovery-3.png"
                                    alt=""
                                    caption="Users bypassed the system via bookmarks, reducing visibility and governance. This was a critical insight that informed our focus on improving navigation and information architecture."
                                />
                            </div>

                            <div className="content-block">
                                <h3>Culture influenced behaviour</h3>
                                
                                <p>In some office locations, support depended on “who you know” rather than formal processes.</p>

                                <FigureModal
                                    src="assets/images/case-study-2/ow-discovery-4.png"
                                    alt=""
                                    caption="Interviews in the Trinidad and Pune locations revealed a strong reliance on informal networks for accessing workplace services. Employees often bypassed official channels, preferring to ask colleagues directly for support. This highlighted the need for a more intuitive and trustworthy digital experience to encourage adoption of formal processes."
                                />
                            </div>

                            <div className="content-block">
                                <h3>Governance gaps existed</h3>
                                
                                <p>One regional office wasn’t even enrolled in the global workplace portfolio, exposing potential structural misalignment.</p>

                                <FigureModal
                                    src="assets/images/case-study-2/ow-discovery-5.png"
                                    alt=""
                                    caption="A single workplace request often crossed multiple platforms and teams, making governance unclear, fragmenting the UX and increased operational overhead."
                                />
                            </div>
                        </div>
                    </div>
                </Section>

                <div className="container">
                    <hr className="divider"/>
                </div>

                <Section id="problem" aria-labelledby="problem-definition">
                    <div className="col-30-70">

                        <div className="section-heading">
                            <h2>Problem definition
                            <br/>
                            <span className="section-subtitle">Sharpening the focus.</span>
                            </h2>
                        </div>

                        <div className="section-content">
                            <div className="content-block">
                                <p className="lead">I reframed the challenge from:</p>

                                <blockquote className="notion-quote">
                                    “Improve digital workplace services through an employee portal”
                                </blockquote>

                                <p>to</p>

                                <blockquote className="notion-quote">
                                    <p className="small">How might we</p>
                                    Reduce friction in accessing workplace support globally, while lowering operational cost?
                                </blockquote>
                            </div>
                            
                            <div className="content-block">
                                <p>Core design problems include:</p>

                                <div className="grid-layout">
                                    <div className="card">
                                        <div className="card-content card-padding-sm">
                                            <span className="icon icon-xl" aria-hidden="true">
                                                <span className="material-symbols-rounded card-icon" translate="no">explore</span>
                                            </span>
                            
                                            <p className="card-text">Navigation mirrored internal teams, not colleague intent.</p>
                                        </div>
                                    </div>

                                    <div className="card">
                                        <div className="card-content card-padding-sm">
                                            <span className="icon icon-xl" aria-hidden="true">
                                                <span className="material-symbols-rounded card-icon" translate="no">quick_reference</span>
                                            </span>
                            
                                            <p className="card-text">Knowledge and ticketing journeys were disconnected.</p>
                                        </div>
                                    </div>

                                    <div className="card">
                                        <div className="card-content card-padding-sm">
                                            <span className="icon icon-xl" aria-hidden="true">
                                                <span className="material-symbols-rounded card-icon" translate="no">location_on</span>
                                            </span>
                            
                                            <p className="card-text">Regional inconsistency created cognitive overload.</p>
                                        </div>
                                    </div>

                                    <div className="card">
                                        <div className="card-content card-padding-sm">
                                            <span className="icon icon-xl" aria-hidden="true">
                                                <span className="material-symbols-rounded card-icon" translate="no">family_history</span>
                                            </span>
                            
                                            <p className="card-text">Multi-platform governance increased complexity.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                    </div>
                </Section>

                <div className="container">
                    <hr className="divider" />
                </div>

                <Section id="goals" aria-labelledby="goals-heading">
                    <div className="col-30-70">
                    
                        <div className="section-heading">
                            <h2>Goals &amp; KPIs
                            <br/>
                            <span className="section-subtitle">Defining what we want to solve.</span>
                            </h2>
                        </div>

                        <div className="section-content">
                            <div className="content-block">
                                <h3>Experience goals</h3>

                                <ol>
                                    <li>Reduce time-to-find-service.</li>
                                    <li>Improve clarity of requests status such as for office access or maintenance requests.</li>
                                    <li>Create a globally consistent but locally adaptable framework.</li>
                                </ol>
                            </div>

                            <div className="content-block">
                                <h3>Business goals</h3>

                                <ol>
                                    <li>Reduce reliance on Microsoft SharePoint.</li>
                                    <li>Consolidate workplace services under one platform.</li>
                                    <li>Align digital workplace experience with the physical office journey.</li>
                                </ol>
                            </div>
                        </div>

                    </div>
                </Section>

                <div className="container">
                    <hr className="divider" />
                </div>

                <Section id="ideation" aria-labelledby="ideation-heading">
                    <div className="col-30-70">
                        <div className="section-heading">
                            <h2>Ideation
                            <br/>
                            <span className="section-subtitle">Thinking outside the box.</span>
                            </h2>
                        </div>

                        <div className="section-content">
                            <p className="lead">This wasn’t a blue-sky redesign. This problem demanded more than just changing a few colours and links.</p>

                            <div className="content-block">
                                <p>Stakeholders were clear:</p>

                                <blockquote className="notion-quote">
                                    Consolidate onto ServiceNow and reduce licensing overhead.
                                </blockquote>
                            </div>

                            <div className="content-block">
                                <p className="lead">
                                    Our challenge was designing a simplified, scalable framework that could:
                                </p>

                                <ul>
                                    <li>Be rolled out in phases to minimise technical debt.</li>
                                    <li>Encourage behavioural change and user adoption.</li>
                                    <li>Support varying levels of service maturity across locations and regions.</li>
                                </ul>
                            </div>

                            <div className="content-block">
                                <p className="lead">We iterated from lightweight structural improvements to a fully outcome-led navigation model.</p>

                                <FigureModal
                                    src="/assets/images/case-study-2/ow-ideation-1.png"
                                    alt=""
                                    caption="To ensure design decisions remained grounded in research, I mapped key insights to experience principles and implementation approaches within the ServiceNow platform."
                                />

                                <FigureModal
                                    src="/assets/images/case-study-2/ow-ideation-2.png"
                                    alt=""
                                    caption="A systems-level blueprint mapping the workplace landing experience to the underlying ServiceNow workflows, SharePoint content and external service providers. The architecture allows services, announcements and workplace contacts to dynamically adapt based on employee's home or selected location."
                                />

                                <FigureModal
                                    src="/assets/images/case-study-2/ow-ideation-3.png"
                                    alt=""
                                    caption="UX/UI artefacts went through extensive validation with stakeholders and developers to balance experience ambitions with platform capabilities. This included detailed wireframes, click-through prototypes and design system components aligned to ServiceNow's out-of-the-box (OOTB) performance."
                                />

                                <FigureModal
                                    src="/assets/images/case-study-2/ow-ideation-4.png"
                                    alt=""
                                    caption="Aside from the end-user experience, I defined the onboarding process for workplace locations to enable their services within our ServiceNow model. This work helped establish a scalable foundation for rolling out the workplace experience across 50+ global office locations."
                                />
                            </div>
                        </div>
                    </div>
                </Section>

                <div className="container">
                    <hr className="divider" />
                </div>

                <Section id="solution" aria-labelledby="solution-heading">
                    <div className="col-30-70">
                        <div className="section-heading">
                            <h2>The solution
                            <br/>
                            <span className="section-subtitle">Reimagining the digital workplace.</span>
                            </h2>
                        </div>

                        <div className="section-content">

                            <div className="content-block">
                                <FigureModal
                                    src="assets/images/case-study-2/ow-solution-1.png"
                                    alt=""
                                    caption="I prioritised the constraints of ServiceNow’s out-of-the-box (OOTB) components to ensure a scalable, maintainable solution. I adapted these patterns to bp's design system to deliver a familiar and recognisable digital experience."
                                />

                                <h3>
                                    Action-orientated, focused navigation
                                </h3>

                                <p>Clear, plain-language categories such as:</p>

                                <ul>
                                    <li>
                                    “Book a desk, room or locker”
                                    </li>

                                    <li>
                                    “Access and security”
                                    </li>

                                    <li>
                                    “Equipment and IT”
                                    </li>

                                    <li>
                                    “Shuttle service”
                                    </li>
                                </ul>

                                <blockquote className="notion-quote">
                                    Pairing this with the <a href="https://lawsofux.com/" target="_blank">laws of UX</a>, we reduced cognitive load and aligned navigation with real-world tasks.
                                </blockquote>
                            </div>

                            <div className="content-block">
                                <FigureModal
                                    src="assets/images/case-study-2/ow-solution-2.png"
                                    alt=""
                                    caption="I proposed a three-tier model to balance global standardisation with regional readiness. Rather than enforcing a single solution, the framework enabled phased adoption aligned to each location’s digital maturity and governance structure."
                                />

                                <h3>
                                    Global framework with regional adaptability
                                </h3>

                                <p>
                                    We designed a consistent backbone structure that:
                                </p>

                                <ul>
                                    <li>Standardised core service categories</li>
                                    <li>Allowed location-specific variations</li>
                                    <li>Reduced duplication in content governance</li>
                                    <li>Integrated seamlessly within the ServiceNow out-of-the-box (OOTB) experience to avoid costly customisation.</li>
                                </ul>
                            </div>

                            <div className="content-block">
                                <FigureModal
                                    src="assets/images/case-study-2/ow-solution-3.png"
                                    alt=""
                                    caption="Crucial touchpoints like the workplace directory were decluttered and became more integral as part of the ServiceNow global workplace experience."
                                />

                                <h3>
                                    Platform consolidation
                                </h3>

                                <p>
                                    Migrated workplace services from SharePoint to ServiceNow, removing dual ownership and simplifying maintenance workflows.
                                </p>
                            </div>

                            <blockquote className="notion-quote">
                                The PoC demonstrated how ServiceNow’s out-of-the-box capabilities could be extended — without heavy custom engineering.
                            </blockquote>
                        </div>
                
                    </div>
                </Section>

                <div className="container">
                    <hr className="divider" />
                </div>

                <Section id="testing">
                    <div className="col-30-70">

                        <div className="section-heading">
                            <h2>Testing &amp; validation
                            <br/>
                            <span className="section-subtitle">Shipping the PoC.</span>
                            </h2>
                        </div>

                        <div className="section-content">
                            <div className="content-block">
                                <p className="lead">
                                    We validated through:
                                </p>

                                <ul>
                                    <li>Task-based usability testing.</li>
                                    <li>Scenario-based prototype walkthroughs.</li>
                                    <li>Stakeholder validation sessions.</li>
                                    <li>Developer feasibility reviews.</li>
                                </ul>
                            </div>
                            
                            <div className="content-block">
                                <h3>Result</h3>

                                <ul>
                                    <li>
                                        +30% task success rate improvement.
                                    </li>

                                    <li>
                                        +80% increase in perceived findability.
                                    </li>

                                    <li>
                                        Reduced average clicks to complete critical tasks such as access requests and desk bookings.
                                    </li>

                                    <li>
                                        Strong stakeholder alignment for phased rollout.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    
                    </div>
                </Section>

                <div className="container">
                    <hr className="divider" />
                </div>

                <Section id="impact" aria-labelledby="impact-heading">
                    <div className="col-30-70">
                    
                        <div className="section-heading">
                            <h2>Impact &amp; outcomes
                            <br/>
                            <span className="section-subtitle">What changed because of this work.</span>
                            </h2>
                        </div>

                        <div className="section-content">
                            <div className="content-block">
                                <h3>
                                    Immediate outcomes
                                </h3>

                                <ul>
                                    <li>
                                        Executive-approved blueprint for global consolidation.
                                    </li>

                                    <li>
                                        Pilot launch across three major global offices.
                                    </li>

                                    <li>
                                        Scalable IA framework covering 15+ workplace and third-party services.
                                    </li>
                                </ul>
                            </div>

                            <div className="content-block">
                                <h3>
                                    Strategic impact
                                </h3>

                                <ul>
                                    <li>
                                        Shifted narrative from “portal redesign” to “experience transformation”.
                                    </li>

                                    <li>
                                        Positioned ServiceNow as the single source of truth for accessing workplace services.
                                    </li>

                                    <li>
                                        Reduced platform duplication and governance overhead.
                                    </li>

                                    <li>
                                        Strengthened the foundation for future service optimisation initiatives.
                                    </li>
                                </ul>
                            </div>

                            <blockquote className="notion-quote">
                                The PoC now serves as a reference model for broader ServiceNow transformation efforts.
                            </blockquote>
                        </div>
                    </div>
                </Section>

                <div className="container">
                    <hr className="divider"/>
                </div>

                <Section id="reflection" aria-labelledby="reflection-heading">
                    <div className="col-30-70">

                        <div className="section-heading">
                            <h2>Reflection
                            <br/>
                            <span className="section-subtitle">Learnings and key takeaways.</span>
                            </h2>
                        </div>

                        <div className="section-content">
                            <blockquote className="notion-quote">
                                This project reinforced that enterprise design is as much about shaping organisational alignment as it is about shaping interfaces.
                            </blockquote>

                            <div className="content-block">
                                <h3>What worked</h3>

                                <div className="flex flex-col gap-6">
                                    <div className="card-content">
                                        <span className="icon icon-xl" aria-hidden="true">
                                            <span className="material-symbols-rounded card-icon" translate="no">abc</span>
                                        </span>

                                        <p className="lead">Simplicity is strategic</p>
                        
                                        <p className="card-text">At enterprise scale, simplification of interactions and experiences delivers more value than adding functionality.</p>
                                    </div>

                                    <div className="card-content">
                                        <span className="icon icon-xl" aria-hidden="true">
                                            <span className="material-symbols-rounded card-icon" translate="no">123</span>
                                        </span>

                                        <p className="lead">Phased transformation drives adoption</p>
                        
                                        <p className="card-text">Rather than positioning this as a “big bang” redesign, a phased rollout reduced risk, built confidence and allowed regional onboarding to happen sustainably.</p>
                                    </div>

                                    <div className="card-content">
                                        <span className="icon icon-xl" aria-hidden="true">
                                            <span className="material-symbols-rounded card-icon" translate="no">diversity_3</span>
                                        </span>

                                        <p className="lead">Influence matters as much as interface</p>
                        
                                        <p className="card-text">Driving cross-regional alignment and securing senior approval required facilitation, negotiation and reframing the problem in business language — not just producing strong design artefacts.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="content-block">
                                <h3>What was challenging</h3>

                                <div className="flex flex-col gap-6">
                                    <div className="card-content">
                                        <span className="icon icon-xl" aria-hidden="true">
                                            <span className="material-symbols-rounded card-icon" translate="no">view_timeline</span>
                                        </span>

                                        <p className="lead">Governance and restructuring disrupted sprint timelines</p>
                        
                                        <p className="card-text">Mid-project restructuring required rebuilding parts of the solution. It reinforced the importance of documentation, design systems and resilient ways of working at enterprise scale.</p>
                                    </div>

                                    <div className="card-content">
                                        <span className="icon icon-xl" aria-hidden="true">
                                            <span className="material-symbols-rounded card-icon" translate="no">communication</span>
                                        </span>

                                        <p className="lead">Context emerges continuously in complex organisations</p>
                        
                                        <p className="card-text">Despite structured discovery, critical operational nuances surfaced throughout the project. This highlighted that enterprise discovery is not a phase, it’s ongoing. We adapted our design and rollout strategy accordingly.</p>
                                    </div>

                                    <div className="card-content">
                                        <span className="icon icon-xl" aria-hidden="true">
                                            <span className="material-symbols-rounded card-icon" translate="no">code_blocks</span>
                                        </span>

                                        <p className="lead">Standardisation vs autonomy tension</p>
                        
                                        <p className="card-text">Balancing global consistency with location-level variability required trade-offs in IA and backend logic. Designing flexibility into the system was essential – myself and the team went back and forth on how best to approach it.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="content-block">
                                <h3>What I’d do next</h3>

                                <ul>
                                    <li>
                                        Measure operational KPIs post-rollout (ticket misrouting, duplicate requests, service completion time).
                                    </li>

                                    <li>
                                        Measure behavioural change, particularly reduction in reliance on informal networks (“who you know”).
                                    </li>

                                    <li>
                                        Formalise governance frameworks to support future regional onboarding.
                                    </li>

                                    <li>
                                        Continue evolving the IA based on real-use adoption patterns.
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </Section>
            </article>
        </GalleryProvider>
    );
}