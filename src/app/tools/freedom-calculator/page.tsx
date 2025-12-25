import Navbar from '../../../components/Navbar';
import FreedomCalculator from '../../../components/tools/FreedomCalculator';

export const metadata = {
    title: 'Freedom Number Calculator | Smart Hustler',
    description: 'Calculate exactly how many sales you need to quit your job.',
};

export default function FreedomCalculatorPage() {
    return (
        <main style={{ minHeight: '100vh', backgroundColor: '#020617', color: '#fff' }}>
            <Navbar />
            <div className="container mx-auto px-4 py-32">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-900/30 text-blue-400 text-xs font-bold tracking-wider mb-4 border border-blue-800">
                        FREE TOOL
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
                        Escape The Rat Race
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        Most people never quit because they don't know their number. Use this calculator to reverse engineer your freedom.
                    </p>
                </div>

                <FreedomCalculator />
            </div>
        </main>
    );
}
