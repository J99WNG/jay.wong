import Section from "../Section";
import HKTClock from "@/components/HKTClock";
import CopyEmail from '@/components/CopyEmail';
import TextLink from "../ui/TextLink";
import Link from "next/link";

export default function Contact() {
    return (
        <Section id="contact" isLanding={true}>
            <div className="col-30-70">

                <div className="section-heading">
                    <h2>Let&apos;s talk
                    <br />
                    <span className="section-subtitle">Assam or Ceylon tea – no coffee here.</span>
                    </h2>
                </div>

                <div className="section-content">

                    <p className="lead">
                        Think we could build something exciting? I&apos;d love to hear from you –
                        whether it&apos;s a quick question, collaboration idea, or a full-on project.
                    </p>

                    {/* Status */}
                    <div className="content-block">
                        <p className="small">Currently based in:</p>
                        <HKTClock />
                    </div>
                    
                    <div className="flex flex-col gap-6 shrink-1" role="list">
                        {/* Email */}
                        <CopyEmail />

                        {/* LinkedIn */}
                        <Link href="https://linkedin.com/in/jayycwong"
                            className="contact-item"
                            target="_blank"
                            rel="noopener noreferrer"
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

                            <span className="icon icon-md" aria-hidden="true">
                                <span className="material-symbols-rounded arrow_outward" translate="no">arrow_outward</span>
                            </span>
                        </Link>
                        
                        {/* Cal.com */}
                        <Link href="https://cal.com/jay-wong/intro"
                            className="contact-item"
                            target="_blank"
                            rel="noopener noreferrer"
                            role="listitem">

                            <span className="icon icon-lg" aria-hidden="true">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                                    <path d="M320-400h240q17 0 28.5-11.5T600-440v-80l80 80v-240l-80 80v-80q0-17-11.5-28.5T560-720H320q-17 0-28.5 11.5T280-680v240q0 17 11.5 28.5T320-400ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z"/>
                                </svg>
                            </span>

                            <span className="contact-text" translate="no">
                                Schedule a call
                            </span>

                            <span className="icon icon-md" aria-hidden="true">
                                <span className="material-symbols-rounded arrow_outward" translate="no">arrow_outward</span>
                              </span>
                        </Link>
                    </div>
                </div>
            </div>
        </Section>
    );
}