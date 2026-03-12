import Section from "../Section";
import Link from "next/link";
import Image from "next/image";
import TextLink from "../ui/TextLink";

export default function Work() {
    return (
        <Section id="work">
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

                        <div className="flex flex-row gap-1 items-start">
                            <span className="icon icon-md" aria-hidden="true">
                                <span className="material-symbols-rounded" translate="no">info</span>
                            </span>
                            
                            <p className="italic">Some projects are simplified or anonymised to respect client confidentiality and NDAs.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-8 mt-6">
                {/* Card #1 */}
                <article className="card">
                    <div className="card-content card-padding-lg">
                        <p className="small">
                            2025 / bp / Oil & Gas
                        </p>

                        <h3 className="card-title">Shifting IT Support Left at Enterprise Scale</h3>

                        <p className="card-text">
                            Reducing repeat IT tickets by 24% at bp through AI-assisted knowledge discovery and content design.
                        </p>
                        
                        <div className="badge-group">
                            <p className="badge">GenAI</p>
                            <p className="badge">ITSM</p>
                            <p className="badge">ServiceNow</p>
                        </div>

                        <TextLink className="card-link" href="/bp-itsm-genai">
                            View case study

                            <span className="icon icon-sm" aria-hidden="true">
                                <span className="material-symbols-rounded arrow_forward">
                                    arrow_forward
                                </span>
                            </span>
                        </TextLink>
                    </div>

                    <div className="card-img">
                        <Image src="/assets/images/case-study-1/bp-bento-1.png"
                            alt="Featured Project"
                            fill
                        />
                    </div>
                </article>

                {/* Card #2 */}
                <article className="card">
                    <div className="card-content card-padding-lg">
                        <p className="small">
                            2025 / bp / Oil & Gas
                        </p>

                        <h3 className="card-title">From Fragmented Intranets to a Unified Global Digital Workplace</h3>

                        <p className="card-text">
                            Leading the consolidation of fragmented workplace services into a unified ServiceNow experience at bp.
                        </p>
                        
                        <div className="badge-group">
                            <p className="badge">Digital Workplace</p>
                            <p className="badge">ServiceNow</p>
                        </div>

                        <TextLink className="card-link" href="/bp-workplace">
                            View case study

                            <span className="icon icon-sm" aria-hidden="true">
                                <span className="material-symbols-rounded arrow_forward">
                                    arrow_forward
                                </span>
                            </span>
                        </TextLink>
                    </div>

                    <div className="card-img">
                        <Image src="assets/images/case-study-2/ow-bento-1.png"
                            alt="Featured Project"
                            fill
                        />
                    </div>
                </article>

                {/* Card #2 */}
                <article className="card">
                    <div className="card-content card-padding-lg">
                        <p className="small">
                            2020 / Credit Suisse / Finance
                        </p>

                        <h3 className="card-title">Streamlining the KYC Onboarding Experience for Digital Wealth Management</h3>

                        <p className="card-text">
                            Coming soon.
                        </p>
                        
                        <div className="badge-group">
                            <p className="badge">FinTech</p>
                            <p className="badge">Mobile</p>
                            <p className="badge">Concept</p>
                        </div>
                    </div>

                    <div className="card-img">
                        <Image src="assets/images/case-study-3/cs-bento-1.png"
                            alt="Featured Project"
                            fill
                        />
                    </div>
                </article>
            </div>
        </Section>
    )
};
            