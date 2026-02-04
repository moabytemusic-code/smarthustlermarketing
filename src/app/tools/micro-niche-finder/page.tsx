'use client';

import Link from 'next/link';
import MicroNicheFinder from '../../../components/tools/MicroNicheFinder';
import './styles.css';

export default function MicroNicheFinderPage() {
    return (
        <main className="micro-niche-wrapper">
            {/* Background Mesh */}
            <div className="background-mesh"></div>

            {/* --- SIGNAL ENGINES NAVBAR --- */}
            <nav className="signal-navbar">
                <div className="logo">
                    <span style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>⚡</span> SIGNAL ENGINES
                </div>
                <div className="nav-links">
                    <Link href="#">Analysis Tool</Link>
                    <Link href="#">Case Studies</Link>
                    <button className="btn-secondary">
                        Login
                    </button>
                </div>
            </nav>

            {/* --- HERO SECTION --- */}
            <div className="hero-section">

                {/* Badge */}
                <div className="badge">
                    New: AI Profit Scoring
                </div>

                {/* Headline */}
                <h1 className="hero-title">
                    Stop Guessing. Find Your <br />
                    <span className="gradient-text">Profitable Niche</span> in Seconds.
                </h1>

                {/* Subheadline */}
                <p className="sub-headline">
                    The only AI-powered tool that validates your side hustle idea before you waste time building it.
                </p>

                {/* Tool Component */}
                <MicroNicheFinder />

                {/* Social Proof */}
                <div style={{ marginTop: '2rem', color: '#94a3b8', fontSize: '0.9rem', fontWeight: 500 }}>
                    Join 10,000+ Entrepreneurs using Signal Engines
                </div>
            </div>

            {/* --- FEATURES GRID (Dark Cards) --- */}
            <div className="features-grid">
                <div className="feature-card">
                    <div className="card-icon">🚦</div>
                    <h3>Traffic Analysis</h3>
                    <p>Instantly see search volume, trends, and audience interest. Know if people are actually searching for it.</p>
                </div>
                <div className="feature-card">
                    <div className="card-icon">🔭</div>
                    <h3>Competitor Scan</h3>
                    <p>Uncover top competitors and their weaknesses. Find the gaps in the market you can exploit.</p>
                </div>
                <div className="feature-card">
                    <div className="card-icon">💰</div>
                    <h3>Profit Score</h3>
                    <p>Get a custom profitability score (0-100) based on CPC and monetization potential.</p>
                </div>
            </div>

            {/* --- LONG FORM SALES COPY --- */}
            <div style={{ maxWidth: '800px', margin: '4rem auto', padding: '0 2rem', borderTop: '1px solid #2d2d3d' }}>

                {/* Problem Section */}
                <div style={{ padding: '4rem 0', textAlign: 'left' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#fff' }}>
                        Most "Niche Research" is <span style={{ color: '#ef4444' }}>Dead Wrong</span>.
                    </h2>
                    <p style={{ fontSize: '1.1rem', color: '#94a3b8', marginBottom: '1rem' }}>
                        If you're using Google Trends or keyword tools the old way, you're just finding what everyone else has already found.
                    </p>
                    <p style={{ fontSize: '1.1rem', color: '#94a3b8', marginBottom: '1rem' }}>
                        The "Red Ocean" is filled with people fighting over the same "weight loss" and "make money online" keywords.
                        You can't win there anymore.
                    </p>
                    <p style={{ fontSize: '1.1rem', color: '#fff', fontWeight: 600 }}>
                        The money is in the Micro-Niches.
                    </p>
                </div>

                {/* Solution/How It Works */}
                <div style={{ padding: '4rem 0', borderTop: '1px solid #2d2d3d' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>How Signal Engines Works</h2>

                    <div style={{ display: 'grid', gap: '2rem' }}>
                        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                            <div style={{ background: 'rgba(79, 70, 229, 0.1)', color: '#4f46e5', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>1</div>
                            <div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#fff' }}>Real-Time Demand Scan</h3>
                                <p style={{ color: '#94a3b8' }}>Our AI scans live search data to find questions that are being asked *right now* but have poor answers.</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                            <div style={{ background: 'rgba(217, 70, 239, 0.1)', color: '#d946ef', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>2</div>
                            <div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#fff' }}>Profitability Check</h3>
                                <p style={{ color: '#94a3b8' }}>We cross-reference ad costs (CPC) to ensure the audience actually buys things.</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                            <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>3</div>
                            <div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#fff' }}>Instant Report</h3>
                                <p style={{ color: '#94a3b8' }}>You get a clean report with 3 actionable sub-niches you can dominate today.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ */}
                <div style={{ padding: '4rem 0', borderTop: '1px solid #2d2d3d' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>Frequently Asked Questions</h2>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Is this really free?</h4>
                        <p style={{ color: '#94a3b8' }}>Yes. We are currently stress-testing our new AI model. It will be a paid SaaS soon, but right now you can use it for free.</p>
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '0.5rem' }}>How accurate is the data?</h4>
                        <p style={{ color: '#94a3b8' }}>We pull directly from search API aggregators and cross-reference with live trends.</p>
                    </div>
                </div>

                {/* Final CTA */}
                <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Ready to find your next income stream?</h2>
                    <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Stop guessing. Let the AI do the work.</p>
                    <button
                        onClick={() => {
                            const input = document.getElementById('niche-input');
                            if (input) {
                                input.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                input.focus();
                            } else {
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }
                        }}
                        className="btn-primary glow-effect"
                        style={{ padding: '1.2rem 3rem', fontSize: '1.1rem' }}
                    >
                        Start Free Scan
                    </button>
                </div>

            </div>
        </main>
    );
}
