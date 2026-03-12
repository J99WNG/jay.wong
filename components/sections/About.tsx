import Section from "../Section";

export default function About() {
    return (
        <Section id="about">
            <div className="col-30-70">
                <div className="section-heading">
                    <h2>About me
                    <br />
                    <span className="section-subtitle">In a nutshell.</span>
                    </h2>
                </div>

                <div className="section-content">
                    <div className="content-block">
                        <p className="lead">
                            I’ve always been someone who observes first.
                        </p>

                        <p className="lead">
                            Growing up, I wasn’t the loudest person in the room. I paid attention. I noticed patterns in how people interacted, how spaces made others feel, how small details could change the tone of a conversation. That instinct – to observe before reacting – quietly became the foundation of how I solve problems today.
                        </p>
                    </div>

                    <div className="badge-group">
                        <li className="badge">UX Research</li>
                        <li className="badge">UI Design</li>
                        <li className="badge">Design systems</li>
                        <li className="badge">Accessible design</li>
                        <li className="badge">Inclusive design</li>
                        <li className="badge">Generative AI</li>
                        <li className="badge">Systems thinking</li>
                        <li className="badge">Agile methodology</li>
                        <li className="badge">ServiceNow</li>
                        <li className="badge">HTML</li>
                        <li className="badge">CSS</li>
                        <li className="badge">Next.js</li>
                    </div>

                    <div className="grid-layout">
                        <div className="card">
                            <div className="card-content card-padding-md">
                                <span className="icon icon-xl" aria-hidden="true">
                                    <span className="material-symbols-rounded card-icon" translate="no">account_tree</span>
                                </span>

                                <p className="lead">Strategic Organiser</p>

                                <p className="card-text">I bring structure to complexity, keeping teams aligned, focused, and moving fast.</p>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-content card-padding-md">
                                <span className="icon icon-xl" aria-hidden="true">
                                    <span className="material-symbols-rounded card-icon" translate="no">category</span>
                                </span>

                                <p className="lead">Cross-Functional</p>

                                <p className="card-text">Fluency across design, IT, and business – I turn gaps into shared understanding.</p>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-content card-padding-md">
                                <span className="icon icon-xl" aria-hidden="true">
                                    <span className="material-symbols-rounded card-icon" translate="no">search_insights</span>
                                </span>

                                <p className="lead">Evidence-Led</p>

                                <p className="card-text">My decisions are grounded in research, data, and real user needs – not assumptions.</p>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-content card-padding-md">
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
        </Section>
    )
}