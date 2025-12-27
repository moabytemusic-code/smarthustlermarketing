import Navbar from '../../../components/Navbar';
import FreedomCalculator from '../../../components/tools/FreedomCalculator';

export const metadata = {
    title: 'Freedom Number Calculator | Smart Hustler',
    description: 'Calculate exactly how many sales you need to quit your job.',
};

export default function FreedomCalculatorPage() {
    return (
        <main className="min-h-screen bg-[#0A0A0A] text-white selection:bg-blue-500/30">
            <Navbar />

            {/* Background Gradients */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-purple-500/5 blur-[120px]" />
            </div>

            <div className="relative z-10 container mx-auto px-6" style={{ paddingTop: '180px', paddingBottom: '5rem' }}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left Column: Text */}
                    <div className="max-w-xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-800 mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            <span className="text-xs font-bold text-blue-400 tracking-wider">ONLINE NOW</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
                            Escape The <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Rat Race.</span>
                        </h1>

                        <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                            Freedom isn't a vague dream. It's a specific mathematical formula.
                            <br /><br />
                            Use this calculator to <strong>reverse engineer</strong> exactly how many daily sales you need to quit your job forever.
                        </p>

                        <div className="flex items-center gap-4 text-sm text-slate-500">
                            <div className="flex -space-x-2">
                                <div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-[#0A0A0A]"></div>
                                <div className="w-8 h-8 rounded-full bg-slate-700 border-2 border-[#0A0A0A]"></div>
                                <div className="w-8 h-8 rounded-full bg-slate-600 border-2 border-[#0A0A0A]"></div>
                            </div>
                            <span>Used by 5,000+ Hustlers</span>
                        </div>
                    </div>

                    {/* Right Column: The Tool */}
                    <div className="w-full">
                        <FreedomCalculator />
                    </div>

                </div>
            </div>
        </main>
    );
}
