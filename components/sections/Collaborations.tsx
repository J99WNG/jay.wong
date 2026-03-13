import Section from "../Section";

export default function Collaborations() {
    return (
        <Section id="collaborations">
            <div className="col-30-70">
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
                            I&apos;ve spent the last 6 years crafting global, sustainable and inclusive digital experiences. An innate design thinker blended with a strong business acumen — I thrive on bridging the intersections of Design, IT and Business through fostering collaboration and leveraging a user-centred approach to deliver on customer needs and business goals.
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
        </Section>
    )
};