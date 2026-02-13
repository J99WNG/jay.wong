'use client';
import { useState, useEffect } from 'react';

export default function Clock() {
    const [time, setTime] = useState('');

    useEffect(() => {
        const formatter = new Intl.DateTimeFormat('en-GB', {
            timeZone: 'Asia/Hong_Kong',
            hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
        });

        const timer = setInterval(() => setTime(formatter.format(new Date())), 1000);
        return () => clearInterval(timer);
    }, []);

    return <span id="clock-time">{time || 'Loading...'}</span>;
}