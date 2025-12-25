import Navbar from '../../../components/Navbar';
import MicroNicheFinder from '../../../components/tools/MicroNicheFinder';

export const metadata = {
    title: 'Micro-Niche Finder | Smart Hustler',
    description: 'Find a profitable, low-competition niche in seconds.',
};

export default function MicroNicheFinderPage() {
    return (
        <main style={{ minHeight: '100vh', backgroundColor: '#020617', color: '#fff' }}>
            <Navbar />
            <div className="container mx-auto px-4 py-32">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <span className="inline-block py-1 px-3 rounded-full bg-emerald-900/30 text-emerald-400 text-xs font-bold tracking-wider mb-4 border border-emerald-800">
                        FREE TOOL
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
                        The Riches Are In The Niches
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        Stop trying to sell to "everyone". Use this AI tool to find specific, desperate crowds who are waiting to buy.
                    </p>
                </div>

                <MicroNicheFinder />
            </div>
        </main>
    );
}
