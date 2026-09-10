'use client';

import { memo, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { tickerMask, tickerTransition } from '@/lib/motion';

const TIME_ZONE = 'Asia/Hong_Kong';
const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: TIME_ZONE,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
});

function getHongKongTime() {
    // Keeping the time pieces separate gives the UI a predictable HH:MM:SS shape,
    // instead of depending on punctuation or spacing chosen by the browser.
    const parts = Object.fromEntries(
        formatter
            .formatToParts(new Date())
            .filter(({ type }) => type !== 'literal')
            .map(({ type, value }) => [type, value])
    );

    return {
        digits: `${parts.hour}:${parts.minute}:${parts.second}`,
        dayPeriod: parts.dayPeriod.toUpperCase(),
    };
}

const TickerDigit = memo(function TickerDigit({ value, reduceMotion }) {
    // These are the main motion-tuning controls: visualDuration sets perceived
    // speed, while bounce sets how playful or restrained the landing feels.
    const transition = reduceMotion ? { duration: 0 } : tickerTransition;

    return (
        <span
            className="relative inline-grid h-[1.5em] overflow-hidden leading-[1.5]"
            style={{ maskImage: tickerMask, WebkitMaskImage: tickerMask }}
        >
            {/* All ten invisible faces share one grid cell. Their widest face
                defines a permanent slot width, so changing digits cannot reflow the clock. */}
            {DIGITS.map((digit) => (
                <span key={digit} aria-hidden className="invisible [grid-area:1/1]">
                    {digit}
                </span>
            ))}

            <AnimatePresence initial={false}>
                {/* A changed value enters from below while the old face exits above. */}
                <motion.span
                    key={value}
                    className="absolute inset-0 flex items-center justify-center"
                    initial={reduceMotion ? false : { y: '100%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={reduceMotion ? { opacity: 0 } : { y: '-100%', opacity: 0 }}
                    transition={transition}
                >
                    {value}
                </motion.span>
            </AnimatePresence>
        </span>
    );
});

function DayPeriod({ value }) {
    return (
        <span className="inline-grid">
            {/* Reserve whichever is wider—AM or PM—so noon and midnight stay stable. */}
            <span aria-hidden className="invisible [grid-area:1/1]">AM</span>
            <span aria-hidden className="invisible [grid-area:1/1]">PM</span>
            <span className="[grid-area:1/1]">{value}</span>
        </span>
    );
}

export default function Clock() {
    const [time, setTime] = useState(null);
    // Visitors who prefer reduced motion still see the correct time, without rolling.
    const reduceMotion = useReducedMotion() ?? false;

    useEffect(() => {
        const timer = { timeout: null, interval: null };
        const update = () => setTime(getHongKongTime());
        update();

        // Align updates with the wall-clock second so the roll stays punctual.
        timer.timeout = window.setTimeout(() => {
            update();
            timer.interval = window.setInterval(update, 1000);
        }, 1000 - (Date.now() % 1000));

        return () => {
            if (timer.timeout !== null) window.clearTimeout(timer.timeout);
            if (timer.interval !== null) window.clearInterval(timer.interval);
        };
    }, []);

    // The placeholder has the exact same structure as the live time, preventing
    // a layout jump while the client gets its first Hong Kong timestamp.
    const display = time ?? { digits: '00:00:00', dayPeriod: 'AM' };
    const readableTime = `${display.digits} ${display.dayPeriod}`;

    return (
        <div className="flex items-center gap-2">
            {/* Presence indicator: a static green core with a pulsing outer ring. */}
            <span className="relative flex size-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--color-green-900)] opacity-75 motion-safe:animate-ping" />
                <span className="relative inline-flex size-2 rounded-full bg-[var(--color-green-500)]" />
            </span>

            <span className="m-0 inline-flex items-center gap-2 font-pixel text-sm uppercase leading-none tracking-wide text-text-secondary">
                Hong Kong
                <time
                    id="clock-time"
                    dateTime={time ? `${display.digits}${display.dayPeriod}` : undefined}
                    aria-label={`${readableTime} Hong Kong time`}
                    className="inline-flex min-w-max items-center tabular-nums"
                >
                    {/* The animated treatment is decorative. The <time> label above
                        gives assistive technology one clean, readable timestamp. */}
                    <span aria-hidden="true" className="inline-flex items-center">
                        {/* Digits become animated slots; colons remain fixed anchors. */}
                        {[...display.digits].map((character, index) =>
                            character >= '0' && character <= '9' ? (
                                <TickerDigit
                                    key={index}
                                    value={character}
                                    reduceMotion={reduceMotion}
                                />
                            ) : (
                                <span key={index}>{character}</span>
                            )
                        )}
                        <span>&nbsp;</span>
                        <DayPeriod value={display.dayPeriod} />
                    </span>
                </time>
            </span>
        </div>
    );
}
