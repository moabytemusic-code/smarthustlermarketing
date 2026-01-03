import Navbar from '../../components/Navbar';
import Link from 'next/link';

export default function About() {
    return (
        <main style={{ position: 'relative', overflow: 'hidden' }}>
            <div className="blob blob-1" />
            <div className="blob blob-2" />

            <Navbar />

            <div className="container" style={{ padding: '6rem 0' }}>
                {/* Hero Section */}
                <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 6rem' }}>
                    <div className="badge" style={{ marginBottom: '1.5rem' }}>
                        <span className="dot dot-ping"></span>
                        New Direction for 2026
                    </div>
                    <h1 className="title-main">
                        Stop Trading <span className="gradient-text">Time for Money</span>.
                    </h1>
                    <p className="subtitle">
                        Most side hustles are just second jobs. At Smart Hustler, we build automated income assets that pay us forever. Welcome to the new era of digital entrepreneurship.
                    </p>
                </div>

                {/* The 5 Steps Grid */}
                <div style={{ marginBottom: '6rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 700, textAlign: 'center', marginBottom: '3rem' }}>
                        The 5-Step Asset Blueprint
                    </h2>
                    <div className="resource-grid" style={{ marginTop: '2rem' }}>
                        {[
                            { step: '01', title: 'Micro-Niche', desc: 'Dominate a tiny, specific corner of the internet.' },
                            { step: '02', title: 'No-Code Stack', desc: 'Build powerful systems without writing a single line of code.' },
                            { step: '03', title: 'The Hook', desc: 'Create irresistible lead magnets that solve real problems.' },
                            { step: '04', title: 'Content Flywheel', desc: 'One core piece of content, repurposed everywhere.' },
                            { step: '05', title: 'Monetization', desc: 'Move from affiliate comms to high-ticket offers.' },
                            { step: '06', title: 'Scale & Exit', desc: 'Automate operations and prepare for a potential exit.' }
                        ].map((item, i) => (
                            <div key={i} className="card-premium">
                                <div style={{ fontSize: '4rem', fontWeight: 900, color: 'rgba(255,255,255,0.05)', lineHeight: 0.8 }}>
                                    {item.step}
                                </div>
                                <h3 style={{ marginTop: '-1rem', zIndex: 1 }}>{item.title}</h3>
                                <p>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mission / Story */}
                <div className="glass" style={{ padding: '4rem', borderRadius: '2rem', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)' }}>
                    <div className="hero-grid" style={{ padding: 0, gap: '3rem' }}>
                        <div>
                            <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Not Another Guru Site</h2>
                            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                                Smart Hustler Marketing started with a simple realization: the "hustle culture" is broken. Working 16 hours a day isn't a badge of honor; it's a sign of inefficiency.
                            </p>
                            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
                                We pivoted our entire direction to focus on <strong>Asset Creation</strong>. We don't teach you how to be a freelancer. We teach you how to be a business owner. Our tools, templates, and strategies are designed to remove you from the day-to-day operations so you can focus on growth.
                            </p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'center' }}>
                            <div className="stat-item">
                                <h4>100%</h4>
                                <p>Automated Systems</p>
                            </div>
                            <div className="stat-item">
                                <h4>$0</h4>
                                <p>To Start (No-Code)</p>
                            </div>
                            <div className="stat-item">
                                <h4>2026</h4>
                                <p>Updated Strategies</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div style={{ textAlign: 'center', marginTop: '6rem' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Ready to build your first asset?</h2>
                    <div className="btn-group" style={{ justifyContent: 'center' }}>
                        <Link href="/shop" className="btn-premium">
                            Get the Blueprint
                        </Link>
                        <Link href="/tools" className="btn-outline">
                            Explore Tools
                        </Link>
                    </div>
                </div>

            </div>
        </main>
    );
}
