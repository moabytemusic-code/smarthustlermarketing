'use client';

import Navbar from '../../components/Navbar';
import Link from 'next/link';
import CountdownTimer from '../../components/CountdownTimer';
import { CheckCircle2, Package, Download, Zap, ShieldCheck, Gift } from 'lucide-react';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function WeeklyDeal() {
    // We need to wrap in Suspense boundary for useSearchParams in Next.js usually, 
    // or just use window.location if we want to avoid the suspense/client component complexity for a simple check.
    // However, since we are already 'use client', let's use a simple useEffect to toggle the banner visibility style.

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('origin') === 'blueprint') {
            const banner = document.getElementById('welcome-banner');
            if (banner) banner.style.display = 'block';
        }
    }, []);

    return (
        <main data-theme="deal">
            <Navbar />


            {/* Hero Section */}
            <section style={{
                position: 'relative',
                padding: '10rem 0 6rem',
                overflow: 'hidden',
                textAlign: 'center'
            }}>
                {/* Background Effects */}
                <div className="blob blob-1" style={{ top: '-10%', left: '50%', transform: 'translate(-50%)', width: '60rem', height: '60rem', opacity: 0.15 }}></div>

                <div className="container">
                    {/* Dynamic Welcome Banner */}
                    <div id="welcome-banner" style={{ display: 'none', marginBottom: '2rem', padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '0.5rem', color: '#34d399', textAlign: 'center' }}>
                        🎉 <strong>Success!</strong> Your Blueprint is on its way to your inbox. While you wait, check this out...
                    </div>

                    <div className="badge" style={{ marginBottom: '1.5rem', background: 'rgba(251, 191, 36, 0.1)', borderColor: 'rgba(251, 191, 36, 0.3)', color: '#fbbf24' }}>
                        <Zap size={14} fill="#fbbf24" />
                        LIMITED TIME OFFER
                    </div>

                    <h1 className="title-main" style={{ fontSize: '4rem', marginBottom: '1rem', color: 'var(--secondary)' }}>
                        The <span style={{ color: 'var(--primary)' }}>Friday Drop</span>
                    </h1>

                    <p className="subtitle" style={{ margin: '0 auto 2rem', fontSize: '1.5rem', color: 'var(--text-muted)' }}>
                        Get $250+ worth of premium digital assets for just <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>$25</span>.
                        <br />New bundle drops every week. Don't miss out.
                    </p>

                    <div style={{ marginBottom: '3rem' }}>
                        <CountdownTimer />
                        <p style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '1rem', letterSpacing: '1px', marginTop: '1rem' }}>OFFER EXPIRES MIDNIGHT</p>
                    </div>

                    <div className="btn-group" style={{ justifyContent: 'center' }}>
                        <Link href="#pricing" className="btn-premium" style={{ paddingTop: '1rem', paddingBottom: '1rem', fontSize: '1.125rem' }}>
                            Claim This Deal
                        </Link>
                    </div>
                </div>
            </section>

            {/* Value Stack Section */}
            <section style={{ padding: '6rem 0', background: 'var(--background-alt)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--secondary)' }}>What's In The Box?</h2>
                        <p style={{ color: 'var(--text-muted)' }}>Every week we curate 12-18 high-quality PLR/MRR products you can use, learn from, or resell.</p>
                    </div>

                    <div className="resource-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                        <div className="card-premium" style={{ alignItems: 'flex-start' }}>
                            <div className="card-icon" style={{ marginBottom: '1.5rem', width: '3rem', height: '3rem', fontSize: '1.5rem' }}><Package /></div>
                            <h3 style={{ fontSize: '1.25rem', color: 'var(--foreground)', fontWeight: '700' }}>Marketing Courses</h3>
                            <p style={{ color: 'var(--text-muted)', fontWeight: '500' }}>Full video training series on traffic, conversion, and funnel building.</p>
                        </div>
                        <div className="card-premium" style={{ alignItems: 'flex-start' }}>
                            <div className="card-icon" style={{ marginBottom: '1.5rem', width: '3rem', height: '3rem', fontSize: '1.5rem' }}><Download /></div>
                            <h3 style={{ fontSize: '1.25rem', color: 'var(--foreground)', fontWeight: '700' }}>Lead Magnets</h3>
                            <p style={{ color: 'var(--text-muted)', fontWeight: '500' }}>Done-for-you reports and checklists to build your email list fast.</p>
                        </div>
                        <div className="card-premium" style={{ alignItems: 'flex-start' }}>
                            <div className="card-icon" style={{ marginBottom: '1.5rem', width: '3rem', height: '3rem', fontSize: '1.5rem' }}><Zap /></div>
                            <h3 style={{ fontSize: '1.25rem', color: 'var(--foreground)', fontWeight: '700' }}>Social Frameworks</h3>
                            <p style={{ color: 'var(--text-muted)', fontWeight: '500' }}>Copy-paste social media calendars and post templates.</p>
                        </div>
                        <div className="card-premium" style={{ alignItems: 'flex-start' }}>
                            <div className="card-icon" style={{ marginBottom: '1.5rem', width: '3rem', height: '3rem', fontSize: '1.5rem' }}><Gift /></div>
                            <h3 style={{ fontSize: '1.25rem', color: 'var(--foreground)', fontWeight: '700' }}>Bonus Assets</h3>
                            <p style={{ color: 'var(--text-muted)', fontWeight: '500' }}>Swipe files, email sequences, and high-converting graphics.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" style={{ padding: '8rem 0' }}>
                <div className="container">
                    <div className="hero-grid" style={{ padding: '0', alignItems: 'stretch', gap: '2rem' }}>

                        {/* Option 1 */}
                        <div className="card-premium" style={{
                            background: 'var(--card-bg)',
                            position: 'relative',
                            borderColor: 'var(--card-border)',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}>
                            <div style={{ marginBottom: '2rem' }}>
                                <h3 style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}>Standard Access</h3>
                                <div style={{ fontSize: '3.5rem', fontWeight: '800', margin: '1rem 0', color: 'var(--foreground)' }}>$25</div>
                                <p>One-time payment</p>
                            </div>

                            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {[
                                    '12-18 Premium Digital Products',
                                    'Personal Use Rights',
                                    'Direct Download Access',
                                    '30-Day Money Back Guarantee'
                                ].map((item, i) => (
                                    <li key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                        <CheckCircle2 color="var(--primary)" size={20} />
                                        <span style={{ color: 'var(--foreground)' }}>{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <button className="btn-outline" style={{ marginTop: 'auto', width: '100%', justifyContent: 'center', textAlign: 'center' }}>
                                Get Bundle Only
                            </button>
                        </div>

                        {/* Option 2 - Highlighted */}
                        <div className="card-premium" style={{
                            background: '#fff',
                            border: '2px solid var(--primary)',
                            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 0 10px rgba(201, 36, 43, 0.2)',
                            position: 'relative'
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: '-1rem',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                background: 'var(--primary)',
                                color: '#fff',
                                padding: '0.25rem 1rem',
                                borderRadius: '9999px',
                                fontWeight: '700',
                                fontSize: '0.875rem'
                            }}>
                                MOST POPULAR
                            </div>

                            <div style={{ marginBottom: '2rem' }}>
                                <h3 style={{ fontSize: '1.5rem', color: 'var(--foreground)' }}>Reseller Bundle</h3>
                                <div style={{ fontSize: '3.5rem', fontWeight: '800', margin: '1rem 0', color: 'var(--primary)' }}>$50</div>
                                <p style={{ color: 'var(--secondary)', fontWeight: '600' }}>Includes Sales Page Template</p>
                            </div>

                            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {[
                                    'Everything in Standard',
                                    'Customizable Weekly Gift Page',
                                    'Add Your Own Affiliate Offers',
                                    'Full Resell Rights (MRR)',
                                    'Priority Support'
                                ].map((item, i) => (
                                    <li key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                        <CheckCircle2 color="var(--primary)" size={20} />
                                        <span style={{ color: 'var(--foreground)' }}>{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <button className="btn-premium" style={{ marginTop: 'auto', width: '100%', justifyContent: 'center', textAlign: 'center' }}>
                                Get Full Access
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Guarantee */}
            <section style={{ padding: '0 0 8rem', textAlign: 'center' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <ShieldCheck size={48} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
                    <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Zero Risk Guarantee</h3>
                    <p style={{ color: 'var(--text-muted)' }}>
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
