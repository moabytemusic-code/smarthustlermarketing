import Link from 'next/link';
import { ArrowLeft, Megaphone, Video, MessageSquare, ArrowRight } from 'lucide-react';
import Navbar from '../../../components/Navbar';



export default function ToolsHubAdditional() {
    return (
        <main style={{ minHeight: '100vh', backgroundColor: '#020617', color: '#fff' }}>
            <Navbar />

            {/* Background Effects */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/10 blur-[120px]" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-pink-500/5 blur-[120px]" />
            </div>

            {/* Main Content Container with safe padding */}
            <div className="container" style={{ padding: '180px 2rem 6rem', position: 'relative', zIndex: 10 }}>

                <div className="mb-12">
                    <Link href="/tools" className="inline-flex items-center text-slate-400 hover:text-white transition-colors mb-6">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Core Tools
                    </Link>
                    <h1 className="title-main" style={{ fontSize: '3.5rem' }}>
                        Next-Gen <span className="gradient-text">AI Agents</span>
                    </h1>
                    <p className="subtitle">
                        The future of automation. These agents don't just help you work; they do the work for you.
                    </p>
                </div>

                {/* Agents Grid using Global Store Classes */}
                <div className="resource-grid">

                    {/* Tool 1: Campaign Architect */}
                    <div className="card-premium">
                        <div className="card-icon" style={{ background: 'rgba(168, 85, 247, 0.1)' }}>
                            <Megaphone size={32} color="#a855f7" />
                        </div>
                        <h3>Campaign Architect</h3>
                        <p>Paste a product URL. Get a full marketing kit: Ad Hooks, Email Sequences, lander copy. Instant "Marketing Department" in a box.</p>

                        <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem' }}>
                            <Link href="/tools/campaign-architect" className="btn-premium" style={{ display: 'inline-block', width: '100%', textAlign: 'center', background: '#a855f7', color: 'white', boxShadow: 'none' }}>
                                Launch Architect <ArrowRight className="inline ml-2 w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Tool 2: Faceless Director */}
                    <div className="card-premium">
                        <div className="card-icon" style={{ background: 'rgba(236, 72, 153, 0.1)' }}>
                            <Video size={32} color="#ec4899" />
                        </div>
                        <h3>Faceless Director</h3>
                        <p>Type a topic. Get a perfectly timed script AND the extracted Midjourney prompts for every scene. The ultimate YouTube automation tool.</p>

                        <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem' }}>
                            <button className="btn-premium" disabled style={{ display: 'inline-block', width: '100%', textAlign: 'center', background: 'rgba(255,255,255,0.05)', color: '#94a3b8', cursor: 'not-allowed', boxShadow: 'none' }}>
                                Coming Soon
                            </button>
                        </div>
                    </div>

                    {/* Tool 3: Reply Guy Agent */}
                    <div className="card-premium">
                        <div className="card-icon" style={{ background: 'rgba(20, 184, 166, 0.1)' }}>
                            <MessageSquare size={32} color="#14b8a6" />
                        </div>
                        <h3>Reply Guy Agent</h3>
                        <p>Automate your networking. Paste a LinkedIn post, get 3 strategic comment options (Contrarian, Supportive, Question) to grow your authority.</p>

                        <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem' }}>
                            <button className="btn-premium" disabled style={{ display: 'inline-block', width: '100%', textAlign: 'center', background: 'rgba(255,255,255,0.05)', color: '#94a3b8', cursor: 'not-allowed', boxShadow: 'none' }}>
                                Coming Soon
                            </button>
                        </div>
                    </div>

                </div>

            </div>
        </main>
    );
}
