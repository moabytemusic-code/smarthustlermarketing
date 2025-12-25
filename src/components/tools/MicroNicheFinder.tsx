'use client';

import React, { useState } from 'react';

const NICHES = {
    Health: [
        "Post-pregnancy weight loss for busy moms",
        "Keto diet meal plans for diabetics",
        "Yoga for chronic back pain relief",
        "calisthenics for men over 40",
        "Gut health restoration for antibiotic users"
    ],
    Wealth: [
        "Excel spreadsheet templates for small construction firms",
        "Crypto tax investing for beginners",
        "Salary negotiation scripts for software engineers",
        "Budgeting for single income families",
        "Reselling vintage sneakers on eBay"
    ],
    Relationships: [
        "Dating advice for introverted men",
        "Recovering from narcissist abuse",
        "Marriage counseling for new parents",
        "Social skills for remote workers",
        "Long-distance relationship survival guides"
    ],
    Hobbies: [
        "Urban gardening for apartment dwellers",
        "Drone photography for real estate agents",
        "3D printing D&D miniatures",
        "Sourdough baking for complete beginners",
        "Digital art on iPad for traditional artists"
    ]
};

export default function MicroNicheFinder() {
    const [category, setCategory] = useState<string>('Wealth');
    const [isGenerating, setIsGenerating] = useState<boolean>(false);
    const [result, setResult] = useState<string | null>(null);

    const handleGenerate = () => {
        setIsGenerating(true);
        setResult(null);

        // Simulate API delay for "AI thinking" effect
        setTimeout(() => {
            const options = NICHES[category as keyof typeof NICHES];
            const random = options[Math.floor(Math.random() * options.length)];
            setResult(random);
            setIsGenerating(false);
        }, 1500);
    };

    return (
        <div className="p-6 bg-slate-900 rounded-xl border border-slate-700 shadow-2xl max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">🎯 AI Micro-Niche Finder</h2>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Select a Broad Market</label>
                    <div className="grid grid-cols-2 gap-3">
                        {Object.keys(NICHES).map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setCategory(cat)}
                                className={`px-4 py-3 rounded-lg text-sm font-bold transition-all ${category === cat
                                        ? 'bg-primary text-black shadow-[0_0_15px_rgba(37,99,235,0.5)]'
                                        : 'bg-slate-800 text-slate-300 hover:bg-slate-750 border border-slate-600'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="w-full bg-gradient-to-r from-emerald-500 to-emerald-700 hover:from-emerald-400 hover:to-emerald-600 text-white font-bold py-4 rounded-lg shadow-lg text-lg transition-transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                >
                    {isGenerating ? (
                        <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Analyzing Markets...
                        </>
                    ) : (
                        'Find Untapped Niche'
                    )}
                </button>

                {result && (
                    <div className="mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="text-center mb-2 text-slate-400 text-sm">We found a high-potential gap:</div>
                        <div className="bg-slate-950 border border-emerald-500/30 rounded-xl p-6 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-emerald-500/5 group-hover:bg-emerald-500/10 transition"></div>
                            <h3 className="text-xl md:text-2xl font-black text-white relative z-10">"{result}"</h3>
                        </div>
                        <div className="text-center mt-4">
                            <button onClick={handleGenerate} className="text-sm text-slate-500 hover:text-white underline decoration-dashed">
                                Try another one
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
