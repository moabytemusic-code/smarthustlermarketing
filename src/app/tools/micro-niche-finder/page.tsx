import Navbar from '../../../components/Navbar';
import MicroNicheFinder from '../../../components/tools/MicroNicheFinder';

export const metadata = {
    title: 'Micro-Niche Finder | Smart Hustler',
    description: 'Find a profitable, low-competition niche in seconds.',
};

export default function MicroNicheFinderPage() {
    return (
        <main className="min-h-screen bg-[#0A0A0A] text-white selection:bg-emerald-500/30">
            <Navbar />

            {/* Background Gradients */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-emerald-500/10 blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-blue-500/5 blur-[120px]" />
            </div>

            <div className="relative z-10 container mx-auto px-6 pt-40 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left Column: Text */}
                    <div className="max-w-xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/30 border border-emerald-800 mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span className="text-xs font-bold text-emerald-400 tracking-wider">ONLINE NOW</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
                            Find Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Gold Mine.</span>
                        </h1>

                        <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                            Most people fail because they sell to "everyone." Winners pick a specific, hungry crowd.
                            <br /><br />
                            Our AI scans <strong>Reddit, Amazon, and Google Trends</strong> to find low-competition niches with high intent-to-buy.
                        </p>

                        <div className="flex items-center gap-4 text-sm text-slate-500">
                            <div className="flex -space-x-2">
                                <div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-[#0A0A0A]"></div>
                                <div className="w-8 h-8 rounded-full bg-slate-700 border-2 border-[#0A0A0A]"></div>
                                <div className="w-8 h-8 rounded-full bg-slate-600 border-2 border-[#0A0A0A]"></div>
                            </div>
                            <span>Used by 2,400+ Hustlers today</span>
                        </div>
                    </div>

                    {/* Right Column: The Tool */}
                    <div className="w-full">
                        <MicroNicheFinder />
                    </div>

                </div>
            </div>
        </main>
    );
}
