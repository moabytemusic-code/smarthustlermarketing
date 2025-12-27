import Link from 'next/link';
import { ArrowLeft, Megaphone, Video, MessageSquare } from 'lucide-react';
import Navbar from '../../components/Navbar';

export default function ToolsHubAdditional() {
    return (
        <main className="min-h-screen bg-[#0A0A0A] text-white selection:bg-amber-500/30">
            <Navbar />

            {/* Background Effects */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/10 blur-[120px]" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-pink-500/5 blur-[120px]" />
            </div>

            <section className="relative z-10 pt-40 pb-24 px-6 md:px-0">
                <div className="max-w-7xl mx-auto">

                    <div className="mb-12">
                        <Link href="/tools" className="inline-flex items-center text-slate-400 hover:text-white transition-colors mb-4">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Core Tools
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
                            Next-Gen <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">AI Agents</span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl">
                            The future of automation. These agents don't just help you work; they do the work for you.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* Tool 1: Campaign Architect */}
                        <div className="group relative h-full p-8 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-purple-500/50 hover:bg-slate-900/80 transition-all duration-300 hover:-translate-y-1 overflow-hidden backdrop-blur-sm">
                            <div className="absolute top-0 right-0 p-24 bg-purple-500/5 blur-3xl rounded-full -mr-12 -mt-12 group-hover:bg-purple-600/10 transition-colors duration-500"></div>

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/5 border border-purple-500/20 flex items-center justify-center text-purple-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <Megaphone size={24} />
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-3">Campaign Architect</h3>
                                <p className="text-slate-400 mb-6 text-sm flex-grow">
                                    Paste a product URL. Get a full marketing kit: Ad Hooks, Email Sequences, lander copy. Instant "Marketing Department" in a box.
                                </p>

                                <Link href="/tools/campaign-architect" className="w-full py-3 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-center transition-colors">
                                    Launch Architect
                                </Link>
                            </div>
                        </div>

                        {/* Tool 2: Faceless Director */}
                        <div className="group relative h-full p-8 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-pink-500/50 hover:bg-slate-900/80 transition-all duration-300 hover:-translate-y-1 overflow-hidden backdrop-blur-sm">
                            <div className="absolute top-0 right-0 p-24 bg-pink-500/5 blur-3xl rounded-full -mr-12 -mt-12 group-hover:bg-pink-600/10 transition-colors duration-500"></div>

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/20 to-pink-600/5 border border-pink-500/20 flex items-center justify-center text-pink-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <Video size={24} />
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-3">Faceless Director</h3>
                                <p className="text-slate-400 mb-6 text-sm flex-grow">
                                    Type a topic. Get a perfectly timed script AND the extract Midjourney prompts for every scene. The ultimate YouTube automation tool.
                                </p>

                                <Link href="/tools/faceless-director" className="w-full py-3 rounded-lg bg-pink-600 hover:bg-pink-500 text-white font-bold text-center transition-colors">
                                    Launch Director
                                </Link>
                            </div>
                        </div>

                        {/* Tool 3: Reply Guy Bot */}
                        <div className="group relative h-full p-8 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-teal-500/50 hover:bg-slate-900/80 transition-all duration-300 hover:-translate-y-1 overflow-hidden backdrop-blur-sm">
                            <div className="absolute top-0 right-0 p-24 bg-teal-500/5 blur-3xl rounded-full -mr-12 -mt-12 group-hover:bg-teal-600/10 transition-colors duration-500"></div>

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500/20 to-teal-600/5 border border-teal-500/20 flex items-center justify-center text-teal-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <MessageSquare size={24} />
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-3">Reply Guy Agent</h3>
                                <p className="text-slate-400 mb-6 text-sm flex-grow">
                                    Automate your networking. Paste a LinkedIn post, get 3 strategic comment options (Contrarian, Supportive, Question) to grow your authority.
                                </p>

                                <Link href="/tools/reply-guy" className="w-full py-3 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold text-center transition-colors">
                                    Launch Agent
                                </Link>
                            </div>
                        </div>

                    </div>

                </div>
            </section>
        </main>
    );
}
