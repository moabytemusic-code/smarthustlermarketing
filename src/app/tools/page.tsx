import Navbar from '../../components/Navbar';
import Link from 'next/link';
import { ArrowRight, Calculator, Search, Lock } from 'lucide-react';

export default function ToolsHub() {
    return (
        <main style={{ minHeight: '100vh', paddingBottom: '4rem' }}>
            <Navbar />

            <section className="container" style={{ paddingTop: '8rem' }}>
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
                        <span className="animate-pulse">●</span> Available Free for Limited Time
                    </div>
                    <h1 className="title-main text-5xl md:text-7xl mb-6">
                        The <span className="gradient-text">Growth Arsenal</span>
                    </h1>
                    <p className="subtitle text-xl">
                        Stop guessing. Start executing. We build the tools that 7-figure affiliates feel guilty using for free.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {/* Tool 1: Micro Niche Finder */}
                    <Link href="/tools/micro-niche-finder" className="group relative">
                        <div className="h-full p-8 rounded-3xl bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                            <div className="absolute top-0 right-0 p-24 bg-primary/5 blur-3xl rounded-full -mr-12 -mt-12 group-hover:bg-primary/10 transition-colors"></div>

                            <div className="relative z-10">
                                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                                    <Search size={28} strokeWidth={2.5} />
                                </div>
                                <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3">Micro Niche Finder</h3>
                                <p className="text-[var(--text-muted)] mb-6 leading-relaxed">
                                    AI-powered market scanner. Uncover untapped, high-cpc sub-niches in seconds before the competition does.
                                </p>
                                <div className="flex items-center text-primary font-bold text-sm tracking-wide uppercase">
                                    Launch Tool <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Tool 2: Freedom Calculator */}
                    <Link href="/tools/freedom-calculator" className="group relative">
                        <div className="h-full p-8 rounded-3xl bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-secondary/50 transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                            <div className="absolute top-0 right-0 p-24 bg-secondary/5 blur-3xl rounded-full -mr-12 -mt-12 group-hover:bg-secondary/10 transition-colors"></div>

                            <div className="relative z-10">
                                <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-6 group-hover:scale-110 transition-transform">
                                    <Calculator size={28} strokeWidth={2.5} />
                                </div>
                                <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3">Freedom Calculator</h3>
                                <p className="text-[var(--text-muted)] mb-6 leading-relaxed">
                                    Reverse engineer your dream life. Calculate exactly how many daily sales you need to quit your 9-5 forever.
                                </p>
                                <div className="flex items-center text-secondary font-bold text-sm tracking-wide uppercase">
                                    Calculate Now <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Tool 3: Coming Soon */}
                    <div className="group relative opacity-60 hover:opacity-100 transition-opacity cursor-not-allowed">
                        <div className="h-full p-8 rounded-3xl bg-[var(--card-bg)] border border-[var(--card-border)] border-dashed">
                            <div className="relative z-10">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 mb-6">
                                    <Lock size={28} strokeWidth={2.5} />
                                </div>
                                <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3">Headline Generator</h3>
                                <p className="text-[var(--text-muted)] mb-6 leading-relaxed">
                                    Create viral hooks and subject lines that force opens. Currently in beta testing for Inner Circle members.
                                </p>
                                <div className="inline-block px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-white/60 uppercase">
                                    Coming Q1 2026
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </main>
    );
}
