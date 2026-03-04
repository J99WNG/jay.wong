import FigureModal from '@/components/FigureModal';
import Image from 'next/image';
import Link from 'next/link';

export default function CaseStudyTwo() {
    return (
        <article>
            <section id="landing">
                <div className="container section-fade">

                    <div className="breadcrumb">
                        <Link href="/#work" title="Back to all projects">
                            <span className="icon icon-sm" aria-hidden="true">
                            <span className="material-symbols-rounded arrow_back">
                                arrow_back
                            </span>
                            </span>
                            
                            Back to all projects
                        </Link>
                        
                        <Link href="" title="Next case study">
                            Next case study

                            <span className="icon icon-sm" aria-hidden="true">
                            <span className="material-symbols-rounded arrow_forward">
                                arrow_forward
                            </span>
                            </span>
                        </Link>
                    </div>

                    <div className="title-block">
                        <p className="small">
                            2025 / bp / Oil & Gas
                        </p>

                        <h1>From Fragmented Intranets to a Unified Global Digital Workplace</h1>

                        <p className="tagline">Leading the consolidation of fragmented workplace services into a unified ServiceNow experience at bp.</p>
                    </div>

                    <div className="bento-grid">
                        <div className="bento-item tall">
                            <Image
                                    src="assets/images/case-study-2/ow-bento-1.png"
                                    alt="Featured Project"
                                    fill // Makes image fill the container
                                    priority // Ensures this image loads fast
                                />
                        </div>

                        <div className="bento-item">
                            <Image
                                    src="assets/images/case-study-2/ow-bento-2.png"
                                    alt=""
                                    fill // Makes image fill the container
                                />
                        </div>

                        <div className="bento-item">
                            <Image
                                    src="assets/images/case-study-2/ow-bento-3.png"
                                    alt=""
                                    fill // Makes image fill the container
                                />
                        </div>
                    </div>

                </div>
            </section>

            <section id="Snapshot">
                <div className="container col-30-70 section-fade">

                    <div className="section-heading">
                        <h2>Snapshot
                        <br/>
                        <span className="section-subtitle">The “too long didn&apos;t read”.</span>
                        </h2>
                    </div>

                    <div className="section-content">
                        <div className="content-block">
                            <p className="small">Problem</p>
                            <p>bp&apos;s workplace services were fragmented across SharePoint sites, regional portals, and third-party tools. Colleagues struggled to find the right support, leading to inconsistent global experiences, misrouted tickets, and unnecessary operational overhead.</p>
                        </div>
                        
                        <div className="content-block">
                            <p className="small">Outcome</p>
                            <p>Designed and delivered a unified, outcome-led workplace experience within ServiceNow — consolidating journeys, improving findability, and simplifying how employees raise and track workplace requests.</p>
                        </div>

                        <div className="content-block">
                            <p className="small">Impact</p>

                            <ul>
                                <li>Transitioned the workplace experience from Microsoft SharePoint to ServiceNow, consolidating platforms and supporting enterprise cost-optimisation initiatives.</li>
                                <li>Defined a scalable, global information architecture (IA) covering 15+ workplace and third-party services.</li>
                                <li>Shipped to three pilot locations (Pune, Houston, London) with phased global rollout approval.</li>
                                <li>+30% improvement in task success rate (usability testing).</li>
                                <li>+80% improvement in perceived findability.</li>
                            </ul>
                        </div>
                        
                        <div className="grid-layout">
                            <div className="metadata">
                                <p className="small">Company</p>

                                <p>
                                    <span className="icon icon-inline icon-md">
                                    <img 
                                    src="/assets/logos/bp-helios-colour.svg"
                                    alt="bp"
                                    loading="lazy"
                                    />
                                    </span> bp plc</p>
                            </div>

                            <div className="metadata">
                                <p className="small">Year / Industry</p>

                                <p>2025 · Oil &amp; Gas</p>
                            </div>

                            <div className="metadata">
                                <p className="small">Role</p>

                                <p>Lead Product Designer</p>
                            </div>

                            <div className="metadata">
                                <p className="small">Timeline</p>

                                <p>8 months (Discovery → Proof of Concept)</p>
                            </div>

                            <div className="metadata">
                                <p className="small">Scale</p>

                                <p>Enterprise-level rollout, piloted across Pune, Houston, and London.</p>
                            </div>

                            <div className="metadata">
                                <p className="small">Team</p>

                                <ul>
                                    <li>1 Programme Manager</li>
                                    <li>1 Product Designer (me)</li>
                                    <li>1 Business Analyst</li>
                                    <li>≥3 ServiceNow Developers</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <div className="container">
            <hr className="divider" />
            </div>

            <section>
                <div className="container col-30-70 section-fade">

                    <div className="section-heading">
                        <h2>Business context
                        <br/>
                        <span className="section-subtitle">Why it mattered.</span>
                        </h2>
                    </div>

                    <div className="section-content">
                        <div className="content-block">
                            <p className="lead">As part of broader cost-reduction initiatives, bp’s global workplace experience team identified inefficiencies in how employees accessed digital workplace services (such as facility amenities, access and security, transportation and parking, maintenance reports, etc.).</p>
                        </div>
                        
                        <div className="content-block">
                            <p>Over time, workplace processes had evolved organically across regions and even individual office locations. While functional, they lacked consistency, discoverability, and clear ownership. This led to:</p>  

                            <ul>
                                <li>Increased workplace ticket volumes due to misrouted requests.</li>
                                <li>Time lost searching for services or vendor providers.</li>
                                <li>Poor visibility of request status.</li>
                                <li>Regional inconsistencies that conflicted with bp’s global workplace operating model.</li>
                            </ul>

                            <p>The challenge was clear:</p>

                            <blockquote className="notion-quote">
                                "Improve the employee experience while reducing operational and licensing overhead — without a full replatform."
                            </blockquote>
                        </div>
                    </div>
                
                </div>
            </section>

            <div className="container">
                <hr className="divider" />
            </div>

            <section aria-labelledby="role-heading">
                <div className="container col-30-70 section-fade">

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
                                <li>Leading 6-weeks of discovery research across UK, US, India and the Caribbean.</li>
                                <li>Facilitated cross-regional workshops across 4 time zones.</li>
                                <li>Mapped end-to-end workplace journeys.</li>
                                <li>Translated operational data into clear experience strategy – defining problem statements and design principles.</li>
                                <li>Influenced the move towards a consolidated global information architecture.</li>
                                <li>Worked in sync with ServiceNow developers to balance UX ambition with platform constraints.</li>
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
            </section>

            <div className="container">
                <hr className="divider" />
            </div>

            <section aria-labelledby="discovery-heading">
                <div className="container col-30-70 section-fade">

                    <div className="section-heading">
                        <h2 className="section-title">Discovery and research
                        <br/>
                        <span className="section-subtitle">Uncovering the insights.</span>
                        </h2>
                    </div>

                    <div className="section-content">
                        <p className="lead">Through workshops, interviews, journey mapping, office observation, and platform audits, several patterns emerged.</p>

                        <div className="content-block">
                            <h3>Workplace services varied by location — not just region</h3>
                            
                            <p>Desk booking, catering, parking, and vendors differed office-by-office, significantly impacting how we approach IA and backend logic.</p>
                                
                            <FigureModal
                                src="assets/images/case-study-2/ow-discovery-1.png"
                                alt=""
                                caption="One location was operating workplace services through more than 8 different touchpoints, scattered across SharePoint pages. This was a repeating theme."
                            />

                        </div>

                        <div className="content-block">
                            <h3>Content was deeply fragmented</h3>
                            
                            <p>Information and services lived across SharePoint, Viva Engage, PowerApps, and local documents.</p>

                            <FigureModal
                                src="assets/images/case-study-2/ow-discovery-2.png"
                                alt=""
                                caption="My audit and mapping of our location in Houston revealed various systems and platforms in use across different service categories. This fragmentation was consistent across London and Pune, underscoring the need for consolidation and a unified approach."
                            />
                        </div>

                        <div className="content-block">
                            <h3>Search was not trusted</h3>
                            
                            <p>'Bookmarking' was a common behaviour observed — signalling low confidence in findability.</p>

                            <FigureModal
                                src="assets/images/case-study-2/ow-discovery-3.png"
                                alt=""
                                caption="User interviews revealed browser bookmarking was frequent and preferred -- users were navigating to pages through bookmarks rather than search or navigation. This was a critical insight that informed our focus on improving navigation and information architecture."
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
                            
                            <p>One regional office wasn’t even enrolled in the global workplace portfolio — exposing structural misalignment.</p>

                            <FigureModal
                                src="https://placehold.co/1920x1080/fdfaf7/998066?text=Placeholder&font=open-sans.png"
                                alt=""
                                caption=""
                            />
                        </div>

                        <blockquote className="notion-quote">
                            This wasn’t just a UX issue. It was an operating model issue.
                        </blockquote>
                    </div>

                </div>
            </section>

            <div className="container">
                <hr className="divider"/>
            </div>

            <section aria-labelledby="problem-definition">
                <div className="container col-30-70 section-fade">

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
            </section>

            <div className="container">
                <hr className="divider" />
            </div>

            <section aria-labelledby="goals-heading">
                <div className="container col-30-70 section-fade">
                
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
            </section>

            <div className="container">
                <hr className="divider" />
            </div>

            <section aria-labelledby="ideation-heading">
                <div className="container col-30-70 section-fade">
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
                        </div>
                    </div>
                </div>
            </section>

            <div className="container">
                <hr className="divider" />
            </div>

            <section aria-labelledby="solution-heading">
                <div className="container col-30-70 section-fade">
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
                                caption=""
                            />

                            <h3>
                                Outcome-led, action-orientated navigation
                            </h3>

                            <p>Clear, plain-language categories such as:</p>

                            <ul>
                                <li>
                                “Desk and room bookings”
                                </li>

                                <li>
                                “Access & security”
                                </li>

                                <li>
                                “Equipment & IT”
                                </li>

                                <li>
                                “Moves & changes”
                                </li>
                            </ul>

                            <blockquote className="notion-quote">
                                This reduced cognitive load and aligned navigation with real-world tasks.
                            </blockquote>
                        </div>

                        <div className="content-block">
                            <FigureModal
                                src="assets/images/case-study-2/ow-solution-2.png"
                                alt=""
                                caption="A three-tier model was developed to balance global standardisation with regional readiness. Rather than enforcing a single solution, the framework enabled phased adoption aligned to each location’s digital maturity and governance structure."
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
                                src="https://placehold.co/1920x1080/fdfaf7/998066?text=Placeholder&font=open-sans.png"
                                alt=""
                                caption=""
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
            </section>

            <div className="container">
                <hr className="divider" />
            </div>

            <section aria-labelledby="solution-heading">
                <div className="container col-30-70 section-fade">

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
                                    Reduced average clicks to complete top tasks such as...
                                </li>

                                <li>
                                    Strong stakeholder alignment for phased rollout.
                                </li>
                            </ul>
                        </div>
                    </div>
                
                </div>
            </section>

            <div className="container">
                <hr className="divider" />
            </div>

            <section aria-labelledby="impact-heading">
                <div className="container col-30-70 section-fade">
                
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
            </section>

            <div className="container">
                <hr className="divider"/>
            </div>

            <section aria-labelledby="reflection-heading">
                <div className="container col-30-70 section-fade">

                    <div className="section-heading">
                        <h2>Reflection
                        <br/>
                        <span className="section-subtitle">Learnings and key takeaways.</span>
                        </h2>
                    </div>

                    <div className="section-content">
                        <blockquote className="notion-quote">
                            This project reinforced that enterprise design is as much about shaping organisational alignment as it is about shaping interfaces. Although I enjoy the latter more, both remain equally important in my way of working.
                        </blockquote>

                        <div className="content-block">
                            <h3>What worked</h3>

                            <h4>Simplicity is strategic</h4>
                            <p>
                                At enterprise scale, simplification of interactions and experiences delivers more value than adding functionality.
                            </p>

                            <h4>Phased transformation drives adoption</h4>
                            <p>
                                Rather than positioning this as a “big bang” redesign, a phased rollout reduced risk, built confidence, and allowed regional onboarding to happen sustainably.
                            </p>
                            
                            <h4>Influence matters as much as interface</h4>
                            <p>
                                Driving cross-regional alignment and securing senior approval required facilitation, negotiation, and reframing the problem in business language — not just producing strong design artefacts.
                            </p>
                        </div>

                        <div className="content-block">
                            <h3>What was challenging</h3>

                            <h4>Governance and restructuring disrupted sprint timelines</h4>
                            <p>
                                Mid-project restructuring required rebuilding parts of the solution. It reinforced the importance of documentation, design systems, and resilient ways of working at enterprise scale.
                            </p>

                            <h4>Context emerges continuously in complex organisations</h4>
                            <p>
                                Despite structured discovery, critical operational nuances surfaced throughout the project. This highlighted that enterprise discovery is not a phase — it’s ongoing. We adapted our design and rollout strategy accordingly.
                            </p>

                            <h4>Standardisation vs autonomy tension</h4>
                            <p>
                                Balancing global consistency with location-level variability required careful trade-offs in IA and backend logic. Designing flexibility into the system was essential, and myself and the team went back and forth on how to approach it.
                            </p>
                        </div>

                        <div className="content-block">
                            <h3>What I’d do next</h3>

                            <ul>
                                <li>
                                    Measure operational KPIs post-rollout (ticket misrouting, duplicate requests, service completion time).
                                </li>

                                <li>
                                    Measure behavioural change — particularly reduction in reliance on informal networks (“who you know”).
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
            </section>
        </article>
    );
}