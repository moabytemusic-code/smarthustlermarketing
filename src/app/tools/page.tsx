import Navbar from '../../components/Navbar';
import Link from 'next/link';
import { ArrowRight, Calculator, Search, Zap, Activity } from 'lucide-react';
import SignalEngineCard from '../../components/SignalEngineCard';
import { ENGINE_DETAILS, getEngineUrl } from '../../data/engineMapping';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'The Growth Arsenal | Free Marketing Tools',
    description: 'Battle-tested free utilities for solopreneurs. Micro-Niche Finders, Freedom Calculators, and AI Marketing Agents.',
    alternates: {
        canonical: 'https://smarthustlermarketing.com/tools',
    }
};

export default function ToolsHub() {
    return (
        <main style={{ minHeight: '100vh', backgroundColor: '#020617', color: '#fff' }}>
            <Navbar />

            <div className="container" style={{ padding: '8rem 0' }}>
                {/* Hero Section */}
                <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 6rem' }}>
                    <div className="badge" style={{ marginBottom: '1.5rem', justifyContent: 'center' }}>
                        <div className="dot">
                            <div className="dot-ping"></div>
                        </div>
                        Free Utilities for Solopreneurs
                    </div>
                    <h1 className="title-main" style={{ fontSize: '3.5rem' }}>Growth <span className="gradient-text">Arsenal</span></h1>
                    <p className="subtitle" style={{ margin: '0 auto' }}>
                        Stop guessing. Start executing. We build the tools that 7-figure affiliates feel guilty using for free.
                    </p>
                </div>

                {/* Tools Grid */}
                <div className="resource-grid">

                    {/* Tool 1: Micro Niche Finder */}
                    <div className="card-premium">
                        <div className="card-icon">
                            <Search size={32} color="var(--primary)" />
                        </div>
                        <h3>Micro Niche Finder</h3>
                        <p>AI-powered market scanner. Uncover untapped, high-cpc sub-niches in seconds before the competition does.</p>

                        <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem' }}>
                            <Link href="/tools/micro-niche-finder" className="btn-premium" style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                                Launch Tool <ArrowRight className="inline ml-2 w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Tool 2: Freedom Calculator */}
                    <div className="card-premium">
                        <div className="card-icon" style={{ background: 'rgba(56, 189, 248, 0.1)' }}>
                            <Calculator size={32} color="var(--secondary)" />
                        </div>
                        <h3>Freedom Calculator</h3>
                        <p>Reverse engineer your dream life. Calculate exactly how many daily sales you need to quit your 9-5 forever.</p>

                        <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem' }}>
                            <Link href="/tools/freedom-calculator" className="btn-premium" style={{ display: 'inline-block', width: '100%', textAlign: 'center', background: 'var(--secondary)', boxShadow: '0 10px 15px -3px rgba(56, 189, 248, 0.2)' }}>
                                Calculate Now <ArrowRight className="inline ml-2 w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Tool 3: Ghost Writer (New) */}
                    <div className="card-premium">
                        <div className="card-icon" style={{ background: 'rgba(234, 179, 8, 0.1)' }}>
                            <Zap size={32} color="#eab308" />
                        </div>
                        <h3>Ghost Writer</h3>
                        <p>Turn one boring thought into a viral Thread and a LinkedIn thought-leader post. Instant repurposing engine.</p>

                        <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem' }}>
                            <Link href="/tools/ghost-writer" className="btn-premium" style={{ display: 'inline-block', width: '100%', textAlign: 'center', background: '#eab308', boxShadow: '0 10px 15px -3px rgba(234, 179, 8, 0.2)' }}>
                                Open Tool <ArrowRight className="inline ml-2 w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Tool 4: AI Agents Suite */}
                    <div className="card-premium">
                        <div className="card-icon" style={{ background: 'rgba(168, 85, 247, 0.1)' }}>
                            <Activity size={32} color="#a855f7" />
                        </div>
                        <h3>AI Agent Suite</h3>
                        <p>Next-Gen Tools: Campaign Architect, Faceless Director, and Reply Guy Bot. Automate the work itself.</p>

                        <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem' }}>
                            <Link href="/tools/agents" className="btn-premium" style={{ display: 'inline-block', width: '100%', textAlign: 'center', background: '#a855f7', boxShadow: '0 10px 15px -3px rgba(168, 85, 247, 0.2)' }}>
                                Open Suite <ArrowRight className="inline ml-2 w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                </div>

                {/* Signal Engines Section */}
                <div style={{ marginTop: '8rem', marginBottom: '6rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 className="title-main" style={{ fontSize: '2.5rem' }}>Signal Engines: <span className="gradient-text">Fix These Problems Fast</span></h2>
                        <p className="subtitle" style={{ margin: '0 auto' }}>
                            Dedicated repair tools for the things that break most often. Stop guessing, execute a fix.
                        </p>
                    </div>

                    <div className="resource-grid">
                        {/* 
                            Priority list: 
                            fbadban, accountrecovery, gbpsuspend, merchantsuspend, 
                            amazonsuspend, trackingfix, emailspam, compliancealert 
                        */}
                        {[
                            'fbadban',
                            'accountrecovery',
                            'gbpsuspend',
                            'merchantsuspend',
                            'amazonsuspend',
                            'trackingfix',
                            'emailspam',
                            'compliancealert',
                            'tiktok-idea-batch',
                            'emailwarmup'
                        ].map(id => {
                            const details = ENGINE_DETAILS[id] || { title: id, description: "Launch this engine." };
                            return (
                                <SignalEngineCard
                                    key={id}
                                    engineId={id}
                                    title={details.title}
                                    description={details.description}
                                    placement="tools_directory"
                                    campaign="tools_page"
                                />
                            );
                        })}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                        <a
                            href={getEngineUrl(null, 'tools_directory_browse_all', 'tools_page')}
                            target="_blank"
                            className="btn-premium"
                            style={{ background: '#3b82f6' }}
                        >
                            Browse all Engines <ArrowRight className="inline ml-2" />
                        </a>
                    </div>
                </div>

                {/* Bottom CTA */}
                <div style={{ marginTop: '6rem', textAlign: 'center' }}>
                    <div className="cta-box" style={{ padding: '4rem', borderRadius: '1.5rem' }}>
                        <h2 className="title-main" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Need the Full Manual?</h2>
                        <p className="subtitle" style={{ marginBottom: '2rem' }}>
                            These tools are powerful, but they work best when combined with the complete operating system.
                        </p>
                        <Link href="/blueprint" className="btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                            Download the Blueprint <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>

            </div>
        </main>
    );
}
