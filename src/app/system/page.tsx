
import Navbar from '../../components/Navbar';
import Link from 'next/link';
import { ArrowRight, BookOpen, Activity, Layout, CheckCircle } from 'lucide-react';

export default function SystemPage() {
    return (
        <main style={{ minHeight: '100vh', backgroundColor: '#020617', color: '#fff' }}>
            <Navbar />

            <div className="container" style={{ padding: '8rem 0' }}>
                <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 6rem' }}>
                    <div className="badge" style={{ marginBottom: '1.5rem', justifyContent: 'center' }}>
                        The Smart Hustler Ecosystem
                    </div>
                    <h1 className="title-main" style={{ fontSize: '3.5rem' }}>One <span className="gradient-text">Complete System</span></h1>
                    <p className="subtitle" style={{ margin: '0 auto' }}>
                        We don't just sell courses. We provide the education, the diagnostics to keep you safe, and the tools to scale.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
                    {/* Pillar 1: LEARN */}
                    <div className="card-premium">
                        <div className="card-icon" style={{ background: 'rgba(56, 189, 248, 0.1)' }}>
                            <BookOpen size={32} color="#38bdf8" />
                        </div>
                        <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>1. Learn</h3>
                        <p style={{ marginBottom: '2rem' }}>
                            Master the fundamentals of affiliate marketing and traffic generation. Our guides are written by practitioners, not gurus.
                        </p>
                        <ul style={{ color: '#94a3b8', marginBottom: '2rem', listStyle: 'none', padding: 0 }}>
                            <li style={{ marginBottom: '0.5rem' }}><CheckCircle size={16} className="inline mr-2 text-green-400" /> Viral Strategy</li>
                            <li style={{ marginBottom: '0.5rem' }}><CheckCircle size={16} className="inline mr-2 text-green-400" /> Platform Compliance</li>
                            <li style={{ marginBottom: '0.5rem' }}><CheckCircle size={16} className="inline mr-2 text-green-400" /> Copywriting Frameworks</li>
                        </ul>
                        <div style={{ marginTop: 'auto' }}>
                            <Link href="/library" className="btn-outline" style={{ width: '100%', display: 'block', textAlign: 'center' }}>
                                Explore Library
                            </Link>
                        </div>
                    </div>

                    {/* Pillar 2: DIAGNOSE */}
                    <div className="card-premium" style={{ borderColor: '#3b82f6', background: 'rgba(59, 130, 246, 0.05)' }}>
                        <div className="card-icon" style={{ background: '#3b82f6' }}>
                            <Activity size={32} color="#fff" />
                        </div>
                        <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>2. Diagnose</h3>
                        <p style={{ marginBottom: '2rem' }}>
                            <strong>Signal Engines</strong> is our proprietary diagnostic network. When things break (and they will), use these tools to fix them fast.
                        </p>
                        <ul style={{ color: '#94a3b8', marginBottom: '2rem', listStyle: 'none', padding: 0 }}>
                            <li style={{ marginBottom: '0.5rem' }}><CheckCircle size={16} className="inline mr-2 text-blue-400" /> Ad Account Recovery</li>
                            <li style={{ marginBottom: '0.5rem' }}><CheckCircle size={16} className="inline mr-2 text-blue-400" /> Spam Score Analysis</li>
                            <li style={{ marginBottom: '0.5rem' }}><CheckCircle size={16} className="inline mr-2 text-blue-400" /> Ban Appeals</li>
                        </ul>
                        <div style={{ marginTop: 'auto' }}>
                            <a href="https://www.signalengines.com/?utm_source=smarthustler" target="_blank" className="btn-premium" style={{ width: '100%', display: 'block', textAlign: 'center', background: '#3b82f6' }}>
                                Run a Scan
                            </a>
                        </div>
                    </div>

                    {/* Pillar 3: DEPLOY */}
                    <div className="card-premium">
                        <div className="card-icon" style={{ background: 'rgba(168, 85, 247, 0.1)' }}>
                            <Layout size={32} color="#a855f7" />
                        </div>
                        <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>3. Deploy</h3>
                        <p style={{ marginBottom: '2rem' }}>
                            Speed is wealth. Don't build from scratch. Use our proven templates, tools, and AI agents to launch campaigns in minutes.
                        </p>
                        <ul style={{ color: '#94a3b8', marginBottom: '2rem', listStyle: 'none', padding: 0 }}>
                            <li style={{ marginBottom: '0.5rem' }}><CheckCircle size={16} className="inline mr-2 text-purple-400" /> Landing Page Templates</li>
                            <li style={{ marginBottom: '0.5rem' }}><CheckCircle size={16} className="inline mr-2 text-purple-400" /> VSL Scripts</li>
                            <li style={{ marginBottom: '0.5rem' }}><CheckCircle size={16} className="inline mr-2 text-purple-400" /> AI Automation Agents</li>
                        </ul>
                        <div style={{ marginTop: 'auto' }}>
                            <Link href="/tools" className="btn-outline" style={{ width: '100%', display: 'block', textAlign: 'center' }}>
                                Access Tools
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Final CTA */}
                <div style={{ marginTop: '6rem', textAlign: 'center' }}>
                    <div className="cta-box" style={{ padding: '4rem', borderRadius: '1.5rem', background: 'linear-gradient(180deg, rgba(2,6,23,1) 0%, rgba(30,41,59,0.5) 100%)', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <h2 className="title-main" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Get the Full Blueprint</h2>
                        <p className="subtitle" style={{ marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                            Download the comprehensive operating system that ties it all together. A step-by-step manual for building a 7-figure traffic eco-system.
                        </p>
                        <Link href="/blueprint" className="btn-premium" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 3rem', fontSize: '1.2rem' }}>
                            Download Blueprint <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
