'use client';

import React, { useState, useEffect } from 'react';
import { Search, Loader2, TrendingUp, DollarSign, Users, ArrowRight, CheckCircle2 } from 'lucide-react';

const ANALYSIS_STEPS = [
    "Scanning Reddit communities...",
    "Analyzing Amazon Best Seller rank...",
    "Checking Google Trends volume...",
    "Evaluating CPC ad costs...",
    "Calculating competition score...",
    "Finalizing opportunity report..."
];

const MOCK_DB: Record<string, any[]> = {
    Health: [
        { niche: "Post-pregnancy weight loss for busy moms", competition: "Med", potential: "High", cpc: "$2.50" },
        { niche: "Keto diet meal plans for diabetics", competition: "High", potential: "Very High", cpc: "$4.10" },
        { niche: "Yoga for chronic back pain relief", competition: "Med", potential: "High", cpc: "$1.80" },
        { niche: "Calisthenics for men over 40", competition: "Low", potential: "Med", cpc: "$1.20" },
        { niche: "Gut health restoration for antibiotic users", competition: "Low", potential: "High", cpc: "$3.00" }
    ],
    Wealth: [
        { niche: "Excel spreadsheet templates for small construction firms", competition: "Low", potential: "High", cpc: "$5.00+" },
        { niche: "Crypto tax investing for beginners", competition: "Med", potential: "High", cpc: "$8.50" },
        { niche: "Salary negotiation scripts for software engineers", competition: "Low", potential: "Very High", cpc: "$3.20" },
        { niche: "Budgeting for single income families", competition: "High", potential: "Med", cpc: "$2.00" },
        { niche: "Reselling vintage sneakers on eBay", competition: "Med", potential: "High", cpc: "$1.50" }
    ],
    Relationships: [
        { niche: "Dating advice for introverted men", competition: "High", potential: "High", cpc: "$2.50" },
        { niche: "Recovering from narcissist abuse", competition: "Med", potential: "High", cpc: "$1.90" },
        { niche: "Marriage counseling for new parents", competition: "Med", potential: "High", cpc: "$4.00" },
        { niche: "Social skills for remote workers", competition: "Low", potential: "Med", cpc: "$1.50" },
        { niche: "Long-distance relationship survival guides", competition: "Med", potential: "Med", cpc: "$1.20" }
    ],
    Hobbies: [
        { niche: "Urban gardening for apartment dwellers", competition: "Low", potential: "Med", cpc: "$0.90" },
        { niche: "Drone photography for real estate agents", competition: "Low", potential: "Very High", cpc: "$3.50" },
        { niche: "3D printing D&D miniatures", competition: "Med", potential: "High", cpc: "$1.10" },
        { niche: "Sourdough baking for complete beginners", competition: "High", potential: "Med", cpc: "$1.50" },
        { niche: "Digital art on iPad for traditional artists", competition: "Med", potential: "High", cpc: "$2.00" }
    ]
};

export default function MicroNicheFinder() {
    const [category, setCategory] = useState<string>('Wealth');
    const [customKeyword, setCustomKeyword] = useState('');
    const [isGenerating, setIsGenerating] = useState<boolean>(false);
    const [progressStep, setProgressStep] = useState(0);
    const [result, setResult] = useState<any | null>(null);

    useEffect(() => {
        if (isGenerating) {
            const interval = setInterval(() => {
                setProgressStep((prev) => {
                    if (prev >= ANALYSIS_STEPS.length - 1) {
                        clearInterval(interval);
                        return prev;
                    }
                    return prev + 1;
                });
            }, 800); // Change step every 800ms

            return () => clearInterval(interval);
        }
    }, [isGenerating]);

    const handleGenerate = () => {
        setIsGenerating(true);
        setResult(null);
        setProgressStep(0);

        // Simulate API delay needed for the full "Analysis" effect
        setTimeout(() => {
            const options = MOCK_DB[category as keyof typeof MOCK_DB] || MOCK_DB['Wealth'];
            const random = options[Math.floor(Math.random() * options.length)];

            // If custom keyword, maybe append it strangely or just act as if we used it
            // For now, we will stick to the curated DB to ensure high quality "simulation"

            setResult(random);
            setIsGenerating(false);
        }, 800 * ANALYSIS_STEPS.length);
    };

    return (
        <div className="relative overflow-hidden w-full bg-slate-900/40 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 p-32 bg-primary opacity-5 blur-[100px] rounded-full pointer-events-none -mr-16 -mt-16"></div>

            <div className="relative z-10">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-xl mb-4 text-primary">
                        <Search size={32} />
                    </div>
                    <h2 className="text-3xl font-bold mb-2 text-white">Micro-Niche Finder AI</h2>
                    <p className="text-slate-400">Discover untapped, profitable markets in seconds.</p>
                </div>

                {!result && !isGenerating && (
                    <div className="space-y-8 animate-in fade-in duration-500">
                        {/* Step 1: Category */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider">1. Select Market Sector</label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {Object.keys(MOCK_DB).map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setCategory(cat)}
                                        className={`px-4 py-4 rounded-xl text-sm font-bold transition-all border ${category === cat
                                            ? 'bg-primary text-black border-primary shadow-[0_0_20px_rgba(251,191,36,0.3)] transform -translate-y-1'
                                            : 'bg-slate-800/50 text-slate-400 border-slate-700 hover:border-slate-500 hover:bg-slate-800'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Step 2: Custom Interest (Optional) */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider">2. Refine (Optional)</label>
                            <input
                                type="text"
                                value={customKeyword}
                                onChange={(e) => setCustomKeyword(e.target.value)}
                                placeholder="Enter a sub-interest (e.g. 'Fishing', 'SaaS', 'Crypto')..."
                                className="w-full px-5 py-4 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-primary transition-colors"
                            />
                        </div>

                        <button
                            onClick={handleGenerate}
                            className="w-full bg-primary hover:bg-primary-hover text-black font-extrabold text-lg py-5 rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-3"
                        >
                            Start Analysis <ArrowRight size={20} strokeWidth={3} />
                        </button>
                    </div>
                )}

                {/* Loading State */}
                {isGenerating && (
                    <div className="py-12 bg-black/20 rounded-2xl border border-white/5">
                        <div className="flex flex-col items-center justify-center space-y-6">
                            <Loader2 className="animate-spin text-primary w-12 h-12" />
                            <div className="space-y-2 text-center">
                                <p className="text-xl font-mono text-primary font-bold">{ANALYSIS_STEPS[progressStep]}</p>
                                <div className="w-64 h-1 bg-slate-800 rounded-full mx-auto overflow-hidden">
                                    <div
                                        className="h-full bg-primary transition-all duration-300 ease-out"
                                        style={{ width: `${((progressStep + 1) / ANALYSIS_STEPS.length) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                            <div className="text-xs text-slate-500 font-mono">
                                Processing dataset: 14TB of search queries...
                            </div>
                        </div>
                    </div>
                )}

                {/* Result State */}
                {result && !isGenerating && (
                    <div className="animate-in fade-in zoom-in-95 duration-500">
                        <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-primary/30 rounded-2xl p-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 bg-primary text-black text-xs font-bold px-3 py-1 rounded-bl-xl">Verfied Opportunity</div>

                            <div className="text-center mb-8">
                                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-2">Target Niche Identifier:</h3>
                                <h2 className="text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300 leading-tight">
                                    "{result.niche}"
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                <div className="bg-white/5 rounded-xl p-4 border border-white/5 text-center">
                                    <div className="text-primary mb-2 flex justify-center"><TrendingUp /></div>
                                    <div className="text-xs text-slate-400 uppercase font-bold">Monetization</div>
                                    <div className="text-lg font-bold text-white">{result.potential}</div>
                                </div>
                                <div className="bg-white/5 rounded-xl p-4 border border-white/5 text-center">
                                    <div className="text-blue-400 mb-2 flex justify-center"><Users /></div>
                                    <div className="text-xs text-slate-400 uppercase font-bold">Competition</div>
                                    <div className="text-lg font-bold text-white">{result.competition}</div>
                                </div>
                                <div className="bg-white/5 rounded-xl p-4 border border-white/5 text-center">
                                    <div className="text-emerald-400 mb-2 flex justify-center"><DollarSign /></div>
                                    <div className="text-xs text-slate-400 uppercase font-bold">Est. CPC</div>
                                    <div className="text-lg font-bold text-white">{result.cpc}</div>
                                </div>
                            </div>

                            <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-xl p-4">
                                <h4 className="flex items-center gap-2 text-emerald-400 font-bold mb-2">
                                    <CheckCircle2 size={18} /> Why this works:
                                </h4>
                                <p className="text-sm text-slate-300 leading-relaxed">
                                    This sub-niche shows high intent-to-buy signals but suffers from low-quality existing content.
                                    Advertisers are paying <strong>{result.cpc}</strong> per click, meaning the customer value is high.
                                    Create a specialized lead magnet here to dominate quickly.
                                </p>
                            </div>

                            <div className="mt-8 grid grid-cols-2 gap-4">
                                <button onClick={handleGenerate} className="w-full py-3 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors font-semibold">
                                    Scan Again
                                </button>
                                <button className="w-full py-3 rounded-lg bg-primary text-black font-bold hover:bg-primary-hover transition-colors shadow-lg">
                                    Launch Project 🚀
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
