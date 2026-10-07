import Section from '@/components/layout/Section';
import CopyEmail from '@/components/ui/CopyEmail';
import Link from "next/link";
import { ArrowUpRight, Linkedin, Video } from 'lucide-react';
import StreamingText from '@/components/ui/StreamingText';

export default function Contact() {
    return (
        <Section id="contact" isLanding={true} stickyHeading={false}>
            <div className="section-grid">

                <div className="section-heading">
                    <h2>Let&apos;s talk
                    <br />
                    <span className="section-subtitle">Assam or Ceylon tea. No coffee here.</span>
                    </h2>
                </div>

                <div className="section-content">

                    <StreamingText className="lead">
                        Think we could build something exciting? I'm always open to interesting problems, thoughtful conversations and opportunities to build something meaningful.
                    </StreamingText>

                    <ul className="flex shrink list-none flex-col gap-6 p-0">
                        {/* Email */}
                        <li>
                            <CopyEmail />
                        </li>

                        {/* LinkedIn */}
                        <li>
                            <Link href="https://linkedin.com/in/jayycwong"
                                className="contact-item"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Connect with Jay Wong on LinkedIn (opens in a new tab)">

                            <Linkedin aria-hidden="true" size={32} />

                            <span>
                                Connect with me
                            </span>

                            <ArrowUpRight aria-hidden="true" className="motion-icon-up-right" />
                            </Link>
                        </li>
                        
                        {/* Cal.com */}
                        <li>
                            <Link href="https://cal.com/jay-wong/intro"
                                className="contact-item"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Schedule an introductory meeting with Jay Wong on Cal.com (opens in a new tab)">

                            <Video aria-hidden="true" size={32} />

                            <span>
                                Schedule a call
                            </span>

                            <ArrowUpRight aria-hidden="true" className="motion-icon-up-right" />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </Section>
    );
}
