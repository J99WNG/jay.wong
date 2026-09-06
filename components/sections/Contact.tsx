import Section from "../Section";
import CopyEmail from '@/components/ui/CopyEmail';
import Link from "next/link";
import Icon from '@/components/ui/Icon';

export default function Contact() {
    return (
        <Section id="contact" isLanding={true}>
            <div className="section-grid">

                <div className="section-heading md:static">
                    <h2>Let&apos;s talk
                    <br />
                    <span className="font-normal text-text-tertiary">Assam or Ceylon tea. No coffee here.</span>
                    </h2>
                </div>

                <div className="inline-flex max-w-full flex-col gap-10">

                    <p className="lead">
                        Think we could build something exciting? I'm always open to interesting problems, thoughtful conversations and opportunities to build something meaningful.
                    </p>

                    <ul className="flex shrink list-none flex-col gap-6 p-0">
                        {/* Email */}
                        <li className="p-0">
                            <CopyEmail />
                        </li>

                        {/* LinkedIn */}
                        <li className="p-0">
                            <Link href="https://linkedin.com/in/jayycwong"
                                className="contact-item"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Connect with Jay Wong on LinkedIn (opens in a new tab)">

                            <Icon name="linkedin" size="lg" />

                            <span className="contact-text">
                                Connect with me
                            </span>

                            <Icon name="arrow-up-right" motion="up-right" />
                            </Link>
                        </li>
                        
                        {/* Cal.com */}
                        <li className="p-0">
                            <Link href="https://cal.com/jay-wong/intro"
                                className="contact-item"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Schedule an introductory meeting with Jay Wong on Cal.com (opens in a new tab)">

                            <Icon name="video" size="lg" />

                            <span className="contact-text" translate="no">
                                Schedule a call
                            </span>

                            <Icon name="arrow-up-right" motion="up-right" />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </Section>
    );
}
