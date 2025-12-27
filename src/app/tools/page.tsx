import Navbar from '../../components/Navbar';
import Link from 'next/link';
import { ArrowRight, Calculator, Search, Lock, Zap } from 'lucide-react';

export default function ToolsHub() {
    return (
        <main className="min-h-screen bg-[#0A0A0A] text-white selection:bg-amber-500/30">
            <Navbar />

            {/* Background Effects */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-amber-500/5 blur-[120px]" />
            </div>

            <section className="relative z-10 pt-40 pb-24 px-6 md:px-0">
                <div className="max-w-7xl mx-auto">

                    {/* Header */}
                    <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-4">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span className="text-xs font-medium text-slate-300 tracking-wider uppercase">Online Tools Suite</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
                            Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">Faster</span>. <br className="hidden md:block" />
                            Scale <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Smarter</span>.
                        </h1>

                        <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                            Access the same tactical utilities used by 7-figure affiliates. No fluff, just pure execution power.
                        </p>
                    </div>

                    {/* Tools Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {/* Tool 1: Micro Niche Finder */}
                        <Link href="/tools/micro-niche-finder" className="group">
                            <div className="relative h-full p-8 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-amber-500/50 hover:bg-slate-900/80 transition-all duration-300 hover:-translate-y-1 overflow-hidden backdrop-blur-sm group-hover:shadow-[0_0_40px_rgba(245,158,11,0.1)]">
                                <div className="absolute top-0 right-0 p-32 bg-amber-500/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-amber-600/10 transition-colors duration-500"></div>

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/5 border border-amber-500/20 flex items-center justify-center text-amber-500 mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                                        <Search size={24} />
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">Micro Niche Finder</h3>
                                    <p className="text-slate-400 mb-8 leading-relaxed text-sm flex-grow">
                                        Identify untapped, high-profit sub-niches in seconds using our specific AI algorithm. Stop guessing.
                                    </p>

                                    <div className="flex items-center text-amber-500 font-bold text-sm tracking-wide uppercase mt-auto">
                                        Launch Scanner <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        </Link>

                        {/* Tool 2: Freedom Calculator */}
                        <Link href="/tools/freedom-calculator" className="group">
                            <div className="relative h-full p-8 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-blue-500/50 hover:bg-slate-900/80 transition-all duration-300 hover:-translate-y-1 overflow-hidden backdrop-blur-sm group-hover:shadow-[0_0_40px_rgba(59,130,246,0.1)]">
                                <div className="absolute top-0 right-0 p-32 bg-blue-500/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-blue-600/10 transition-colors duration-500"></div>

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/5 border border-blue-500/20 flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                                        <Calculator size={24} />
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">Freedom Calculator</h3>
                                    <p className="text-slate-400 mb-8 leading-relaxed text-sm flex-grow">
                                        Reverse engineer your financial independence. Calculate the exact daily sales needed to quit your job.
                                    </p>

                                    <div className="flex items-center text-blue-500 font-bold text-sm tracking-wide uppercase mt-auto">
                                        Calculate Now <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        </Link>

                        {/* Tool 3: AI Agents Suite */}
                        <Link href="/tools/agents" className="group relative">
                            <div className="h-full p-8 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-purple-500/50 hover:bg-slate-900/80 transition-all duration-300 hover:-translate-y-1 overflow-hidden backdrop-blur-sm">
                                <div className="absolute top-0 right-0 p-32 bg-purple-500/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-purple-600/10 transition-colors duration-500"></div>

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/5 border border-purple-500/20 flex items-center justify-center text-purple-500 mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                                        <Zap size={24} />
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">AI Agent Suite</h3>
                                    <p className="text-slate-400 mb-8 leading-relaxed text-sm flex-grow">
                                        Next-Gen Tools: Campaign Architect, Faceless Director, and Reply Guy Bot. Automate the work itself.
                                    </p>

                                    <div className="flex items-center text-purple-500 font-bold text-sm tracking-wide uppercase mt-auto">
                                        Open Suite <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        </Link>

                    </div>

                    {/* Bottom CTA */}
                    <div className="mt-20 relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-b from-slate-900 to-black p-12 text-center">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
                        <h2 className="text-2xl font-bold text-white mb-4">Need the Full Manual?</h2>
                        <p className="text-slate-400 max-w-lg mx-auto mb-8">
                            These tools are powerful, but they work best when combined with the complete operating system.
                        </p>
                        <Link href="/blueprint" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-900 transition-all duration-200 bg-white rounded-full hover:bg-amber-400 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/50">
                            Download the Blueprint <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </div>

                </div>
            </section>
        </main>
    );
}
