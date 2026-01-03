'use client';

import Navbar from '../../components/Navbar';
import Link from 'next/link';
import CountdownTimer from '../../components/CountdownTimer';
import { CheckCircle2, Package, Download, Zap, ShieldCheck, Gift, ArrowRight } from 'lucide-react';
import { useEffect } from 'react';

export default function WeeklyDeal() {
    // Logic to show banner if coming from Blueprint funnel
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('origin') === 'blueprint') {
            const banner = document.getElementById('welcome-banner');
            if (banner) banner.style.display = 'block';
        }
    }, []);

    return (
        <main style={{ minHeight: '100vh', backgroundColor: '#020617', color: '#fff' }}>
            <Navbar />

            {/* Hero Section */}
            <section style={{
                position: 'relative',
                padding: '10rem 0 6rem',
                overflow: 'hidden',
                textAlign: 'center'
            }}>
                {/* Background Effects */}
                <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)', zIndex: 0 }}></div>

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>

                    {/* Dynamic Welcome Banner */}
                    <div id="welcome-banner" style={{ display: 'none', maxWidth: '600px', margin: '0 auto 2rem', padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '0.5rem', color: '#34d399', textAlign: 'center' }}>
                        🎉 <strong>Success!</strong> Your Blueprint is on its way to your inbox. While you wait, check this out...
                    </div>

                    <div className="badge" style={{ marginBottom: '2rem' }}>
                        <div className="dot"><div className="dot-ping"></div></div>
                        <span>Limited Time Offer</span>
                    </div>

                    <h1 className="title-main" style={{ fontSize: '4.5rem', letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>
                        The <span className="gradient-text">Friday Drop</span>
                    </h1>

                    <p className="subtitle" style={{ margin: '0 auto 2.5rem', fontSize: '1.25rem', color: '#cbd5e1', maxWidth: '700px' }}>
                        Get $250+ worth of premium digital assets for just <span style={{ color: '#fff', fontWeight: 'bold' }}>$25</span>.
                        New bundle drops every week.
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
                        {['Instant Download', 'Personal Use Rights', '30-Day Guarantee'].map((feature, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8' }}>
                                <CheckCircle2 size={18} color="var(--primary)" />
                                <span>{feature}</span>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginBottom: '4rem' }}>
                        <CountdownTimer />
                    </div>

                    <div className="btn-group" style={{ justifyContent: 'center' }}>
                        <Link href="#pricing" className="btn-premium" style={{ paddingTop: '1rem', paddingBottom: '1rem', fontSize: '1.125rem' }}>
                            Claim This Deal
                        </Link>
                    </div>
                </div>
            </section>

            {/* Value Stack Section */}
            <section style={{ padding: '6rem 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 className="section-title" style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>What's In The Box?</h2>
                        <p style={{ color: '#94a3b8' }}>Every week we curate 12-18 high-quality PLR/MRR products you can use, learn from, or resell.</p>
                    </div>

                    <div className="resource-grid" style={{ marginTop: '0' }}>
                        <div className="card-premium">
                            <div className="card-icon"><Package /></div>
                            <h3>Marketing Courses</h3>
                            <p>Full video training series on traffic, conversion, and funnel building.</p>
                        </div>
                        <div className="card-premium">
                            <div className="card-icon"><Download /></div>
                            <h3>Lead Magnets</h3>
                            <p>Done-for-you reports and checklists to build your email list fast.</p>
                        </div>
                        <div className="card-premium">
                            <div className="card-icon"><Zap /></div>
                            <h3>Social Frameworks</h3>
                            <p>Copy-paste social media calendars and post templates.</p>
                        </div>
                        <div className="card-premium">
                            <div className="card-icon"><Gift /></div>
                            <h3>Bonus Assets</h3>
                            <p>Swipe files, email sequences, and high-converting graphics.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" style={{ padding: '8rem 0', background: 'linear-gradient(180deg, transparent 0%, rgba(2, 6, 23, 0.5) 100%)' }}>
                <div className="container">
                    <div className="hero-grid" style={{ alignItems: 'flex-start', maxWidth: '1000px', margin: '0 auto' }}>

                        {/* Option 1: Standard */}
                        <div className="card-premium" style={{ background: 'transparent', borderColor: 'rgba(255,255,255,0.1)' }}>
                            <div style={{ marginBottom: '2rem' }}>
                                <h3 style={{ fontSize: '1.5rem', color: '#94a3b8' }}>Standard Access</h3>
                                <div style={{ fontSize: '3.5rem', fontWeight: '800', margin: '1rem 0', color: '#fff' }}>$25</div>
                                <p style={{ color: '#64748b' }}>One-time payment</p>
                            </div>
                            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {['12-18 Premium Digital Products', 'Personal Use Rights', 'Direct Download Access', '30-Day Money Back Guarantee'].map((item, i) => (
                                    <li key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'center', color: '#cbd5e1' }}>
                                        <CheckCircle2 color="var(--primary)" size={20} />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <a href="https://buy.stripe.com/STH_STANDARD_LINK" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ marginTop: 'auto', width: '100%', justifyContent: 'center', textAlign: 'center', display: 'block' }}>
                                Get Bundle Only
                            </a>
                        </div>

                        {/* Option 2: Reseller (Highlighted) */}
                        <div className="card-premium" style={{
                            background: 'rgba(30, 41, 59, 0.3)',
                            border: '1px solid var(--primary)',
                            boxShadow: '0 0 40px rgba(251, 191, 36, 0.1)',
                            transform: 'scale(1.05)',
                            position: 'relative'
                        }}>
                            <div style={{ position: 'absolute', top: '-1rem', left: '50%', transform: 'translateX(-50%)', background: 'var(--primary)', color: '#000', padding: '0.25rem 1rem', borderRadius: '9999px', fontWeight: '700', fontSize: '0.875rem' }}>
                                MOST POPULAR
                            </div>
                            <div style={{ marginBottom: '2rem' }}>
                                <h3 style={{ fontSize: '1.5rem', color: '#fff' }}>Reseller Bundle</h3>
                                <div style={{ fontSize: '3.5rem', fontWeight: '800', margin: '1rem 0', color: 'var(--primary)' }}>$50</div>
                                <p style={{ color: 'var(--primary)', fontWeight: '600' }}>Includes Full Resell Rights</p>
                            </div>
                            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {['Everything in Standard', 'Customizable Weekly Gift Page', 'Add Your Own Affiliate Offers', 'Full Resell Rights (MRR)', 'Priority Support'].map((item, i) => (
                                    <li key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'center', color: '#fff' }}>
                                        <CheckCircle2 color="var(--primary)" size={20} />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <a href="https://buy.stripe.com/STH_RESELLER_LINK" target="_blank" rel="noopener noreferrer" className="btn-premium" style={{ marginTop: 'auto', width: '100%', justifyContent: 'center', textAlign: 'center', display: 'block' }}>
                                Get Full Access
                            </a>
                        </div>

                    </div>
                </div>
            </section>

            {/* Guarantee */}
            <section style={{ padding: '0 0 8rem', textAlign: 'center', borderTop: '0' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <ShieldCheck size={48} color="var(--primary)" style={{ marginBottom: '1.5rem', opacity: 0.8 }} />
                    <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: '#fff' }}>Zero Risk Guarantee</h3>
                    <p style={{ color: '#94a3b8' }}>
                        If you don't feel like you received at least 10x the value, simply email us within 30 days for a full refund. No questions asked.
                    </p>
                </div>
            </section>

            <footer style={{ padding: '4rem 0', borderTop: '1px solid rgba(255, 255, 255, 0.05)', textAlign: 'center', color: '#64748b' }}>
                <div className="container">
                    <p style={{ marginBottom: '1.5rem' }}>&copy; {new Date().getFullYear()} Smart Hustler Marketing. All rights reserved.</p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', fontSize: '0.875rem' }}>
                        <Link href="/privacy" style={{ color: 'inherit' }}>Privacy Policy</Link>
                        <Link href="/terms" style={{ color: 'inherit' }}>Terms of Service</Link>
                        <Link href="/contact" style={{ color: 'inherit' }}>Contact</Link>
                    </div>
                </div>
            </footer>
        </main>
    );
}
