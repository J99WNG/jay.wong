'use client';
import HKTClock from "../HKTClock";

 

export default function Footer() {
    const currentYear = new Date().getFullYear(); // No script needed for this!

    return (
        <footer className="h-fit md:h-16" aria-label="Footer">

            <div className="container">
                <hr className="divider" aria-hidden="true" />
            </div>

            <div className="container">
                <div id="footer-wrapper" className="flex flex-col items-center gap-4 py-4 px-0 md:flex-row md:justify-between">

                    <p className="font-pixel text-sm text-text-secondary text-center m-0 md:text-left">
                        © {currentYear} Jay Wong. Built by me + a bit of ai.
                    </p>

                    <HKTClock />
                </div>
            </div>
            
        </footer>
    );
}