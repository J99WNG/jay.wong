'use client';
import { useState, useEffect } from 'react';

export default function Clock() {
    const [time, setTime] = useState('');

    useEffect(() => {
        const formatter = new Intl.DateTimeFormat('en-GB', {
            timeZone: 'Asia/Hong_Kong',
            hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
        });

        const timer = setInterval(() => setTime(formatter.format(new Date())), 1000);
        return () => clearInterval(timer);
    }, []);

    return (                        
        <div className="badge">
            <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--iron-buddha)] opacity-75"></span>
                <span className="relative inline-flex size-2 rounded-full bg-[var(--matcha-powder)]"></span>
            </span>

            <span className="inline-flex items-center text-sm leading-none font-mono font-bold tracking-widest gap-2 m-0">
                Hong Kong 🇭🇰
                <span id="clock-time">{time || 'Loading...'}</span>
            </span>
        </div>
    );
}