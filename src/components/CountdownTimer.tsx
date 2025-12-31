'use client';

import { useState, useEffect } from 'react';

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export default function CountdownTimer() {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        // Calculate next Friday at midnight (00:00 Saturday basically, or generic next 7 days cycle)
        // For "Weekly Deal", let's assume it ends on Friday night or resets every week.
        // Let's set it to count down to next Saturday 00:00 (Friday Midnight).

        const calculateTimeLeft = () => {
            const now = new Date();
            const currentDay = now.getDay(); // 0 is Sunday, 5 is Friday, 6 is Saturday
            const daysUntilFriday = (5 - currentDay + 7) % 7;
            // If it's Friday (5), we want to end TODAY at midnight (so technically next day 00:00? Or next week?)
            // "5 Dollar Friday" usually implies the deal is ON Friday. So maybe count down to end of Friday (Saturday 00:00).

            const targetDate = new Date(now);

            if (currentDay === 5) {
                // It is Friday today, counting down to midnight tonight (Saturday 00:00)
                targetDate.setHours(24, 0, 0, 0);
            } else {
                // Count down to next Friday 00:00 (Start of Friday) or End of Friday?
                // Visual urgency usually implies "Until Deal Opens" or "Until Deal Closes".
                // If it's NOT Friday, maybe "Deal Starts In...". If IT IS Friday, "Deal Ends In...".
                // For simplicity, let's just countdown to the NEXT Saturday 00:00, implying the "Weekly Cycle" ends then.

                let daysToAdd = (6 - currentDay + 7) % 7;
                if (daysToAdd === 0 && now.getHours() >= 0) {
                    daysToAdd = 7; // If it's Saturday already, wait for next Saturday
                }
                targetDate.setDate(now.getDate() + daysToAdd);
                targetDate.setHours(0, 0, 0, 0);
            }

            const difference = targetDate.getTime() - now.getTime();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
            } else {
                // Timer expired
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, []);

    const timeBlocks = [
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Minutes', value: timeLeft.minutes },
        { label: 'Seconds', value: timeLeft.seconds },
    ];

    return (
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', margin: '2rem 0' }}>
            {timeBlocks.map((block, index) => (
                <div key={index} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '0.75rem',
                    padding: '1rem',
                    minWidth: '80px',
                    backdropFilter: 'blur(10px)'
                }}>
                    <span style={{
                        fontSize: '2rem',
                        fontWeight: '800',
                        color: 'var(--primary)',
                        fontFamily: 'monospace',
                        lineHeight: 1
                    }}>
                        {String(block.value).padStart(2, '0')}
                    </span>
                    <span style={{
                        fontSize: '0.75rem',
                        color: 'var(--text-muted)',
                        marginTop: '0.5rem',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}>
                        {block.label}
                    </span>
                </div>
            ))}
        </div>
    );
}
