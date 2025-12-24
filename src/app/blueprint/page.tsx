'use client';

import Navbar from '../../components/Navbar';
import { useState } from 'react';

export default function LeadMagnetPage() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const res = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (!res.ok) throw new Error('Subscription failed');

            setStatus('success');
            // Optional: Redirect to the PDF directly after a few seconds
            // window.location.href = '/lead-magnets/Side_Hustle_Blueprint_2025.md';
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    return (
        <main style={{ minHeight: '100vh', backgroundColor: '#020617', color: '#fff', overflowX: 'hidden' }}>
            <Navbar />

            <div className="container" style={{ padding: '8rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>

                {/* Background Glows */}
                <div style={{ position: 'absolute', top: '20%', left: '10%', width: '300px', height: '300px', background: 'var(--primary-glow)', filter: 'blur(100px)', borderRadius: '50%', opacity: 0.2, zIndex: 0 }}></div>
                <div style={{ position: 'absolute', bottom: '20%', right: '10%', width: '400px', height: '400px', background: 'var(--secondary-glow)', filter: 'blur(120px)', borderRadius: '50%', opacity: 0.2, zIndex: 0 }}></div>

                <div className="glass" style={{ maxWidth: '900px', width: '100%', padding: '4rem', borderRadius: '1.5rem', position: 'relative', zIndex: 1, border: '1px solid rgba(255,255,255,0.1)' }}>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>

                        {/* Left Side: Copy */}
                        <div style={{ textAlign: 'left' }}>
                            <div className="badge" style={{ marginBottom: '1.5rem', display: 'inline-flex' }}>
                                <span style={{ marginRight: '0.5rem' }}>🎁</span> Free Download
                            </div>
                            <h1 className="title-main" style={{ fontSize: '3rem', lineHeight: '1.1', marginBottom: '1.5rem' }}>
                                The 2026 <br />
                                <span className="gradient-text">Side Hustle Blueprint</span>
                            </h1>
                            <p className="subtitle" style={{ fontSize: '1.1rem', marginBottom: '2rem', color: '#cbd5e1' }}>
                                Stop guessing. Follow the exact 5-step roadmap we use to build $10k/month automated income streams.
                            </p>

                            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2.5rem' }}>
                                {[
                                    'The "Micro-Niche" Discovery Method',
                                    'Our Complete "No-Code" Tech Stack',
                                    '30-Day Launch Checklist',
                                    'The "Content Flywheel" Strategy'
                                ].map((item, i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', color: '#94a3b8' }}>
                                        <span style={{ color: 'var(--primary)', marginRight: '0.75rem', fontWeight: 'bold' }}>✓</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            {status === 'success' ? (
                                <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '1.5rem', borderRadius: '0.5rem' }}>
                                    <h3 style={{ color: '#34d399', marginBottom: '0.5rem', fontWeight: 'bold' }}>🎉 You're In!</h3>
                                    <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Check your inbox for the blueprint.</p>
                                    <a href="/lead-magnets/Side_Hustle_Blueprint_2026.md" download className="btn-premium" style={{ display: 'inline-block', width: 'auto', padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                                        Download Now &rarr;
                                    </a>
                                </div>
                            ) : (
                                <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                                    <input
                                        type="email"
                                        placeholder="Enter your email address..."
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        style={{
                                            padding: '1rem',
                                            borderRadius: '0.5rem',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            background: 'rgba(0,0,0,0.3)',
                                            color: '#fff',
                                            fontSize: '1rem'
                                        }}
                                    />
                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className="btn-premium"
                                        style={{ width: '100%', justifyContent: 'center' }}
                                    >
                                        {status === 'loading' ? 'Sending...' : 'Send Me The Blueprint 🚀'}
                                    </button>
                                    <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem', textAlign: 'center' }}>
                                        Join 5,000+ hustlers. Unsubscribe anytime.
                                    </p>
                                </form>
                            )}
                        </div>

                        {/* Right Side: Visual */}
                        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                            <div style={{
                                width: '300px',
                                height: '400px',
                                background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                                borderRadius: '1rem',
                                border: '1px solid rgba(255,255,255,0.1)',
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '2rem',
                                textAlign: 'center',
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                {/* Decorative elements mimicking a document */}
                                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '6px', background: 'var(--primary)' }}></div>
                                <div style={{ fontSize: '4rem', marginBottom: '1rem', opacity: 0.8 }}>⚡️</div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>BLUEPRINT</h3>
                                <div style={{ fontSize: '3rem', fontWeight: 900, color: '#fff', lineHeight: 1 }}>2026</div>
                                <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '1rem' }}>CONFIDENTIAL STRATEGY</p>

                                {/* Shine Effect */}
                                <div style={{
                                    position: 'absolute',
                                    top: '-50%',
                                    left: '-50%',
                                    width: '200%',
                                    height: '200%',
                                    background: 'linear-gradient(45deg, transparent 45%, rgba(255,255,255,0.05) 50%, transparent 55%)',
                                    transform: 'rotate(30deg)',
                                    pointerEvents: 'none'
                                }}></div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </main>
    );
}
