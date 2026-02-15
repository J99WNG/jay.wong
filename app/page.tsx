import Image from "next/image";
import Link from "next/link";
import HKTClock from "@/components/HKTClock"; // Adjust path as needed

export default function Home() {
  return (
    <main>
        {/* HERO / VALUE PROPOSITION */}
        <section id="hero" className="section-fade" aria-labelledby="Hero"> 
            <div className="container">
                <div className="hero-wrapper">
                    {/* LEFT: Copy */}
                    <div className="hero-block">

                        <h1 className="hero-title">
                            Solving digital complexity through design, research, collaboration and systems thinking.
                        </h1>
            
                        <p className="tagline">
                            👋 I&apos;m Jay – a product and front-end designer specialising in inclusive,
                            AI-led and service-driven products.
                        </p>
            
                        {/* CTAs */}
                        <div className="btn-group">
                            <Link 
                                href="/#work"
                                className="btn btn-primary">
                                View work
                            </Link>
            
                            <a
                                href="https://cal.com/jay-wong/intro"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-tertiary"
                                download>
                                Schedule a call
                            </a>
                        </div>
                    </div>
            
                    {/* RIGHT: Visual */}
                    <div className="hero-visual">
                        <img 
                            src="/assets/images/jw-notion-face-transparent.png"
                            className="hero-img"
                            alt="Notion face of Jay Wong, experience designer"
                            loading="eager"
                            />
                    </div>
                </div>
            </div>
        </section>        

        {/* ===================== ABOUT / PROFILE  ==================== */}
        <section id="about" aria-labelledby="About section">
            <div className="container col-30-70 section-fade">

                <div className="section-heading">
                    <h2>About me
                    <br />
                    <span className="section-subtitle">In a nutshell.</span>
                    </h2>
                </div>

                <div className="section-content">
                    <p className="lead">
                        I&apos;ve spent the last 6 years crafting global, sustainable and inclusive digital experiences. An innate design thinker blended with a strong business acumen — I thrive on bridging the intersections of Design, IT and Business through fostering collaboration and leveraging a user-centred approach to deliver on customer needs and business goals.
                    </p>

                    <div className="badge-group">
                        <p className="badge">UX Research</p>
                        <p className="badge">UI Design</p>
                        <p className="badge">Design systems</p>
                        <p className="badge">Generative AI</p>
                        <p className="badge">Systems thinking</p>
                        <p className="badge">Accessibility design</p>
                        <p className="badge">Agile methodology</p>
                        <p className="badge">ServiceNow</p>
                        <p className="badge">HTML</p>
                        <p className="badge">CSS</p>
                    </div>

                    <div className="grid-layout">
                        <div className="card">
                            <div className="card-content card-content-secondary">
                                <span className="icon icon-xl" aria-hidden="true">
                                    <span className="material-symbols-rounded card-icon" translate="no">account_tree</span>
                                </span>

                                <p className="lead">Strategic Organiser</p>

                                <p className="card-text">I bring structure to complexity, keeping teams aligned, focused, and moving fast.</p>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-content card-content-secondary">
                                <span className="icon icon-xl" aria-hidden="true">
                                    <span className="material-symbols-rounded card-icon" translate="no">category</span>
                                </span>

                                <p className="lead">Cross-Functional</p>

                                <p className="card-text">Fluency across design, IT, and business — I turn gaps into shared understanding.</p>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-content card-content-secondary">
                                <span className="icon icon-xl" aria-hidden="true">
                                    <span className="material-symbols-rounded card-icon" translate="no">search_insights</span>
                                </span>

                                <p className="lead">Evidence-Led</p>

                                <p className="card-text">My decisions are grounded in research, data, and real user needs — not assumptions.</p>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-content card-content-secondary">
                                <span className="icon icon-xl" aria-hidden="true">
                                    <span className="material-symbols-rounded card-icon" translate="no">diversity_4</span>
                                </span>
                                
                                <p className="lead">Collaborative Owner</p>
                                
                                <p className="card-text">I lead with trust and shared ownership, driving outcomes together, not alone.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        {/* ===================== COLLABORATIONS  ==================== */}
        <section id="collaborations" aria-labelledby="collab-title">
            <div className="container col-30-70 section-fade">

                <div className="section-heading">
                    <h2>Collaborations
                    <br />
                    <span className="section-subtitle">Solving human problems in the AI era.</span>
                    </h2>
                </div>

                <div className="section-content">
                    <div className="content-block">
                        <p className="lead">
                            My work spans energy, finance, and education, where I’ve partnered with multidisciplinary teams to deliver meaningful, scalable outcomes.
                        </p>
    
                        <p>
                            I bring a collaborative mindset, a strong sense of shared ownership, and a commitment to data-driven decision-making.
                        </p>
                    </div>
                    
                    {/* Logo showcase */}
                    <div className="logo-grid" aria-label="Companies I've worked with">

                        <div className="card">
                            <div className="logo-item">
                                <img 
                                src="/assets/logos/barclays-symbol.svg"
                                alt="Barclays"
                                loading="lazy"
                                />
                            </div>
                        </div>

                        <div className="card">
                            <div className="logo-item">
                                <img 
                                src="/assets/logos/boa-logo.svg"
                                alt="Bank of America"
                                loading="lazy"
                                />
                            </div>
                        </div>

                        <div className="card">
                            <div className="logo-item">
                                <img 
                                src="/assets/logos/bp-helios-colour.svg"
                                alt="bp"
                                loading="lazy"
                                />
                            </div>
                        </div>

                        <div className="card">
                            <div className="logo-item">
                                <img 
                                src="/assets/logos/creditsuisse-symbol.svg"
                                alt="Credit Suisse"
                                loading="lazy"
                                />
                            </div>
                        </div>
                        
                        <div className="card">
                            <div className="logo-item">
                                <img 
                                src="/assets/logos/ford-logo.svg"
                                alt="Ford Motor"
                                loading="lazy"
                                />
                            </div>
                        </div>

                        <div className="card">
                            <div className="logo-item">
                                <img 
                                src="/assets/logos/ibm-logo.svg"
                                alt="IBM"
                                loading="lazy"
                                />
                            </div>
                        </div>

                        <div className="card">
                            <div className="logo-item">
                                <img 
                                src="/assets/logos/uom-logo-colour.svg"
                                alt="The University of Manchester"
                                loading="lazy"
                                />
                            </div>
                        </div>

                        <div className="card">
                            <div className="logo-item">
                                <img 
                                src="/assets/logos/pg-logo.svg"
                                alt="Proctor & Gamble"
                                loading="lazy"
                                />
                            </div>
                        </div>

                        <div className="card">
                            <div className="logo-item">
                                <img 
                                src="/assets/logos/vodafone-symbol.svg"
                                alt="Vodafone"
                                loading="lazy"
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>

        {/* ==================== FEATURED WORK  ==================== */}
        <section id="work" aria-labelledby="work-title">
            <div className="container section-fade">

                <div className="col-30-70">

                    <div className="section-heading">
                        <h2>Featured work
                        <br />
                        <span className="section-subtitle">Kinda rough around the edges.</span>
                        </h2>
                    </div>

                    <div className="section-content">
                        <div className="content-block">
                            <p className="lead">
                                Explore a selection of my recent work and get a feel for how I think, collaborate, and design. If it resonates, there’s always room to build something great together.
                            </p>
    
                            <p>
                                Equally, if something doesn&apos;t resonate, let me hear from you too! Always open to feedback!
                            </p>
    
                            <p className="nda-disclaimer">*Some work displayed is conceptual, simplified or anonymised due to NDAs.</p>
                        </div>
                    </div>
                </div>

                <div className="col-1-layout">
                    {/* Card #1*/}
                    <article className="card">
                        <div className="card-content card-content-primary">
                            <p className="small">
                                2025 / bp / Oil & Gas
                            </p>

                            <h3 className="card-title">Shifting IT Support Left at Enterprise Scale</h3>

                            <p className="card-text">
                                Reducing repeat IT tickets by 24% at bp through AI-assisted knowledge discovery and content design.
                            </p>
                            
                            <div className="badge-group">
                                <p className="badge">Energy</p>
                                <p className="badge">ITSM</p>
                                <p className="badge">ServiceNow</p>
                                <p className="badge">GenAI</p>
                            </div>

                            <Link className="card-link" href="/case-study-1">
                                View case study

                                <span className="icon icon-sm" aria-hidden="true">
                                    <span className="material-symbols-rounded arrow_forward">
                                        arrow_forward
                                    </span>
                                </span>
                            </Link>
                        </div>

                        <div className="card-img">
                            <Image src="/assets/images/case-study-1/bp-thumbnail.png"
                                alt="Featured Project"
                                fill
                            />
                        </div>
                    </article>
                </div>

            </div>
        </section>

        {/* CONTACT */}
        <section id="contact" aria-labelledby="contact-title">
            <div className="container col-30-70 section-fade">

                <div className="section-heading">
                    <h2>Let&apos;s talk
                    <br />
                    <span className="section-subtitle">Assam or Ceylon tea – no coffee here.</span>
                    </h2>
                </div>

                <div className="section-content">

                    <p className="tagline">
                        Think we could build something exciting? I&apos;d love to hear from you —
                        whether it&apos;s a quick question, collaboration idea, or a full-on project.
                    </p>

                    {/* Status */}
                    <div className="status">
                        Currently based in
                        <span className="status-text">
                            Hong Kong 🇭🇰
                            <HKTClock />
                        </span>
                    </div>

                    <div className="contact-stack" role="list">
                        {/* Cal.com */}
                        <Link href="https://cal.com/jay-wong/intro"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-item"
                            role="listitem">

                            <span className="icon icon-lg" aria-hidden="true">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                                    <path d="M320-400h240q17 0 28.5-11.5T600-440v-80l80 80v-240l-80 80v-80q0-17-11.5-28.5T560-720H320q-17 0-28.5 11.5T280-680v240q0 17 11.5 28.5T320-400ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z"/>
                                </svg>
                            </span>

                            <span className="contact-text" translate="no">
                                Schedule a call
                            </span>

                            <span className="icon icon-lg" aria-hidden="true">
                                <span className="material-symbols-rounded arrow_outward" translate="no">arrow_outward</span>
                              </span>
                        </Link>

                        
                        {/* Email */}
                        <Link href="mailto:hello@jaywong.digital"
                            className="contact-item"
                            role="listitem">

                            <span className="icon icon-lg" aria-hidden="true">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="80 -800 800 640" fill="currentColor">
                                    <path d="M146.67-160q-27 0-46.84-19.83Q80-199.67 80-226.67v-506.66q0-27 19.83-46.84Q119.67-800 146.67-800h666.66q27 0 46.84 19.83Q880-760.33 880-733.33v506.66q0 27-19.83 46.84Q840.33-160 813.33-160H146.67ZM480-461q5 0 9.17-1.5 4.16-1.5 8.5-3.83L801.33-662q6-3.67 9-9.5t3-12.83q0-15.34-13.33-23.67-13.33-8.33-27.33.67L480-521.33l-292-186q-14-9-27.67-.84Q146.67-700 146.67-685q0 7.33 3.33 13.5t8.67 9.5l303.66 195.67q4.34 2.33 8.5 3.83Q475-461 480-461Z"/>
                                </svg>
                            </span>

                            <span className="contact-text" translate="no">
                                hello@jaywong.digital
                            </span>

                            <span className="icon icon-lg" aria-hidden="true">
                                <span className="material-symbols-rounded arrow_outward" translate="no">arrow_outward</span>
                              </span>
                        </Link>

                        {/* LinkedIn */}
                        <Link href="https://linkedin.com/in/jayycwong"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-item"
                            role="listitem">

                            <span className="icon icon-lg" aria-hidden="true">
                                {/* LinkedIn icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
                                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
                                    </svg>
                            </span>

                            <span className="contact-text">
                                Connect with me
                            </span>

                            <span className="icon icon-lg" aria-hidden="true">
                                <span className="material-symbols-rounded arrow_outward" translate="no">arrow_outward</span>
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    </main>
  );
}
