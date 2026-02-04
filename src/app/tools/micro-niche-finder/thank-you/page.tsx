'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import '../styles.css';

export default function ThankYouPage() {
    const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 0) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="micro-niche-wrapper">
            <div className="background-mesh"></div>

            <nav className="signal-navbar">
                <Link href="/tools/micro-niche-finder" className="logo" style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>⚡</span> SIGNAL ENGINES
                </Link>
                <div className="nav-links">
                    <Link href="/">Back to Main Site</Link>
                </div>
            </nav>

            <main className="thank-you-container">
                <div className="monitor-icon">📩</div>
                <h1>Success! Your Niche Report is being generated.</h1>
                <p className="sub-headline">It will arrive in your inbox in about 5 minutes.</p>

                <div className="offer-box">
                    <div className="discount-badge">80% OFF</div>
                    <h2>Wait! Don't Start From Scratch.</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                        While you wait for your report, grab the exact blueprint we use to launch profitable side hustles in 24 hours.
                    </p>

                    <h3>The 24-Hour Side Hustle Launchpad</h3>

                    <ul className="checklist">
                        <li><span>✓</span> Copy-paste validation scripts</li>
                        <li><span>✓</span> 5 Plug-and-play landing page templates</li>
                        <li><span>✓</span> The "Zero-Ad-Spend" traffic checklist</li>
                    </ul>

                    <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#ef4444' }}>
                            ⏰ This offer expires in: <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                                {timeLeft > 0 ? formatTime(timeLeft) : "EXPIRED"}
                            </span>
                        </p>
                    </div>

                    <div className="price-tag">
                        <span className="old-price">$47</span> $7
                    </div>

                    <div style={{ background: 'rgba(16, 185, 129, 0.05)', borderLeft: '3px solid #10b981', padding: '1rem', margin: '1.5rem 0', textAlign: 'left' }}>
                        <p style={{ fontStyle: 'italic', margin: 0, fontSize: '0.95rem' }}>
                            "I used this exact blueprint to validate and launch my Notion templates store. Made $340 in the first week."
                        </p>
                        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                            — Sarah K., Side Hustler
                        </p>
                    </div>

                    <a href="https://buy.stripe.com/8x2fZg880eHL9HFfUi4wM01" style={{ textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">
                        <button className="btn-primary glow-effect" style={{ width: '100%', justifyContent: 'center', fontSize: '1.2rem' }}>
                            Yes! Give Me Instant Access for $7 →
                        </button>
                    </a>
                    <p style={{ fontSize: '0.85rem', color: '#10b981', marginTop: '0.5rem', fontWeight: 600 }}>
                        🔒 30-Day Money-Back Guarantee
                    </p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                        One-time offer. Use this to execute your niche idea immediately.
                    </p>
                </div>

                <p style={{ marginTop: '3rem', color: 'var(--text-muted)', fontSize: '0.9rem', paddingBottom: '3rem' }}>
                    <Link href="/" style={{ color: 'var(--text-muted)' }}>No thanks, just take me to the home page</Link>
                </p>
            </main>
        </div>
    );
}
