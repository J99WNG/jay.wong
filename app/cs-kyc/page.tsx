import Section from '@/components/Section';
import Image from 'next/image';
import FigureModal from '@/components/ui/FigureModal';
import { GalleryProvider } from '@/components/ui/GalleryContext';
import NextProjectCTA from '@/components/NextProjectCTA';
import { caseStudies } from "@/app/data/caseStudies";
import { Metadata } from 'next'

const project = caseStudies.find((s) => s.slug === "cs-kyc")!;

export const metadata: Metadata = {
    title: project.title,
    description: project.tagline,
    openGraph: {
      title: `${project.title} – Jay Wong`,
      description: project.tagline,
      images: [{ url: project.bentoImage }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      images: [project.bentoImage],
    },
  }

export default function Page() {
    return (
        <GalleryProvider>
            <article>
                <Section id="landing" isLanding={true}>
                    <NextProjectCTA />

                    <div className="title-block">
                        <p className="small">
                            {project.year} · {project.company} · {project.industry}
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
                                <p>Relationship Managers (RM) at Credit Suisse had no single platform to manage client tasks, KYC deadlines, portfolio data, and market intelligence. Everything lived across disconnected systems, pulling RMs away from valuable client time and into unnecessary admin, costing up to 70% of their day.</p>
                            </div>
                            
                            <div className="content-block">
                                <p className="small">Outcome</p>
                                <p>Designed RM Suite, a conceptual mobile solution bringing everything into a unified, secured interface – covering tasks, reminders, client profiles, live market data, and portfolio access.</p>
                            </div>

                            <div className="content-block">
                                <p className="small">Impact</p>

                                <p>Top 3 finalist out of 10 competing teams at a bi-annual Employer Showcase. Prototype validated directly by the Regional IT Head of Wealth Management Technology and a serving Relationship Manager.</p>

                                <div className="card">
                                    <div className="card-content px-6 py-5">
                                    <p>
                                        <span className="quant">~136,800 hrs</span>
                                        <br />
                                        Recovered annually by reducing context-switching and admin time.
                                    </p>
                                    </div>
                                </div>
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
                                    <p className="small">Industry</p>

                                    <p>{project.industry}</p>
                                </div>

                                <div className="metadata">
                                    <p className="small">Role</p>

                                    <p>{project.role}</p>
                                </div>

                                <div className="metadata">
                                    <p className="small">Year / Timeline</p>

                                    <p>{project.year} · 8 months
                                        <br />
                                        (Discovery → Proof of Concept)</p>
                                </div>

                                <div className="metadata">
                                    <p className="small">Scale</p>

                                    <p>1,140+ Relationship Managers, 36 locations, 25 countries, CHF 645 billion AUM</p>
                                </div>

                                <div className="metadata">
                                    <p className="small">Team</p>

                                    <p>5 people (Product Manager/Designer, Lead Developer, Project Analyst, Business Analyst, Research Analyst)</p>
                                </div>
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
                                <p className="lead">I came into this project as Product Manager and Designer. That meant wearing a few different hats across the eight-month engagement.</p>
                            </div>
                            
                            <div className="content-block">
                                <h3>Product vision and design</h3>

                                <p>
                                    I was responsible for shaping the overall vision and experience of RM Suite. I led the high-fidelity prototype work in Semester 1 using InVision, ran our core ideation sessions, coordinated both stakeholder interviews, and translated what we heard into a prioritised requirements spec the team could build towards. I applied Nielsen's Heuristics throughout the design process to ensure every screen decision was grounded in usability principles.
                                </p>
                            </div>

                            <div className='content-block'>
                                <h3>Project management</h3>

                                <p>
                                I owned the project structure end to end. I built the Gantt chart, ran weekly standup, maintained the issue log and risk register, and managed scope when the project encountered unexpected constraints. When COVID-19 hit midway through Semester 2 and the team scattered across four different time zones, I kept the work moving and the communication flowing.
                                </p>
                            </div>

                            <div className="content-block">
                                <h3>Stakeholder engagement</h3>

                                <p>
                                    I served as the primary point of contact between our team and Credit Suisse stakeholders. I was present for both the Semester 1 employer showcase and the final virtual demonstration, and I led the sessions where we gathered feedback to refine our direction between semesters.
                                </p>
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

                            <p className="lead">
                                Credit Suisse's International Wealth Management division managed CHF 645 billion in assets, serving ultra-high-net-worth clients across Europe, the Middle East, Africa, and Latin America. At the centre of that operation sits the <strong>Relationship Manager.</strong>
                            </p>
                            
                            <div className="content-block">
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

                                <blockquote className="notion-quote">
                                    "Relationship managers spend 60 to 70 percent of their time on non-advisory activities."
                                    <p className="small">McKinsey & Company, 2022</p>
                                </blockquote>

                                <p>Credit Suisse had invested heavily in its wealth management infrastructure. But the tools being used by the people closest to clients hadn't kept pace. There was an internal CRM and a calendar system, but nothing that put the full picture of an RM's day into a single, mobile-first surface. The result was a productivity gap that had a direct impact on the division's ability to meet its own strategic goals.</p>
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
                            <p className="lead">
                                We started with the Credit Suisse briefing document and a structured research checklist covering KYC regulation, private banking compliance in the UK and EU, FinTech trends, and the daily responsibilities of a Relationship Manager. But reading about a role is very different from understanding it.
                            </p>

                            <div className="content-block">
                                <h3>Stakeholder insights</h3>
                                
                                <p>
                                    Our first priority was getting direct access to Credit Suisse's people. We secured two interviews:
                                </p>

                                <ul>
                                    <li>
                                        The first was with Credit Suisse's Regional IT Head of Wealth Management Technology, who gave us a clear view of the technical constraints and what the existing infrastructure could realistically support.
                                    </li>

                                    <li>
                                        The second was with Abdul, a serving Relationship Manager (our primary user), who walked us through what his working day actually looked like.
                                    </li>
                                </ul>
                            </div>

                            <div className='content-block'>
                                <h3>That second conversation changed our direction significantly.</h3>

                                <p>
                                    What we heard was that the real friction wasn't any single process. <strong>It was the fragmentation.</strong>
                                </p>

                                <p>
                                    An RM's day meant switching between a client management system, a financial news feed, a compliance checklist, and handwritten notes, with nothing connecting them. The cognitive overhead of managing that context-switching was where the time was being lost.
                                </p>
                            </div>
                            
                            <div className='content-block'>
                                <h3>Invalidating our assumptions</h3>

                                <p>
                                    The interviews also surface some important corrections to our early thinking:
                                </p>

                                <ol>
                                    <li>
                                        We had designed a calendar feature into our first prototype. Abdul confirmed Credit Suisse already had their own internal system for that.
                                    </li>

                                    <li>
                                        We had assumed the app would be used by both RMs and clients. It wouldn't.
                                    </li>

                                    <li>
                                        We had thought KYC consolidation should lead the product. Both stakeholders redirected us toward efficiency and cognitive load reduction as the core goal.
                                    </li>
                                </ol>

                                <FigureModal
                                    src="assets/images/case-study-3/cs-discovery-1.png"
                                    alt=""
                                    caption="Those course corrections, documented in our Project Initiation Document assumptions table, were some of the most valuable outputs of the discovery phase."
                                />
                            </div>

                            <div className="content-block">
                                <h3>Ideation technique</h3>

                                <p>
                                    We also ran a Ketso planning session early in the project, a structured tactile brainstorming method that got the full team contributing ideas in a way a standard whiteboard session rarely does.
                                </p>

                                <FigureModal
                                    src="assets/images/case-study-3/cs-discovery-2.png"
                                    alt=""
                                    caption="Our team discussed various topics to better discover an RM's needs and how we approach the problems outlined in the briefing document."
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
                                <p className="lead">After the interviews and analysis, we could frame the problem much more precisely.</p>

                                <blockquote className="notion-quote">
                                    Relationship Managers at Credit Suisse don't lack information. They have too much of it, spread across too many places, with no intelligent way to surface what matters right now.
                                </blockquote>

                                <p>
                                The consequence was an RM who started each day already behind, spent time context-switching between systems, and arrived at client meetings less prepared than they should have been.
                                </p>
                            </div>
                            
                            <div className="content-block">
                                <p>
                                To structure our response, we ran a PACT Analysis across People, Activities, Context, and Technology. This kept the user at the centre of every decision:
                                </p>
                                
                                <blockquote className="notion-quote">
                                    RMs were homogeneous users doing largely the same work, but they operated across different time zones, travelled frequently for client meetings, and needed the app to be reliable in environments where office access wasn't guaranteed.
                                </blockquote>

                                <p>
                                We then used MoSCoW prioritisation to separate what we had to build from what would be valuable but non-essential. Of the 12 requirements we identified, 7 landed in the Must and Should categories. Those 7 became our north star for the rest of the project.
                                </p>

                                <FigureModal
                                    src="assets/images/case-study-3/cs-problem-1.png"
                                    alt=""
                                    caption="Five functional requirements were refined and taken forward into our design and development iterations."
                                />

                                <FigureModal
                                    src="assets/images/case-study-3/cs-problem-2.png"
                                    alt=""
                                    caption="With our non-functional requirements, we had two that fell into 'Could' priority. These were features we would have included if we had more time, but they weren't essential to the core user experience we wanted to deliver in the project window."
                                />
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

                            <p className="lead">
                                The brief asked for three things: innovation, efficiency, and minimisation. We translated those into concrete, measurable targets.
                            </p>

                            <div className="content-block">
                                <h3>Primary goal</h3>

                                <p>
                                    Reduce the number of systems an RM needed to interact with during their working day, replacing fragmentation with a single, unified surface.
                                </p>
                            </div>

                            <div className="content-block">
                                <h3>Secondary goal</h3>

                                <p>
                                    Make client information immediately accessible without requiring the RM to recall it from memory. Navigate by recognition, not recollection.
                                </p>
                            </div>

                            <div className="content-block">
                                <h3>Design goal</h3>
                                
                                <p>
                                    We had no access to Credit Suisse's design system. So that meant we had to build one from scratch that was consistent with Credit Suisse's existing design language, maintaining continuity with their bold typography and 'pioneering' aesthetic.
                                </p>

                                <FigureModal
                                    src="assets/images/case-study-3/cs-goals-1.png"
                                    alt=""
                                    caption="I started with the foundations, establishing the 'TLC' through studying Credit Suisse's existing digital products and channels – Typography, Layout and Colour."
                                />

                                <FigureModal
                                    src="assets/images/case-study-3/cs-goals-2.png"
                                    alt=""
                                    caption="A more comprehensive design system emerged as we iterated on the prototype, with a focus on modularity and reusability to speed up our agile cycles and maintain visual consistency across the solution."
                                />
                            </div>

                            <div className="content-block">
                                <h3>Functional success criteria</h3>

                                <ul>
                                    <li>
                                        Secure login and access to the daily task view achievable in under 10 seconds.
                                    </li>

                                    <li>
                                        Dashboard content updating automatically on refresh, with no manual data entry required.
                                    </li>

                                    <li>
                                        All information relevant to a client meeting accessible from a single profile screen.
                                    </li>

                                    <li>
                                        At least 5 of the 7 Must and Should requirements delivered in the final product.
                                    </li>
                                </ul>
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
                            <p className="lead">Once we had validated requirements and a well-defined problem, ideation felt less like guesswork and more like solving a clear puzzle with defined constraints.</p>

                            <p>
                            The concept that guided everything was thinking about an RM's day as a single, continuous experience rather than a series of disconnected tasks. We kept asking the same question: what would it look like if everything an RM needed was in one place, presented in the order they would actually need it?
                            </p>

                            <div className="content-block">
                                <FigureModal
                                    src="assets/images/case-study-3/cs-ideation-1.png"
                                    alt=""
                                    caption="First design iteration of the dashboard. Low fidelty ideation was omitted."
                                />

                                <h3>
                                    The modular dashboard
                                </h3>

                                <p>
                                    Rather than building a rigid, fixed-layout homepage, we designed the dashboard as a configurable surface. RMs could see today's tasks, upcoming reminders, and recently accessed clients at a glance. Every element was tappable and connected to a deeper view.
                                </p>
                            </div>

                            <div className="content-block">
                                <FigureModal
                                    src="assets/images/case-study-3/cs-ideation-2.png"
                                    alt=""
                                    caption="An aggregration of real-time market data and financial news so that an RM would not need to switch between different sources."
                                />

                                <h3>
                                    Trending
                                </h3>

                                <p>
                                    We designed a live market data panel aggregating real-time stock movements and financial news, filtered by the regions and sectors relevant to each RM's portfolio. Keeping market intelligence inside the same app, rather than requiring RMs to switch to a news app or Bloomberg terminal, meant one less context switch in an already busy day.
                                </p>
                            </div>

                            <div className="content-block">
                                <FigureModal
                                    src="assets/images/case-study-3/cs-ideation-3.png"
                                    alt=""
                                    caption="A much more powerful contacts book, in which data is fed into it through Credit Suisse's existing CRM systems and workflow."
                                />

                                <h3>
                                    Recognition over recall in the Clients panel
                                </h3>

                                <p>
                                    One of the more deliberate design decisions was the card-based client grid. Rather than a list of names, each card showed the client's photo, nationality flag, occupation, and region. An RM managing dozens of clients across multiple continents should be able to find who they're looking for by face, not by scrolling through an alphabetical list. This directly applied Nielsen's principle of recognition over recall.
                                </p>
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
                            <span className="section-subtitle">Solving productivity</span>
                            </h2>
                        </div>

                        <div className="section-content">
                            <p className="lead">
                                In the latter half of the project, we iterated from high fidelty wireframes to a proof of concept prototype. The goal was to build something that could be tested and validated against our success criteria, not to create a fully polished, launch-ready product. This began with a more focused design system.
                            </p>
                            

                            <div className="content-block">
                                <FigureModal
                                    src="assets/images/case-study-3/cs-solution-1.png"
                                    alt=""
                                    caption="A straightforward login screen to welcome RMs into the app, no messing about."
                                />

                                <h3>
                                2FA Login
                                </h3>

                                <p>
                                Two-step authentication combining username/password with biometric fingerprint recognition. For an institution managing client wealth at this scale, security had to be the first design decision, not an afterthought. The screen maintained Credit Suisse's visual identity, bold typeface, navy palette, from the first moment.
                                </p>
                            </div>

                            <div className="content-block">
                                <FigureModal
                                    src="assets/images/case-study-3/cs-solution-2.png"
                                    alt=""
                                    caption="The homepage of an RM's working day. Instead of navigating through five different systems, this gave them everything they need to start their day in one, unified interface."
                                />

                                <h3>
                                Dashboard
                                </h3>

                                <p>
                                The homepage of the RM's working day. Today's tasks in a clean checklist. Reminders each linked to the relevant client. A Recent Clients widget for fast access. The whole screen was designed to be scanned in under 30 seconds, giving the RM everything they needed to orient their day before their first meeting.
                                </p>
                            </div>

                            <div className="content-block">
                                <FigureModal
                                    src="assets/images/case-study-3/cs-solution-3.png"
                                    alt=""
                                    caption="We iterated the clients list to be more informative at a glance."
                                />

                                <h3>
                                Client List
                                </h3>

                                <p>
                                A searchable, sortable grid of all clients, filterable by region, occupation, and recency. Built around visual recognition. A busy RM on the way to a meeting shouldn't have to type a name to find it.
                                </p>
                            </div>

                            <div className="content-block">
                                <FigureModal
                                    src="assets/images/case-study-3/cs-solution-4.png"
                                    alt=""
                                    caption="Client profiles allows RMs to make quick reviews whilst on the go. Assistant RMs could prepare briefing notes for RMs ahead of meetings."
                                />

                                <h3>
                                Client Profile
                                </h3>

                                <p>
                                The deepest layer of the app, and the most important one. A single screen containing client key information, aims and objectives, reminders, market news filtered to that client's specific sectors and regions, portfolio breakdown, risk analysis, and full meeting history. Everything an RM needed to walk into a meeting prepared, without opening a second application.
                                </p>
                            </div>

                            <div className="content-block">
                                <FigureModal
                                    src="assets/images/case-study-3/cs-solution-5.png"
                                    alt=""
                                    caption="Trending became more actionable and deliberate in our final iteration, with clear indicators of what was moving in the markets and how it related to an RM's clients."
                                />

                                <h3>
                                Trending
                                </h3>

                                <p>
                                Live market data across EMEA, AMER, and APAC with colour-coded performance indicators. Green for positive movement, red for negative. A curated financial news feed alongside it. Keeping RMs connected to what was moving in the markets their clients were exposed to.
                                </p>
                            </div>

                            <div className="content-block">
                                <FigureModal
                                    src="assets/images/case-study-3/cs-solution-6.png"
                                    alt=""
                                    caption="Our RM was highlighting the need to surface reminders more effectively. The notifications system was our response to that, ensuring critical deadlines and tasks were front and centre, not buried in various systems."
                                />

                                <h3>
                                Notifications
                                </h3>

                                <p>
                                Abdul revealed that RMs were missing important reminders because they were buried in email threads or lost in the shuffle of a busy day. We built a notifications system that surfaced those reminders directly in the app, with push notifications for critical deadlines. Every reminder was linked to the relevant client profile, so an RM could jump straight to the information they needed to take action.
                                </p>
                            </div>

                            <div className="content-block">
                                <FigureModal
                                    src="assets/images/case-study-3/cs-solution-7.png"
                                    alt=""
                                    caption="The 'Add' flow was designed to be as streamlined as possible so that RMs can take action in the moment, without needing to switch to a different system or open a laptop. Whether it's creating a new task, setting a reminder, or jotting down meeting notes, the process is the same: efficient, intuitive, and all within the same interface."
                                />

                                <h3>
                                Add tasks, reminders and notes
                                </h3>

                                <p>
                                A single entry point for creating tasks, reminders, and meeting notes. One form, one flow. Everything tagged back to the relevant client automatically.
                                </p>
                            </div>

                            <blockquote className="notion-quote">
                                The design language across all screens was deliberately minimal. Credit Suisse navy, black, and white. Bold typeface. No decorative elements that didn't earn their space. Every design decision had to answer one question: does this help the RM do their job faster?
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
                            <p className="lead">
                            Testing happened in two rounds, each tied to a client-facing showcase event, judged by Credit Suisse and accompanied by various other blue-chip companies.
                            </p>

                            <div className="content-block">
                                <h3>
                                Semester 1: High-fidelity prototype review
                                </h3>

                                <p>
                                We presented prototypes to Credit Suisse stakeholders at an Employer Showcase. Out of 10 competing teams, we placed 3rd. More importantly, the event gave us structured access to Credit Suisse’s Regional IT Head of Wealth Management Technology and a serving RM, whose feedback directly shaped what we built in Semester 2. Several features were cut, rerouted, or reprioritised based on those conversation.
                                </p>
                            </div>

                            <div className="content-block">
                                <h3>
                                Semester 2: Agile development and iteration
                                </h3>

                                <p>
                                In the second semester, the team split into two parallel workstreams. System development, led by myself and the product developer, and project documentation and planning, led by my three other squad members. We worked in Agile sprints, testing each functional module against the MoSCoW requirements as it was built and integrating incrementally.
                                </p>
                            </div>

                            <blockquote className="notion-quote">
                            The final product delivered a partially functional front-end covering 5 of the 7 core requirements: biometric login, the modular dashboard with tasks and reminders, the searchable client portfolio, full client profile pages with expandable tabs, and slide-menu navigation throughout. Firebase was partially set up with dummy client and portfolio data converted to JSON format, but full real-time sync wasn't completed within the project window.
                            </blockquote>
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
                            <p className="lead">
                            The most direct measure was finishing as a top 3 finalist out of 10 competing teams at the Semester 1 Employer Showcase. That was a competitive result judged by industry stakeholders who had reviewed all the solutions presented.
                            </p>

                            <div className="content-block">
                                <p>
                                Beyond the ranking, the validation from Credit Suisse's own people mattered more to me. The fact that our stakeholder interviews revealed we had gotten several early assumptions wrong, and that we rebuilt the requirements around what we heard rather than defending what we'd already designed, was proof that the product process was functioning the way it should.
                                </p>

                                <p>
                                At the scale Credit Suisse operates, the time savings achievable from a tool like RM Suite are significant.
                                </p>

                                <p>
                                    <strong>With 1,140 Relationship Managers across 36 locations, even reducing context-switching by 20 to 30 minutes per person per day translates to tens of thousands of hours annually redirected toward the client relationships that drive revenue.</strong> We didn't have the access or the runway to measure that impact directly, but the foundation for it was there in the product we shipped.
                                </p>

                                <p>
                                The five delivered requirements covered the core user journeys. An RM could log in securely, review their day, access any client profile, view portfolio and meeting history, and stay current with market movements without leaving the app.
                                </p>
                            </div>
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
                            <div className="content-block">
                                <h3>
                                The interviews were the most important design tool
                                </h3>
                                
                                <p>
                                Going into the first showcase with high-fidelity prototypes already built was a risk. It could have locked us into ideas we'd already invested in. Instead, we used the prototypes as conversation starters, held our assumptions loosely, and rebuilt the requirements spec around what we actually heard. Willingness to throw away work when the evidence points somewhere else is a discipline I've carried forward from this project.
                                </p>
                            </div>

                            <div className="content-block">
                                <h3>
                                Front-end and back-end need to run in parallel
                                </h3>
                                
                                <p>
                                We treated the two workstreams as sequential. When front-end development ran longer than expected, Firebase got squeezed out. In a production environment, that trade-off would have had real consequences. Running parallel tracks from day one, with clear integration points and shared ownership of the back-end architecture, is something I would do differently.
                                </p>
                            </div>

                            <div className="content-block">
                                <h3>
                                Remote team leadership is its own skill
                                </h3>
                                
                                <p>
                                COVID hit at the worst possible moment for this project. Team members dispersed across four countries, on different schedules, dealing with personal circumstances none of us had planned for. Keeping the work moving in that environment wasn't about having the right planning tool. It was about showing up consistently, being direct about what still needed to happen, and making it easy for people to contribute even when things were difficult. Those skills don't always show up in a portfolio. They're also the ones that tend to determine whether a product team actually ships.
                                </p>
                            </div>

                            <div className="content-block">
                                <h3>
                                A crucial moment in the project
                                </h3>
                                
                                <p>
                                After the stakeholder interviews, we sat down as a team and removed a significant chunk of what we'd already built. We took out the calendar feature. We reframed the onboarding focus. We narrowed the scope around what Credit Suisse's own people had told us actually mattered. That decision, made under deadline pressure, was the one that kept the project honest. It's also the decision I'd point to if someone asked me what good product thinking looks like in practice.
                                </p>
                            </div>
                        </div>

                    </div>
                </Section>
            </article>
        </GalleryProvider>
    );
}